import * as React from 'react';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormLabel from '@mui/joy/FormLabel';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { HighlightedCode } from '@mui/docs/HighlightedCode';
import { BrandingProvider } from '@mui/docs/branding';

const githubTheme = extendTheme({
  cssVarPrefix: 'gh',
  colorSchemes: {
    light: {
      palette: {
        success: {
          solidBg: '#2DA44E',
          solidHoverBg: '#2C974B',
          solidActiveBg: '#298E46',
        },
        neutral: {
          outlinedBg: '#F6F8FA',
          outlinedHoverBg: '#F3F4F6',
          outlinedActiveBg: 'rgba(238, 239, 242, 1)',
          outlinedBorder: 'rgba(27, 31, 36, 0.15)',
        },
        focusVisible: 'rgba(3, 102, 214, 0.3)',
      },
    },
  },
  focus: {
    default: {
      outlineWidth: '3px',
    },
  },
  fontFamily: {
    body: 'SF Pro Text, var(--gh-fontFamily-fallback)',
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          borderRadius: '6px',
          boxShadow: '0 1px 0 0 rgba(27, 31, 35, 0.04)',
          transition: '80ms cubic-bezier(0.33, 1, 0.68, 1)',
          transitionProperty: 'color,background-color,box-shadow,border-color',
          ...(ownerState.size === 'md' && {
            fontWeight: 600,
            minHeight: '32px',
            fontSize: '14px',
            '--Button-paddingInline': '1rem',
          }),
          ...(ownerState.color === 'success' &&
            ownerState.variant === 'solid' && {
              '--gh-palette-focusVisible': 'rgba(46, 164, 79, 0.4)',
              border: '1px solid rgba(27, 31, 36, 0.15)',
              '&:active': {
                boxShadow: 'inset 0px 1px 0px rgba(20, 70, 32, 0.2)',
              },
            }),
          ...(ownerState.color === 'neutral' &&
            ownerState.variant === 'outlined' && {
              '&:active': {
                boxShadow: 'none',
              },
            }),
        }),
      },
    },
  },
});
const githubCode = `const githubTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        success: {
          solidBg: '#2DA44E',
          solidHoverBg: '#2C974B',
          solidActiveBg: '#298E46',
        },
        neutral: {
          outlinedBg: '#F6F8FA',
          outlinedHoverBg: '#F3F4F6',
          outlinedActiveBg: 'rgba(238, 239, 242, 1)',
          outlinedBorder: 'rgba(27, 31, 36, 0.15)',
        },
        focusVisible: 'rgba(3, 102, 214, 0.3)',
      },
    },
  },
  focus: {
    default: {
      outlineWidth: '3px',
    },
  },
  fontFamily: {
    body: 'SF Pro Text, var(--gh-fontFamily-fallback)',
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          borderRadius: '6px',
          boxShadow: '0 1px 0 0 rgba(27, 31, 35, 0.04)',
          transition: '80ms cubic-bezier(0.33, 1, 0.68, 1)',
          transitionProperty: 'color,background-color,box-shadow,border-color',
          ...(ownerState.size === 'md' && {
            fontWeight: 600,
            minHeight: '32px',
            fontSize: '14px',
            '--Button-paddingInline': '1rem',
          }),
          ...(ownerState.color === 'success' &&
            ownerState.variant === 'solid' && {
              '--gh-palette-focusVisible': 'rgba(46, 164, 79, 0.4)',
              border: '1px solid rgba(27, 31, 36, 0.15)',
              '&:active': {
                boxShadow: 'inset 0px 1px 0px rgba(20, 70, 32, 0.2)',
              },
            }),
          ...(ownerState.color === 'neutral' &&
            ownerState.variant === 'outlined' && {
              '&:active': {
                boxShadow: 'none',
              },
            }),
        }),
      },
    },
  },
});`;

const fluentTheme = extendTheme({
  cssVarPrefix: 'fluent',
  colorSchemes: {
    light: {
      palette: {
        primary: {
          solidBg: '#0078D4',
          solidHoverBg: '#106EBE',
          solidActiveBg: '#005A9E',
          solidDisabledBg: '#F3F2F1',
          solidDisabledColor: '#A19F9D',
        },
        neutral: {
          outlinedBg: '#fff',
          outlinedColor: '#201F1E',
          outlinedDisabledBg: '#F3F2F1',
          outlinedDisabledColor: '#A19F9D',
          outlinedDisabledBorder: '#C8C6C4',
          outlinedBorder: '#8A8886',
          outlinedHoverBg: '#F3F2F1',
          outlinedHoverBorder: undefined,
          outlinedActiveBg: '#EDEBE9',
        },
        focusVisible: '#323130',
      },
    },
  },
  focus: {
    default: {
      outlineOffset: -1,
      outlineWidth: '1px',
    },
  },
  fontFamily: {
    body: '"Segoe UI Variable", var(--fluent-fontFamily-fallback)',
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          '--Button-iconOffsetStep': 0,
          ...(ownerState.variant === 'solid' && {
            '&.Mui-focusVisible, &:focus-visible': {
              outlineOffset: '-3px',
              outlineColor: '#fff',
            },
          }),
          ...(ownerState.variant === 'outlined' && {
            '&.Mui-focusVisible, &:focus-visible': {
              outlineOffset: '-3px',
            },
          }),
          ...(ownerState.size === 'md' && {
            '--Icon-fontSize': '20px',
            fontSize: '14px',
            fontWeight: 600,
            minHeight: '32px',
            borderRadius: '2px',
            paddingLeft: 20,
            paddingRight: 20,
          }),
        }),
      },
    },
  },
});
const fluentCode = `const fluentTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          solidBg: '#0078D4',
          solidHoverBg: '#106EBE',
          solidActiveBg: '#005A9E',
          solidDisabledBg: '#F3F2F1',
          solidDisabledColor: '#A19F9D',
        },
        neutral: {
          outlinedBg: '#fff',
          outlinedColor: '#201F1E',
          outlinedDisabledBg: '#F3F2F1',
          outlinedDisabledColor: '#A19F9D',
          outlinedDisabledBorder: '#C8C6C4',
          outlinedBorder: '#8A8886',
          outlinedHoverBg: '#F3F2F1',
          outlinedHoverBorder: undefined,
          outlinedActiveBg: '#EDEBE9',
        },
        focusVisible: '#323130',
      },
    },
  },
  focus: {
    default: {
      outlineOffset: -1,
      outlineWidth: '1px',
    },
  },
  fontFamily: {
    body: '"Segoe UI Variable", var(--fluent-fontFamily-fallback)',
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          '--Button-iconOffsetStep': 0,
          ...(ownerState.variant === 'solid' && {
            '&.Mui-focusVisible, &:focus-visible': {
              outlineOffset: '-3px',
              outlineColor: '#fff',
            },
          }),
          ...(ownerState.variant === 'outlined' && {
            '&.Mui-focusVisible, &:focus-visible': {
              outlineOffset: '-3px',
            },
          }),
          ...(ownerState.size === 'md' && {
            '--Icon-fontSize': '20px',
            fontSize: '14px',
            fontWeight: 600,
            minHeight: '32px',
            borderRadius: '2px',
            paddingLeft: 20,
            paddingRight: 20,
          }),
        }),
      },
    },
  },
});`;

const chakraTheme = extendTheme({
  cssVarPrefix: 'chakra',
  colorSchemes: {
    light: {
      palette: {
        primary: {
          solidBg: '#319795',
          solidHoverBg: '#2C7A7B',
          solidActiveBg: '#285E61',
          outlinedColor: '#2C7A7B',
          outlinedBorder: '#2C7A7B',
          outlinedHoverBorder: undefined,
          outlinedHoverBg: '#E6FFFA',
          outlinedActiveBg: '#B2F5EA',
        },
        focusVisible: 'rgba(66, 153, 225, 0.6)',
      },
    },
  },
  focus: {
    default: {
      outlineWidth: '3px',
    },
  },
  fontFamily: {
    body: 'Inter, var(--chakra-fontFamily-fallback)',
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          '&:focus': theme.focus.default,
          fontWeight: 600,
          ...(ownerState.size === 'md' && {
            borderRadius: '0.375rem',
            paddingInline: '1rem',
          }),
        }),
      },
    },
  },
});
const chakraCode = `const chakraTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          solidBg: '#319795',
          solidHoverBg: '#2C7A7B',
          solidActiveBg: '#285E61',
          outlinedColor: '#2C7A7B',
          outlinedBorder: '#2C7A7B',
          outlinedHoverBorder: undefined,
          outlinedHoverBg: '#E6FFFA',
          outlinedActiveBg: '#B2F5EA',
        },
        focusVisible: 'rgba(66, 153, 225, 0.6)',
      },
    },
  },
  focus: {
    default: {
      outlineWidth: '3px',
    },
  },
  fontFamily: {
    body: 'Inter, var(--chakra-fontFamily-fallback)',
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          '&:focus': theme.focus.default,
          fontWeight: 600,
          ...(ownerState.size === 'md' && {
            borderRadius: '0.375rem',
            paddingInline: '1rem',
          }),
        }),
      },
    },
  },
});`;

const mantineTheme = extendTheme({
  cssVarPrefix: 'mantine',
  colorSchemes: {
    light: {
      palette: {
        primary: {
          solidBg: '#228be6',
          solidHoverBg: '#1c7ed6',
          solidActiveBg: undefined,
          softColor: '#228be6',
          softBg: 'rgba(231, 245, 255, 1)',
          softHoverBg: 'rgba(208, 235, 255, 0.65)',
          softActiveBg: undefined,
          outlinedColor: '#228be6',
          outlinedBorder: '#228be6',
          outlinedHoverBg: 'rgba(231, 245, 255, 0.35)',
          outlinedHoverBorder: undefined,
          outlinedActiveBg: undefined,
        },
      },
    },
  },
  fontFamily: {
    body: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
  },
  focus: {
    default: {
      outlineWidth: '2px',
      outlineOffset: '2px',
      outlineColor: '#339af0',
    },
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          transition: 'initial',
          borderRadius: '4px',
          fontWeight: 600,
          ...(ownerState.size === 'md' && {
            minHeight: '36px',
            fontSize: '14px',
            paddingInline: '18px',
          }),
          '&:active': {
            transform: 'translateY(1px)',
          },
        }),
      },
    },
  },
});
const mantineCode = `const mantineTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          solidBg: '#228be6',
          solidHoverBg: '#1c7ed6',
          solidActiveBg: undefined,
          softColor: '#228be6',
          softBg: 'rgba(231, 245, 255, 1)',
          softHoverBg: 'rgba(208, 235, 255, 0.65)',
          softActiveBg: undefined,
          outlinedColor: '#228be6',
          outlinedBorder: '#228be6',
          outlinedHoverBg: 'rgba(231, 245, 255, 0.35)',
          outlinedHoverBorder: undefined,
          outlinedActiveBg: undefined,
        },
      },
    },
  },
  fontFamily: {
    body: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
  },
  focus: {
    default: {
      outlineWidth: '2px',
      outlineOffset: '2px',
      outlineColor: '#339af0',
    },
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          transition: 'initial',
          borderRadius: '4px',
          fontWeight: 600,
          ...(ownerState.size === 'md' && {
            minHeight: '36px',
            fontSize: '14px',
            paddingInline: '18px',
          }),
          '&:active': {
            transform: 'translateY(1px)',
          },
        }),
      },
    },
  },
});`;

const themes = {
  github: githubTheme,
  fluent: fluentTheme,
  chakra: chakraTheme,
  mantine: mantineTheme,
};
const codes = {
  github: githubCode,
  fluent: fluentCode,
  chakra: chakraCode,
  mantine: mantineCode,
};

const useEnhancedEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

export default function ButtonThemes() {
  // the `node` is used for attaching CSS variables to this demo, you might not need it in your application.
  const [node, setNode] = React.useState(null);
  useEnhancedEffect(() => {
    setNode(document.getElementById('button-themes-demo'));
  }, []);

  const [design, setDesign] = React.useState('github');
  return (
    <Box
      sx={{
        m: -1.5,
        mt: 0.5,
        flexGrow: 1,
        maxWidth: 'calc(100% + 24px)',
        borderRadius: '8px',
        '& .markdown-body pre': {
          margin: 0,
          borderRadius: 'xs',
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
        <CssVarsProvider
          disableNestedContext
          theme={themes[design]}
          colorSchemeNode={node || null}
          colorSchemeSelector="#button-themes-demo"
          modeStorageKey="button-themes-demo"
          colorSchemeStorageKey="button-themes-demo"
        >
          <Box
            id="button-themes-demo"
            sx={{
              flexGrow: 1,
              m: 'auto',
              display: 'flex',
              alignItems: 'center',
              p: 2,
              minHeight: 100,
            }}
          >
            {design === 'github' && (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button color="success">Primary</Button>
                <Button variant="outlined" color="neutral">
                  Default
                </Button>
              </Box>
            )}

            {design === 'fluent' && (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button>Primary</Button>
                <Button variant="outlined" color="neutral">
                  Secondary
                </Button>
              </Box>
            )}

            {design === 'chakra' && (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button>Solid</Button>
                <Button variant="outlined">Outlined</Button>
              </Box>
            )}

            {design === 'mantine' && (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button>Solid</Button>
                <Button variant="soft">Soft</Button>
                <Button variant="outlined">Outlined</Button>
              </Box>
            )}
          </Box>
        </CssVarsProvider>
        <Box
          sx={{
            mx: 'auto',
            pt: 3,
            width: '100%',
            display: 'flex',
            gap: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <FormLabel htmlFor="button-theme">Change the theme:</FormLabel>
          <Select
            slotProps={{
              button: {
                id: 'button-theme',
              },
            }}
            size="sm"
            value={design}
            onChange={(event, newValue) => setDesign(newValue)}
            sx={{ minWidth: 160 }}
          >
            <Option value="github">GitHub</Option>
            <Option value="fluent">Fluent</Option>
            <Option value="chakra">Chakra</Option>
            <Option value="mantine">Mantine</Option>
          </Select>
        </Box>
      </Box>
      <BrandingProvider mode="dark">
        <HighlightedCode
          code={`import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import Button from '@mui/joy/Button';

${codes[design]}

function App() {
  return (
    <CssVarsProvider theme={${design}Theme}>
      <Button>Solid</Button>
      ...other buttons
    </CssVarsProvider>
  );
};
`}
          copyButtonHidden
          language="jsx"
          sx={{
            display: { xs: 'none', md: 'block' },
            maxHeight: '40vh',
            overflow: 'auto',
            borderRadius: '7px',
          }}
        />
      </BrandingProvider>
    </Box>
  );
}
