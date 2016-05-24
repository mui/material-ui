import React from 'react';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import stepperReadmeText from './README.md';
import advancedReadmeText from './Advanced.md';
import HorizontalLinearStepper from './HorizontalLinearStepper';
import HorizontalLinearStepperCode from '!raw!./HorizontalLinearStepper';
import HorizontalNonLinearStepper from './HorizontalNonLinearStepper';
import HorizontalNonLinearStepperCode from '!raw!./HorizontalNonLinearStepper';
import VerticalLinearStepper from './VerticalLinearStepper';
import VerticalLinearStepperCode from '!raw!./VerticalLinearStepper';
import VerticalNonLinearStepper from './VerticalNonLinearStepper';
import VerticalNonLinearStepperCode from '!raw!./VerticalNonLinearStepper';
import GranularControlStepper from './GranularControlStepper';
import GranularControlStepperCode from '!raw!./GranularControlStepper';
import CustomIcon from './CustomIcon';
import CustomIconCode from '!raw!./CustomIcon';
import HorizontalTransition from './HorizontalTransition';
import HorizontalTransitionCode from '!raw!./HorizontalTransition';

import stepCode from '!raw!material-ui/Stepper/Step';
import stepperCode from '!raw!material-ui/Stepper/Stepper';
import stepButtonCode from '!raw!material-ui/Stepper/StepButton';
import stepLabelCode from '!raw!material-ui/Stepper/StepLabel';
import stepContentCode from '!raw!material-ui/Stepper/StepContent';

const styles = {
  stepperWrapper: {
    marginBottom: 50,
  },
};

const StepperPage = () => (
  <div>
    <MarkdownElement text={stepperReadmeText} />

    <CodeExample
      title="Horizontal linear stepper"
      code={HorizontalLinearStepperCode}
    >
      <div style={styles.stepperWrapper}>
        <HorizontalLinearStepper />
      </div>
    </CodeExample>

    <CodeExample
      title="Vertical linear stepper"
      code={VerticalLinearStepperCode}
      exampleBlockStyle={{padding: '14px 10px 24px'}}
    >
      <div style={styles.stepperWrapper}>
        <VerticalLinearStepper />
      </div>
    </CodeExample>

    <CodeExample
      title="Horizontal non-linear stepper"
      code={HorizontalNonLinearStepperCode}
    >
      <div style={styles.stepperWrapper}>
        <HorizontalNonLinearStepper />
      </div>
    </CodeExample>

    <CodeExample
      title="Vertical non-linear stepper"
      code={VerticalNonLinearStepperCode}
      exampleBlockStyle={{padding: '14px 10px 24px'}}
    >
      <div style={styles.stepperWrapper}>
        <VerticalNonLinearStepper />
      </div>
    </CodeExample>

    <MarkdownElement text={advancedReadmeText} />

    <CodeExample
      title="Granular control"
      code={GranularControlStepperCode}
    >
      <div style={styles.stepperWrapper}>
        <GranularControlStepper />
      </div>
    </CodeExample>

    <CodeExample
      title="Custom icon"
      code={CustomIconCode}
    >
      <div style={styles.stepperWrapper}>
        <CustomIcon />
      </div>
    </CodeExample>

    <CodeExample
      title="Horizontal step transition example"
      code={HorizontalTransitionCode}
    >
      <div style={styles.stepperWrapper}>
        <HorizontalTransition />
      </div>
    </CodeExample>

    <PropTypeDescription code={stepperCode} header="### Stepper properties" />
    <PropTypeDescription code={stepCode} header="### Step properties" />
    <PropTypeDescription code={stepLabelCode} header="### StepLabel properties" />
    <PropTypeDescription code={stepButtonCode} header="### StepButton properties" />
    <PropTypeDescription code={stepContentCode} header="### StepContent properties" />
  </div>
);

export default StepperPage;
