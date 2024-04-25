'use client';
import * as React from 'react';
import AnchorTemporaryDrawer from '../../../../../../docs/data/material/components/drawers/AnchorTemporaryDrawer';
import ClippedDrawer from '../../../../../../docs/data/material/components/drawers/ClippedDrawer';
import MiniDrawer from '../../../../../../docs/data/material/components/drawers/MiniDrawer';
import PermanentDrawerLeft from '../../../../../../docs/data/material/components/drawers/PermanentDrawerLeft';
import PermanentDrawerRight from '../../../../../../docs/data/material/components/drawers/PermanentDrawerRight';
import PersistentDrawerLeft from '../../../../../../docs/data/material/components/drawers/PersistentDrawerLeft';
import PersistentDrawerRight from '../../../../../../docs/data/material/components/drawers/PersistentDrawerRight';
import ResponsiveDrawer from '../../../../../../docs/data/material/components/drawers/ResponsiveDrawer';
import SwipeableEdgeDrawer from '../../../../../../docs/data/material/components/drawers/SwipeableEdgeDrawer';
import SwipeableTemporaryDrawer from '../../../../../../docs/data/material/components/drawers/SwipeableTemporaryDrawer';
import TemporaryDrawer from '../../../../../../docs/data/material/components/drawers/TemporaryDrawer';

export default function Drawers() {
  return (
    <React.Fragment>
      <section>
        <h2> Anchor Temporary Drawer</h2>
        <div className="demo-container">
          <AnchorTemporaryDrawer />
        </div>
      </section>
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
        <h2> Swipeable Temporary Drawer</h2>
        <div className="demo-container">
          <SwipeableTemporaryDrawer />
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
