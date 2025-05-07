import * as React from 'react';
import MaterialUILayout from '../../Layout';
import Elevation from '../../../../../docs/data/material/components/paper/Elevation.tsx';
import SimplePaper from '../../../../../docs/data/material/components/paper/SimplePaper.tsx';
import SquareCorners from '../../../../../docs/data/material/components/paper/SquareCorners.tsx';
import Variants from '../../../../../docs/data/material/components/paper/Variants.tsx';

export default function Paper() {
  return (
    <MaterialUILayout>
      <h1>Paper</h1>
      <section>
        <h2> Elevation</h2>
        <div className="demo-container">
          <Elevation />
        </div>
      </section>
      <section>
        <h2> Simple Paper</h2>
        <div className="demo-container">
          <SimplePaper />
        </div>
      </section>
      <section>
        <h2> Square Corners</h2>
        <div className="demo-container">
          <SquareCorners />
        </div>
      </section>
      <section>
        <h2> Variants</h2>
        <div className="demo-container">
          <Variants />
        </div>
      </section>
    </MaterialUILayout>
  );
}
