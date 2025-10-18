// Custom Plotly build with only what we need for 3D surface plots
// This approach loads modules selectively to reduce bundle size

// Load core plotly without any trace types
import Plotly from 'plotly.js/lib/core';

// Import only the trace types we need
import Surface3D from 'plotly.js/lib/surface';

// Register only what we need
Plotly.register([
  Surface3D,
]);

export default Plotly;
