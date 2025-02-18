import * as React from 'react';
import MaterialUILayout from '../../Layout';
import BasicSwitches from '../../../../../docs/data/material/components/switches/BasicSwitches.tsx';
import ColorSwitches from '../../../../../docs/data/material/components/switches/ColorSwitches.tsx';
import ControlledSwitches from '../../../../../docs/data/material/components/switches/ControlledSwitches.tsx';
import CustomizedSwitches from '../../../../../docs/data/material/components/switches/CustomizedSwitches.tsx';
import FormControlLabelPosition from '../../../../../docs/data/material/components/switches/FormControlLabelPosition.tsx';
import SwitchLabels from '../../../../../docs/data/material/components/switches/SwitchLabels.tsx';
import SwitchesGroup from '../../../../../docs/data/material/components/switches/SwitchesGroup.tsx';
import SwitchesSize from '../../../../../docs/data/material/components/switches/SwitchesSize.tsx';

export default function Switches() {
  return (
    <MaterialUILayout>
      <h1>Switches</h1>
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
    </MaterialUILayout>
  );
}
