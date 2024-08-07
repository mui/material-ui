'use client';
import * as React from 'react';
import BasicSwitches from '../../../../../../docs/data/material/components/switches/BasicSwitches';
import ColorSwitches from '../../../../../../docs/data/material/components/switches/ColorSwitches';
import ControlledSwitches from '../../../../../../docs/data/material/components/switches/ControlledSwitches';
import CustomizedSwitches from '../../../../../../docs/data/material/components/switches/CustomizedSwitches';
import FormControlLabelPosition from '../../../../../../docs/data/material/components/switches/FormControlLabelPosition';
import SwitchLabels from '../../../../../../docs/data/material/components/switches/SwitchLabels';
import SwitchesGroup from '../../../../../../docs/data/material/components/switches/SwitchesGroup';
import SwitchesSize from '../../../../../../docs/data/material/components/switches/SwitchesSize';

export default function Switches() {
  return (
    <React.Fragment>
      <section>
        <h2> Basic Switches</h2>
        <div className="demo-container">
          <BasicSwitches />
        </div>
      </section>
      <section>
        <h2> Color Switches</h2>
        <div className="demo-container">
          <ColorSwitches />
        </div>
      </section>
      <section>
        <h2> Controlled Switches</h2>
        <div className="demo-container">
          <ControlledSwitches />
        </div>
      </section>
      <section>
        <h2> Customized Switches</h2>
        <div className="demo-container">
          <CustomizedSwitches />
        </div>
      </section>
      <section>
        <h2> Form Control Label Position</h2>
        <div className="demo-container">
          <FormControlLabelPosition />
        </div>
      </section>
      <section>
        <h2> Switch Labels</h2>
        <div className="demo-container">
          <SwitchLabels />
        </div>
      </section>
      <section>
        <h2> Switches Group</h2>
        <div className="demo-container">
          <SwitchesGroup />
        </div>
      </section>
      <section>
        <h2> Switches Size</h2>
        <div className="demo-container">
          <SwitchesSize />
        </div>
      </section>
    </React.Fragment>
  );
}
