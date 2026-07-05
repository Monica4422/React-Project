import React, { Suspense, lazy } from 'react';
import AppRoutes from './routes/AppRoutes';

const App = () => (
  <Suspense fallback={<div style={{ padding: 24 }}>Loading workspace...</div>}>
    <AppRoutes />
  </Suspense>
);

export default App;
