import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import { Box } from '@mui/system';
import JoyButton, { ButtonProps } from '@mui/joy/Button';
import Switch from '@mui/joy/Switch';

interface FluentButtonProps extends Omit<ButtonProps, 'variant' | 'color'> {
  variant?: 'primary' | 'secondary' | 'text' | 'action';
}

const FluentButton = React.forwardRef<HTMLButtonElement, FluentButtonProps>(function Button(
  props,
  ref,
) {
  const { variant = 'primary', ...other } = props;

  const variantMap = {
    primary: 'contained',
    secondary: 'outlined',
    text: 'text',
    action: 'light',
  };

  return (
    <JoyButton
      color={variant === 'primary' ? 'primary' : 'neutral'}
      variant={variantMap[variant] as ButtonProps['variant']}
      ref={ref}
      {...other}
    />
  );
});

export default function App() {
  return (
    <CssVarsProvider
      theme={{
        colorSchemes: {
          light: {
            palette: {
              primary: {
                lighterAlt: '#EFF6FC',
                lighter: '#DEECF9',
                light: '#C7E0F4',
                tertiary: '#2B88D8',
                main: '#0078D4',
                darkAlt: '#106EBE',
                dark: '#005A9E',
                darker: '#004578',
                containedBg: 'var(--joy-palette-primary-main)',
                containedHoverBg: 'var(--joy-palette-primary-darkAlt)',
                containedActiveBg: 'var(--joy-palette-primary-dark)',
                containedDisabledBg: 'var(--joy-palette-neutral-grey20)',
                containedDisabledColor: 'var(--joy-palette-neutral-grey90)',
              },
              neutral: {
                white: '#FFF',
                grey10: '#FAF9F8',
                grey20: '#F3F2F1',
                grey30: '#EDEBE9',
                grey40: '#E1DFDD',
                grey50: '#D2D0CE',
                grey60: '#C8C6C4',
                grey90: '#A19F9D',
                grey130: '#605E5C',
                grey150: '#3B3A39',
                grey160: '#323130',
                grey190: '#201F1E',
                containedBg: 'var(--joy-palette-neutral-white)',
                containedBorder: 'var(--joy-palette-neutral-white)',

                outlinedBorder: 'rgb(138, 136, 134)',
                outlinedColor: 'var(--joy-palette-neutral-grey190)',
                outlinedHoverBg: 'var(--joy-palette-neutral-grey20)',
                outlinedHoverColor: 'var(--joy-palette-neutral-grey190)',
                outlinedHoverBorder: 'rgb(138, 136, 134)',
                outlinedActiveBg: 'rgb(237, 235, 233)',
                outlinedDisabledBorder: 'var(--joy-palette-neutral-grey20)',
                outlinedDisabledBg: 'var(--joy-palette-neutral-grey20)',
                outlinedDisabledColor: 'var(--joy-palette-neutral-grey90)',

                textHoverBg: 'var(--joy-palette-neutral-grey20)',
                textActiveBg: 'var(--joy-palette-neutral-grey30)',
                // TODO: The tokens available for each variable are very opinionated
                // this again resontates that not all design system would implement
                // the different variants the same way
                // @ts-ignore
                textDisabledBg: 'var(--joy-palette-neutral-grey20)',
                textDisabledColor: 'var(--joy-palette-neutral-grey90)',

                lightBg: 'transparent',
                lightHoverBr: 'transparent',
                lightHoverColor: 'var(--joy-palette-primary-main)',
                lightActiveColor: '#000',
              },
            },
          },
        },
        radius: {
          sm: '2px',
        },
        components: {
          MuiSwitch: {
            styleOverrides: {
              root: ({ ownerState, theme }) => ({
                '--Switch-track-width': '40px',
                '--Switch-track-height': '20px',
                '--Switch-thumb-size': '12px',
                boxSizing: 'border-box',
                '&.Mui-disabled': {
                  '& .MuiSwitch-track': {
                    ...(ownerState.checked && {
                      backgroundColor: 'var(--joy-palette-neutral-grey60)',
                    }),
                  },
                },
                ':hover': {
                  '& .MuiSwitch-thumb': {
                    ...(!ownerState.checked && {
                      backgroundColor: 'black',
                    }),
                  },
                  '& .MuiSwitch-track': {
                    ...(!ownerState.checked && {
                      ':hover': {
                        border: '1px solid black',
                      },
                    }),
                  },
                },
                '& .MuiSwitch-thumb': {
                  boxSizing: 'border-box',
                  ...(!ownerState.checked && {
                    backgroundColor: 'var(--joy-palette-neutral-grey130)',
                  }),
                },
                '& .MuiSwitch-track': {
                  boxSizing: 'border-box',
                  ...(!ownerState.checked && {
                    border: '1px solid var(--joy-palette-neutral-grey130)',
                  }),
                },
                '&.Mui-focusVisible': {
                  outline: 'none',
                  ':after': {
                    content: '""',
                    position: 'absolute',
                    inset: '0px',
                    border: '1px solid transparent',
                    outline: 'rgb(96, 94, 92) solid 1px',
                    zIndex: 1,
                  },
                },
              }),
            },
          },
          MuiButton: {
            styleOverrides: {
              root: ({ ownerState, theme }) => ({
                '--Button-gutter': '16px',
                '--Button-minHeight': '30px',
                // there is no CSS variables for overriding these
                paddingTop: 0,
                paddingBottom: 0,
                lineHeight: '1rem',
                fontSize: '14px',
                fontWeight: 500,
                ...(ownerState.color === 'primary' &&
                  ownerState.variant === 'contained' &&
                  !ownerState.disabled && {
                    boxShadow: 'var(--joy-shadow-md)',
                  }),
                '&.Mui-focusVisible': {
                  outline: 'none',
                  ...(ownerState.color !== 'primary' && {
                    ':after': {
                      content: '""',
                      position: 'absolute',
                      inset: '2px',
                      border: '1px solid transparent',
                      outline: 'rgb(96, 94, 92) solid 1px',
                      zIndex: 1,
                    },
                  }),
                  ...(ownerState.color === 'primary' && {
                    ':after': {
                      content: '""',
                      position: 'absolute',
                      inset: '2px',
                      zIndex: 1,
                      // primary
                      border: 'none',
                      outline: 'rgb(255, 255, 255) solid 1px',
                    },
                  }),
                },
              }),
            },
          },
        },
      }}
    >
      <Box sx={{ '& > * + *': { ml: 3 }, display: 'flex' }}>
        <div>
          <h4>Primary buttons</h4>
          <Box sx={{ '& > * + *': { ml: 1 } }}>
            <FluentButton>Text</FluentButton>
            <FluentButton disabled>Text</FluentButton>
          </Box>
        </div>

        <div>
          <h4>Secondary buttons</h4>
          <Box sx={{ '& > * + *': { ml: 1 } }}>
            <FluentButton variant="secondary">Text</FluentButton>
            <FluentButton variant="secondary" disabled>
              Text
            </FluentButton>
          </Box>
        </div>

        <div>
          <h4>Text buttons</h4>
          <Box sx={{ '& > * + *': { ml: 1 } }}>
            <FluentButton variant="text">Text</FluentButton>
            <FluentButton variant="text" disabled>
              Text
            </FluentButton>
          </Box>
        </div>

        <div>
          <h4>Action buttons</h4>
          <Box sx={{ '& > * + *': { ml: 1 } }}>
            <FluentButton variant="action">Text</FluentButton>
            <FluentButton variant="action" disabled>
              Text
            </FluentButton>
          </Box>
        </div>

        <div>
          <h4>Switch</h4>
          <Box sx={{ '& > * + *': { ml: 1 } }}>
            <Switch defaultChecked />
            <Switch defaultChecked={false} />
            <Switch defaultChecked disabled />
            <Switch defaultChecked={false} disabled />
          </Box>
        </div>
      </Box>
    </CssVarsProvider>
  );
}
