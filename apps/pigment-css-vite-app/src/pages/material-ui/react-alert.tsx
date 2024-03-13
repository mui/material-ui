import * as React from 'react';
import MaterialUILayout from '../../Layout';
import ActionAlerts from '../../../../../docs/data/material/components/alert/ActionAlerts.tsx';
import BasicAlerts from '../../../../../docs/data/material/components/alert/BasicAlerts.tsx';
import ColorAlerts from '../../../../../docs/data/material/components/alert/ColorAlerts.tsx';
import DescriptionAlerts from '../../../../../docs/data/material/components/alert/DescriptionAlerts.tsx';
import FilledAlerts from '../../../../../docs/data/material/components/alert/FilledAlerts.tsx';
import IconAlerts from '../../../../../docs/data/material/components/alert/IconAlerts.tsx';
import OutlinedAlerts from '../../../../../docs/data/material/components/alert/OutlinedAlerts.tsx';
import SimpleAlert from '../../../../../docs/data/material/components/alert/SimpleAlert.tsx';
import TransitionAlerts from '../../../../../docs/data/material/components/alert/TransitionAlerts.tsx';

export default function Alert() {
  return (
    <MaterialUILayout>
      <h1>Alert</h1>
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
    </MaterialUILayout>
  );
}
