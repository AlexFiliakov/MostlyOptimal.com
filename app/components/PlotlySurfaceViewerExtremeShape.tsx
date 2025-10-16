'use client';

import Image from "next/image";
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Create a factory function to use the full Plotly library
const createPlotlyComponent = async () => {
  const Plotly = await import('plotly.js-dist-min');
  const createPlotlyComponent = await import('react-plotly.js/factory');
  return createPlotlyComponent.default(Plotly);
};

// Dynamically import Plotly with full library for 3D support
const Plot = dynamic(
  () => createPlotlyComponent(),
  { 
    ssr: false,
    loading: () => <div className="flex items-center justify-center h-full"><div className="text-xl">Loading plot...</div></div>
  }
);

const SurfacePlotExtremeShape = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentMetric, setCurrentMetric] = useState(0);
  const [xShapeRangeIndex, setXShapeRangeIndex] = useState(19);
  const [plotData, setPlotData] = useState<any[]>([]);
  const [plotLayout, setPlotLayout] = useState<any>({});
  const [isPlotReady, setIsPlotReady] = useState(false);

  const zMetrics = [
    { key: 'growth_rate_mean', label: 'Growth Rate Mean' },
    { key: 'growth_rate_q50', label: 'Growth Rate Median' },
    { key: 'growth_rate_cte_q5.0', label: 'Growth Rate 5% CTE' }
  ];

  // Load and process CSV data
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/examples/extreme_shape_surface_plot_data.csv');
        if (!response.ok) {
          throw new Error(`Failed to fetch CSV: ${response.status} ${response.statusText}`);
        }
        const csvData = await response.text();
        const parsed = parseCSV(csvData);
        setData(parsed);
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const parseCSV = (csv: string) => {
    const lines = csv.trim().split('\n');
    const headers = lines[0].split(',');
    const rows: any[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
      const row: any = {};
      headers.forEach((header: string, idx: number) => {
        const trimmedHeader = header.trim();
        row[trimmedHeader] = trimmedHeader === 'Ded' || trimmedHeader === 'Pol_Lim' 
          ? parseInt(values[idx]) 
          : parseFloat(values[idx]);
      });
      rows.push(row);
    }
    return rows;
  };

  // Simple bilinear interpolation
  const interpolateGrid = (points: any[], gridSize = 50) => {
    if (points.length === 0) return { x: [], y: [], z: [] };

    const xValues = points.map((p: any) => p.x);
    const yValues = points.map((p: any) => p.y);
    const zValues = points.map((p: any) => p.z);

    const xMin = Math.min(...xValues);
    const xMax = Math.max(...xValues);
    const yMin = Math.min(...yValues);
    const yMax = Math.max(...yValues);

    const xi = [];
    const yi = [];
    const zi = [];

    for (let i = 0; i < gridSize; i++) {
      const x = xMin + (i / (gridSize - 1)) * (xMax - xMin);
      const row = [];
      for (let j = 0; j < gridSize; j++) {
        const y = yMin + (j / (gridSize - 1)) * (yMax - yMin);
        
        // Inverse distance weighting interpolation
        let weightSum = 0;
        let valueSum = 0;
        const power = 2;
        const epsilon = 1e-10;

        for (let k = 0; k < points.length; k++) {
          const dx = x - points[k].x;
          const dy = y - points[k].y;
          const distance = Math.sqrt(dx * dx + dy * dy) + epsilon;
          const weight = 1 / Math.pow(distance, power);
          
          weightSum += weight;
          valueSum += weight * points[k].z;
        }

        row.push(valueSum / weightSum);
      }
      xi.push(x);
      yi.push(yMin + (i / (gridSize - 1)) * (yMax - yMin));
      zi.push(row);
    }

    return { x: xi, y: Array.from({length: gridSize}, (_, i) => yMin + (i / (gridSize - 1)) * (yMax - yMin)), z: zi };
  };

  // Update plot when data or selections change
  useEffect(() => {
    if (!data) return;

    const xShapeMin = Math.min(...data.map((d: any) => d.X_Shape));
    const xShapeMax = Math.max(...data.map((d: any) => d.X_Shape));
    
    // Create X_Shape ranges
    const nSteps = 20;
    const xShapeUpper = xShapeMin + ((xShapeRangeIndex + 1) / nSteps) * (xShapeMax - xShapeMin);

    // Filter data for current X_Shape range
    const filteredData = data.filter((d: any) => 
      d.X_Shape >= xShapeMin && d.X_Shape <= xShapeUpper
    );

    if (filteredData.length < 3) return;

    // Prepare data points for interpolation
    const metric = zMetrics[currentMetric].key;
    const points = filteredData.map((d: any) => ({
      x: d.Ded,
      y: d.Pol_Lim,
      z: d[metric]
    }));

    // Interpolate to create smooth surface
    const gridData = interpolateGrid(points, 40);

    const trace = {
      type: 'surface',
      x: gridData.x,
      y: gridData.y,
      z: gridData.z,
      colorscale: 'Viridis',
      colorbar: {
        title: zMetrics[currentMetric].label,
        len: 0.75,
        y: 0.5
      },
      hovertemplate: '<b>Deductible</b>: %{x:,.0f}<br>' +
                     '<b>Policy Limit</b>: %{y:,.0f}<br>' +
                     `<b>${zMetrics[currentMetric].label}</b>: %{z:.6f}<br>` +
                     '<extra></extra>'
    };

    const layout = {
      title: {
        text: '<b>Growth Rate Analysis</b><br>Select metric and adjust tail shape range',
        x: 0.5,
        xanchor: 'center'
      },
      scene: {
        xaxis: { 
          title: { text: 'Deductible' }, 
          gridcolor: 'lightgray',
          type: 'log'
        },
        yaxis: { 
          title: { text: 'Policy Limit' }, 
          gridcolor: 'lightgray',
          type: 'log'
        },
        zaxis: { 
          title: { text: zMetrics[currentMetric].label }, 
          gridcolor: 'lightgray' 
        },

        camera: {
          eye: { x: 1.5, y: 1.5, z: 1.3 }
        }
      },
      height: 600,
      margin: { l: 0, r: 0, b: 0, t: 80 }
    };

    // Store plot data in state instead of calling Plotly.newPlot directly
    setPlotData([trace]);
    setPlotLayout(layout);
    setIsPlotReady(true);
  }, [data, currentMetric, xShapeRangeIndex, zMetrics]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <Image
          src="/images/loading_icon.gif"
          alt="Loading"
          width={64}
          height={64}
          unoptimized
        />
        <div className="text-xl">
          Initializing...
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-red-600">Error loading data. Please ensure extreme_shape_surface_plot_data.csv is available.</div>
      </div>
    );
  }

  const xShapeMin = Math.min(...data.map((d: any) => d.X_Shape));
  const xShapeMax = Math.max(...data.map((d: any) => d.X_Shape));
  const nSteps = 20;
  const currentXShapeMax = xShapeMin + ((xShapeRangeIndex + 1) / nSteps) * (xShapeMax - xShapeMin);

  return (
    <div className="w-full h-screen bg-white p-4">
      <div id="selectors" className="mb-4 flex gap-8 items-start">
        <div className="flex-shrink-0">
          <label className="block text-sm font-semibold mb-2">Performance Metric:</label>
          <div className="flex gap-2">
            {zMetrics.map((metric, idx) => (
              <button
                key={metric.key}
                onClick={() => setCurrentMetric(idx)}
                className={`px-4 py-2 rounded ${
                  currentMetric === idx
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {metric.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <label className="block text-sm font-semibold mb-2">
            Tail Shape Maximum: ≤ {currentXShapeMax.toFixed(2)}
          </label>
          <input
            type="range"
            min="0"
            max="19"
            value={xShapeRangeIndex}
            onChange={(e) => setXShapeRangeIndex(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      {!isPlotReady && (
        <div className="flex items-center justify-center" style={{ height: 'calc(100vh - 200px)' }}>
          <div className="text-xl">Preparing plot...</div>
        </div>
      )}
      
      {isPlotReady && plotData.length > 0 && (
        <Plot
          data={plotData}
          layout={plotLayout}
          config={{ 
            responsive: true,
            displayModeBar: true,
            displaylogo: false,
            modeBarButtonsToRemove: ['toImage']
          }}
          style={{ width: '100%', height: 'calc(100vh - 200px)' }}
          useResizeHandler={true}
        />
      )}
    </div>
  );
};

export default SurfacePlotExtremeShape;