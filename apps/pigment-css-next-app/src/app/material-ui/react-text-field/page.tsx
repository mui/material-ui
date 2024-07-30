'use client';
import * as React from 'react';
import BasicTextFields from '../../../../../../docs/data/material/components/text-fields/BasicTextFields';
import ColorTextFields from '../../../../../../docs/data/material/components/text-fields/ColorTextFields';
import ComposedTextField from '../../../../../../docs/data/material/components/text-fields/ComposedTextField';
import CustomizedInputBase from '../../../../../../docs/data/material/components/text-fields/CustomizedInputBase';
import CustomizedInputsStyleOverrides from '../../../../../../docs/data/material/components/text-fields/CustomizedInputsStyleOverrides';
import CustomizedInputsStyled from '../../../../../../docs/data/material/components/text-fields/CustomizedInputsStyled';
import FormPropsTextFields from '../../../../../../docs/data/material/components/text-fields/FormPropsTextFields';
import FormattedInputs from '../../../../../../docs/data/material/components/text-fields/FormattedInputs';
import FullWidthTextField from '../../../../../../docs/data/material/components/text-fields/FullWidthTextField';
import HelperTextAligned from '../../../../../../docs/data/material/components/text-fields/HelperTextAligned';
import HelperTextMisaligned from '../../../../../../docs/data/material/components/text-fields/HelperTextMisaligned';
import InputAdornments from '../../../../../../docs/data/material/components/text-fields/InputAdornments';
import InputWithIcon from '../../../../../../docs/data/material/components/text-fields/InputWithIcon';
import Inputs from '../../../../../../docs/data/material/components/text-fields/Inputs';
import LayoutTextFields from '../../../../../../docs/data/material/components/text-fields/LayoutTextFields';
import MultilineTextFields from '../../../../../../docs/data/material/components/text-fields/MultilineTextFields';
import SelectTextFields from '../../../../../../docs/data/material/components/text-fields/SelectTextFields';
import StateTextFields from '../../../../../../docs/data/material/components/text-fields/StateTextFields';
import TextFieldHiddenLabel from '../../../../../../docs/data/material/components/text-fields/TextFieldHiddenLabel';
import TextFieldSizes from '../../../../../../docs/data/material/components/text-fields/TextFieldSizes';
import UseFormControl from '../../../../../../docs/data/material/components/text-fields/UseFormControl';
import ValidationTextFields from '../../../../../../docs/data/material/components/text-fields/ValidationTextFields';

export default function TextFields() {
  return (
    <React.Fragment>
      <section>
        <h2> Basic Text Fields</h2>
        <div className="demo-container">
          <BasicTextFields />
        </div>
      </section>
      <section>
        <h2> Color Text Fields</h2>
        <div className="demo-container">
          <ColorTextFields />
        </div>
      </section>
      <section>
        <h2> Composed Text Field</h2>
        <div className="demo-container">
          <ComposedTextField />
        </div>
      </section>
      <section>
        <h2> Customized Input Base</h2>
        <div className="demo-container">
          <CustomizedInputBase />
        </div>
      </section>
      <section>
        <h2> Customized Inputs Style Overrides</h2>
        <div className="demo-container">
          <CustomizedInputsStyleOverrides />
        </div>
      </section>
      <section>
        <h2> Customized Inputs Styled</h2>
        <div className="demo-container">
          <CustomizedInputsStyled />
        </div>
      </section>
      <section>
        <h2> Form Props Text Fields</h2>
        <div className="demo-container">
          <FormPropsTextFields />
        </div>
      </section>
      <section>
        <h2> Formatted Inputs</h2>
        <div className="demo-container">
          <FormattedInputs />
        </div>
      </section>
      <section>
        <h2> Full Width Text Field</h2>
        <div className="demo-container">
          <FullWidthTextField />
        </div>
      </section>
      <section>
        <h2> Helper Text Aligned</h2>
        <div className="demo-container">
          <HelperTextAligned />
        </div>
      </section>
      <section>
        <h2> Helper Text Misaligned</h2>
        <div className="demo-container">
          <HelperTextMisaligned />
        </div>
      </section>
      <section>
        <h2> Input Adornments</h2>
        <div className="demo-container">
          <InputAdornments />
        </div>
      </section>
      <section>
        <h2> Input With Icon</h2>
        <div className="demo-container">
          <InputWithIcon />
        </div>
      </section>
      <section>
        <h2> Inputs</h2>
        <div className="demo-container">
          <Inputs />
        </div>
      </section>
      <section>
        <h2> Layout Text Fields</h2>
        <div className="demo-container">
          <LayoutTextFields />
        </div>
      </section>
      <section>
        <h2> Multiline Text Fields</h2>
        <div className="demo-container">
          <MultilineTextFields />
        </div>
      </section>
      <section>
        <h2> Select Text Fields</h2>
        <div className="demo-container">
          <SelectTextFields />
        </div>
      </section>
      <section>
        <h2> State Text Fields</h2>
        <div className="demo-container">
          <StateTextFields />
        </div>
      </section>
      <section>
        <h2> Text Field Hidden Label</h2>
        <div className="demo-container">
          <TextFieldHiddenLabel />
        </div>
      </section>
      <section>
        <h2> Text Field Sizes</h2>
        <div className="demo-container">
          <TextFieldSizes />
        </div>
      </section>
      <section>
        <h2> Use Form Control</h2>
        <div className="demo-container">
          <UseFormControl />
        </div>
      </section>
      <section>
        <h2> Validation Text Fields</h2>
        <div className="demo-container">
          <ValidationTextFields />
        </div>
      </section>
    </React.Fragment>
  );
}
