import * as React from 'react';
import Box from '@mui/joy/Box';
import { Experimental_CssVarsProvider as MaterialCssVarsProvider } from '@mui/material/styles';
import MaterialButton from '@mui/material/Button';
import MaterialSlider from '@mui/material/Slider';
import MaterialFormLabel from '@mui/material/FormLabel';
import MaterialSwitch from '@mui/material/Switch';
import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import JoyButton from '@mui/joy/Button';
import JoySwitch from '@mui/joy/Switch';
import JoySlider from '@mui/joy/Slider';
import JoyFormLabel from '@mui/joy/FormLabel';
import BrandingProvider from 'docs/src/BrandingProvider';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';

const defaultMaterialTrack = {
  width: 58,
  height: 38,
  radius: 7,
};
const defaultMaterialThumb = {
  width: 20,
  height: 20,
};
const defaultJoyTrack = {
  width: 48,
  height: 24,
  radius: 16,
};
const defaultJoyThumb = {
  width: 16,
  height: 16,
};

export default function SwitchComparison() {
  const [materialTrack, setMaterialTrack] = React.useState<{
    width?: number;
    height?: number;
    radius?: number;
  }>({});
  const [materialThumb, setMaterialThumb] = React.useState<{
    width?: number;
    height?: number;
  }>({});
  const [joyTrack, setJoyTrack] = React.useState<{
    width?: number;
    height?: number;
    radius?: number;
  }>({});
  const [joyThumb, setJoyThumb] = React.useState<{
    width?: number;
    height?: number;
  }>({});
  return (
    <Box
      data-mui-color-scheme="light"
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(400px, 100%), 1fr))',
        height: '100vh',
        px: 3,
        rowGap: 5,
        columnGap: 8,
        '& > div': {
          display: 'flex',
          flexDirection: 'column',
        },
        '& h2, & h3': {
          textAlign: 'center',
        },
      }}
    >
      <MaterialCssVarsProvider>
        <Box>
          <h2>Material UI</h2>
          <Box
            sx={{
              minHeight: 160,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              bgcolor: '#f9f9f9',
              position: 'relative',
            }}
          >
            <MaterialSwitch
              sx={{
                width: materialTrack.width,
                height: materialTrack.height,
                '& .MuiSwitch-track': { borderRadius: `${materialTrack.radius}px` },
                '& .MuiSwitch-thumb': {
                  width: materialThumb.width,
                  height: materialThumb.height,
                },
              }}
            />
            <Box sx={{ display: 'flex', gap: 1, mb: -2, position: 'absolute', bottom: 0 }}>
              <MaterialButton
                variant="contained"
                onClick={() => {
                  setMaterialTrack({
                    width: Math.floor(Math.random() * (100 - 64 + 1)) + 64,
                    height: Math.floor(Math.random() * (64 - 40 + 1)) + 40,
                    radius: Math.floor(Math.random() * (20 - 0 + 1)) + 0,
                  });
                  setMaterialThumb({
                    width: Math.floor(Math.random() * (48 - 20 + 1)) + 20,
                    height: Math.floor(Math.random() * (48 - 20 + 1)) + 20,
                  });
                }}
              >
                Random
              </MaterialButton>
              <MaterialButton
                variant="outlined"
                sx={{ bgcolor: '#fff' }}
                onClick={() => {
                  setMaterialTrack({});
                  setMaterialThumb({});
                }}
              >
                Reset
              </MaterialButton>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              rowGap: 2,
              columnGap: 4,
              alignItems: 'flex-start',
            }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '64px 1fr',
                rowGap: 2,
                columnGap: 1,
                px: 1,
              }}
            >
              <h3 style={{ gridColumn: 'span 2', marginBottom: 0 }}>Track</h3>

              <MaterialFormLabel>Width: </MaterialFormLabel>
              <MaterialSlider
                color="secondary"
                value={materialTrack.width ?? defaultMaterialTrack.width}
                min={48}
                max={100}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value}px`}
                marks={[
                  { value: 48, label: '48px' },
                  { value: 100, label: '100px' },
                ]}
                onChange={(_, value) => {
                  setMaterialTrack((prev) => ({ ...prev, width: value as number }));
                }}
              />

              <MaterialFormLabel>Height: </MaterialFormLabel>
              <MaterialSlider
                color="secondary"
                value={materialTrack.height ?? defaultMaterialTrack.height}
                min={32}
                max={64}
                valueLabelDisplay="auto"
                marks={[
                  { value: 32, label: '32px' },
                  { value: 64, label: '64px' },
                ]}
                onChange={(_, value) => {
                  setMaterialTrack((prev) => ({ ...prev, height: value as number }));
                }}
              />

              <MaterialFormLabel>Border Radius: </MaterialFormLabel>
              <MaterialSlider
                color="secondary"
                value={materialTrack.radius ?? defaultMaterialTrack.radius}
                min={0}
                max={20}
                valueLabelDisplay="auto"
                marks={[
                  { value: 0, label: '0px' },
                  { value: 20, label: '20px' },
                ]}
                onChange={(_, value) => {
                  setMaterialTrack((prev) => ({ ...prev, radius: value as number }));
                }}
              />
            </Box>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '64px 1fr',
                gap: 1,
                rowGap: 2,
                columnGap: 1,
                px: 1,
              }}
            >
              <h3 style={{ gridColumn: 'span 2', marginBottom: 0 }}>Thumb</h3>
              <MaterialFormLabel>Width: </MaterialFormLabel>
              <MaterialSlider
                color="secondary"
                value={materialThumb.width ?? defaultMaterialThumb.width}
                min={16}
                max={48}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value}px`}
                marks={[
                  { value: 16, label: '16px' },
                  { value: 48, label: '48px' },
                ]}
                onChange={(_, value) => {
                  setMaterialThumb((prev) => ({ ...prev, width: value as number }));
                }}
              />

              <MaterialFormLabel>Height: </MaterialFormLabel>
              <MaterialSlider
                color="secondary"
                value={materialThumb.height ?? defaultMaterialThumb.height}
                min={16}
                max={48}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value}px`}
                marks={[
                  { value: 16, label: '16px' },
                  { value: 48, label: '48px' },
                ]}
                onChange={(_, value) => {
                  setMaterialThumb((prev) => ({ ...prev, height: value as number }));
                }}
              />
            </Box>
          </Box>
          <BrandingProvider>
            <HighlightedCode
              code={`<Switch
  sx={{${materialTrack.width ? `\n    width: '${materialTrack.width}px',` : ''}${
                materialTrack.height ? `\n    height: '${materialTrack.height}px',` : ''
              }${
                materialTrack.radius
                  ? `\n    '& .MuiSwitch-track': { borderRadius: '${materialTrack.radius}px' }`
                  : ''
              }${
                Object.keys(materialThumb).length
                  ? `\n    '& .MuiSwitch-thumb': {${
                      materialThumb.width ? `\n      width: '${materialThumb.width}px',` : ''
                    }${
                      materialThumb.height ? `\n      height: '${materialThumb.height}px',` : ''
                    }\n    },`
                  : ''
              }${Object.keys({ ...materialTrack, ...materialThumb }).length ? `\n  ` : ''}}}
/>
            `}
              language="jsx"
            />
          </BrandingProvider>
        </Box>
      </MaterialCssVarsProvider>
      <JoyCssVarsProvider>
        <CssBaseline />
        <Box>
          <h2>Joy UI</h2>
          <Box
            sx={{
              minHeight: 160,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              bgcolor: '#f9f9f9',
              position: 'relative',
            }}
          >
            <JoySwitch
              sx={{
                ...(joyTrack.width && { '--Switch-trackWidth': `${joyTrack.width}px` }),
                ...(joyTrack.height && { '--Switch-trackHeight': `${joyTrack.height}px` }),
                ...(joyTrack.radius && { '--Switch-trackRadius': `${joyTrack.radius}px` }),
                ...(joyThumb.width && { '--Switch-thumbWidth': `${joyThumb.width}px` }),
                ...(joyThumb.height && { '--Switch-thumbSize': `${joyThumb.height}px` }),
              }}
            />
            <Box sx={{ position: 'absolute', bottom: 0, display: 'flex', gap: 1, mb: -2 }}>
              <JoyButton
                variant="solid"
                color="primary"
                onClick={() => {
                  setJoyTrack({
                    width: Math.floor(Math.random() * (100 - 64 + 1)) + 64,
                    height: Math.floor(Math.random() * (64 - 40 + 1)) + 40,
                    radius: Math.floor(Math.random() * (20 - 0 + 1)) + 0,
                  });
                  setJoyThumb({
                    width: Math.floor(Math.random() * (48 - 20 + 1)) + 20,
                    height: Math.floor(Math.random() * (48 - 20 + 1)) + 20,
                  });
                }}
              >
                Random
              </JoyButton>
              <JoyButton
                variant="soft"
                color="neutral"
                onClick={() => {
                  setJoyTrack({});
                  setJoyThumb({});
                }}
              >
                Reset
              </JoyButton>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              rowGap: 2,
              columnGap: 4,
              alignItems: 'flex-start',
            }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '64px 1fr',
                rowGap: 2,
                columnGap: 1,
                px: 1,
              }}
            >
              <h3 style={{ gridColumn: 'span 2', marginBottom: 0 }}>Track</h3>

              <JoyFormLabel>Width: </JoyFormLabel>
              <JoySlider
                color="success"
                value={joyTrack.width ?? defaultJoyTrack.width}
                min={40}
                max={100}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value}px`}
                marks={[
                  { value: 40, label: '40px' },
                  { value: 100, label: '100px' },
                ]}
                onChange={(_, value) => {
                  setJoyTrack((prev) => ({ ...prev, width: value as number }));
                }}
              />

              <JoyFormLabel>Height: </JoyFormLabel>
              <JoySlider
                color="success"
                value={joyTrack.height ?? defaultJoyTrack.height}
                min={16}
                max={64}
                valueLabelDisplay="auto"
                marks={[
                  { value: 16, label: '16px' },
                  { value: 64, label: '64px' },
                ]}
                onChange={(_, value) => {
                  setJoyTrack((prev) => ({ ...prev, height: value as number }));
                }}
              />

              <JoyFormLabel>Border Radius: </JoyFormLabel>
              <JoySlider
                color="success"
                value={joyTrack.radius ?? defaultJoyTrack.radius}
                min={0}
                max={20}
                valueLabelDisplay="auto"
                marks={[
                  { value: 0, label: '0px' },
                  { value: 20, label: '20px' },
                ]}
                onChange={(_, value) => {
                  setJoyTrack((prev) => ({ ...prev, radius: value as number }));
                }}
              />
            </Box>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '64px 1fr',
                gap: 1,
                rowGap: 2,
                columnGap: 1,
                px: 1,
              }}
            >
              <h3 style={{ gridColumn: 'span 2', marginBottom: 0 }}>Thumb</h3>
              <JoyFormLabel>Width: </JoyFormLabel>
              <JoySlider
                color="success"
                value={joyThumb.width ?? defaultJoyThumb.width}
                min={12}
                max={48}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value}px`}
                marks={[
                  { value: 12, label: '12px' },
                  { value: 48, label: '48px' },
                ]}
                onChange={(_, value) => {
                  setJoyThumb((prev) => ({ ...prev, width: value as number }));
                }}
              />

              <JoyFormLabel>Height: </JoyFormLabel>
              <JoySlider
                color="success"
                value={joyThumb.height ?? defaultJoyThumb.height}
                min={12}
                max={48}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value}px`}
                marks={[
                  { value: 12, label: '12px' },
                  { value: 48, label: '48px' },
                ]}
                onChange={(_, value) => {
                  setJoyThumb((prev) => ({ ...prev, height: value as number }));
                }}
              />
            </Box>
          </Box>
          <br />
          <BrandingProvider>
            <HighlightedCode
              code={`<Switch
  sx={{${joyTrack.width ? `\n    '--Switch-trackWidth': '${joyTrack.width}px',` : ''}${
                joyTrack.height ? `\n    '--Switch-trackHeight': '${joyTrack.height}px',` : ''
              }${joyTrack.radius ? `\n    '--Switch-trackRadius': '${joyTrack.radius}px',` : ''}${
                joyThumb.width ? `\n    '--Switch-thumbWidth': '${joyThumb.width}px',` : ''
              }${joyThumb.height ? `\n    '--Switch-thumbSize': '${joyThumb.height}px',` : ''}${
                Object.keys({ ...joyTrack, ...joyThumb }).length ? `\n  ` : ''
              }}}
/>
            `}
              language="jsx"
            />
          </BrandingProvider>
        </Box>
      </JoyCssVarsProvider>
    </Box>
  );
}
