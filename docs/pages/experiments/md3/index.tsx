import { CssVarsProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { extendTheme as extendThemeMD2 } from '@mui/material/themes/md2';
import { extendTheme as extendThemeMD3 } from '@mui/material/themes/md3';
import Button from '@mui/material/Button';

const md2 = extendThemeMD2();
const md3 = extendThemeMD3();

export default function MD3Example() {
  return (
    <Stack direction={'column'} gap={2}>
      <CssVarsProvider>
        <Stack direction="column">
          <h1>Default</h1>
          <Stack direction={'row'}>
            <Button>Button</Button>
            <Button variant="contained">Button</Button>
            <Button variant="filled">Button</Button>
            <Button variant="outlined">Button</Button>
          </Stack>
        </Stack>
      </CssVarsProvider>
      <CssVarsProvider theme={md2}>
        <Stack direction="column">
          <h1>Material Design 2</h1>
          <Stack direction={'row'}>
            <Button>Button</Button>
            <Button variant="contained">Button</Button>
            <Button variant="filled">Button</Button>
            <Button variant="outlined">Button</Button>
          </Stack>
        </Stack>
      </CssVarsProvider>
      <CssVarsProvider theme={md3}>
        <Stack direction="column">
          <h1>Material You</h1>
          <Stack direction={'row'}>
            <Button>Button</Button>
            <Button variant="elevated">Button</Button>
            <Button variant="filled">Button</Button>
            <Button variant="outlined">Button</Button>
          </Stack>
        </Stack>
      </CssVarsProvider>
    </Stack>
  );
}
