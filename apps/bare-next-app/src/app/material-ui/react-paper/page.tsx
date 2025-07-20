'use client';
import * as React from 'react';
import Elevation from '../../../../../../docs/data/material/components/paper/Elevation';
import SimplePaper from '../../../../../../docs/data/material/components/paper/SimplePaper';
import SquareCorners from '../../../../../../docs/data/material/components/paper/SquareCorners';
import Variants from '../../../../../../docs/data/material/components/paper/Variants';

export default function Paper() {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}
