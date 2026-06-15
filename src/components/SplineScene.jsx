import React, { Suspense, lazy } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

export function SplineScene({ scene, style, className }) {
  return (
    <Suspense 
      fallback={
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="pulse-dot"></div>
        </div>
      }
    >
      <Spline
        scene={scene}
        style={{ width: '100%', height: '100%', ...style }}
        className={className}
      />
    </Suspense>
  );
}
