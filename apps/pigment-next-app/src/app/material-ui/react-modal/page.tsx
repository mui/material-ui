'use client';
import * as React from 'react';
import BasicModal from '../../../../../../docs/data/material/components/modal/BasicModal';
import KeepMountedModal from '../../../../../../docs/data/material/components/modal/KeepMountedModal';
import NestedModal from '../../../../../../docs/data/material/components/modal/NestedModal';
import ServerModal from '../../../../../../docs/data/material/components/modal/ServerModal';
import SpringModal from '../../../../../../docs/data/material/components/modal/SpringModal';
import TransitionsModal from '../../../../../../docs/data/material/components/modal/TransitionsModal';

export default function Modal() {
  return (
    <React.Fragment>
      <section>
        <h2> Basic Modal</h2>
        <div className="demo-container">
          <BasicModal />
        </div>
      </section>
      <section>
        <h2> Keep Mounted Modal</h2>
        <div className="demo-container">
          <KeepMountedModal />
        </div>
      </section>
      <section>
        <h2> Nested Modal</h2>
        <div className="demo-container">
          <NestedModal />
        </div>
      </section>
      <section>
        <h2> Server Modal</h2>
        <div className="demo-container">
          <ServerModal />
        </div>
      </section>
      <section>
        <h2> Spring Modal</h2>
        <div className="demo-container">
          <SpringModal />
        </div>
      </section>
      <section>
        <h2> Transitions Modal</h2>
        <div className="demo-container">
          <TransitionsModal />
        </div>
      </section>
    </React.Fragment>
  );
}
