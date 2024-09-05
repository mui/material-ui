import * as React from 'react';
import MaterialUILayout from '../../Layout';
import FloatingActionButtonExtendedSize from '../../../../../docs/data/material/components/floating-action-button/FloatingActionButtonExtendedSize.tsx';
import FloatingActionButtonSize from '../../../../../docs/data/material/components/floating-action-button/FloatingActionButtonSize.tsx';
import FloatingActionButtonZoom from '../../../../../docs/data/material/components/floating-action-button/FloatingActionButtonZoom.tsx';
import FloatingActionButtons from '../../../../../docs/data/material/components/floating-action-button/FloatingActionButtons.tsx';

export default function FloatingActionButton() {
  return (
    <MaterialUILayout>
      <h1>FloatingActionButton</h1>
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
    </MaterialUILayout>
  );
}
