'use client';
import * as React from 'react';
import BasicPopover from '../../../../../../docs/data/material/components/popover/BasicPopover';
import MouseHoverPopover from '../../../../../../docs/data/material/components/popover/MouseHoverPopover';
import PopoverPopupState from '../../../../../../docs/data/material/components/popover/PopoverPopupState';
import VirtualElementPopover from '../../../../../../docs/data/material/components/popover/VirtualElementPopover';

export default function Popover() {
  return (
    <React.Fragment>
      <section>
        <h2> Basic Popover</h2>
        <div className="demo-container">
          <BasicPopover />
        </div>
      </section>
      <section>
        <h2> Mouse Over Popover</h2>
        <div className="demo-container">
          <MouseHoverPopover />
        </div>
      </section>
      <section>
        <h2> Popover Popup State</h2>
        <div className="demo-container">
          <PopoverPopupState />
        </div>
      </section>
      <section>
        <h2> Virtual Element Popover</h2>
        <div className="demo-container">
          <VirtualElementPopover />
        </div>
      </section>
    </React.Fragment>
  );
}
