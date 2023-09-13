/* eslint-disable no-console */
import * as React from 'react';
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
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#" {...createHandlers('Native anchor')}>
                Anchor
              </a>
            </Stack>
            <Stack alignItems="flex-start">
              <span>Native div</span>
              <div {...createHandlers('Div')}>Button</div>
            </Stack>
          </Stack>

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
