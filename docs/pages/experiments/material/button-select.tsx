import * as React from 'react';
import { Button as BaseUIButton } from '@mui/base';
import {
  Button as JoyUIButton,
  CssVarsProvider as JoyCssVarsProvider,
  extendTheme as joyExtendTheme,
} from '@mui/joy';
import {
  Button as MaterialUIButton,
  Experimental_CssVarsProvider as MaterialUICssVarsProvider,
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
  return (
    <Stack direction="row" justifyContent="space-around">
      <Stack gap={3}>
        <Stack alignItems="flex-start">
          <span>Enabled native button</span>
          <button type="button" {...createHandlers('Enabled native button')}>
            Button
          </button>
        </Stack>
        <Stack alignItems="flex-start">
          <span>Disabled native button</span>
          <button type="button" disabled {...createHandlers('Disabled native button')}>
            Button
          </button>
        </Stack>
        <Stack alignItems="flex-start">
          <span>Native anchor</span>
          <a href="#" {...createHandlers('Enabled native anchor')}>
            Anchor
          </a>
        </Stack>
        <Stack alignItems="flex-start">
          <span>Native div</span>
          <div>Button</div>
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
        <MaterialUICssVarsProvider theme={materialUIExtendTheme({})}>
          <Stack alignItems="flex-start">
            <span>Enabled Material UI button</span>
            <MaterialUIButton {...createHandlers('Enabled Material UI')}>Button</MaterialUIButton>
          </Stack>
          <Stack alignItems="flex-start">
            <span>Disabled Material UI button</span>
            <MaterialUIButton disabled {...createHandlers('Disabled Material UI')}>
              Button
            </MaterialUIButton>
          </Stack>
          <Stack alignItems="flex-start">
            <span>Enabled Material UI button as div</span>
            <MaterialUIButton component="div" {...createHandlers('Enabled Material UI as div')}>
              Button
            </MaterialUIButton>
          </Stack>
          <Stack alignItems="flex-start">
            <span>Disabled Material UI button as div</span>
            <MaterialUIButton
              component="div"
              disabled
              {...createHandlers('Disabled Material UI as div')}
            >
              Button
            </MaterialUIButton>
          </Stack>
        </MaterialUICssVarsProvider>
      </Stack>
    </Stack>
  );
}
