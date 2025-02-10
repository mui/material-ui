'use client';
import * as React from 'react';
import CircularColor from '../../../../../../docs/data/material/components/progress/CircularColor';
import CircularDeterminate from '../../../../../../docs/data/material/components/progress/CircularDeterminate';
import CircularIndeterminate from '../../../../../../docs/data/material/components/progress/CircularIndeterminate';
import CircularIntegration from '../../../../../../docs/data/material/components/progress/CircularIntegration';
import CircularUnderLoad from '../../../../../../docs/data/material/components/progress/CircularUnderLoad';
import CircularWithValueLabel from '../../../../../../docs/data/material/components/progress/CircularWithValueLabel';
import CustomizedProgressBars from '../../../../../../docs/data/material/components/progress/CustomizedProgressBars';
import DelayingAppearance from '../../../../../../docs/data/material/components/progress/DelayingAppearance';
import LinearBuffer from '../../../../../../docs/data/material/components/progress/LinearBuffer';
import LinearColor from '../../../../../../docs/data/material/components/progress/LinearColor';
import LinearDeterminate from '../../../../../../docs/data/material/components/progress/LinearDeterminate';
import LinearIndeterminate from '../../../../../../docs/data/material/components/progress/LinearIndeterminate';
import LinearWithValueLabel from '../../../../../../docs/data/material/components/progress/LinearWithValueLabel';

export default function Progress() {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}
