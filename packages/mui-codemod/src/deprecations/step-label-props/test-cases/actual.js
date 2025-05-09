import StepLabel from '@mui/material/StepLabel';

<StepLabel componentsProps={{ label: componentsLabelProps }} />;
<StepLabel
  slots={{ label: SlotsLabel }}
  slotProps={{ label: slotLabelProps }}
  componentsProps={{ label: componentsLabelProps }}
/>;
<StepLabel componentsProps={{ label: componentsLabelProps }} StepIconProps={StepIconProps} />;
<StepLabel
  slots={{ label: SlotsLabel }}
  slotProps={{ label: slotLabelProps }}
  componentsProps={{ label: componentsLabelProps }}
  StepIconComponent={StepIconComponent}
  StepIconProps={StepIconProps}
/>;
<StepLabel
  StepIconComponent={StepIconComponent}
  StepIconProps={StepIconProps}
/>;
