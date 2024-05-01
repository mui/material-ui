'use client';
import * as React from 'react';
import ClippedDrawer from '../../../../../../docs/data/material/components/drawers/ClippedDrawer';
import PermanentDrawerLeft from '../../../../../../docs/data/material/components/drawers/PermanentDrawerLeft';
import PermanentDrawerRight from '../../../../../../docs/data/material/components/drawers/PermanentDrawerRight';
import ResponsiveDrawer from '../../../../../../docs/data/material/components/drawers/ResponsiveDrawer';
import SwipeableEdgeDrawer from '../../../../../../docs/data/material/components/drawers/SwipeableEdgeDrawer';
import TemporaryDrawer from '../../../../../../docs/data/material/components/drawers/TemporaryDrawer';

export default function Drawers() {
  return (
    <React.Fragment>
      <section>
        <h2> Clipped Drawer</h2>
        <div className="demo-container">
          <ClippedDrawer />
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
    </React.Fragment>
  );
}
