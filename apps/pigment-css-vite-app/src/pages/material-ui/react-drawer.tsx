import * as React from 'react';
import MaterialUILayout from '../../Layout';
import ClippedDrawer from '../../../../../docs/data/material/components/drawers/ClippedDrawer.tsx';
import MiniDrawer from '../../../../../docs/data/material/components/drawers/MiniDrawer.tsx';
import PermanentDrawerLeft from '../../../../../docs/data/material/components/drawers/PermanentDrawerLeft.tsx';
import PermanentDrawerRight from '../../../../../docs/data/material/components/drawers/PermanentDrawerRight.tsx';
import PersistentDrawerLeft from '../../../../../docs/data/material/components/drawers/PersistentDrawerLeft.tsx';
import PersistentDrawerRight from '../../../../../docs/data/material/components/drawers/PersistentDrawerRight.tsx';
import ResponsiveDrawer from '../../../../../docs/data/material/components/drawers/ResponsiveDrawer.tsx';
import SwipeableEdgeDrawer from '../../../../../docs/data/material/components/drawers/SwipeableEdgeDrawer.tsx';
import TemporaryDrawer from '../../../../../docs/data/material/components/drawers/TemporaryDrawer.tsx';

export default function Drawers() {
  return (
    <MaterialUILayout>
      <h1>Drawers</h1>
      <section>
        <h2> Clipped Drawer</h2>
        <div className="demo-container">
          <ClippedDrawer />
        </div>
      </section>
      <section>
        <h2> Mini Drawer</h2>
        <div className="demo-container">
          <MiniDrawer />
        </div>
      </section>
      <section>
        <h2> Permanent Drawer Left</h2>
        <div className="demo-container">
          <PermanentDrawerLeft />
        </div>
      </section>
      <section>
        <h2> Permanent Drawer Right</h2>
        <div className="demo-container">
          <PermanentDrawerRight />
        </div>
      </section>
      <section>
        <h2> Persistent Drawer Left</h2>
        <div className="demo-container">
          <PersistentDrawerLeft />
        </div>
      </section>
      <section>
        <h2> Persistent Drawer Right</h2>
        <div className="demo-container">
          <PersistentDrawerRight />
        </div>
      </section>
      <section>
        <h2> Responsive Drawer</h2>
        <div className="demo-container">
          <ResponsiveDrawer />
        </div>
      </section>
      <section>
        <h2> Swipeable Edge Drawer</h2>
        <div className="demo-container">
          <SwipeableEdgeDrawer />
        </div>
      </section>
      <section>
        <h2> Temporary Drawer</h2>
        <div className="demo-container">
          <TemporaryDrawer />
        </div>
      </section>
    </MaterialUILayout>
  );
}
