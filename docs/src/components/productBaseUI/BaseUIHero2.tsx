import * as React from 'react';
import clsx from 'clsx';
import Button from '@mui/base/Button';
import Switch, { switchClasses } from '@mui/base/Switch';
import Select, { SelectProps, selectClasses } from '@mui/base/Select';
import Slider, { sliderClasses } from '@mui/base/Slider';
import Option, { optionClasses } from '@mui/base/Option';
import Popper from '@mui/base/Popper';
import Tabs from '@mui/base/Tabs';
import Tab from '@mui/base/Tab';
import TabsList from '@mui/base/TabsList';
import Modal from '@mui/base/Modal';
import Snackbar from '@mui/base/Snackbar';
import { SnackbarCloseReason } from '@mui/base/useSnackbar';
import TabPanel from '@mui/base/TabPanel';
import { styled } from '@mui/system';
import Box, { BoxProps } from '@mui/material/Box';
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

const Panel = styled('div')({
  width: 340,
  backgroundColor: 'var(--muidocs-palette-background-paper)',
  borderRadius: 'var(--border-radius)',
  border: 'var(--border-width) solid',
  borderColor: 'var(--border-color)',
  boxShadow: '0 4px 40px 0 rgba(62, 80, 96, 0.15)',
});

const StyledTabsList = styled('div')({
  display: 'flex',
  borderBottom: '1px solid var(--border-color)',
});

const StyledTab = styled('button')({
  flex: 1,
  minHeight: 40,
  padding: '0.5rem 1rem',
  background: 'transparent',
  border: 'none',
  position: 'relative',
  fontWeight: 600,
  '&.Mui-selected': {
    color: 'var(--color-primary)',
    '&::after': {
      content: '""',
      display: 'block',
      height: 2,
      left: 0,
      right: 0,
      bottom: '-1px',
      position: 'absolute',
      backgroundColor: 'var(--color-primary)',
    },
  },
});

const StyledButton = styled('button')({
  width: '100%',
  maxWidth: '100%',
  border: '1px solid',
  borderColor: 'var(--muidocs-palette-grey-200)',
  borderRadius: 'var(--Select-radius)',
  padding: '8px 12px',
  backgroundColor: 'var(--muidocs-palette-background-paper)',
  display: 'flex',
  color: 'var(--muidocs-palette-text-secondary)',
  alignItems: 'center',
  fontSize: '0.875rem',
  fontFamily: 'var(--muidocs-font-family)',
  lineHeight: 21 / 14,
  boxShadow: 'var(--muidocs-shadows)',
  '& svg:last-child': {
    marginLeft: 'auto',
  },
  '& svg:first-child': {
    marginRight: 'var(--Select-spacing)',
  },
  '&:not(:empty)': {
    fontWeight: 500,
  },
});

const StyledPopper = styled(Popper)({
  zIndex: 1,
});

const StyledListbox = styled('ul')({
  width: 'calc(320px - 2rem)',
  display: 'flex',
  flexDirection: 'column',
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
  margin: 'var(--Select-spacing) 0',
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
});

const marks = [
  {
    value: 0,
    label: '0°C',
  },
  {
    value: 20,
    label: '20°C',
  },
  {
    value: 37,
    label: '37°C',
  },
  {
    value: 100,
    label: '100°C',
  },
];

function valuetext(value: number) {
  return `${value}°C`;
}

const StyledSlider = styled(Slider)(`
  color: var(--color-primary);
  height: 6px;
  width: 100%;
  padding: 16px 0;
  display: inline-block;
  position: relative;
  cursor: pointer;
  touch-action: none;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    opacity: 1;
  }

  & .${sliderClasses.rail} {
    display: block;
    position: absolute;
    width: 100%;
    height: 4px;
    border-radius: 2px;
    background-color: currentColor;
    opacity: 0.4;
  }

  & .${sliderClasses.track} {
    display: block;
    position: absolute;
    height: 4px;
    border-radius: 2px;
    background-color: currentColor;
  }

  & .${sliderClasses.thumb} {
    position: absolute;
    width: 16px;
    height: 16px;
    margin-left: -6px;
    margin-top: -6px;
    box-sizing: border-box;
    border-radius: 50%;
    outline: 0;
    border: 3px solid currentColor;
    background-color: #fff;

    :hover,
    &.${sliderClasses.focusVisible} {
      box-shadow: 0 0 0 0.25rem;
    }

    &.${sliderClasses.active} {
      box-shadow: 0 0 0 0.25rem;
    }
  }

  & .${sliderClasses.mark} {
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 99%;
    background-color: var(--color-primary);
    top: 43%;
    transform: translateX(-50%);
  }

  & .${sliderClasses.markActive} {
    background-color: var(--color-primary);
  }

  & .${sliderClasses.markLabel} {
    font-family: IBM Plex Sans;
    font-weight: 600;
    font-size: 12px;
    position: absolute;
    top: 20px;
    transform: translateX(-50%);
    margin-top: 8px;
  }
`);

const StyledSwitch = styled('span')(`
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 34px;
  height: 20px;
  cursor: pointer;

  &.${switchClasses.disabled} {
    opacity: 0.4;
    cursor: not-allowed;
  }

  & .${switchClasses.track} {
    background: var(--muidocs-palette-grey-400);
    border-radius: 16px;
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
  }

  & .${switchClasses.thumb} {
    display: block;
    width: 14px;
    height: 14px;
    top: 3px;
    left: 3px;
    border-radius: 16px;
    background-color: #fff;
    position: relative;
    
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 120ms;
  }

  &.${switchClasses.focusVisible} .${switchClasses.thumb} {
    background-color: var(--muidocs-palette-grey-500);
    box-shadow: 0 0 1px 8px rgba(0, 0, 0, 0.25);
  }

  &.${switchClasses.checked} {
    .${switchClasses.thumb} {
      left: 17px;
      top: 3px;
      background-color: #fff;
    }

    .${switchClasses.track} {
      background: var(--muidocs-palette-primary-500);
    }
  }

  & .${switchClasses.input} {
    cursor: inherit;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
    margin: 0;
  }
  `);

const Backdrop = React.forwardRef<HTMLDivElement, { open?: boolean; className: string }>(
  (props, ref) => {
    const { open, className, ...other } = props;
    return <div className={clsx({ 'MuiBackdrop-open': open }, className)} ref={ref} {...other} />;
  },
);

const StyledModal = styled(Modal)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

export default function BaseUIHero() {
  const [customized, setCustomized] = React.useState(true);
  // Modal
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  // Snackbar
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleCloseSnackbar = (_: any, reason: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleClickSnackbar = () => {
    setOpenSnackbar(true);
  };

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
            learnUrl={ROUTES.baseQuickstart}
            learnLabel="Learn Base UI"
            installation="npm install @mui/base"
          />
        </Box>
      }
      right={
        <Box
          sx={{
            position: 'relative',
            height: '100%',
            padding: '16px',
            display: 'flex',
            '& > div': { margin: 'auto' },
            // variables for the demo
            '--color-primary': 'var(--muidocs-palette-primary-main)',
            '--border-width': '1px',
            '--border-color': 'var(--muidocs-palette-grey-200)',
            '--border-radius': '12px',
            '--Select-radius': '12px',
            '--Select-spacing': '12px',
          }}
        >
          <Panel>
            <Tabs defaultValue={1}>
              <TabsList slots={{ root: StyledTabsList }}>
                <Tab slots={{ root: StyledTab }} value={1}>
                  Sleek
                </Tab>
                <Tab slots={{ root: StyledTab }} value={2}>
                  Retro
                </Tab>
                <Tab slots={{ root: StyledTab }} value={3}>
                  Playful
                </Tab>
              </TabsList>
            </Tabs>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: '1rem',
                py: '0.5rem',
                borderBottom: '1px solid var(--border-color)',
              }}
            >
              <p>Notifications</p>
              <Box sx={{ height: 32, width: 32, background: '#202020', borderRadius: 99 }} />
            </Box>
            <Box
              sx={{
                px: '1rem',
                pt: '1rem',
                pb: '1.5rem',
                borderBottom: '1px solid var(--border-color)',
              }}
            >
              <Box component="label">Search for a hook</Box>
              <Select
                defaultValue={10}
                slots={{
                  root: StyledButton,
                  popper: StyledPopper,
                  listbox: StyledListbox,
                }}
                slotProps={{
                  popper: {
                    disablePortal: true,
                  },
                }}
              >
                <Option value={10}>Ten</Option>
                <Option value={20}>Twenty</Option>
                <Option value={30}>Thirty</Option>
              </Select>
            </Box>
            <Box
              sx={{
                px: '1rem',
                pt: '1rem',
                pb: '1.5rem',
                borderBottom: '1px solid var(--border-color)',
              }}
            >
              <Box component="label">Select a component</Box>
              <Select
                defaultValue={10}
                slots={{
                  root: StyledButton,
                  popper: StyledPopper,
                  listbox: StyledListbox,
                }}
                slotProps={{
                  popper: {
                    disablePortal: true,
                  },
                }}
              >
                <Option value={10}>Ten</Option>
                <Option value={20}>Twenty</Option>
                <Option value={30}>Thirty</Option>
              </Select>
            </Box>
            <Box
              sx={{
                px: '1rem',
                pt: '1rem',
                pb: '1.5rem',
                borderBottom: '1px solid var(--border-color)',
              }}
            >
              <div>Choose a temperature</div>
              <StyledSlider
                aria-label="Temperature"
                defaultValue={37}
                getAriaValueText={valuetext}
                marks={marks}
              />
            </Box>
            <Box
              sx={{
                p: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                borderBottom: '1px solid var(--border-color)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div id="make-it-your-own">Make it your own</div>
                <Switch
                  slots={{
                    root: StyledSwitch,
                  }}
                  slotProps={{
                    input: { 'aria-labelledby': 'make-it-your-own' },
                  }}
                  defaultChecked
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div id="make-it-your-own">Use every component</div>
                <Switch
                  slots={{
                    root: StyledSwitch,
                  }}
                  slotProps={{
                    input: { 'aria-labelledby': 'Use every component' },
                  }}
                  defaultChecked
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                p: '1rem',
                gap: '0.5rem',
                borderBottom: '1px solid var(--border-color)',
                '& > button': { flex: 1 },
              }}
            >
              <Button type="button" onClick={handleOpenModal}>
                View modal
              </Button>
              <StyledModal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={openModal}
                onClose={handleCloseModal}
                slots={{ backdrop: StyledBackdrop }}
              >
                <Box>
                  <h2 id="unstyled-modal-title">Text in a modal</h2>
                  <p id="unstyled-modal-description">Aliquid amet deserunt earum!</p>
                </Box>
              </StyledModal>
              <Button type="button" onClick={handleClickSnackbar}>
                View snackbar
              </Button>
              <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleCloseSnackbar}>
                Hello World
              </Snackbar>
            </Box>
            <Box sx={{ display: 'flex', p: '1rem', gap: '0.5rem', '& > button': { flex: 1 } }}>
              <Button>
                View the code <LaunchRoundedIcon />
              </Button>
            </Box>
          </Panel>
        </Box>
      }
    />
  );
}
