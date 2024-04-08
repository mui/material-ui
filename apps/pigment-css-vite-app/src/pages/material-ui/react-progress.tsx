import * as React from 'react';
import MaterialUILayout from '../../Layout';
import CircularColor from '../../../../../docs/data/material/components/progress/CircularColor.tsx';
import CircularDeterminate from '../../../../../docs/data/material/components/progress/CircularDeterminate.tsx';
import CircularIndeterminate from '../../../../../docs/data/material/components/progress/CircularIndeterminate.tsx';
import CircularIntegration from '../../../../../docs/data/material/components/progress/CircularIntegration.tsx';
import CircularUnderLoad from '../../../../../docs/data/material/components/progress/CircularUnderLoad.tsx';
import CircularWithValueLabel from '../../../../../docs/data/material/components/progress/CircularWithValueLabel.tsx';
import CustomizedProgressBars from '../../../../../docs/data/material/components/progress/CustomizedProgressBars.tsx';
import DelayingAppearance from '../../../../../docs/data/material/components/progress/DelayingAppearance.tsx';
import LinearBuffer from '../../../../../docs/data/material/components/progress/LinearBuffer.tsx';
import LinearColor from '../../../../../docs/data/material/components/progress/LinearColor.tsx';
import LinearDeterminate from '../../../../../docs/data/material/components/progress/LinearDeterminate.tsx';
import LinearIndeterminate from '../../../../../docs/data/material/components/progress/LinearIndeterminate.tsx';
import LinearWithValueLabel from '../../../../../docs/data/material/components/progress/LinearWithValueLabel.tsx';

export default function Progress() {
  return (
    <MaterialUILayout>
      <h1>Progress</h1>
      <section>
        <h2> Circular Color</h2>
        <div className="demo-container">
          <CircularColor />
        </div>
      </section>
      <section>
        <h2> Circular Determinate</h2>
        <div className="demo-container">
          <CircularDeterminate />
        </div>
      </section>
      <section>
        <h2> Circular Indeterminate</h2>
        <div className="demo-container">
          <CircularIndeterminate />
        </div>
      </section>
      <section>
        <h2> Circular Integration</h2>
        <div className="demo-container">
          <CircularIntegration />
        </div>
      </section>
      <section>
        <h2> Circular Under Load</h2>
        <div className="demo-container">
          <CircularUnderLoad />
        </div>
      </section>
      <section>
        <h2> Circular With Value Label</h2>
        <div className="demo-container">
          <CircularWithValueLabel />
        </div>
      </section>
      <section>
        <h2> Customized Progress Bars</h2>
        <div className="demo-container">
          <CustomizedProgressBars />
        </div>
      </section>
      <section>
        <h2> Delaying Appearance</h2>
        <div className="demo-container">
          <DelayingAppearance />
        </div>
      </section>
      <section>
        <h2> Linear Buffer</h2>
        <div className="demo-container">
          <LinearBuffer />
        </div>
      </section>
      <section>
        <h2> Linear Color</h2>
        <div className="demo-container">
          <LinearColor />
        </div>
      </section>
      <section>
        <h2> Linear Determinate</h2>
        <div className="demo-container">
          <LinearDeterminate />
        </div>
      </section>
      <section>
        <h2> Linear Indeterminate</h2>
        <div className="demo-container">
          <LinearIndeterminate />
        </div>
      </section>
      <section>
        <h2> Linear With Value Label</h2>
        <div className="demo-container">
          <LinearWithValueLabel />
        </div>
      </section>
    </MaterialUILayout>
  );
}
