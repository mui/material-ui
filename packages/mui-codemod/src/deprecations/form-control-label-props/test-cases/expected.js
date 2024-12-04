import FormControlLabel from '@mui/material/FormControlLabel';

<FormControlLabel slotProps={{ typography: componentsTypographyProps }} />;
<FormControlLabel
  slots={{ typography: SlotsTypography }}
  slotProps={{ typography: {
    ...componentsTypographyProps,
    ...slotsTypographyProps
  } }} />;
