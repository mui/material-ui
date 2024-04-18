'use client';
import * as React from 'react';
import FloatingActionButtonExtendedSize from '../../../../../../docs/data/material/components/floating-action-button/FloatingActionButtonExtendedSize';
import FloatingActionButtonSize from '../../../../../../docs/data/material/components/floating-action-button/FloatingActionButtonSize';
import FloatingActionButtonZoom from '../../../../../../docs/data/material/components/floating-action-button/FloatingActionButtonZoom';
import FloatingActionButtons from '../../../../../../docs/data/material/components/floating-action-button/FloatingActionButtons';

export default function FloatingActionButton() {
  return (
    <React.Fragment>
      <section>
        <h2> Floating Action Button Extended Size</h2>
        <div className="demo-container">
          <FloatingActionButtonExtendedSize />
        </div>
      </section>
      <section>
        <h2> Floating Action Button Size</h2>
        <div className="demo-container">
          <FloatingActionButtonSize />
        </div>
      </section>
      <section>
        <h2> Floating Action Button Zoom</h2>
        <div className="demo-container">
          <FloatingActionButtonZoom />
        </div>
      </section>
      <section>
        <h2> Floating Action Buttons</h2>
        <div className="demo-container">
          <FloatingActionButtons />
        </div>
      </section>
    </React.Fragment>
  );
}
