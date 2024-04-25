import * as React from 'react';
import MaterialUILayout from '../../Layout';
import BasicSpeedDial from '../../../../../docs/data/material/components/speed-dial/BasicSpeedDial.tsx';
import ControlledOpenSpeedDial from '../../../../../docs/data/material/components/speed-dial/ControlledOpenSpeedDial.tsx';
import OpenIconSpeedDial from '../../../../../docs/data/material/components/speed-dial/OpenIconSpeedDial.tsx';
import PlaygroundSpeedDial from '../../../../../docs/data/material/components/speed-dial/PlaygroundSpeedDial.tsx';
import SpeedDialTooltipOpen from '../../../../../docs/data/material/components/speed-dial/SpeedDialTooltipOpen.tsx';

export default function SpeedDial() {
  return (
    <MaterialUILayout>
      <h1>SpeedDial</h1>
      <section>
        <h2> Basic Speed Dial</h2>
        <div className="demo-container">
          <BasicSpeedDial />
        </div>
      </section>
      <section>
        <h2> Controlled Open Speed Dial</h2>
        <div className="demo-container">
          <ControlledOpenSpeedDial />
        </div>
      </section>
      <section>
        <h2> Open Icon Speed Dial</h2>
        <div className="demo-container">
          <OpenIconSpeedDial />
        </div>
      </section>
      <section>
        <h2> Playground Speed Dial</h2>
        <div className="demo-container">
          <PlaygroundSpeedDial />
        </div>
      </section>
      <section>
        <h2> Speed Dial Tooltip Open</h2>
        <div className="demo-container">
          <SpeedDialTooltipOpen />
        </div>
      </section>
    </MaterialUILayout>
  );
}
