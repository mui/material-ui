import * as React from 'react';
import MaterialUILayout from '../../Layout';
import BasicModal from '../../../../../docs/data/material/components/modal/BasicModal.tsx';
import KeepMountedModal from '../../../../../docs/data/material/components/modal/KeepMountedModal.tsx';
import NestedModal from '../../../../../docs/data/material/components/modal/NestedModal.tsx';
import ServerModal from '../../../../../docs/data/material/components/modal/ServerModal.tsx';
import SpringModal from '../../../../../docs/data/material/components/modal/SpringModal.tsx';
import TransitionsModal from '../../../../../docs/data/material/components/modal/TransitionsModal.tsx';

export default function Modal() {
  return (
    <MaterialUILayout>
      <h1>Modal</h1>
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
    </MaterialUILayout>
  );
}
