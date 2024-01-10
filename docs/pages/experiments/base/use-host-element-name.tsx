import * as React from 'react';
import { Button as BaseButton, buttonClasses } from '@mui/base/Button';
import { prepareForSlot } from '@mui/base/utils';
import { styled, Theme } from '@mui/system';
import { Stack } from '@mui/material';
import Link from 'next/link';

const LinkSlot = prepareForSlot(Link);

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

// copy-pasta from base button intro demo
const STYLES = ({ theme }: { theme: Theme }) => `
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
  `;

const StyledHtmlInput = styled('input')(STYLES);

const StyledHtmlButton = styled('button')(STYLES);

const StyledBaseButton = styled(BaseButton)(STYLES);

const StyledHtmlAnchor = styled('a')(STYLES);

export default function ServerRenderedButtons() {
  return (
    <Stack spacing={8} direction="column" style={{ padding: 16 }}>
      <Stack spacing={3} mb={24}>
        <pre style={{ fontSize: 16, fontWeight: 500, marginBottom: -12 }}>Normal cases:</pre>
        <pre style={{ lineHeight: 1.8, marginBottom: 12 }}>
          1A: defaults
          <br />
          1B: `slots.root` is a `span`, hostElementName is inferred
          <br />
          1C & 1D: `slots.root` is a styled component, hostElementName is manually passed
        </pre>
        <Stack spacing={2} direction="row" style={{ marginBottom: 48 }}>
          <StyledBaseButton disabled>Button 1A</StyledBaseButton>

          <StyledBaseButton disabled slots={{ root: 'span' }}>
            Button 1B
          </StyledBaseButton>

          <BaseButton disabled slots={{ root: StyledHtmlButton }} hostElementName="button">
            Button 1C
          </BaseButton>

          <StyledBaseButton
            disabled
            hostElementName="input"
            slots={{ root: StyledHtmlInput }}
            value="Button 1D"
            type="button"
            componentName="Button-1D"
          />
        </Stack>

        <pre style={{ fontSize: 16, fontWeight: 500, marginBottom: -12 }}>
          Cases where the runtime warning is triggered:
        </pre>
        <pre style={{ lineHeight: 1.8, marginBottom: 12 }}>
          2A: rendering default element, hostElementName is given an incorrect value of `span`
          <br />
          2B: rendering a styled component that returns the default `button` element,
          hostElementName is given an incorrect value of `span`
          <br />
          2C: rendering a styled component that returns the non-default `input` element,
          hostElementName is not passed
        </pre>
        <Stack spacing={2} direction="row" style={{ marginBottom: 48 }}>
          <StyledBaseButton disabled hostElementName="span" componentName="Button-2A">
            Button 2A
          </StyledBaseButton>

          <BaseButton
            disabled
            hostElementName="span"
            slots={{ root: StyledHtmlButton }}
            componentName="Button-2B"
          >
            Button 2B
          </BaseButton>

          <StyledBaseButton
            disabled
            slots={{ root: StyledHtmlInput }}
            value="Button 2C"
            type="button"
            componentName="Button-2C"
          />
        </Stack>

        <pre style={{ fontSize: 16, fontWeight: 500, marginBottom: -12 }}>Links:</pre>
        <pre style={{ lineHeight: 1.8, marginBottom: 12 }}>
          3A, 3B, 3C: As long as `href` or `to` are passed, and all involved components only render
          `a` tags, hostElementName will be inferred automatically
          <br />
          3D: `slots.root` is a styled `input`, but an `a` is expected because `href` is passed so
          the warning is triggered
          <br />
          3E: Achieves the same as 3D but circumvents the warning, even though this results in
          invalid HTML
        </pre>
        <Stack spacing={2} direction="row">
          <StyledBaseButton disabled href="https://mui.com/">
            Link-3A
          </StyledBaseButton>
          <StyledBaseButton
            disabled
            href="https://mui.com/"
            slots={{ root: LinkSlot }}
            componentName="Link-3B"
          >
            Link-3B (Next.js Link)
          </StyledBaseButton>
          <StyledBaseButton
            disabled
            href="https://mui.com/"
            slots={{ root: StyledHtmlAnchor }}
            componentName="Link-3C"
          >
            Link-3C
          </StyledBaseButton>
          <BaseButton
            disabled
            href="https://mui.com/"
            slots={{ root: StyledHtmlInput }}
            value="Link 3D"
            componentName="Link-3D"
            type="button"
            hostElementName="input"
          />
          <StyledBaseButton
            disabled
            href="https://mui.com/"
            slots={{ root: 'input' }}
            value="Link 3E"
            componentName="Link-3E"
            type="button"
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
