import * as React from 'react';
import MaterialUILayout from '../../Layout';
import ColorToggleButton from '../../../../../docs/data/material/components/toggle-button/ColorToggleButton.tsx';
import CustomizedDividers from '../../../../../docs/data/material/components/toggle-button/CustomizedDividers.tsx';
import StandaloneToggleButton from '../../../../../docs/data/material/components/toggle-button/StandaloneToggleButton.tsx';
import ToggleButtonNotEmpty from '../../../../../docs/data/material/components/toggle-button/ToggleButtonNotEmpty.tsx';
import ToggleButtonSizes from '../../../../../docs/data/material/components/toggle-button/ToggleButtonSizes.tsx';
import ToggleButtons from '../../../../../docs/data/material/components/toggle-button/ToggleButtons.tsx';
import ToggleButtonsMultiple from '../../../../../docs/data/material/components/toggle-button/ToggleButtonsMultiple.tsx';
import VerticalToggleButtons from '../../../../../docs/data/material/components/toggle-button/VerticalToggleButtons.tsx';

export default function ToggleButton() {
  return (
    <MaterialUILayout>
      <h1>ToggleButton</h1>
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
    </MaterialUILayout>
  );
}
