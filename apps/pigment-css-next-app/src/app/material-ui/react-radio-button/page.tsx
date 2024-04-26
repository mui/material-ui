'use client';
import * as React from 'react';
import ColorRadioButtons from '../../../../../../docs/data/material/components/radio-buttons/ColorRadioButtons';
import ControlledRadioButtonsGroup from '../../../../../../docs/data/material/components/radio-buttons/ControlledRadioButtonsGroup';
import CustomizedRadios from '../../../../../../docs/data/material/components/radio-buttons/CustomizedRadios';
import ErrorRadios from '../../../../../../docs/data/material/components/radio-buttons/ErrorRadios';
import FormControlLabelPlacement from '../../../../../../docs/data/material/components/radio-buttons/FormControlLabelPlacement';
import RadioButtonsComponent from '../../../../../../docs/data/material/components/radio-buttons/RadioButtons';
import RadioButtonsGroup from '../../../../../../docs/data/material/components/radio-buttons/RadioButtonsGroup';
import RowRadioButtonsGroup from '../../../../../../docs/data/material/components/radio-buttons/RowRadioButtonsGroup';
import SizeRadioButtons from '../../../../../../docs/data/material/components/radio-buttons/SizeRadioButtons';
import UseRadioGroup from '../../../../../../docs/data/material/components/radio-buttons/UseRadioGroup';

export default function RadioButtons() {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}
