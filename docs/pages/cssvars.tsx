import * as React from 'react';
import { OverridableStringUnion } from '@mui/types';
import { GlobalStyles, unstable_createDesignSystem as createDesignSystem } from '@mui/system';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import BrandingProvider from 'docs/src/BrandingProvider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

// demonstrate @mui/joy
interface JoyBaseTokens {
  fontSize: {
    md: string;
  };
  black: string;
  white: string;
}

interface JoyColorSchemeOverrides {
  light: true;
  dark: true;
}

type JoyColorScheme = OverridableStringUnion<'light' | 'dark', JoyColorSchemeOverrides>;

interface JoyColorSchemeTokens {
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

interface JoyTheme extends JoyBaseTokens, JoyColorSchemeTokens {}

const defaultTheme = {
  black: '#000',
  white: '#fff',
  fontSize: {
    md: '1rem',
  },
  background: {
    app: '#f9f9f9',
  },
  palette: {
    primary: {
      500: '#007FFF',
    },
    success: {
      500: '#1AA251',
    },
  },
};

const { CssVarsProvider, useColorScheme, styled } = createDesignSystem<JoyTheme, JoyColorScheme>({
  defaultTheme,
});

const { palette, ...defaultBaseTheme } = defaultTheme;

const JoyCssVarsProvider = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <CssVarsProvider<JoyBaseTokens, JoyColorSchemeTokens>
      defaultColorScheme="light"
      baseTheme={defaultBaseTheme}
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
      }}
    >
      {children}
    </CssVarsProvider>
  );
};

// ======================================================================

// In real application, use module augmentation to extend more color schemes
// declare module '@mui/joy/styles' {
//   interface ColorSchemeOverrides {
//     trueDark: true;
//   }
// }
interface JoyColorSchemeOverrides {
  trueDark: true;
}

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
    <BrandingProvider>
      <JoyCssVarsProvider>
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
          <Typography sx={{ mb: 1 }}>@mui/joy</Typography>
          <Toggle />
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Button>Primary</Button>
            <Button color="success">Success</Button>
          </Box>
          <Typography sx={{ mb: 1 }}>@mui/material</Typography>
          <ToggleButtonGroup>
            <ToggleButton value="primary">It</ToggleButton>
            <ToggleButton value="success">works</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </JoyCssVarsProvider>
    </BrandingProvider>
  );
}
