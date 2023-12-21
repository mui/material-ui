import * as React from 'react';
import { Button as BaseButton, buttonClasses } from '@mui/base/Button';
import { prepareForSlot } from '@mui/base/utils';
import { styled } from '@mui/system';
import { Stack, Button as Md2Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssVarsProvider, extendTheme } from '@mui/material-next/styles';
import { Button as Md3Button } from '@mui/material-next';
import Link from 'next/link';

const md2Theme = createTheme();
const md3Theme = extendTheme();

const LinkSlot = prepareForSlot(Link);
const StyledSpan = styled('span')`
  border: 2px solid black !important;
`;
const StyledButton = styled('button')`
  border: 2px dotted black !important;
`;
const blue = {
  200: '#99CCFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0066CC',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const InputButton = styled('input')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  text-decoration: none;
  background-color: ${blue[500]};
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: 1px solid ${blue[500]};
  box-shadow: 0 2px 1px ${
    theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(45, 45, 60, 0.2)'
  }, inset 0 1.5px 1px ${blue[400]}, inset 0 -2px 1px ${blue[600]};

  &:hover {
    background-color: ${blue[600]};
  }

  &.${buttonClasses.active} {
    background-color: ${blue[700]};
    box-shadow: none;
    transform: scale(0.99);
  }

  &.${buttonClasses.focusVisible} {
    box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
    outline: none;
  }

  &.${buttonClasses.disabled} {
    background-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[200] : grey[700]};
    border: 0;
    cursor: default;
    box-shadow: none;
    transform: scale(1);
  }
  `,
);

const FancyStyledButton = styled('button')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  text-decoration: none;
  background-color: ${blue[500]};
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: 1px solid ${blue[500]};
  box-shadow: 0 2px 1px ${
    theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(45, 45, 60, 0.2)'
  }, inset 0 1.5px 1px ${blue[400]}, inset 0 -2px 1px ${blue[600]};

  &:hover {
    background-color: ${blue[600]};
  }

  &.${buttonClasses.active} {
    background-color: ${blue[700]};
    box-shadow: none;
    transform: scale(0.99);
  }

  &.${buttonClasses.focusVisible} {
    box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
    outline: none;
  }

  &.${buttonClasses.disabled} {
    background-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[200] : grey[700]};
    border: 0;
    cursor: default;
    box-shadow: none;
    transform: scale(1);
  }
  `,
);

const FancyButton = styled(BaseButton)(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  text-decoration: none;
  background-color: ${blue[500]};
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: 1px solid ${blue[500]};
  box-shadow: 0 2px 1px ${
    theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(45, 45, 60, 0.2)'
  }, inset 0 1.5px 1px ${blue[400]}, inset 0 -2px 1px ${blue[600]};

  &:hover {
    background-color: ${blue[600]};
  }

  &.${buttonClasses.active} {
    background-color: ${blue[700]};
    box-shadow: none;
    transform: scale(0.99);
  }

  &.${buttonClasses.focusVisible} {
    box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
    outline: none;
  }

  &.${buttonClasses.disabled} {
    background-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[200] : grey[700]};
    border: 0;
    cursor: default;
    box-shadow: none;
    transform: scale(1);
  }
  `,
);

export default function Buttons() {
  return (
    <Stack spacing={8} direction="column">
      <Stack spacing={3} mb={24}>
        {/* normal cases */}
        <Stack spacing={2} direction="row">
          <pre>Normal cases</pre>
          <FancyButton disabled hostElementName="button">
            Button
          </FancyButton>

          <BaseButton disabled hostElementName="button" slots={{ root: FancyStyledButton }}>
            Button with slots.root
          </BaseButton>

          <FancyButton
            disabled
            hostElementName="input"
            slots={{ root: InputButton }}
            value="input button"
            type="button"
          />
        </Stack>

        {/* hostELementName mismatches */}
        <Stack spacing={2} direction="row">
          <pre>hostElementName prop does not match the actual rendered element</pre>
          <FancyButton disabled hostElementName="span">
            Button
          </FancyButton>

          <BaseButton disabled hostElementName="span" slots={{ root: FancyStyledButton }}>
            Button with slots.root
          </BaseButton>

          <FancyButton
            disabled
            hostElementName="span"
            slots={{ root: InputButton }}
            value="input button"
            type="button"
          />
        </Stack>

        {/* links */}
        <Stack spacing={2} direction="row">
          <pre>links</pre>
          <FancyButton disabled href="https://mui.com/">
            Standard link
          </FancyButton>
          <FancyButton disabled href="https://mui.com/" slots={{ root: LinkSlot }}>
            Next.js link
          </FancyButton>
        </Stack>
      </Stack>

      <hr />

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

      <hr />

      <CssVarsProvider theme={md3Theme}>
        <Stack spacing={3}>
          <pre>material-next Buttons</pre>
          <Md3Button disabled hostElementName="button">
            Submit
          </Md3Button>

          {/* @ts-ignore */}
          <Md3Button disabled component="span" hostElementName="span">
            Submit (component=span)
          </Md3Button>

          {/* @ts-ignore */}
          <Md3Button disabled component={StyledSpan} hostElementName="span">
            Submit (component=StyledSpan)
          </Md3Button>

          {/* @ts-ignore */}
          <Md3Button href="https://mui.com/" disabled hostElementName="a">
            Submit (href)
          </Md3Button>
        </Stack>
      </CssVarsProvider>
    </Stack>
  );
}
