import * as React from 'react';
import Box from '@mui/joy/Box';
import { Experimental_CssVarsProvider as MaterialCssVarsProvider } from '@mui/material/styles';
import MaterialSlider from '@mui/material/Slider';
import MaterialFormLabel from '@mui/material/FormLabel';
import MaterialSwitch from '@mui/material/Switch';
import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import JoySwitch from '@mui/joy/Switch';
import JoySlider from '@mui/joy/Slider';
import JoyFormLabel from '@mui/joy/FormLabel';
import BrandingProvider from 'docs/src/BrandingProvider';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';

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
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(min(400px, 100%), 1fr))',
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
            }}
          >
            <MaterialSwitch
              sx={{
                width: materialTrack.width,
                height: materialTrack.height,
                '& .MuiSwitch-track': { borderRadius: materialTrack.radius },
                '& .MuiSwitch-thumb': {
                  width: materialThumb.width,
                  height: materialThumb.height,
                },
              }}
            />
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 4,
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
                defaultValue={43}
                min={64}
                max={100}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value}px`}
                marks={[
                  { value: 64, label: '64px' },
                  { value: 100, label: '100px' },
                ]}
                onChange={(_, value) => {
                  setMaterialTrack((prev) => ({ ...prev, width: value as number }));
                }}
              />

              <MaterialFormLabel>Height: </MaterialFormLabel>
              <MaterialSlider
                color="secondary"
                defaultValue={43}
                min={40}
                max={64}
                valueLabelDisplay="auto"
                marks={[
                  { value: 40, label: '40px' },
                  { value: 64, label: '64px' },
                ]}
                onChange={(_, value) => {
                  setMaterialTrack((prev) => ({ ...prev, height: value as number }));
                }}
              />

              <MaterialFormLabel>Border Radius: </MaterialFormLabel>
              <MaterialSlider
                color="secondary"
                defaultValue={7}
                min={0}
                max={40}
                valueLabelDisplay="auto"
                marks={[
                  { value: 0, label: '0px' },
                  { value: 40, label: '40px' },
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
                defaultValue={20}
                min={20}
                max={48}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value}px`}
                marks={[
                  { value: 20, label: '20px' },
                  { value: 48, label: '48px' },
                ]}
                onChange={(_, value) => {
                  setMaterialThumb((prev) => ({ ...prev, width: value as number }));
                }}
              />

              <MaterialFormLabel>Height: </MaterialFormLabel>
              <MaterialSlider
                color="secondary"
                defaultValue={20}
                min={20}
                max={48}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value}px`}
                marks={[
                  { value: 20, label: '20px' },
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
            }}
          >
            <JoySwitch
              sx={{
                '--Switch-trackWidth': `${joyTrack.width}px`,
                '--Switch-trackHeight': `${joyTrack.height}px`,
                '--Switch-trackRadius': `${joyTrack.radius}px`,
                '--Switch-thumbSize': `${joyThumb.height}px`,
                '--Switch-thumbWidth': `${joyThumb.width}px`,
              }}
            />
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 4,
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
                defaultValue={43}
                min={64}
                max={100}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value}px`}
                marks={[
                  { value: 64, label: '64px' },
                  { value: 100, label: '100px' },
                ]}
                onChange={(_, value) => {
                  setJoyTrack((prev) => ({ ...prev, width: value as number }));
                }}
              />

              <JoyFormLabel>Height: </JoyFormLabel>
              <JoySlider
                color="success"
                defaultValue={43}
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
                defaultValue={7}
                min={0}
                max={40}
                valueLabelDisplay="auto"
                marks={[
                  { value: 0, label: '0px' },
                  { value: 40, label: '40px' },
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
                defaultValue={20}
                min={20}
                max={48}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value}px`}
                marks={[
                  { value: 20, label: '20px' },
                  { value: 48, label: '48px' },
                ]}
                onChange={(_, value) => {
                  setJoyThumb((prev) => ({ ...prev, width: value as number }));
                }}
              />

              <JoyFormLabel>Height: </JoyFormLabel>
              <JoySlider
                color="success"
                defaultValue={20}
                min={20}
                max={48}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value}px`}
                marks={[
                  { value: 20, label: '20px' },
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
                joyThumb.width ? `\n    '--Switch-thumbSize': '${joyThumb.height}px',` : ''
              }${joyThumb.height ? `\n    '--Switch-thumbWidth': '${joyThumb.width}px',` : ''}${
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
