import { CssVarsProvider, extendTheme } from '@mui/material/styles';
import ButtonNew from '@mui/material/ButtonNew';

const theme = extendTheme();

export default function MD3Example() {
  return (
    <CssVarsProvider theme={theme}>
      <ButtonNew>Button</ButtonNew>
      <ButtonNew variant="elevated">Button</ButtonNew>
      <ButtonNew variant="filled">Button</ButtonNew>
      <ButtonNew variant='outlined'>Button</ButtonNew>
    </CssVarsProvider>
  )
}