---
productId: material-ui
title: React Stepper component
components: MobileStepper, Step, StepButton, StepConnector, StepContent, StepIcon, StepLabel, Stepper
githubLabel: 'scope: stepper'
materialDesign: https://m1.material.io/components/steppers.html
githubSource: packages/mui-material/src/Stepper
---

# Stepper

Steppers convey progress through numbered steps. It provides a wizard-like workflow.

Steppers display progress through a sequence of logical and numbered steps. They may also be used for navigation.
Steppers may display a transient feedback message after a step is saved.

- **Types of Steps**: Editable, Non-editable, Mobile, Optional
- **Types of Steppers**: Horizontal, Vertical, Linear, Non-linear

:::info
This component is no longer documented in the [Material Design guidelines](https://m2.material.io/), but Material UI will continue to support it.
:::

## Introduction

The Stepper component displays progress through a sequence of logical and numbered steps.
It supports horizontal and vertical orientation for desktop and mobile viewports.

Steppers are implemented using a collection of related components:

- Stepper: the container for the steps.
- Step: an individual step in the sequence.
- Step Label: a label for a Step.
- Step Content: optional content for a Step.
- Step Button: optional button for a Step.
- Step Icon: optional icon for a Step.
- Step Connector: optional customized connector between Steps.

## Basics

```jsx
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
```

## Horizontal stepper

Horizontal steppers are ideal when the contents of one step depend on an earlier step.

Avoid using long step names in horizontal steppers.

### Linear

A linear stepper allows the user to complete the steps in sequence.

The `Stepper` can be controlled by passing the current step index (zero-based) as the `activeStep` prop. `Stepper` orientation is set using the `orientation` prop.

This example also shows the use of an optional step by placing the `optional` prop on the second `Step` component. Note that it's up to you to manage when an optional step is skipped. Once you've determined this for a particular step you must set `completed={false}` to signify that even though the active step index has gone beyond the optional step, it's not actually complete.

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
```

### Non-linear

Non-linear steppers allow the user to enter a multi-step flow at any point.

This example is similar to the regular horizontal stepper, except steps are no longer automatically set to `disabled={true}` based on the `activeStep` prop.

The use of the `StepButton` here demonstrates clickable step labels, as well as setting the `completed`
flag. However because steps can be accessed in a non-linear fashion, it's up to your own implementation to
determine when all steps are completed (or even if they need to be completed).

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

export default function HorizontalNonLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    setCompleted({
      ...completed,
      [activeStep]: true,
    });
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
              Step {activeStep + 1}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" sx={{ display: 'inline-block' }}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? 'Finish'
                      : 'Complete Step'}
                  </Button>
                ))}
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}
```

### Alternative label

Labels can be placed below the step icon by setting the `alternativeLabel` prop on the `Stepper` component.

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [
  'Select master blaster campaign settings',
  'Create an ad group',
  'Create an ad',
];

export default function HorizontalLinearAlternativeLabelStepper() {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={1} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
```

### Error step

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

export default function HorizontalStepperWithError() {
  const isStepFailed = (step: number) => {
    return step === 1;
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={1}>
        {steps.map((label, index) => {
          const labelProps: {
            optional?: React.ReactNode;
            error?: boolean;
          } = {};
          if (isStepFailed(index)) {
            labelProps.optional = (
              <Typography variant="caption" color="error">
                Alert message
              </Typography>
            );
            labelProps.error = true;
          }

          return (
            <Step key={label}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}
```

### Customized horizontal stepper

Here is an example of customizing the component.
You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

```tsx
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
    ...theme.applyStyles('dark', {
      borderColor: theme.palette.grey[800],
    }),
  },
}));

const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
  ({ theme }) => ({
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    '& .QontoStepIcon-completedIcon': {
      color: '#784af4',
      zIndex: 1,
      fontSize: 18,
    },
    '& .QontoStepIcon-circle': {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
    ...theme.applyStyles('dark', {
      color: theme.palette.grey[700],
    }),
    variants: [
      {
        props: ({ ownerState }) => ownerState.active,
        style: {
          color: '#784af4',
        },
      },
    ],
  }),
);

function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  },
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme }) => ({
  backgroundColor: '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...theme.applyStyles('dark', {
    backgroundColor: theme.palette.grey[700],
  }),
  variants: [
    {
      props: ({ ownerState }) => ownerState.active,
      style: {
        backgroundImage:
          'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
      },
    },
    {
      props: ({ ownerState }) => ownerState.completed,
      style: {
        backgroundImage:
          'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
      },
    },
  ],
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement<unknown> } = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

export default function CustomizedSteppers() {
  return (
    <Stack sx={{ width: '100%' }} spacing={4}>
      <Stepper alternativeLabel activeStep={1} connector={<QontoConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Stepper alternativeLabel activeStep={1} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}
```

## Vertical stepper

Vertical steppers are designed for narrow screen sizes. They are ideal for mobile. All the features of the horizontal stepper can be implemented.

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const steps = [
  {
    label: 'Select campaign settings',
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
  },
  {
    label: 'Create an ad group',
    description:
      'An ad group contains one or more ads which target a shared set of keywords.',
  },
  {
    label: 'Create an ad',
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
];

export default function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === steps.length - 1 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 1, mr: 1 }}
                >
                  {index === steps.length - 1 ? 'Finish' : 'Continue'}
                </Button>
                <Button
                  disabled={index === 0}
                  onClick={handleBack}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Back
                </Button>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}
```

### Performance

The content of a step is unmounted when closed.
If you need to make the content available to search engines or render expensive component trees inside your modal while optimizing for interaction responsiveness it might be a good idea to keep the step mounted with:

```jsx
<StepContent slotProps={{ transition: { unmountOnExit: false } }} />
```

## Mobile stepper

This component implements a compact stepper suitable for a mobile device. It has more limited functionality than the vertical stepper. See [mobile steps](https://m1.material.io/components/steppers.html#steppers-types-of-steps) for its inspiration.

The mobile stepper supports three variants to display progress through the available steps: text, dots, and progress.

### Text

The current step and total number of steps are displayed as text.

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const steps = [
  {
    label: 'Select campaign settings',
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
  },
  {
    label: 'Create an ad group',
    description:
      'An ad group contains one or more ads which target a shared set of keywords.',
  },
  {
    label: 'Create an ad',
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
];

export default function TextMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
        <Typography>{steps[activeStep].label}</Typography>
      </Paper>
      <Box sx={{ height: 255, maxWidth: 400, width: '100%', p: 2 }}>
        {steps[activeStep].description}
      </Box>
      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
}
```

### Dots

Use dots when the number of steps is small.

```tsx
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

export default function DotsMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <MobileStepper
      variant="dots"
      steps={6}
      position="static"
      activeStep={activeStep}
      sx={{ maxWidth: 400, flexGrow: 1 }}
      nextButton={
        <Button size="small" onClick={handleNext} disabled={activeStep === 5}>
          Next
          {theme.direction === 'rtl' ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </Button>
      }
      backButton={
        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
          {theme.direction === 'rtl' ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
          Back
        </Button>
      }
    />
  );
}
```

### Progress

Use a progress bar when there are many steps, or if there are steps that need to be inserted during the process (based on responses to earlier steps).

```tsx
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

export default function ProgressMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <MobileStepper
      variant="progress"
      steps={6}
      position="static"
      activeStep={activeStep}
      sx={{ maxWidth: 400, flexGrow: 1 }}
      nextButton={
        <Button size="small" onClick={handleNext} disabled={activeStep === 5}>
          Next
          {theme.direction === 'rtl' ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </Button>
      }
      backButton={
        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
          {theme.direction === 'rtl' ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
          Back
        </Button>
      }
    />
  );
}
```

# MobileStepper API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Stepper](https://mui.com/material-ui/react-stepper/)

## Import

```jsx
import MobileStepper from '@mui/material/MobileStepper';
// or
import { MobileStepper } from '@mui/material';
```

## Props

| Name                             | Type                                                                                                | Default    | Required | Description                                                                                                                                                                                                             |
| -------------------------------- | --------------------------------------------------------------------------------------------------- | ---------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| steps                            | `integer`                                                                                           | -          | Yes      |                                                                                                                                                                                                                         |
| activeStep                       | `integer`                                                                                           | `0`        | No       |                                                                                                                                                                                                                         |
| backButton                       | `node`                                                                                              | -          | No       |                                                                                                                                                                                                                         |
| classes                          | `object`                                                                                            | -          | No       | Override or extend the styles applied to the component.                                                                                                                                                                 |
| LinearProgressProps (deprecated) | `object`                                                                                            | -          | No       | ⚠️ Use `slotProps.progress` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details. |
| nextButton                       | `node`                                                                                              | -          | No       |                                                                                                                                                                                                                         |
| position                         | `'bottom' \| 'static' \| 'top'`                                                                     | `'bottom'` | No       |                                                                                                                                                                                                                         |
| slotProps                        | `{ dot?: func \| object, dots?: func \| object, progress?: func \| object, root?: func \| object }` | `{}`       | No       |                                                                                                                                                                                                                         |
| slots                            | `{ dot?: elementType, dots?: elementType, progress?: elementType, root?: elementType }`             | `{}`       | No       |                                                                                                                                                                                                                         |
| sx                               | `Array<func \| object \| bool> \| func \| object`                                                   | -          | No       | The system prop that allows defining system overrides as well as additional CSS styles.                                                                                                                                 |
| variant                          | `'dots' \| 'progress' \| 'text'`                                                                    | `'dots'`   | No       |                                                                                                                                                                                                                         |

> **Note**: The `ref` is forwarded to the root element.

> Any other props supplied will be provided to the root element ([Paper](https://mui.com/material-ui/api/paper/)).

## Inheritance

While not explicitly documented above, the props of the [Paper](https://mui.com/material-ui/api/paper/) component are also available on MobileStepper.

## Theme default props

You can use `MuiMobileStepper` to change the default props of this component with the theme.

## Slots

| Name     | Default          | Class                        | Description                                   |
| -------- | ---------------- | ---------------------------- | --------------------------------------------- |
| root     | `Paper`          | `.MuiMobileStepper-root`     | The component that renders the root slot.     |
| progress | `LinearProgress` | `.MuiMobileStepper-progress` | The component that renders the progress slot. |
| dots     | `'div'`          | `.MuiMobileStepper-dots`     | The component that renders the dots slot.     |
| dot      | `'div'`          | `.MuiMobileStepper-dot`      | The component that renders the dot slot.      |

## CSS

### Rule name

| Global class | Rule name      | Description                                                              |
| ------------ | -------------- | ------------------------------------------------------------------------ |
| -            | dotActive      | Styles applied to a dot if `variant="dots"` and this is the active step. |
| -            | positionBottom | Styles applied to the root element if `position="bottom"`.               |
| -            | positionStatic | Styles applied to the root element if `position="static"`.               |
| -            | positionTop    | Styles applied to the root element if `position="top"`.                  |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/MobileStepper/MobileStepper.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/MobileStepper/MobileStepper.js)

# Step API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Stepper](https://mui.com/material-ui/react-stepper/)

## Import

```jsx
import Step from '@mui/material/Step';
// or
import { Step } from '@mui/material';
```

## Props

| Name      | Type                                              | Default | Required | Description                                                                             |
| --------- | ------------------------------------------------- | ------- | -------- | --------------------------------------------------------------------------------------- |
| active    | `bool`                                            | -       | No       |                                                                                         |
| children  | `node`                                            | -       | No       |                                                                                         |
| classes   | `object`                                          | -       | No       | Override or extend the styles applied to the component.                                 |
| completed | `bool`                                            | -       | No       |                                                                                         |
| component | `elementType`                                     | -       | No       |                                                                                         |
| disabled  | `bool`                                            | -       | No       |                                                                                         |
| expanded  | `bool`                                            | `false` | No       |                                                                                         |
| index     | `integer`                                         | -       | No       |                                                                                         |
| last      | `bool`                                            | -       | No       |                                                                                         |
| sx        | `Array<func \| object \| bool> \| func \| object` | -       | No       | The system prop that allows defining system overrides as well as additional CSS styles. |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiStep` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class     | Rule name        | Description                                                       |
| ---------------- | ---------------- | ----------------------------------------------------------------- |
| -                | alternativeLabel | Styles applied to the root element if `alternativeLabel={true}`.  |
| `.Mui-completed` | -                | State class applied to the root element if `completed={true}`.    |
| -                | horizontal       | Styles applied to the root element if `orientation="horizontal"`. |
| -                | root             | Styles applied to the root element.                               |
| -                | vertical         | Styles applied to the root element if `orientation="vertical"`.   |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/Step/Step.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/Step/Step.js)

# StepButton API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Stepper](https://mui.com/material-ui/react-stepper/)

## Import

```jsx
import StepButton from '@mui/material/StepButton';
// or
import { StepButton } from '@mui/material';
```

## Props

| Name     | Type                                              | Default | Required | Description                                                                             |
| -------- | ------------------------------------------------- | ------- | -------- | --------------------------------------------------------------------------------------- |
| children | `node`                                            | -       | No       |                                                                                         |
| classes  | `object`                                          | -       | No       | Override or extend the styles applied to the component.                                 |
| icon     | `node`                                            | -       | No       |                                                                                         |
| optional | `node`                                            | -       | No       |                                                                                         |
| sx       | `Array<func \| object \| bool> \| func \| object` | -       | No       | The system prop that allows defining system overrides as well as additional CSS styles. |

> **Note**: The `ref` is forwarded to the root element (HTMLButtonElement).

> Any other props supplied will be provided to the root element ([ButtonBase](https://mui.com/material-ui/api/button-base/)).

## Inheritance

While not explicitly documented above, the props of the [ButtonBase](https://mui.com/material-ui/api/button-base/) component are also available on StepButton.

## Theme default props

You can use `MuiStepButton` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class | Rule name   | Description                                                       |
| ------------ | ----------- | ----------------------------------------------------------------- |
| -            | horizontal  | Styles applied to the root element if `orientation="horizontal"`. |
| -            | root        | Styles applied to the root element.                               |
| -            | touchRipple | Styles applied to the `ButtonBase` touch-ripple.                  |
| -            | vertical    | Styles applied to the root element if `orientation="vertical"`.   |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/StepButton/StepButton.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/StepButton/StepButton.js)

# StepConnector API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Stepper](https://mui.com/material-ui/react-stepper/)

## Import

```jsx
import StepConnector from '@mui/material/StepConnector';
// or
import { StepConnector } from '@mui/material';
```

## Props

| Name    | Type                                              | Default | Required | Description                                                                             |
| ------- | ------------------------------------------------- | ------- | -------- | --------------------------------------------------------------------------------------- |
| classes | `object`                                          | -       | No       | Override or extend the styles applied to the component.                                 |
| sx      | `Array<func \| object \| bool> \| func \| object` | -       | No       | The system prop that allows defining system overrides as well as additional CSS styles. |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiStepConnector` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class     | Rule name        | Description                                                       |
| ---------------- | ---------------- | ----------------------------------------------------------------- |
| `.Mui-active`    | -                | State class applied to the root element if `active={true}`.       |
| -                | alternativeLabel | Styles applied to the root element if `alternativeLabel={true}`.  |
| `.Mui-completed` | -                | State class applied to the root element if `completed={true}`.    |
| `.Mui-disabled`  | -                | State class applied to the root element if `disabled={true}`.     |
| -                | horizontal       | Styles applied to the root element if `orientation="horizontal"`. |
| -                | line             | Styles applied to the line element.                               |
| -                | lineHorizontal   | Styles applied to the line element if `orientation="horizontal"`. |
| -                | lineVertical     | Styles applied to the line element if `orientation="vertical"`.   |
| -                | root             | Styles applied to the root element.                               |
| -                | vertical         | Styles applied to the root element if `orientation="vertical"`.   |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/StepConnector/StepConnector.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/StepConnector/StepConnector.js)

# StepContent API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Stepper](https://mui.com/material-ui/react-stepper/)

## Import

```jsx
import StepContent from '@mui/material/StepContent';
// or
import { StepContent } from '@mui/material';
```

## Props

| Name                             | Type                                                                     | Default    | Required | Description                                                                                                                                                                                                               |
| -------------------------------- | ------------------------------------------------------------------------ | ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| children                         | `node`                                                                   | -          | No       |                                                                                                                                                                                                                           |
| classes                          | `object`                                                                 | -          | No       | Override or extend the styles applied to the component.                                                                                                                                                                   |
| slotProps                        | `{ transition?: func \| object }`                                        | `{}`       | No       |                                                                                                                                                                                                                           |
| slots                            | `{ transition?: elementType }`                                           | `{}`       | No       |                                                                                                                                                                                                                           |
| sx                               | `Array<func \| object \| bool> \| func \| object`                        | -          | No       | The system prop that allows defining system overrides as well as additional CSS styles.                                                                                                                                   |
| TransitionComponent (deprecated) | `elementType`                                                            | `Collapse` | No       | ⚠️ Use `slots.transition` instead. This prop will be removed in a future major release. [How to migrate](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/).                                          |
| transitionDuration               | `'auto' \| number \| { appear?: number, enter?: number, exit?: number }` | `'auto'`   | No       |                                                                                                                                                                                                                           |
| TransitionProps (deprecated)     | `object`                                                                 | -          | No       | ⚠️ Use `slotProps.transition` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details. |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiStepContent` to change the default props of this component with the theme.

## Slots

| Name                                                                                                                                            | Default    | Class                        | Description                                     |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ---------------------------- | ----------------------------------------------- |
| transition                                                                                                                                      | `Collapse` | `.MuiStepContent-transition` | The component that renders the transition slot. |
| [Follow this guide](https://mui.com/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component. |

## CSS

### Rule name

| Global class | Rule name | Description                                                                 |
| ------------ | --------- | --------------------------------------------------------------------------- |
| -            | last      | Styles applied to the root element if `last={true}` (controlled by `Step`). |
| -            | root      | Styles applied to the root element.                                         |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/StepContent/StepContent.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/StepContent/StepContent.js)

# StepIcon API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Stepper](https://mui.com/material-ui/react-stepper/)

## Import

```jsx
import StepIcon from '@mui/material/StepIcon';
// or
import { StepIcon } from '@mui/material';
```

## Props

| Name      | Type                                              | Default | Required | Description                                                                             |
| --------- | ------------------------------------------------- | ------- | -------- | --------------------------------------------------------------------------------------- |
| active    | `bool`                                            | `false` | No       |                                                                                         |
| classes   | `object`                                          | -       | No       | Override or extend the styles applied to the component.                                 |
| completed | `bool`                                            | `false` | No       |                                                                                         |
| error     | `bool`                                            | `false` | No       |                                                                                         |
| icon      | `node`                                            | -       | No       |                                                                                         |
| sx        | `Array<func \| object \| bool> \| func \| object` | -       | No       | The system prop that allows defining system overrides as well as additional CSS styles. |

> **Note**: The `ref` is forwarded to the root element (SVGSVGElement).

> Any other props supplied will be provided to the root element ([SvgIcon](https://mui.com/material-ui/api/svg-icon/)).

## Inheritance

While not explicitly documented above, the props of the [SvgIcon](https://mui.com/material-ui/api/svg-icon/) component are also available on StepIcon.

## Theme default props

You can use `MuiStepIcon` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class     | Rule name | Description                                                    |
| ---------------- | --------- | -------------------------------------------------------------- |
| `.Mui-active`    | -         | State class applied to the root element if `active={true}`.    |
| `.Mui-completed` | -         | State class applied to the root element if `completed={true}`. |
| `.Mui-error`     | -         | State class applied to the root element if `error={true}`.     |
| -                | root      | Styles applied to the root element.                            |
| -                | text      | Styles applied to the SVG text element.                        |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/StepIcon/StepIcon.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/StepIcon/StepIcon.js)

# StepLabel API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Stepper](https://mui.com/material-ui/react-stepper/)

## Import

```jsx
import StepLabel from '@mui/material/StepLabel';
// or
import { StepLabel } from '@mui/material';
```

## Props

| Name                           | Type                                                                           | Default | Required | Description                                                                                                                                                                                                             |
| ------------------------------ | ------------------------------------------------------------------------------ | ------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| children                       | `node`                                                                         | -       | No       |                                                                                                                                                                                                                         |
| classes                        | `object`                                                                       | -       | No       | Override or extend the styles applied to the component.                                                                                                                                                                 |
| componentsProps (deprecated)   | `{ label?: object }`                                                           | `{}`    | No       | ⚠️ use the `slotProps` prop instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details. |
| error                          | `bool`                                                                         | `false` | No       |                                                                                                                                                                                                                         |
| icon                           | `node`                                                                         | -       | No       |                                                                                                                                                                                                                         |
| optional                       | `node`                                                                         | -       | No       |                                                                                                                                                                                                                         |
| slotProps                      | `{ label?: func \| object, root?: func \| object, stepIcon?: func \| object }` | `{}`    | No       |                                                                                                                                                                                                                         |
| slots                          | `{ label?: elementType, root?: elementType, stepIcon?: elementType }`          | `{}`    | No       |                                                                                                                                                                                                                         |
| StepIconComponent (deprecated) | `elementType`                                                                  | -       | No       | ⚠️ Use `slots.stepIcon` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.     |
| StepIconProps (deprecated)     | `object`                                                                       | -       | No       | ⚠️ Use `slotProps.stepIcon` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details. |
| sx                             | `Array<func \| object \| bool> \| func \| object`                              | -       | No       | The system prop that allows defining system overrides as well as additional CSS styles.                                                                                                                                 |

> **Note**: The `ref` is forwarded to the root element (HTMLSpanElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiStepLabel` to change the default props of this component with the theme.

## Slots

| Name     | Default     | Class                 | Description                                                                                       |
| -------- | ----------- | --------------------- | ------------------------------------------------------------------------------------------------- |
| root     | `span`      | `.MuiStepLabel-root`  | The component that renders the root.                                                              |
| label    | `span`      | `.MuiStepLabel-label` | The component that renders the label.                                                             |
| stepIcon | `undefined` | -                     | The component to render in place of the [`StepIcon`](https://mui.com/material-ui/api/step-icon/). |

## CSS

### Rule name

| Global class     | Rule name        | Description                                                                                |
| ---------------- | ---------------- | ------------------------------------------------------------------------------------------ |
| `.Mui-active`    | -                | State class applied to the label element if `active={true}`.                               |
| -                | alternativeLabel | State class applied to the root and icon container and label if `alternativeLabel={true}`. |
| `.Mui-completed` | -                | State class applied to the label element if `completed={true}`.                            |
| `.Mui-disabled`  | -                | State class applied to the root and label elements if `disabled={true}`.                   |
| `.Mui-error`     | -                | State class applied to the root and label elements if `error={true}`.                      |
| -                | horizontal       | Styles applied to the root element if `orientation="horizontal"`.                          |
| -                | iconContainer    | Styles applied to the `icon` container element.                                            |
| -                | labelContainer   | Styles applied to the container element which wraps label and `optional`.                  |
| -                | vertical         | Styles applied to the root element if `orientation="vertical"`.                            |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/StepLabel/StepLabel.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/StepLabel/StepLabel.js)

# Stepper API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Stepper](https://mui.com/material-ui/react-stepper/)

## Import

```jsx
import Stepper from '@mui/material/Stepper';
// or
import { Stepper } from '@mui/material';
```

## Props

| Name             | Type                                              | Default             | Required | Description                                                                             |
| ---------------- | ------------------------------------------------- | ------------------- | -------- | --------------------------------------------------------------------------------------- |
| activeStep       | `integer`                                         | `0`                 | No       |                                                                                         |
| alternativeLabel | `bool`                                            | `false`             | No       |                                                                                         |
| children         | `node`                                            | -                   | No       |                                                                                         |
| classes          | `object`                                          | -                   | No       | Override or extend the styles applied to the component.                                 |
| component        | `elementType`                                     | -                   | No       |                                                                                         |
| connector        | `element`                                         | `<StepConnector />` | No       |                                                                                         |
| nonLinear        | `bool`                                            | `false`             | No       |                                                                                         |
| orientation      | `'horizontal' \| 'vertical'`                      | `'horizontal'`      | No       |                                                                                         |
| sx               | `Array<func \| object \| bool> \| func \| object` | -                   | No       | The system prop that allows defining system overrides as well as additional CSS styles. |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiStepper` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class | Rule name        | Description                                                       |
| ------------ | ---------------- | ----------------------------------------------------------------- |
| -            | alternativeLabel | Styles applied to the root element if `alternativeLabel={true}`.  |
| -            | horizontal       | Styles applied to the root element if `orientation="horizontal"`. |
| -            | nonLinear        | Styles applied to the root element if `nonLinear={true}`.         |
| -            | root             | Styles applied to the root element.                               |
| -            | vertical         | Styles applied to the root element if `orientation="vertical"`.   |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/Stepper/Stepper.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/Stepper/Stepper.js)
