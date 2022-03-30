import * as React from 'react';
import Button from '@mui/material/Button';
import { colorChannel } from '@mui/system';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  styled,
} from '@mui/material/styles';

// Custom button using custom styles with CSS variables
const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.vars.palette.success.dark,
  color: theme.vars.palette.common.white,
  '&:hover': {
    backgroundColor: `rgba(${theme.vars.palette.success.mainChannel} / 0.95)`,
  },
}));

// Custom button using CSS variables
const CssVarsCustomButton = styled(Button)({
  '--md-palette-primary-main': '#FF0000',
  '--md-palette-primary-dark': '#8B0000',
  '--md-palette-primary-mainChannel': colorChannel('#FF0000'), // necessary for calculating the alpha values
});

export default function App() {
  return (
    <CssVarsProvider>
      <CustomButton sx={{ mr: 1 }}>Custom styles</CustomButton>
      <CssVarsCustomButton variant="contained">CSS variables</CssVarsCustomButton>
    </CssVarsProvider>
  );
}
