import * as React from 'react';
import MaterialUILayout from '../../Layout';
import CheckboxLabels from '../../../../../docs/data/material/components/checkboxes/CheckboxLabels.tsx';
import CheckboxesComponent from '../../../../../docs/data/material/components/checkboxes/Checkboxes.tsx';
import CheckboxesGroup from '../../../../../docs/data/material/components/checkboxes/CheckboxesGroup.tsx';
import ColorCheckboxes from '../../../../../docs/data/material/components/checkboxes/ColorCheckboxes.tsx';
import ControlledCheckbox from '../../../../../docs/data/material/components/checkboxes/ControlledCheckbox.tsx';
import CustomizedCheckbox from '../../../../../docs/data/material/components/checkboxes/CustomizedCheckbox.tsx';
import FormControlLabelPosition from '../../../../../docs/data/material/components/checkboxes/FormControlLabelPosition.tsx';
import IconCheckboxes from '../../../../../docs/data/material/components/checkboxes/IconCheckboxes.tsx';
import IndeterminateCheckbox from '../../../../../docs/data/material/components/checkboxes/IndeterminateCheckbox.tsx';
import SizeCheckboxes from '../../../../../docs/data/material/components/checkboxes/SizeCheckboxes.tsx';

export default function Checkboxes() {
  return (
    <MaterialUILayout>
      <h1>Checkboxes</h1>
      <section>
        <h2> Checkbox Labels</h2>
        <div className="demo-container">
          <CheckboxLabels />
        </div>
      </section>
      <section>
        <h2> Checkboxes</h2>
        <div className="demo-container">
          <CheckboxesComponent />
        </div>
      </section>
      <section>
        <h2> Checkboxes Group</h2>
        <div className="demo-container">
          <CheckboxesGroup />
        </div>
      </section>
      <section>
        <h2> Color Checkboxes</h2>
        <div className="demo-container">
          <ColorCheckboxes />
        </div>
      </section>
      <section>
        <h2> Controlled Checkbox</h2>
        <div className="demo-container">
          <ControlledCheckbox />
        </div>
      </section>
      <section>
        <h2> Customized Checkbox</h2>
        <div className="demo-container">
          <CustomizedCheckbox />
        </div>
      </section>
      <section>
        <h2> Form Control Label Position</h2>
        <div className="demo-container">
          <FormControlLabelPosition />
        </div>
      </section>
      <section>
        <h2> Icon Checkboxes</h2>
        <div className="demo-container">
          <IconCheckboxes />
        </div>
      </section>
      <section>
        <h2> Indeterminate Checkbox</h2>
        <div className="demo-container">
          <IndeterminateCheckbox />
        </div>
      </section>
      <section>
        <h2> Size Checkboxes</h2>
        <div className="demo-container">
          <SizeCheckboxes />
        </div>
      </section>
    </MaterialUILayout>
  );
}
