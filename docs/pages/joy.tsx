import * as React from 'react';
import Box from '@mui/material/Box';
import BrandingProvider from 'docs/src/BrandingProvider';
import { styled, CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Switch from '@mui/joy/Switch';
import { useControls, folder, Leva } from 'leva';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import MarkdownElement from 'docs/src/components/markdown/MarkdownElement';

declare module '@mui/joy/styles' {
  interface JoyColorSchemeOverrides {
    valentine: true;
    trueDark: true;
    custom: true;
  }
}

const Typography = styled('div')(({ theme: { vars } }) => ({
  fontSize: vars.fontSize.md,
  color: vars.background.contrast,
}));

const Info = (props) => {
  const count = React.useRef(1);
  React.useEffect(() => {
    count.current = count.current + 1;
  });
  return <div {...props}>I render {count.current} times.</div>;
};

const StyledInfo = styled(Info)(({ theme: { vars } }) => ({
  fontSize: vars.fontSize.md,
  color: vars.background.contrast,
}));

const Toggle = React.forwardRef((props, ref) => {
  const [mounted, setMounted] = React.useState(false);
  const { allColorSchemes, colorScheme, setColorScheme } = useColorScheme();

  React.useImperativeHandle(ref, () => ({
    setColorScheme,
  }));

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }
  return (
    <Box ref={ref} sx={{ display: 'flex', gap: 2 }}>
      {allColorSchemes.map((color) => (
        <Box
          component="button"
          key={color}
          onClick={() => setColorScheme(color)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            alignItems: 'center',
            minWidth: 80,
            border: 0,
            bgcolor: 'transparent',
            cursor: 'pointer',
          }}
        >
          <Box
            {...(color !== 'light' && { 'data-color-scheme': color })}
            sx={{
              borderRadius: 10,
              width: 40,
              height: 40,
              backgroundColor: color === 'light' ? '#007FFF' : 'var(--palette-brand)',
              ...(colorScheme === color && {
                outline: `2px solid var(--palette-brand)`,
                outlineOffset: 4,
              }),
            }}
          />
          <Typography>{color}</Typography>
        </Box>
      ))}
    </Box>
  );
});

const toPixel = (val: string | number) => (typeof val === 'number' ? `${val}px` : val);

export default function Joy() {
  const values = useControls({
    track: folder({
      width: {
        value: 88,
        min: 40,
        max: 120,
        step: 1,
        suffix: 'px',
      },
      height: {
        value: 40,
        min: 8,
        max: 64,
        step: 1,
        suffix: 'px',
      },
      radius: {
        value: 8,
        min: 0,
        max: 32,
        step: 1,
        suffix: 'px',
      },
    }),
    thumb: folder({
      size: {
        value: 32,
        min: 20,
        max: 72,
        step: 1,
        suffix: 'px',
      },
      offset: {
        value: 0,
        min: -50,
        max: 50,
        step: 1,
        suffix: 'px',
      },
    }),
    customColorScheme: folder({
      palette: folder({
        brand: '#000000',
        neutral: '#dddddd',
      }),
      background: folder({
        app: '#ffffff',
        contrast: '#000000',
      }),
    }),
  });
  const toggleRef = React.useRef(null);
  const mounted = React.useRef(false);
  const [checked, setChecked] = React.useState(false);
  React.useEffect(() => {
    if (mounted.current && toggleRef.current) {
      toggleRef.current.setColorScheme('custom');
    } else {
      mounted.current = true;
    }
  }, [values.app, values.brand, values.neutral, values.contrast]);
  React.useEffect(() => {
    if (mounted.current && toggleRef.current) {
      setChecked(true);
    } else {
      mounted.current = true;
    }
  }, [values.brand]);
  React.useEffect(() => {
    if (mounted.current && toggleRef.current) {
      setChecked(false);
    } else {
      mounted.current = true;
    }
  }, [values.neutral]);
  return (
    <BrandingProvider>
      <Box
        justifyContent="center"
        alignItems="center"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          bgcolor: 'var(--background-app)',
          py: 10,
        }}
      >
        <CssVarsProvider
          colorSchemes={{
            trueDark: {
              palette: {
                brand: '#AAB4BE',
                neutral: '#6a6a6a',
              },
              background: {
                app: '#000',
                contrast: '#fff',
              },
            },
            valentine: {
              palette: {
                brand: '#ff0000',
                neutral: '#d99797',
              },
              background: {
                app: '#ffdeed',
                contrast: '#ff0000',
              },
            },
            custom: {
              palette: {
                brand: values.brand,
                neutral: values.neutral,
              },
              background: {
                app: values.app,
                contrast: values.contrast,
              },
            },
          }}
        >
          <Box component="h1" sx={{ mt: -3, '& > div': { fontSize: 24 } }}>
            <Typography>CSS Variables demo</Typography>
          </Box>
          <Box component="div" sx={{ mb: 3, mt: -4 }}>
            <Typography>
              Try changing variables in the panel on the right to see the change.
            </Typography>
          </Box>
          <Leva />
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Switch
              checked={checked}
              onChange={(event) => setChecked(event.target.checked)}
              sx={{
                '--switch-track-width': toPixel(values.width),
                '--switch-track-height': toPixel(values.height),
                '--switch-track-radius': toPixel(values.radius),
                '--switch-thumb-size': toPixel(values.size),
                ...(typeof values.offset === 'string' && {
                  '--switch-thumb-offset': values.offset,
                }),
              }}
            />
          </Box>
          {/* <StyledInfo /> */}
          <Box sx={{ p: 2, bgcolor: 'primaryDark.800', borderRadius: 1 }}>
            <HighlightedCode
              component={MarkdownElement}
              code={`<Switch
  sx={{
    '--switch-track-width': '${toPixel(values.width)}',
    '--switch-track-height': '${toPixel(values.height)}',
    '--switch-track-radius': '${toPixel(values.radius)}',
    '--switch-thumb-size': '${toPixel(values.size)}',${
                typeof values.offset === 'string'
                  ? `\n    '--switch-thumb-offset': '${values.offset}'`
                  : ''
              }
  }}
/>
            `}
              language="jsx"
            />
          </Box>
          <Typography sx={{ mb: 1, mt: 4 }}>Pick a color scheme</Typography>
          <Toggle ref={toggleRef} />
        </CssVarsProvider>
      </Box>
    </BrandingProvider>
  );
}
