import StepLabel from '@mui/material-v7/StepLabel';

<StepLabel slotProps={{ label: componentsLabelProps }} />;
<StepLabel
  slots={{ label: SlotsLabel }}
  slotProps={{ label: {
    ...componentsLabelProps,
    ...slotLabelProps
  } }} />;
<StepLabel
  slotProps={{
    label: componentsLabelProps,
    stepIcon: StepIconProps
  }} />;
<StepLabel
  slots={{
    label: SlotsLabel,
    stepIcon: StepIconComponent
  }}
  slotProps={{
    label: {
      ...componentsLabelProps,
      ...slotLabelProps
    },

    stepIcon: StepIconProps
  }} />;
<StepLabel
  slots={{
    stepIcon: StepIconComponent
  }}
  slotProps={{
    stepIcon: StepIconProps
  }}
/>;
