import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssVarsProvider, extendTheme } from '@mui/material-next/styles';
import { Button as Md3Button } from '@mui/material-next';
import { Stack, Button as Md2Button } from '@mui/material';
import { styled } from '@mui/system';

const md2Theme = createTheme();
const md3Theme = extendTheme();

const StyledSpan = styled('span')`
  border: 2px solid black !important;
`;
const StyledButton = styled('button')`
  border: 2px dotted black !important;
`;
export default function App() {
  return (
    <React.Fragment>
      <ThemeProvider theme={md2Theme}>
        <Stack spacing={3} mb={24}>
          <pre>v5 Buttons</pre>
          <Md2Button disabled>Submit</Md2Button>

          <Md2Button disabled component="span">
            Submit (component=span)
          </Md2Button>

          <Md2Button disabled component={StyledSpan}>
            Submit (component=StyledSpan)
          </Md2Button>

          <Md2Button disabled component={StyledButton}>
            Submit (component=StyledButton)
          </Md2Button>

          <Md2Button href="https://mui.com/" disabled>
            Link button
          </Md2Button>
        </Stack>
      </ThemeProvider>

      <CssVarsProvider theme={md3Theme}>
        <Stack spacing={3}>
          <pre>material-next Buttons</pre>
          <Md3Button disabled>Submit</Md3Button>

          {/* @ts-ignore */}
          <Md3Button disabled component="span">
            Submit span
          </Md3Button>

          {/* @ts-ignore */}
          <Md3Button disabled component={StyledSpan}>
            Submit span + StyledSpan
          </Md3Button>

          {/* @ts-ignore */}
          <Md3Button href="https://mui.com/" disabled>
            Link button
          </Md3Button>
        </Stack>
      </CssVarsProvider>
    </React.Fragment>
  );
}
