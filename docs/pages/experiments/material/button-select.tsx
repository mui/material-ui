import * as React from 'react';
import { Button as BaseUIButton } from '@mui/base';
import {
  Button as JoyUIButton,
  CssVarsProvider as JoyCssVarsProvider,
  extendTheme as joyExtendTheme,
} from '@mui/joy';
import {
  FormControlLabel,
  Button as MaterialUIButton,
  Experimental_CssVarsProvider as MaterialUICssVarsProvider,
  Switch,
  experimental_extendTheme as materialUIExtendTheme,
} from '@mui/material';
import { Stack } from '@mui/system';

function createHandlers(name: string) {
  return {
    onClick: () => console.log(`${name} click`),
    onMouseDown: () => console.log(`${name} mouse down`),
    onMouseUp: () => console.log(`${name} mouse up`),
  };
}

export default function App() {
  const [disabled, setDisabled] = React.useState(false);

  return (
    <MaterialUICssVarsProvider theme={materialUIExtendTheme({})}>
      <Stack gap={12} alignItems="center" sx={{ my: 6 }}>
        <Stack>
          <FormControlLabel
            control={<Switch checked={disabled} onChange={() => setDisabled((prev) => !prev)} />}
            label="Toggle disabled"
          />
        </Stack>
        <Stack direction="row" justifyContent="space-around" sx={{ width: '80vw' }}>
          <Stack gap={3}>
            <Stack alignItems="flex-start">
              <span>Native button</span>
              <button type="button" disabled={disabled} {...createHandlers('Native button')}>
                Button
              </button>
            </Stack>
            <Stack alignItems="flex-start">
              <span>Native anchor</span>
              <a href="#" {...createHandlers('Native anchor')}>
                Anchor
              </a>
            </Stack>
            <Stack alignItems="flex-start">
              <span>Native div</span>
              <div {...createHandlers('Div')}>Button</div>
            </Stack>
          </Stack>

          {/* <Stack gap={3}>
        <Stack alignItems="flex-start">
          <span>Enabled Base UI button</span>
          <BaseUIButton {...createHandlers('Enabled Base UI')}>Button</BaseUIButton>
        </Stack>
        <Stack alignItems="flex-start">
          <span>Disabled Base UI button</span>
          <BaseUIButton disabled {...createHandlers('Disabled Base UI')}>
            Button
          </BaseUIButton>
        </Stack>
        <Stack alignItems="flex-start">
          <span>Enabled Base UI button as div</span>
          <BaseUIButton slots={{ root: 'div' }} {...createHandlers('Enabled Base UI as div')}>
            Button
          </BaseUIButton>
        </Stack>
        <Stack alignItems="flex-start">
          <span>Disabled Base UI button as div</span>
          <BaseUIButton
            slots={{ root: 'div' }}
            disabled
            {...createHandlers('Disabled Base UI as div')}
          >
            Button
          </BaseUIButton>
        </Stack>
      </Stack>

      <Stack gap={3}>
        <JoyCssVarsProvider theme={joyExtendTheme({})}>
          <Stack alignItems="flex-start">
            <span>Enabled Joy UI button</span>
            <JoyUIButton {...createHandlers('Enabled Joy UI')}>Button</JoyUIButton>
          </Stack>
          <Stack alignItems="flex-start">
            <span>Disabled Joy UI button</span>
            <JoyUIButton disabled {...createHandlers('Disabled Joy UI')}>
              Button
            </JoyUIButton>
          </Stack>
          <Stack alignItems="flex-start">
            <span>Enabled Joy UI button as div</span>
            <JoyUIButton component="div" {...createHandlers('Enabled Joy UI as div')}>
              Button
            </JoyUIButton>
          </Stack>
          <Stack alignItems="flex-start">
            <span>Disabled Joy UI button as div</span>
            <JoyUIButton component="div" disabled {...createHandlers('Disabled Joy UI as div')}>
              Button
            </JoyUIButton>
          </Stack>
        </JoyCssVarsProvider>
      </Stack> */}

          <Stack gap={3}>
            <Stack alignItems="flex-start">
              <span>Material UI button</span>
              <MaterialUIButton
                variant="contained"
                disabled={disabled}
                {...createHandlers('Material UI button')}
              >
                Button
              </MaterialUIButton>
            </Stack>
            <Stack alignItems="flex-start">
              <span>Material UI button link</span>
              <MaterialUIButton
                variant="contained"
                disabled={disabled}
                href="#"
                {...createHandlers('Material UI button link')}
              >
                Button
              </MaterialUIButton>
            </Stack>
            <Stack alignItems="flex-start">
              <span>Material UI button as div</span>
              <MaterialUIButton
                variant="contained"
                component="div"
                disabled={disabled}
                {...createHandlers('Material UI button as div')}
              >
                Button
              </MaterialUIButton>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </MaterialUICssVarsProvider>
  );
}
