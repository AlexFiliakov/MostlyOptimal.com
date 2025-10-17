'use client';

import Image from "next/image";
import React, { useState, useEffect, useMemo, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Matrix, inverse } from 'ml-matrix';

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
    loading: () => (
      <div className="flex items-center justify-center h-full"><div className="text-xl">Loading plot...</div></div>
    )
  }
);

// Define metrics outside component to prevent unnecessary re-renders
const zMetrics = [
  { key: 'growth_rate_mean', label: 'Growth Rate Mean' },
  { key: 'growth_rate_q50', label: 'Growth Rate Median' },
  { key: 'growth_rate_cte_q5.0', label: 'Growth Rate 5% CTE' }
];

const SurfacePlotExtremeShape = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentMetric, setCurrentMetric] = useState(0);
  const [xShapeRangeIndex, setXShapeRangeIndex] = useState(19);
  const [plotData, setPlotData] = useState<any[]>([]);
  const [plotLayout, setPlotLayout] = useState<any>({});
  const [isPlotReady, setIsPlotReady] = useState(false);
  
  // Use a ref to track camera state without triggering re-renders
  const cameraStateRef = useRef<any>({
    eye: { x: 1.5, y: 1.5, z: 1.3 }
  });

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
    
    // Parse the raw data
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

  // Thin Plate Spline interpolation for smooth surfaces
  const interpolateGrid = (points: any[], gridSize = 50) => {
    if (points.length === 0) return { x: [], y: [], z: [] };

    const xValues = points.map((p: any) => p.x);
    const yValues = points.map((p: any) => p.y);
    const zValues = points.map((p: any) => p.z);

    const xMin = Math.min(...xValues);
    const xMax = Math.max(...xValues);
    const yMin = Math.min(...yValues);
    const yMax = Math.max(...yValues);

    // Create log-spaced grid for x and y axes (since we're using log scale)
    const logXMin = Math.log10(xMin);
    const logXMax = Math.log10(xMax);
    const logYMin = Math.log10(yMin);
    const logYMax = Math.log10(yMax);

    const xi = Array.from({length: gridSize}, (_, i) => 
      Math.pow(10, logXMin + (i / (gridSize - 1)) * (logXMax - logXMin))
    );
    const yi = Array.from({length: gridSize}, (_, i) => 
      Math.pow(10, logYMin + (i / (gridSize - 1)) * (logYMax - logYMin))
    );

    // Transform points to log space for better interpolation with log-scaled axes
    const logPoints = points.map(p => ({
      x: Math.log10(p.x),
      y: Math.log10(p.y),
      z: p.z
    }));

    // Build thin plate spline system
    const n = logPoints.length;
    
    // Radial basis function for thin plate spline: r^2 * log(r)
    const rbf = (r: number) => {
      if (r < 1e-10) return 0;
      return r * r * Math.log(r);
    };

    // Build the coefficient matrix L
    const L: number[][] = [];
    for (let i = 0; i < n; i++) {
      const row: number[] = [];
      for (let j = 0; j < n; j++) {
        const dx = logPoints[i].x - logPoints[j].x;
        const dy = logPoints[i].y - logPoints[j].y;
        const r = Math.sqrt(dx * dx + dy * dy);
        row.push(rbf(r));
      }
      // Add polynomial terms: 1, x, y
      row.push(1, logPoints[i].x, logPoints[i].y);
      L.push(row);
    }

    // Add polynomial constraint rows
    for (let i = 0; i < 3; i++) {
      const row: number[] = [];
      for (let j = 0; j < n; j++) {
        if (i === 0) row.push(1);
        else if (i === 1) row.push(logPoints[j].x);
        else row.push(logPoints[j].y);
      }
      row.push(0, 0, 0);
      L.push(row);
    }

    // Build right-hand side vector
    const b = [...zValues, 0, 0, 0];

    try {
      // Solve the system using matrix inversion
      const LMatrix = new Matrix(L);
      const bMatrix = Matrix.columnVector(b);
      const weights = inverse(LMatrix).mmul(bMatrix).to1DArray();

      // Interpolate on the grid
      const zi: number[][] = [];
      for (let i = 0; i < gridSize; i++) {
        const row: number[] = [];
        for (let j = 0; j < gridSize; j++) {
          const logX = Math.log10(xi[i]);
          const logY = Math.log10(yi[j]);
          
          let z = 0;
          // Apply radial basis functions
          for (let k = 0; k < n; k++) {
            const dx = logX - logPoints[k].x;
            const dy = logY - logPoints[k].y;
            const r = Math.sqrt(dx * dx + dy * dy);
            z += weights[k] * rbf(r);
          }
          // Add polynomial terms
          z += weights[n] + weights[n + 1] * logX + weights[n + 2] * logY;
          
          row.push(z);
        }
        zi.push(row);
      }

      return { x: xi, y: yi, z: zi };
    } catch (error) {
      console.error('Thin plate spline interpolation failed, falling back to simple interpolation:', error);
      
      // Fallback to a simpler interpolation if TPS fails
      const zi: number[][] = [];
      for (let i = 0; i < gridSize; i++) {
        const row: number[] = [];
        for (let j = 0; j < gridSize; j++) {
          const logX = Math.log10(xi[i]);
          const logY = Math.log10(yi[j]);
          
          // Simple inverse distance weighting as fallback
          let weightSum = 0;
          let valueSum = 0;
          
          for (let k = 0; k < logPoints.length; k++) {
            const dx = logX - logPoints[k].x;
            const dy = logY - logPoints[k].y;
            const distance = Math.sqrt(dx * dx + dy * dy) + 1e-10;
            const weight = 1 / (distance * distance * distance * distance);
            
            weightSum += weight;
            valueSum += weight * logPoints[k].z;
          }
          
          row.push(valueSum / weightSum);
        }
        zi.push(row);
      }
      
      return { x: xi, y: yi, z: zi };
    }
  };

  // Memoize filtered and aggregated data - only recalculate when xShapeRangeIndex changes
  const aggregatedData = useMemo(() => {
    if (!data) return null;

    const xShapeMin = Math.min(...data.map((d: any) => d.X_Shape));
    const xShapeMax = Math.max(...data.map((d: any) => d.X_Shape));
    
    // Create X_Shape ranges
    const nSteps = 20;
    const xShapeUpper = xShapeMin + ((xShapeRangeIndex + 1) / nSteps) * (xShapeMax - xShapeMin);

    // Filter data for current X_Shape range
    const filteredData = data.filter((d: any) => 
      d.X_Shape >= xShapeMin && d.X_Shape <= xShapeUpper
    );

    if (filteredData.length < 3) return null;

    // Aggregate rows by summing values for each unique combination Ded, and Pol_Lim over X_Shape
    const aggregated = filteredData.reduce((acc: any[], curr: any) => {
      const existing = acc.find(item => item.Ded === curr.Ded && item.Pol_Lim === curr.Pol_Lim);
      if (existing) {
        zMetrics.forEach(metric => {
          existing[metric.key] += curr[metric.key];
        });
      // After summing, convert to average/median per metric over all X_Shape for the (Ded, Pol_Lim) group
      zMetrics.forEach(({ key }) => {
        const currVal = curr[key];

        // Average for mean and 5% CTE
        if (key === 'growth_rate_mean' || key === 'growth_rate_cte_q5.0') {
          const sumKey = `__sum_${key}`;
          const countKey = `__count_${key}`;

          if (typeof existing[sumKey] !== 'number') {
            // First duplicate encountered: existing[key] currently equals prev + curr due to the += above
            existing[sumKey] = existing[key];
            existing[countKey] = 2;
          } else {
            existing[sumKey] += currVal;
            existing[countKey] += 1;
          }

          existing[key] = existing[sumKey] / existing[countKey];
        }

        // Median for q50
        if (key === 'growth_rate_q50') {
          const arrKey = `__vals_${key}`;

          if (!Array.isArray(existing[arrKey])) {
            // First duplicate: reconstruct the two initial values
            const prev = existing[key] - currVal; // since existing[key] == prev + curr from += above
            existing[arrKey] = [prev, currVal];
          } else {
            existing[arrKey].push(currVal);
          }

          const sorted = [...existing[arrKey]].sort((a, b) => a - b);
          const mid = Math.floor(sorted.length / 2);
          const median =
            sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];

          existing[key] = median;
        }
      });
      } else {
        acc.push({ ...curr });
      }
      return acc;
    }, []);

    return aggregated;
  }, [data, xShapeRangeIndex]);

  // Memoize interpolated grids for all metrics - only recalculate when aggregatedData changes
  const interpolatedGrids = useMemo(() => {
    if (!aggregatedData) return null;

    const grids: Record<string, { x: number[], y: number[], z: number[][] }> = {};
    
    zMetrics.forEach(({ key }) => {
      const points = aggregatedData.map((d: any) => ({
        x: d.Ded,
        y: d.Pol_Lim,
        z: d[key]
      }));
      grids[key] = interpolateGrid(points, 40);
    });

    return grids;
  }, [aggregatedData]);

  // Update plot when metric selection changes (uses cached grid data)
  useEffect(() => {
    if (!interpolatedGrids) return;

    const metric = zMetrics[currentMetric].key;
    const gridData = interpolatedGrids[metric];

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

        camera: cameraStateRef.current
      },
      height: 600,
      margin: { l: 0, r: 0, b: 0, t: 80 }
    };

    // Store plot data in state instead of calling Plotly.newPlot directly
    setPlotData([trace]);
    setPlotLayout(layout);
    setIsPlotReady(true);
  }, [interpolatedGrids, currentMetric]);

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
    <div className="w-full h-full bg-white p-4 overflow-auto">
      <div id="selectors" className="mb-4 flex flex-wrap gap-4 items-start">
        <div className="flex-shrink-0">
          <label className="block text-sm font-semibold mb-2">Performance Metric:</label>
          <div className="flex flex-wrap gap-2">
            {zMetrics.map((metric, idx) => (
              <button
                key={metric.key}
                onClick={() => setCurrentMetric(idx)}
                className={`px-3 py-2 rounded text-sm ${
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

        <div className="flex-1 min-w-[250px]">
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
        <div className="flex items-center justify-center" style={{ height: '600px' }}>
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
          style={{ width: '100%', height: '600px' }}
          useResizeHandler={true}
          onRelayout={(event: any) => {
            // Capture camera position changes when user rotates the plot
            if (event['scene.camera']) {
              cameraStateRef.current = event['scene.camera'];
            }
          }}
        />
      )}
    </div>
  );
};

export default SurfacePlotExtremeShape;