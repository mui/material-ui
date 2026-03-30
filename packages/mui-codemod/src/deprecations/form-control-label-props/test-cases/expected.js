import FormControlLabel from '@mui/material-v7/FormControlLabel';

<FormControlLabel slotProps={{ typography: componentsTypographyProps }} />;
<FormControlLabel
  slots={{ typography: SlotsTypography }}
  slotProps={{ typography: {
    ...componentsTypographyProps,
    ...slotsTypographyProps
  } }} />;
