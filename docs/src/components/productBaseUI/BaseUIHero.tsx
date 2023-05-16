import * as React from 'react';
import clsx from 'clsx';
import useSelect, { SelectProvider } from '@mui/base/useSelect';
import OptionUnstyled from '@mui/base/Option';
import SwitchUnstyled from '@mui/base/Switch';
import { styled } from '@mui/system';
import Box, { BoxProps } from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import HeroContainer from 'docs/src/layouts/HeroContainer';
import IconImage from 'docs/src/components/icon/IconImage';
import GradientText from 'docs/src/components/typography/GradientText';
import ROUTES from 'docs/src/route';
import ArrowDropDownRounded from '@mui/icons-material/ArrowDropDownRounded';
import ToggleOn from '@mui/icons-material/ToggleOn';
import SmartButtonRoundedIcon from '@mui/icons-material/SmartButtonRounded';
import InputRoundedIcon from '@mui/icons-material/InputRounded';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import PlaylistAddCheckRoundedIcon from '@mui/icons-material/PlaylistAddCheckRounded';
import CodeSandbox from 'docs/src/modules/sandbox/CodeSandbox';
import GetStartedButtons2 from '../home/GetStartedButtons2';

const StyledSwitchRoot = styled('span')(`
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 32px;
  height: 18px;
  cursor: pointer;
  border-radius: 16px;
  border: 1px solid var(--muidocs-palette-primary-300);

  &.Mui-disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &.Mui-checked {
    background-color: rgba(var(--muidocs-palette-primary-lightChannel) / 0.2);
    & .MuiSwitch-thumb {
      background-color: var(--muidocs-palette-primary-main);
      border-color: var(--muidocs-palette-primary-main);
      left: 16px;
    }
  }

  &.Mui-focusVisible {
    outline: 2px solid var(--muidocs-palette-primary-main);
    outline-offset: 2px;
  }

  :where([data-mui-color-scheme="dark"]) & {
    border: 1px solid var(--muidocs-palette-primaryDark-400);
    &.Mui-checked {
      & .MuiSwitch-thumb {
        background-color: var(--muidocs-palette-primary-300);
        border-color: var(--muidocs-palette-primary-300);
      }
    }
  }
`);

const StyledSwitchInput = styled('input')`
  cursor: inherit;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 1;
  margin: 0;
`;

const StyledSwitchThumb = styled('span')`
  display: block;
  width: 12px;
  height: 12px;
  top: 2px;
  left: 2px;
  border-radius: 12px;
  background-color: rgba(var(--muidocs-palette-primary-lightChannel) / 0.5);
  border: 1px solid var(--muidocs-palette-primary-300);
  position: relative;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;

  &.Mui-checked {
    left: 20px;
  }

  :where([data-mui-color-scheme='dark']) & {
    border: 1px solid var(--muidocs-palette-primaryDark-400);
    background-color: rgba(var(--muidocs-palette-primary-lightChannel) / 0.2);
  }
`;

function CustomSelect() {
  const buttonRef = React.useRef<HTMLElement | null>(null);

  const {
    buttonActive,
    buttonFocusVisible,
    contextValue,
    disabled,
    getButtonProps,
    getListboxProps,
    getOptionMetadata,
    value,
  } = useSelect<string>({ buttonRef });

  const selectedOption = getOptionMetadata(value!);

  return (
    <React.Fragment>
      <button
        type="button"
        className={clsx(
          'MuiSelect-root',
          buttonFocusVisible && 'Mui-focusVisible',
          buttonActive && 'Mui-active',
          disabled && 'Mui-disabled',
        )}
        {...getButtonProps()}
      >
        <Box sx={{ color: selectedOption ? undefined : 'grey.600' }}>
          {selectedOption?.label ?? 'choose an option'}
        </Box>
        <ArrowDropDownRounded sx={{ mr: -1 }} />
      </button>
      <SelectProvider value={contextValue}>
        <ul className="MuiSelect-listbox" {...getListboxProps()}>
          <li role="none">
            <ul role="group" aria-label="input components">
              <li role="presentation">Input components</li>
              <OptionUnstyled value="1">
                <SmartButtonRoundedIcon />
                Button
              </OptionUnstyled>
              <OptionUnstyled value="2">
                <InputRoundedIcon />
                Input
              </OptionUnstyled>
              <OptionUnstyled value="3">
                <PlaylistAddCheckRoundedIcon />
                Select
              </OptionUnstyled>
              <OptionUnstyled value="4">
                <ToggleOn /> Switch
              </OptionUnstyled>
            </ul>
          </li>
          <li role="none">
            <ul role="group" aria-label="Utils">
              <li role="presentation">Utils</li>
              <OptionUnstyled value="6">Click-away listener</OptionUnstyled>
              <OptionUnstyled value="7">Form control</OptionUnstyled>
              <OptionUnstyled value="8">Modal</OptionUnstyled>
              <OptionUnstyled value="9">No SSR</OptionUnstyled>
            </ul>
          </li>
        </ul>
      </SelectProvider>
    </React.Fragment>
  );
}

function Demo({ label }: { label: string }) {
  return (
    <Box
      sx={{
        position: 'relative',
        width: 'var(--Select-width)',
        maxHeight: '100%',
        '& > button': {
          width: '100%',
          '&:empty:before': { content: '"Select an option"', color: 'text.tertiary' },
        },
        '&:is(ul)': {
          margin: 0,
        },
      }}
    >
      <Typography sx={{ mb: 0.75, fontSize: 12, color: 'text.tertiary', fontWeight: 'bold' }}>
        {label}
      </Typography>
      <CustomSelect />
    </Box>
  );
}

function Wrapper({ sx, children, ...props }: BoxProps) {
  return (
    <Box
      {...props}
      sx={[
        { width: '100%', height: '100%', overflow: 'hidden' },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        sx={{
          width: 'var(--frame-width)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

const RAW = `import * as React from 'react';
import { styled } from '@mui/material/styles';
import SelectUnstyled from '@mui/base/Select';
import OptionUnstyled from '@mui/base/Option';
import ArrowDropDownRounded from '@mui/icons-material/ArrowDropDownRounded';
import ToggleOn from '@mui/icons-material/ToggleOn';
import SmartButtonRoundedIcon from '@mui/icons-material/SmartButtonRounded';
import InputRoundedIcon from '@mui/icons-material/InputRounded';
import PlaylistAddCheckRoundedIcon from '@mui/icons-material/PlaylistAddCheckRounded';
import LinearScaleRoundedIcon from '@mui/icons-material/LinearScaleRounded';

const Wrapper = styled('div')({
  '--muidocs-palette-primary-main': '#007FFF',
  '--muidocs-palette-grey-50': '#F3F6F9',
  '--muidocs-palette-grey-100': '#E7EBF0',
  '--muidocs-palette-grey-200': '#E0E3E7',
  '--muidocs-palette-text-primary': '#1A2027',
  '--muidocs-palette-text-secondary': '#3E5060',
  '--muidocs-palette-text-tertiary': '#6F7E8C',
  '--muidocs-font-family': '-apple-system, BlinkMacSystemFont, “Segoe UI”, “Roboto”, “Oxygen”, “Ubuntu”, “Cantarell”, “Fira Sans”, “Droid Sans”, “Helvetica Neue”, sans-serif',
  '--Select-width': '320px',
  '--Select-radius': '12px',
  '--Select-spacing': '12px',
  boxSizing: 'border-box',
  '& *:focus-visible': {
    outline: '2px solid',
    outlineColor: 'var(--muidocs-palette-grey-200)',
  },
  '& .MuiSelect-root': {
    width: '100%',
    maxWidth: '100%',
    border: '1px solid',
    borderColor: 'var(--muidocs-palette-grey-200)',
    borderRadius: 'var(--Select-radius)',
    height: '45px',
    padding: 'var(--Select-spacing) calc(var(--Select-spacing) * 1.5)',
    backgroundColor: 'var(--muidocs-palette-background-paper)',
    display: 'flex',
    color: 'var(--muidocs-palette-text-secondary)',
    alignItems: 'center',
    fontSize: '0.875rem',
    fontFamily: 'var(--muidocs-font-family)',
    lineHeight: 21 / 14,
    '& svg:last-child': {
      marginLeft: 'auto',
    },
    '& svg:first-child': {
      marginRight: 'var(--Select-spacing)',
    },
    '&:not(:empty)': {
      fontWeight: 500,
    },
  },
  '& .MuiSelect-listbox': {
    display: 'flex',
    flexDirection: 'column',
    margin: 'var(--Select-spacing) 0',
    border: '1px solid',
    borderColor: 'var(--muidocs-palette-grey-200)',
    borderRadius: 'var(--Select-radius)',
    backgroundColor: 'var(--muidocs-palette-background-paper)',
    boxShadow: '0px 4px 40px rgba(62, 80, 96, 0.1)',
    padding: 'calc(var(--Select-spacing) * 1.5)',
    gap: 'calc(var(--Select-spacing) * 1.5)',
    fontFamily: 'var(--muidocs-font-family)',
    fontSize: '0.875rem',
    lineHeight: 21 / 14,
    '& ul': {
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
    },
    '& li': {
      minHeight: 32,
      display: 'flex',
      borderRadius: '4px',
      '&[role="none"]': {
        flexDirection: 'column',
        padding: 0,
        '& > ul': {
          padding: 0,
        },
      },
      '&[role="presentation"]': {
        fontSize: '0.625rem',
        color: 'var(--muidocs-palette-text-tertiary)',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        alignItems: 'center',
        minHeight: 0,
        paddingBottom: '0.5rem',
      },
      '&[role="option"]': {
        boxSizing: 'border-box',
        border: '1px solid transparent',
        padding: 'calc(var(--Select-spacing) * 0.75)',
        fontSize: '0.875rem',
        fontWeight: 500,
        color: 'var(--muidocs-palette-text-secondary)',
        alignItems: 'center',
        cursor: 'pointer',
        borderRadius: 'calc(var(--Select-radius) - var(--Select-spacing) / 2)',
        '&:hover, &.MuiOption-highlighted': {
          backgroundColor: 'var(--muidocs-palette-grey-50)',
          color: 'var(--muidocs-palette-text-primary)',
        },
        '&.Mui-selected': {
          backgroundColor: 'var(--muidocs-palette-grey-50)',
          borderColor: 'var(--muidocs-palette-grey-100)',
          color: 'var(--muidocs-palette-text-primary)',
        },
        '& svg:first-child': {
          color: 'var(--muidocs-palette-primary-main)',
          marginRight: 'var(--Select-spacing)',
          fontSize: '1.125rem',
        },
      },
    },
  },
})

const Div = React.forwardRef<
  HTMLDivElement,
  { anchorEl?: any; ownerState?: any; open?: any; placement?: any }
>(function Div({ anchorEl, ownerState, open, placement, ...props }, ref) {
  return <div ref={ref} {...props} />;
});

export default function Demo() {
  return (
    <Wrapper>
      <SelectUnstyled
        listboxOpen
        defaultValue="3"
        autoFocus={false}
        renderValue={(option) => (
          <React.Fragment>
            <span>{option?.label ?? 'choose an option'}</span>
            <ArrowDropDownRounded />
          </React.Fragment>
        )}
        slots={{ popper: Div }}
      >
        <li role="none">
          <ul role="group" aria-label="input components">
            <li role="presentation">Input components</li>
            <OptionUnstyled value="1">
              <SmartButtonRoundedIcon />
              Button
            </OptionUnstyled>
            <OptionUnstyled value="2">
              <InputRoundedIcon />
              Input
            </OptionUnstyled>
            <OptionUnstyled value="3">
              <PlaylistAddCheckRoundedIcon />
              Select
            </OptionUnstyled>
            <OptionUnstyled value="4">
              <ToggleOn /> Switch
            </OptionUnstyled>
            <OptionUnstyled value="5">
              <LinearScaleRoundedIcon />
              Slider
            </OptionUnstyled>
          </ul>
        </li>
        <li role="none">
          <ul role="group" aria-label="Utils">
            <li role="presentation">Utils</li>
            <OptionUnstyled value="6">Click-away listener</OptionUnstyled>
            <OptionUnstyled value="7">Form control</OptionUnstyled>
            <OptionUnstyled value="8">Modal</OptionUnstyled>
            <OptionUnstyled value="9">No SSR</OptionUnstyled>
            <OptionUnstyled value="10">Textarea autosize</OptionUnstyled>
          </ul>
        </li>
      </SelectUnstyled>
    </Wrapper>
  )
}
`;

export default function BaseUIHero() {
  const [customized, setCustomized] = React.useState(true);
  return (
    <HeroContainer
      linearGradient
      left={
        <Box sx={{ textAlign: { xs: 'center', md: 'left' }, ml: { xl: '-40px' } }}>
          <Typography
            fontWeight="bold"
            variant="body2"
            sx={(theme) => ({
              color: 'primary.600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: { xs: 'center', md: 'flex-start' },
              '& > *': { mr: 1 },
              ...theme.applyDarkStyles({
                color: 'primary.300',
              }),
            })}
          >
            <IconImage width={28} height={28} name="product-core" /> MUI Core{' '}
            <Typography component="span" variant="inherit" sx={{ color: 'text.primary' }}>
              &nbsp;&nbsp;
              <Typography component="span" variant="inherit" sx={{ color: 'divider' }}>
                /
              </Typography>
              &nbsp;&nbsp;Base UI
            </Typography>
          </Typography>
          <Typography
            variant="h1"
            sx={{
              my: 2,
              maxWidth: { xs: 500, md: 'unset' },
              minWidth: { lg: 650 },
              position: 'relative',
              zIndex: 1,
            }}
          >
            A <GradientText>blank canvas</GradientText> for <br />
            total flexibility
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 500 }}>
            Base UI gives you a set of foundational &quot;headless&quot; components that you can
            build with using any styling solution you choose—no need to override any default style
            engine or theme.
          </Typography>
          <GetStartedButtons2
            getStartedUrl={ROUTES.baseDocs}
            learnUrl=""
            learnLabel="Learn Base UI"
            installation="npm install @mui/base"
          />
        </Box>
      }
      right={
        <Box
          sx={{
            '--Select-width': '320px',
            '--Select-radius': '12px',
            '--Select-spacing': {
              xs: '8px',
              lg: '12px',
            },
            position: 'relative',
            height: '100%',
            padding: '16px',
            '&:focus': {
              outlineColor: '#202020',
            },
          }}
        >
          <Wrapper
            sx={[
              { inset: 0, position: 'absolute', backgroundColor: 'inherit', py: 2 },
              customized
                ? {
                    '& *:focus-visible': {
                      outline: '2px solid',
                      outlineColor: 'var(--muidocs-palette-grey-200)',
                    },
                    '& .MuiSelect-root': {
                      width: '100%',
                      maxWidth: '100%',
                      border: '1px solid',
                      borderColor: 'var(--muidocs-palette-grey-200)',
                      borderRadius: 'var(--Select-radius)',
                      height: '45px',
                      padding: 'var(--Select-spacing) calc(var(--Select-spacing) * 1.5)',
                      backgroundColor: 'var(--muidocs-palette-background-paper)',
                      display: 'flex',
                      color: 'var(--muidocs-palette-text-secondary)',
                      alignItems: 'center',
                      fontSize: '0.875rem',
                      fontFamily: 'var(--muidocs-font-family)',
                      lineHeight: 21 / 14,
                      '& svg:last-child': {
                        marginLeft: 'auto',
                      },
                      '& svg:first-child': {
                        marginRight: 'var(--Select-spacing)',
                      },
                      '&:not(:empty)': {
                        fontWeight: 500,
                      },
                    },
                    '& .MuiSelect-listbox': {
                      display: 'flex',
                      flexDirection: 'column',
                      margin: 'var(--Select-spacing) 0',
                      border: '1px solid',
                      borderColor: 'var(--muidocs-palette-grey-200)',
                      borderRadius: 'var(--Select-radius)',
                      backgroundColor: 'var(--muidocs-palette-background-paper)',
                      boxShadow: '0px 4px 40px rgba(62, 80, 96, 0.1)',
                      padding: 'calc(var(--Select-spacing) * 1.5)',
                      gap: 'calc(var(--Select-spacing) * 1.5)',
                      fontFamily: 'var(--muidocs-font-family)',
                      fontSize: '0.875rem',
                      lineHeight: 21 / 14,
                      '& ul': {
                        padding: 0,
                        display: 'flex',
                        flexDirection: 'column',
                      },
                      '& li': {
                        minHeight: 32,
                        display: 'flex',
                        borderRadius: '4px',
                        '&[role="none"]': {
                          flexDirection: 'column',
                          padding: 0,
                          '& > ul': {
                            padding: 0,
                          },
                        },
                        '&[role="presentation"]': {
                          fontSize: '0.625rem',
                          color: 'var(--muidocs-palette-text-tertiary)',
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          alignItems: 'center',
                          minHeight: 0,
                          paddingBottom: '0.5rem',
                        },
                        '&[role="option"]': {
                          boxSizing: 'border-box',
                          border: '1px solid transparent',
                          padding: 'calc(var(--Select-spacing) * 0.75)',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          color: 'var(--muidocs-palette-text-secondary)',
                          alignItems: 'center',
                          cursor: 'pointer',
                          borderRadius: 'calc(var(--Select-radius) - var(--Select-spacing) / 2)',
                          '&:hover, &.MuiOption-highlighted': {
                            backgroundColor: 'var(--muidocs-palette-grey-50)',
                            color: 'var(--muidocs-palette-text-primary)',
                          },
                          '&.Mui-selected': {
                            backgroundColor: 'var(--muidocs-palette-grey-50)',
                            borderColor: 'var(--muidocs-palette-grey-100)',
                            color: 'var(--muidocs-palette-text-primary)',
                          },
                          '& svg:first-child': {
                            color: 'var(--muidocs-palette-primary-main)',
                            marginRight: 'var(--Select-spacing)',
                            fontSize: '1.125rem',
                          },
                        },
                      },
                    },
                  }
                : null,
              customized
                ? (theme) =>
                    theme.applyDarkStyles({
                      '& *:focus-visible': {
                        outline: '2px solid',
                        outlineColor: (theme.vars || theme).palette.primaryDark[700],
                      },
                      '& .MuiSelect-root': {
                        color: '#fff',
                        borderColor: 'primaryDark.700',
                      },
                      '& svg': { color: 'primary.300' },
                      '& .MuiSelect-listbox': {
                        borderColor: 'primaryDark.700',
                        boxShadow: '0px 4px 40px rgba(11, 13, 14, 0.5)',
                        '& li[role="presentation"]': {
                          color: 'grey.600',
                        },
                        '& li[role="option"]': {
                          color: 'grey.500',
                          '&:hover, &.MuiOption-highlighted': {
                            bgcolor: 'primaryDark.700',
                          },
                          '&.Mui-selected': {
                            color: '#fff',
                            bgcolor: 'primaryDark.700',
                            borderColor: 'primaryDark.500',
                          },
                        },
                      },
                    })
                : null,
            ]}
          >
            <Demo label="Select a component" />
          </Wrapper>
          <Box
            sx={{
              zIndex: 1,
              position: 'absolute',
              left: '0.75rem',
              right: '0.75rem',
              bottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Button
              variant="outlined"
              size="small"
              startIcon={<LaunchRoundedIcon />}
              onClick={() =>
                CodeSandbox.createReactApp({
                  product: 'base',
                  codeVariant: 'TS',
                  title: 'Base UI - Select demo',
                  githubLocation: '',
                  language: 'en',
                  raw: RAW,
                }).openSandbox('/demo')
              }
            >
              View on CodeSandbox
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SwitchUnstyled
                slots={{
                  root: StyledSwitchRoot,
                  input: StyledSwitchInput,
                  thumb: StyledSwitchThumb,
                }}
                slotProps={{
                  input: {
                    id: 'styled-switch',
                  },
                }}
                checked={customized}
                onChange={(event) => {
                  setCustomized(event.target.checked);
                }}
              />
              <Typography
                component="label"
                htmlFor="styled-switch"
                sx={{ color: 'primary.main', fontSize: '0.75rem', fontWeight: 600 }}
              >
                Toggle styles
              </Typography>
            </Box>
          </Box>
        </Box>
      }
    />
  );
}
