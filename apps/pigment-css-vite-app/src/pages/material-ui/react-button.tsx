import * as React from 'react';
import MaterialUILayout from '../../Layout';
import BasicButtons from '../../../../../docs/data/material/components/buttons/BasicButtons.tsx';
import ButtonBaseDemo from '../../../../../docs/data/material/components/buttons/ButtonBaseDemo.tsx';
import ButtonSizes from '../../../../../docs/data/material/components/buttons/ButtonSizes.tsx';
import ColorButtons from '../../../../../docs/data/material/components/buttons/ColorButtons.tsx';
import ContainedButtons from '../../../../../docs/data/material/components/buttons/ContainedButtons.tsx';
import CustomizedButtons from '../../../../../docs/data/material/components/buttons/CustomizedButtons.tsx';
import DisableElevation from '../../../../../docs/data/material/components/buttons/DisableElevation.tsx';
import IconButtonColors from '../../../../../docs/data/material/components/buttons/IconButtonColors.tsx';
import IconButtonSizes from '../../../../../docs/data/material/components/buttons/IconButtonSizes.tsx';
import IconButtons from '../../../../../docs/data/material/components/buttons/IconButtons.tsx';
import IconLabelButtons from '../../../../../docs/data/material/components/buttons/IconLabelButtons.tsx';
import InputFileUpload from '../../../../../docs/data/material/components/buttons/InputFileUpload.tsx';
import LoadingButtons from '../../../../../docs/data/material/components/buttons/LoadingButtons.tsx';
import LoadingButtonsTransition from '../../../../../docs/data/material/components/buttons/LoadingButtonsTransition.tsx';
import OutlinedButtons from '../../../../../docs/data/material/components/buttons/OutlinedButtons.tsx';
import TextButtons from '../../../../../docs/data/material/components/buttons/TextButtons.tsx';

export default function Buttons() {
  return (
    <MaterialUILayout>
      <h1>Buttons</h1>
      <section>
        <h2> Basic Buttons</h2>
        <div className="demo-container">
          <BasicButtons />
        </div>
      </section>
      <section>
        <h2> Button Base Demo</h2>
        <div className="demo-container">
          <ButtonBaseDemo />
        </div>
      </section>
      <section>
        <h2> Button Sizes</h2>
        <div className="demo-container">
          <ButtonSizes />
        </div>
      </section>
      <section>
        <h2> Color Buttons</h2>
        <div className="demo-container">
          <ColorButtons />
        </div>
      </section>
      <section>
        <h2> Contained Buttons</h2>
        <div className="demo-container">
          <ContainedButtons />
        </div>
      </section>
      <section>
        <h2> Customized Buttons</h2>
        <div className="demo-container">
          <CustomizedButtons />
        </div>
      </section>
      <section>
        <h2> Disable Elevation</h2>
        <div className="demo-container">
          <DisableElevation />
        </div>
      </section>
      <section>
        <h2> Icon Button Colors</h2>
        <div className="demo-container">
          <IconButtonColors />
        </div>
      </section>
      <section>
        <h2> Icon Button Sizes</h2>
        <div className="demo-container">
          <IconButtonSizes />
        </div>
      </section>
      <section>
        <h2> Icon Buttons</h2>
        <div className="demo-container">
          <IconButtons />
        </div>
      </section>
      <section>
        <h2> Icon Label Buttons</h2>
        <div className="demo-container">
          <IconLabelButtons />
        </div>
      </section>
      <section>
        <h2> Input File Upload</h2>
        <div className="demo-container">
          <InputFileUpload />
        </div>
      </section>
      <section>
        <h2> Loading Buttons</h2>
        <div className="demo-container">
          <LoadingButtons />
        </div>
      </section>
      <section>
        <h2> Loading Buttons Transition</h2>
        <div className="demo-container">
          <LoadingButtonsTransition />
        </div>
      </section>
      <section>
        <h2> Outlined Buttons</h2>
        <div className="demo-container">
          <OutlinedButtons />
        </div>
      </section>
      <section>
        <h2> Text Buttons</h2>
        <div className="demo-container">
          <TextButtons />
        </div>
      </section>
    </MaterialUILayout>
  );
}
