import * as React from 'react';
import { GlobalStyles } from '@mui/system';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Switch from '@mui/joy/Switch';
import Typography from '@mui/joy/Typography';
import { CssVarsProvider, useColorScheme, styled } from '@mui/joy/styles';
import Moon from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';
import Add from '@mui/icons-material/Add';
import DeleteForever from '@mui/icons-material/DeleteForever';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';

const ColorSchemePicker = () => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="outlined"
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
      sx={{
        p: '0.25rem',
        width: 'var(--Button-minHeight)',
      }}
    >
      {mode === 'light' ? <Moon /> : <Sun />}
    </Button>
  );
};

const Input = styled('input')<{ ownerState: any }>(({ theme, ownerState }) => ({
  boxSizing: 'border-box',
  maxWidth: 80,
  padding: '0.25rem 0.5rem',
  border: 'none',
  borderRadius: '4px',
  minWidth: 0,
  ...theme.typography.body2,
  ...theme.variants.light.neutral,
  cursor: 'pointer',
  '&:focus-visible': theme.focus.default,
  flexGrow: 1,
  ...(ownerState.unit && {
    paddingRight: '1.5rem',
  }),
}));

const ControlInput = ({ id, label = 'Label', unit, ...props }: any) => {
  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', my: 1, gap: 1, justifyContent: 'space-between' }}
    >
      <Typography
        htmlFor={id}
        component="label"
        sx={{ fontSize: 'var(--joy-fontSize-sm)', flexShrink: 0 }}
      >
        {label}
      </Typography>
      <Box sx={{ position: 'relative' }}>
        <Input id={id} ownerState={{ unit, ...props }} {...props} />
        {unit && (
          <Typography
            level="body3"
            sx={{ position: 'absolute', right: '6px', top: '4px', pointerEvents: 'none' }}
          >
            {unit}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

const components = [
  {
    name: 'Button',
    render: (props: any) => (
      <React.Fragment>
        <Button {...props}>Text</Button>
        <Button startIcon={<Add />} variant="light" {...props}>
          Add more row
        </Button>
        <Button endIcon={<DeleteForever />} variant="outlined" {...props}>
          Delete
        </Button>
      </React.Fragment>
    ),
    cssVars: [
      { id: '--Button-minHeight', type: 'number', unit: 'px', defaultValue: 40 },
      { id: '--Button-gutter', type: 'number', unit: 'px', defaultValue: 24 },
      { id: '--Button-iconOffsetStep', type: 'number', defaultValue: 2 },
      { id: '--Button-gap', type: 'number', unit: 'px' },
    ],
  },
  {
    name: 'Switch',
    render: (props: any) => (
      <React.Fragment>
        <Switch {...props} />
        <Switch defaultChecked {...props} />
      </React.Fragment>
    ),
    cssVars: [
      { id: '--Switch-track-radius', type: 'number', unit: 'px', defaultValue: 16 },
      { id: '--Switch-track-width', type: 'number', unit: 'px', defaultValue: 48 },
      { id: '--Switch-track-height', type: 'number', unit: 'px', defaultValue: 24 },
      { id: '--Switch-thumb-size', type: 'number', unit: 'px', defaultValue: 16 },
      { id: '--Switch-thumb-radius', type: 'number', unit: 'px' },
      { id: '--Switch-thumb-width', type: 'number', unit: 'px' },
      { id: '--Switch-thumb-offset', type: 'number', unit: 'px' },
    ],
  },
];

export default function JoyComponents() {
  const [current, setCurrent] = React.useState(components[0].name);
  const [componentVars, setComponentVars] = React.useState<Record<string, any>>(
    components.reduce((result, curr) => ({ ...result, [curr.name]: {} }), {}),
  );
  const data = components.find(({ name }) => name === current);
  const renderedSx = data?.name
    ? Object.entries(componentVars[data?.name])
        .map(([key, value]) => `  ${key}: ${value}`)
        .join('\n')
    : null;
  return (
    <CssVarsProvider
      theme={{
        components: {
          MuiSvgIcon: {
            defaultProps: {
              fontSize: 'xl',
            },
            styleOverrides: {
              root: ({ ownerState, theme }) => ({
                ...(ownerState.fontSize &&
                  ownerState.fontSize !== 'inherit' && {
                    fontSize: theme.vars.fontSize[ownerState.fontSize],
                  }),
                ...(ownerState.color &&
                  ownerState.color !== 'inherit' && {
                    color: theme.vars.palette[ownerState.color].textColor,
                  }),
              }),
            },
          },
        },
      }}
    >
      <GlobalStyles styles={{ body: { margin: 0 } }} />
      <Box sx={{ maxWidth: { md: 1152, xl: 1536 }, mx: 'auto', display: 'flex' }}>
        <Box
          sx={{
            width: 256,
            minHeight: '100vh',
            boxShadow: 'var(--joy-shadow-sm)',
          }}
        >
          <Box sx={{ pl: 5, pt: 2 }}>
            <ColorSchemePicker />
          </Box>
          <Box
            component="ul"
            sx={{
              my: 2,
              px: 2,
              listStyle: 'none',
              '& > li': {
                marginBottom: '0.25rem',
              },
              '& button': { justifyContent: 'flex-start' },
            }}
          >
            {components.map((config) => (
              <li key={config.name}>
                <Button
                  fullWidth
                  variant={config.name === current ? 'outlined' : 'text'}
                  onClick={() => setCurrent(config.name)}
                >
                  {config.name}
                </Button>
              </li>
            ))}
          </Box>
        </Box>
        <Box
          className="Canvas"
          sx={{
            position: 'relative',
            flexGrow: 1,
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          {data?.render({ sx: componentVars[data.name] })}
          <Box
            sx={{
              position: 'absolute',
              left: '1rem',
              right: '1rem',
              bottom: '1rem',
            }}
          >
            <ThemeProvider theme={createTheme({ palette: { mode: 'dark' } })}>
              <HighlightedCode
                component={MarkdownElement}
                code={`<${current} sx={{${renderedSx ? `\n${renderedSx}\n ` : ''}}}
/>`}
                language="jsx"
              />
            </ThemeProvider>
          </Box>
        </Box>
        <Box
          sx={{ width: 300, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          <Box
            sx={{
              bgcolor: 'var(--joy-palette-background-level1)',
              borderRadius: '4px',
              minHeight: 300,
              py: 1.5,
              px: 2,
            }}
          >
            <Typography level="body2" sx={{ mb: 2 }}>
              CSS variables
            </Typography>
            {data?.cssVars.map((cssVar) => (
              <ControlInput
                key={cssVar.id}
                type="number"
                label={cssVar.id}
                unit={cssVar.unit}
                value={
                  componentVars[data?.name!]?.[cssVar.id]?.replace(cssVar.unit, '') ||
                  cssVar.defaultValue ||
                  ''
                }
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const value = event.target.value;
                  setComponentVars((latest) => {
                    const vars = { ...latest[data.name] };
                    if (!value) {
                      delete vars[cssVar.id];
                    } else {
                      vars[cssVar.id] = cssVar.unit ? `${value}${cssVar.unit}` : value;
                    }
                    return {
                      ...latest,
                      [data.name]: vars,
                    };
                  });
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
