import * as React from 'react';
import { GlobalStyles } from '@mui/styled-engine';
import Box from '@mui/material/Box';
import { styled, CssVarsProvider } from '@mui/joy/styles';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';

const Paper = styled('div')(
  ({ theme, variant = 'text', color = 'neutral', enableContext = false, elevation }) => [
    {
      minWidth: 100,
      minHeight: 120,
      padding: '1rem',
      borderRadius: 4,
      backgroundColor: `var(--joy-variant-${variant}Bg, var(--joy-palette-bgNeutral-plain))`,
      boxShadow: theme.elevation?.[elevation],
    },
    theme.variant[variant]?.[color],
    enableContext && variant === 'contained' && theme.variant.containedContext?.[color],
  ],
);

const Button = styled('button')(
  ({ theme, variant = 'contained', color = 'brand', roundness = 'default', size }) => [
    size === 'small' && {
      '--joy-Button-minHeight': theme.components?.Button?.sizes?.small?.minHeight || '40px',
      '--joy-Button-minWidth': theme.components?.Button?.sizes?.small?.minWidth || '4rem',
      fontSize: theme.components?.Button?.sizes?.small?.fontSize || '0.875rem',
      lineHeight: theme.components?.Button?.sizes?.small?.lineHeight || 1,
    },
    size === 'large' && {
      '--joy-Button-minHeight': theme.components?.Button?.sizes?.large?.minHeight || '56px',
      '--joy-Button-minWidth': theme.components?.Button?.sizes?.large?.minWidth || '6.5rem',
      fontSize: theme.components?.Button?.sizes?.large?.fontSize || '1.125rem',
      lineHeight: theme.components?.Button?.sizes?.large?.lineHeight || 1.5,
    },
    {
      minHeight: `var(--joy-Button-minHeight, ${
        theme.components?.Button?.sizes?.default?.minHeight || '48px'
      })`,
      minWidth: `var(--joy-Button-minWidth, ${
        theme.components?.Button?.sizes?.default?.minWidth || '5rem'
      })`,
      border: 0,
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0.25rem 1rem',
      cursor: 'pointer',
      background: 'transparent',
      borderRadius: theme.borderRadius?.[roundness],
      ...(!size && {
        lineHeight: theme.components?.Button?.sizes?.default?.lineHeight || 1.5,
        fontSize: theme.components?.Button?.sizes?.default?.fontSize || '1rem',
      }),
      '&:focus-visible': theme.focus.default,
    },
    theme.variant[variant]?.[color],
    theme.variant[`${variant}Hover`]?.[color],
    theme.variant[`${variant}Active`]?.[color],
    theme.variant[`${variant}Disabled`]?.[color],
  ],
);

export default function JoySketching() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(375px, 1fr))',
        alignItems: 'center',
        gap: '2rem',
        p: '2rem',
      }}
    >
      <CssVarsProvider prefix="default">
        <GlobalStyles
          styles={(theme) => ({
            body: {
              margin: 0,
              backgroundColor: 'var(--default-palette-bgNeutral-transparency)',
              color: 'var(--default-palette-text-content)',
              ...theme.typography.body,
              '*': {
                boxSizing: 'border-box',
              },
            },
            pre: {
              fontSize: '13px',
            },
          })}
        />
        <Box
          sx={{
            p: '1rem',
            bgcolor: '#fff',
            minHeight: '568px',
          }}
        >
          <h2>Default</h2>
          <Box
            sx={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button size="small">Small</Button>
            <Button>Default</Button>
            <Button size="large">Large</Button>
          </Box>
          <br />
          <Paper variant="contained" sx={{ width: '100%' }}>
            <HighlightedCode
              code={`
<CssVarsProvider prefix="default">
  <Button size="small">Small</Button>
  <Button>Default</Button>
  <Button size="large">Large</Button>
</CssVarsProvider>`}
              component="div"
              language="jsx"
            />
          </Paper>
        </Box>
      </CssVarsProvider>
      <CssVarsProvider
        prefix="dense"
        theme={{
          borderRadius: {
            default: '2px',
          },
          components: {
            Button: {
              sizes: {
                small: {
                  minHeight: '24px',
                },
                default: {
                  minHeight: '32px',
                },
                large: {
                  minHeight: '40px',
                },
              },
            },
          },
        }}
      >
        <Box
          sx={{
            p: '1rem',
            bgcolor: '#fff',
            minHeight: '568px',
          }}
        >
          <h2>Dense (Ant design)</h2>
          <Box
            sx={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button size="small">Small</Button>
            <Button>Default</Button>
            <Button size="large">Large</Button>
          </Box>
          <br />
          <Paper variant="contained" sx={{ width: '100%' }}>
            <HighlightedCode
              code={`
<CssVarsProvider
  prefix="dense"
  theme={{
    borderRadius: {
      default: '2px',
    },
    components: {
      Button: {
        sizes: {
          small: {
            minHeight: '24px',
          },
          default: {
            minHeight: '32px',
          },
          large: {
            minHeight: '40px',
          },
        },
      },
    },
  }}
>`}
              component="div"
              language="jsx"
            />
          </Paper>
        </Box>
      </CssVarsProvider>
      <CssVarsProvider
        prefix="marketing"
        theme={{
          borderRadius: {
            default: 8,
          },
          components: {
            Button: {
              sizes: {
                small: {
                  minHeight: '48px',
                  minWidth: '5rem',
                  fontSize: '1rem',
                },
                default: {
                  minHeight: '56px',
                  minWidth: '7rem',
                  fontSize: '1.125rem',
                },
                large: {
                  minHeight: '64px',
                  minWidth: '8rem',
                  fontSize: '1.25rem',
                },
              },
            },
          },
        }}
      >
        <Box
          sx={{
            p: '1rem',
            bgcolor: '#fff',
            minHeight: '568px',
          }}
        >
          <h2>Marketing page</h2>
          <Box
            sx={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button size="small">Small</Button>
            <Button>Default</Button>
            <Button size="large">Large</Button>
          </Box>
          <br />
          <Paper variant="contained" sx={{ width: '100%' }}>
            <HighlightedCode
              code={`
<CssVarsProvider
  prefix="marketing"
  theme={{
    borderRadius: {
      default: 8,
    },
    components: {
      Button: {
        sizes: {
          small: {
            minHeight: '48px',
            minWidth: '5rem',
          },
          default: {
            minHeight: '56px',
            minWidth: '7rem',
          },
          large: {
            minHeight: '64px',
            minWidth: '8rem',
          },
        },
      },
    },
  }}
>`}
              component="div"
              language="jsx"
            />
          </Paper>
        </Box>
      </CssVarsProvider>
    </Box>
  );
}
