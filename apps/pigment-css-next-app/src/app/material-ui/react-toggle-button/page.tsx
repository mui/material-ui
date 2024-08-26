'use client';
import * as React from 'react';
import ColorToggleButton from '../../../../../../docs/data/material/components/toggle-button/ColorToggleButton';
import CustomizedDividers from '../../../../../../docs/data/material/components/toggle-button/CustomizedDividers';
import StandaloneToggleButton from '../../../../../../docs/data/material/components/toggle-button/StandaloneToggleButton';
import ToggleButtonNotEmpty from '../../../../../../docs/data/material/components/toggle-button/ToggleButtonNotEmpty';
import ToggleButtonSizes from '../../../../../../docs/data/material/components/toggle-button/ToggleButtonSizes';
import ToggleButtons from '../../../../../../docs/data/material/components/toggle-button/ToggleButtons';
import ToggleButtonsMultiple from '../../../../../../docs/data/material/components/toggle-button/ToggleButtonsMultiple';
import VerticalToggleButtons from '../../../../../../docs/data/material/components/toggle-button/VerticalToggleButtons';

export default function ToggleButton() {
  return (
    <React.Fragment>
      <section>
        <h2> Color Toggle Button</h2>
        <div className="demo-container">
          <ColorToggleButton />
        </div>
      </section>
      <section>
        <h2> Customized Dividers</h2>
        <div className="demo-container">
          <CustomizedDividers />
        </div>
      </section>
      <section>
        <h2> Standalone Toggle Button</h2>
        <div className="demo-container">
          <StandaloneToggleButton />
        </div>
      </section>
      <section>
        <h2> Toggle Button Not Empty</h2>
        <div className="demo-container">
          <ToggleButtonNotEmpty />
        </div>
      </section>
      <section>
        <h2> Toggle Button Sizes</h2>
        <div className="demo-container">
          <ToggleButtonSizes />
        </div>
      </section>
      <section>
        <h2> Toggle Buttons</h2>
        <div className="demo-container">
          <ToggleButtons />
        </div>
      </section>
      <section>
        <h2> Toggle Buttons Multiple</h2>
        <div className="demo-container">
          <ToggleButtonsMultiple />
        </div>
      </section>
      <section>
        <h2> Vertical Toggle Buttons</h2>
        <div className="demo-container">
          <VerticalToggleButtons />
        </div>
      </section>
    </React.Fragment>
  );
}
