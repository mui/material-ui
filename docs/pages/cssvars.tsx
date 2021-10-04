import * as React from 'react';
import {
  Unstable_CssVarsProvider as CssVarsProvider,
  unstable_useColorScheme as useColorScheme,
  createStyled,
  GlobalStyles,
} from '@mui/system';
import Box from '@mui/material/Box';

// By default, system provide light & dark color scheme
// use module augmentation to extend more color schemes
declare module '@mui/system' {
  interface ColorSchemeOverrides {
    trueDark: true;
    valentine: true;
  }
}

interface IosBaseTheme {
  fontSize: {
    md: string;
  };
  black: string;
  white: string;
}

interface IosColorSchema {
  palette: {
    primary: {
      500: string;
    };
    success: {
      500: string;
    };
  };
  background: {
    app: string;
  };
}

interface IosTheme extends IosBaseTheme, IosColorSchema {}

const styled = createStyled<IosTheme & { vars: IosTheme }>();

const Select = styled('select', { shouldForwardProp: () => true })(({ theme: { vars } }) => ({
  fontSize: vars.fontSize.md,
  padding: '4px 8px 4px 2px',
  borderRadius: 4,
}));

const Button = styled('button')<{ color?: 'primary' | 'success' }>(
  ({ theme: { vars }, color = 'primary' }) => ({
    fontSize: vars.fontSize.md,
    borderRadius: 4,
    padding: '8px 16px',
    border: 0,
    color: vars.white,
    backgroundColor: vars.palette[color][500],
    cursor: 'pointer',
  }),
);

const Toggle = () => {
  const [mounted, setMounted] = React.useState(false);
  const { allColorSchemes, colorScheme, setColorScheme } = useColorScheme();

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }
  return (
    <Select
      value={colorScheme}
      onChange={(event) => {
        setColorScheme(event.target.value as typeof allColorSchemes[number]);
      }}
    >
      {allColorSchemes.map((scheme) => (
        <option key={scheme} value={scheme}>
          {scheme}
        </option>
      ))}
    </Select>
  );
};

export default function CssVars() {
  return (
    <CssVarsProvider<IosBaseTheme, IosColorSchema>
      baseTheme={{
        fontSize: {
          md: '1rem',
        },
        black: '#000',
        white: '#fff',
      }}
      colorSchemes={{
        light: {
          palette: {
            primary: {
              500: '#007FFF',
            },
            success: {
              500: '#1AA251',
            },
          },
          background: {
            app: '#F3F6F9',
          },
        },
        dark: {
          palette: {
            primary: {
              500: '#0059B2',
            },
            success: {
              500: '#178D46',
            },
          },
          background: {
            app: '#0A1929',
          },
        },
        trueDark: {
          palette: {
            primary: {
              500: '#3b3b3b',
            },
            success: {
              500: '#318200',
            },
          },
          background: {
            app: '#000',
          },
        },
        valentine: {
          palette: {
            primary: {
              500: '#ff0000',
            },
            success: {
              500: '#dd00c1',
            },
          },
          background: {
            app: '#ffdeed',
          },
        },
      }}
    >
      <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />
      <Box
        justifyContent="center"
        alignItems="center"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          bgcolor: 'var(--background-app)',
        }}
      >
        <Toggle />
        <Box sx={{ display: 'flex', gap: '16px' }}>
          <Button>Primary</Button>
          <Button color="success">Success</Button>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
