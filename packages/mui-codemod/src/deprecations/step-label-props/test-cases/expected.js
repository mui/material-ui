import StepLabel from '@mui/material/StepLabel';

<StepLabel slotProps={{ label: componentsLabelProps }} />;
<StepLabel
  slots={{ label: SlotsLabel }}
  slotProps={{ label: {
    ...componentsLabelProps,
    ...slotLabelProps
  } }} />;
