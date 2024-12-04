import * as React from 'react';
import MaterialUILayout from '../../Layout';
import PopperPopupState from '../../../../../docs/data/material/components/popper/PopperPopupState.tsx';
import PositionedPopper from '../../../../../docs/data/material/components/popper/PositionedPopper.tsx';
import SimplePopper from '../../../../../docs/data/material/components/popper/SimplePopper.tsx';
import SpringPopper from '../../../../../docs/data/material/components/popper/SpringPopper.tsx';
import TransitionsPopper from '../../../../../docs/data/material/components/popper/TransitionsPopper.tsx';
import VirtualElementPopper from '../../../../../docs/data/material/components/popper/VirtualElementPopper.tsx';

export default function Popper() {
  return (
    <MaterialUILayout>
      <h1>Popper</h1>
      <section>
        <h2> Popper Popup State</h2>
        <div className="demo-container">
          <PopperPopupState />
        </div>
      </section>
      <section>
        <h2> Positioned Popper</h2>
        <div className="demo-container">
          <PositionedPopper />
        </div>
      </section>
      <section>
        <h2> Simple Popper</h2>
        <div className="demo-container">
          <SimplePopper />
        </div>
      </section>
      <section>
        <h2> Spring Popper</h2>
        <div className="demo-container">
          <SpringPopper />
        </div>
      </section>
      <section>
        <h2> Transitions Popper</h2>
        <div className="demo-container">
          <TransitionsPopper />
        </div>
      </section>
      <section>
        <h2> Virtual Element Popper</h2>
        <div className="demo-container">
          <VirtualElementPopper />
        </div>
      </section>
    </MaterialUILayout>
  );
}
