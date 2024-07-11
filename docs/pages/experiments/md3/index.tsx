import { CssVarsProvider } from '@mui/material/styles';
import { extendTheme as extendThemeMD2 } from '@mui/material/themes/md2';
import { extendTheme as extendThemeMD3 } from '@mui/material/themes/md3';
import Button from '@mui/material/Button';

const md2 = extendThemeMD2();
const md3 = extendThemeMD3();

export default function MD3Example() {
  return (
    <>
      <CssVarsProvider theme={md3}>
        <Button>Button</Button>
        <Button variant="elevated">Button</Button>
        <Button variant="filled">Button</Button>
        <Button variant="outlined">Button</Button>
      </CssVarsProvider>
      <CssVarsProvider theme={md2}>
        <Button>Button</Button>
        <Button variant="contained">Button</Button>
        <Button variant="filled">Button</Button>
        <Button variant="outlined">Button</Button>
      </CssVarsProvider>
    </>
  );
}
