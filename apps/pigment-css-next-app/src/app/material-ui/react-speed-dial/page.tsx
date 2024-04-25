'use client';
import * as React from 'react';
import BasicSpeedDial from '../../../../../../docs/data/material/components/speed-dial/BasicSpeedDial';
import ControlledOpenSpeedDial from '../../../../../../docs/data/material/components/speed-dial/ControlledOpenSpeedDial';
import OpenIconSpeedDial from '../../../../../../docs/data/material/components/speed-dial/OpenIconSpeedDial';
import PlaygroundSpeedDial from '../../../../../../docs/data/material/components/speed-dial/PlaygroundSpeedDial';
import SpeedDialTooltipOpen from '../../../../../../docs/data/material/components/speed-dial/SpeedDialTooltipOpen';

export default function SpeedDial() {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}
