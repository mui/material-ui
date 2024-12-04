import * as React from 'react';
import MaterialUILayout from '../../Layout';
import ColorRadioButtons from '../../../../../docs/data/material/components/radio-buttons/ColorRadioButtons.tsx';
import ControlledRadioButtonsGroup from '../../../../../docs/data/material/components/radio-buttons/ControlledRadioButtonsGroup.tsx';
import CustomizedRadios from '../../../../../docs/data/material/components/radio-buttons/CustomizedRadios.tsx';
import ErrorRadios from '../../../../../docs/data/material/components/radio-buttons/ErrorRadios.tsx';
import FormControlLabelPlacement from '../../../../../docs/data/material/components/radio-buttons/FormControlLabelPlacement.tsx';
import RadioButtonsComponent from '../../../../../docs/data/material/components/radio-buttons/RadioButtons.tsx';
import RadioButtonsGroup from '../../../../../docs/data/material/components/radio-buttons/RadioButtonsGroup.tsx';
import RowRadioButtonsGroup from '../../../../../docs/data/material/components/radio-buttons/RowRadioButtonsGroup.tsx';
import SizeRadioButtons from '../../../../../docs/data/material/components/radio-buttons/SizeRadioButtons.tsx';
import UseRadioGroup from '../../../../../docs/data/material/components/radio-buttons/UseRadioGroup.tsx';

export default function RadioButtons() {
  return (
    <MaterialUILayout>
      <h1>RadioButtons</h1>
      <section>
        <h2> Color Radio Buttons</h2>
        <div className="demo-container">
          <ColorRadioButtons />
        </div>
      </section>
      <section>
        <h2> Controlled Radio Buttons Group</h2>
        <div className="demo-container">
          <ControlledRadioButtonsGroup />
        </div>
      </section>
      <section>
        <h2> Customized Radios</h2>
        <div className="demo-container">
          <CustomizedRadios />
        </div>
      </section>
      <section>
        <h2> Error Radios</h2>
        <div className="demo-container">
          <ErrorRadios />
        </div>
      </section>
      <section>
        <h2> Form Control Label Placement</h2>
        <div className="demo-container">
          <FormControlLabelPlacement />
        </div>
      </section>
      <section>
        <h2> Radio Buttons</h2>
        <div className="demo-container">
          <RadioButtonsComponent />
        </div>
      </section>
      <section>
        <h2> Radio Buttons Group</h2>
        <div className="demo-container">
          <RadioButtonsGroup />
        </div>
      </section>
      <section>
        <h2> Row Radio Buttons Group</h2>
        <div className="demo-container">
          <RowRadioButtonsGroup />
        </div>
      </section>
      <section>
        <h2> Size Radio Buttons</h2>
        <div className="demo-container">
          <SizeRadioButtons />
        </div>
      </section>
      <section>
        <h2> Use Radio Group</h2>
        <div className="demo-container">
          <UseRadioGroup />
        </div>
      </section>
    </MaterialUILayout>
  );
}
