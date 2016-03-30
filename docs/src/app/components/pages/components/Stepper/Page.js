import React from 'react';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import stepperReadmeText from 'material-ui/Stepper/examples/README';
import VerticalLinearStepper from 'material-ui/Stepper/examples/VerticalLinearStepper';
import VerticalNonLinearStepper from 'material-ui/Stepper/examples/VerticalNonLinearStepper';
import VerticalLinearStepperWithOptionalStep from 'material-ui/Stepper/examples/VerticalLinearStepperWithOptionalStep';
import VerticalLinearStepperCode from '!raw!material-ui/Stepper/examples/VerticalLinearStepper';
import VerticalLinearStepperWithOptionalStepCode
  from '!raw!material-ui/Stepper/examples/VerticalLinearStepperWithOptionalStep';
import VerticalNonLinearStepperCode from '!raw!material-ui/Stepper/examples/VerticalNonLinearStepper';
import HorizontalLinearStepper from 'material-ui/Stepper/examples/HorizontalLinearStepper';
import HorizontalLinearStepperCode from '!raw!material-ui/Stepper/examples/HorizontalLinearStepper';

import stepperCode from '!raw!material-ui/lib/Stepper/Stepper';
import verticalStepCode from '!raw!material-ui/lib/Stepper/VerticalStep';
import horizontalStepCode from '!raw!material-ui/lib/Stepper/HorizontalStep';


const descriptions = {
  verticalLinearStepper: 'The vertical linear stepper requires steps be completed in a specific order.',
  verticalLinearStepperWithOptionalStep: 'Set the `optional` property to `true` for optional steps.' +
    'Pass a custom label view through `stepLabel` property to indicate an optional step.',
  verticalNonLinearStepper: 'For the vertical non-linear stepper, steps can be completed in any order.',
  horizontalLinearStepper: 'The horizontal linear stepper acts the same as the vertical linear stepper. ' +
  'The horizontal stepper does not support optional or non-linear steps at this time.',
};


const styles = {
  stepperWrapper: {
    marginBottom: 50,
  },
};

const StepperPage = () => (
  <div>
    <MarkdownElement text={stepperReadmeText} />
    <CodeExample
      title="Vertical linear step example"
      description={descriptions.verticalLinearStepper}
      code={VerticalLinearStepperCode}
    >
      <div style={styles.stepperWrapper}>
        <VerticalLinearStepper />
      </div>
    </CodeExample>

    <CodeExample
      title="Optional step example"
      description={descriptions.verticalLinearStepperWithOptionalStep}
      code={VerticalLinearStepperWithOptionalStepCode}
    >
      <div style={styles.stepperWrapper}>
        <VerticalLinearStepperWithOptionalStep />
      </div>
    </CodeExample>

    <CodeExample
      title="Non linear example"
      description={descriptions.verticalNonLinearStepper}
      code={VerticalNonLinearStepperCode}
    >
      <div style={styles.stepperWrapper}>
        <VerticalNonLinearStepper />
      </div>
    </CodeExample>

    <CodeExample
      title="Horizontal linear step example"
      description={descriptions.horizontalLinearStepper}
      code={HorizontalLinearStepperCode}
    >
      <div style={styles.stepperWrapper}>
        <HorizontalLinearStepper />
      </div>
    </CodeExample>

    <PropTypeDescription code={stepperCode} header="### Stepper properties" />
    <PropTypeDescription code={verticalStepCode} header="### VerticalStep properties" />
    <PropTypeDescription code={horizontalStepCode} header="### HorizontalStep properties" />
  </div>
);

export default StepperPage;
