import * as React from 'react';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';

const palette = {
  primary: {
    solidBg: '#0d6efd',
    solidBorder: '#0d6efd',
    solidHoverBg: '#0b5ed7',
    solidHoverBorder: '#0a58ca',
    solidActiveBg: '#0a58ca',
    solidActiveBorder: '#0a53be',
    solidDisabledBg: '#0d6efd',
    solidDisabledBorder: '#0d6efd',
  },
  neutral: {
    solidBg: '#6c757d',
    solidBorder: '#6c757d',
    solidHoverBg: '#5c636a',
    solidHoverBorder: '#565e64',
    solidActiveBg: '#565e64',
    solidActiveBorder: '#51585e',
    solidDisabledBg: '#6c757d',
    solidDisabledBorder: '#6c757d',
    // btn-light
    softColor: '#000',
    softBg: '#f8f9fa',
    softBorder: '#f8f9fa',
    softHoverBg: '#f9fafb',
    softHoverBorder: '#f9fafb',
    softActiveBg: '#f9fafb',
    softActiveBorder: '#f9fafb',
    softDisabledBg: '#f8f9fa',
    softDisabledBorder: '#f8f9fa',
  },
  success: {
    solidBg: '#198754',
    solidBorder: '#198754',
    solidHoverBg: '#157347',
    solidHoverBorder: '#146c43',
    solidActiveBg: '#146c43',
    solidActiveBorder: '#13653f',
    solidDisabledBg: '#198754',
    solidDisabledBorder: '#198754',
  },
  danger: {
    solidBg: '#dc3545',
    solidBorder: '#dc3545',
    solidHoverBg: '#bb2d3b',
    solidHoverBorder: '#b02a37',
    solidActiveBg: '#b02a37',
    solidActiveBorder: '#a52834',
    solidDisabledBg: '#dc3545',
    solidDisabledBorder: '#dc3545',
  },
  warning: {
    solidColor: '#000',
    solidBg: '#ffc107',
    solidBorder: '#ffc107',
    solidHoverBg: '#ffca2c',
    solidHoverBorder: '#ffc720',
    solidActiveBg: '#ffcd39',
    solidActiveBorder: '#ffc720',
    solidDisabledBg: '#ffc107',
    solidDisabledBorder: '#ffc107',
  },
  info: {
    solidColor: '#000',
    solidBg: '#0dcaf0',
    solidBorder: '#0dcaf0',
    solidHoverBg: '#31d2f2',
    solidHoverBorder: '#25cff2',
    solidActiveBg: '#3dd5f3',
    solidActiveBorder: '#25cff2',
    solidDisabledBg: '#0dcaf0',
    solidDisabledBorder: '#0dcaf0',
  },
};

const bootstrapTheme = extendTheme({
  cssVarPrefix: 'bs',
  colorSchemes: {
    light: { palette },
    dark: { palette },
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          letterSpacing: 'normal',
          fontWeight: theme.vars.fontWeight.md,
          fontFamily: theme.vars.fontFamily.fallback,
          outlineWidth: 0,
          borderRadius: '0.375rem',
          transition:
            'color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out',
          ...(ownerState.size === 'md' && {
            paddingInline: '0.75rem',
            minHeight: 38,
          }),
        }),
      },
    },
  },
});

const useEnhancedEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

export default function BootstrapVariantTokens() {
  // the `node` is used for attaching CSS variables to this demo, you might not need it in your application.
  const [node, setNode] = React.useState(null);
  useEnhancedEffect(() => {
    setNode(document.getElementById('bootstrap-buttons-demo'));
  }, []);

  return (
    <CssVarsProvider theme={bootstrapTheme} colorSchemeNode={node || null}>
      <Box
        id="bootstrap-buttons-demo"
        sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}
      >
        <Button>Primary</Button>
        <Button color="neutral">Secondary</Button>
        <Button color="success">Success</Button>
        <Button color="danger">Danger</Button>
        <Button color="warning">Warning</Button>
        <Button variant="soft" color="neutral">
          Light
        </Button>
      </Box>
    </CssVarsProvider>
  );
}
