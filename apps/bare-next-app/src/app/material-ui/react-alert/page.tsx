'use client';
import * as React from 'react';
import ActionAlerts from '../../../../../../docs/data/material/components/alert/ActionAlerts';
import BasicAlerts from '../../../../../../docs/data/material/components/alert/BasicAlerts';
import ColorAlerts from '../../../../../../docs/data/material/components/alert/ColorAlerts';
import DescriptionAlerts from '../../../../../../docs/data/material/components/alert/DescriptionAlerts';
import FilledAlerts from '../../../../../../docs/data/material/components/alert/FilledAlerts';
import IconAlerts from '../../../../../../docs/data/material/components/alert/IconAlerts';
import OutlinedAlerts from '../../../../../../docs/data/material/components/alert/OutlinedAlerts';
import SimpleAlert from '../../../../../../docs/data/material/components/alert/SimpleAlert';
import TransitionAlerts from '../../../../../../docs/data/material/components/alert/TransitionAlerts';

export default function Alert() {
  return (
    <React.Fragment>
      <section>
        <h2> Action Alerts</h2>
        <div className="demo-container">
          <ActionAlerts />
        </div>
      </section>
      <section>
        <h2> Basic Alerts</h2>
        <div className="demo-container">
          <BasicAlerts />
        </div>
      </section>
      <section>
        <h2> Color Alerts</h2>
        <div className="demo-container">
          <ColorAlerts />
        </div>
      </section>
      <section>
        <h2> Description Alerts</h2>
        <div className="demo-container">
          <DescriptionAlerts />
        </div>
      </section>
      <section>
        <h2> Filled Alerts</h2>
        <div className="demo-container">
          <FilledAlerts />
        </div>
      </section>
      <section>
        <h2> Icon Alerts</h2>
        <div className="demo-container">
          <IconAlerts />
        </div>
      </section>
      <section>
        <h2> Outlined Alerts</h2>
        <div className="demo-container">
          <OutlinedAlerts />
        </div>
      </section>
      <section>
        <h2> Simple Alert</h2>
        <div className="demo-container">
          <SimpleAlert />
        </div>
      </section>
      <section>
        <h2> Transition Alerts</h2>
        <div className="demo-container">
          <TransitionAlerts />
        </div>
      </section>
    </React.Fragment>
  );
}
