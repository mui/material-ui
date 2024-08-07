import * as React from 'react';
import clsx from 'clsx';

// Base UI imports
import { Badge, badgeClasses } from '@mui/base/Badge';
import { Input, InputProps } from '@mui/base/Input';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { MenuButton } from '@mui/base/MenuButton';
import { Modal, modalClasses } from '@mui/base/Modal';
import { Option } from '@mui/base/Option';
import { Select } from '@mui/base/Select';
import { Slider, sliderClasses } from '@mui/base/Slider';
import { Snackbar } from '@mui/base/Snackbar';
import { SnackbarCloseReason } from '@mui/base/useSnackbar';
import { Switch, switchClasses } from '@mui/base/Switch';
import { Tab } from '@mui/base/Tab';
import { Tabs } from '@mui/base/Tabs';
import { TabsList } from '@mui/base/TabsList';

// Other packages
import { css, styled, keyframes } from '@mui/system';

import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';

import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import AutoAwesomeRounded from '@mui/icons-material/AutoAwesomeRounded';
import SmartButtonRounded from '@mui/icons-material/SmartButtonRounded';
import InputRounded from '@mui/icons-material/InputRounded';
import PlaylistAddCheckRounded from '@mui/icons-material/PlaylistAddCheckRounded';
import ToggleOnRoundedIcon from '@mui/icons-material/ToggleOnRounded';
import LinearScaleRounded from '@mui/icons-material/LinearScaleRounded';
import CircleNotificationsRounded from '@mui/icons-material/CircleNotificationsRounded';
import ReportGmailerrorredRounded from '@mui/icons-material/ReportGmailerrorredRounded';
import MenuOpenRounded from '@mui/icons-material/MenuOpenRounded';
import FirstPageRounded from '@mui/icons-material/FirstPageRounded';
import TabRounded from '@mui/icons-material/TabRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import InterestsRoundedIcon from '@mui/icons-material/InterestsRounded';
import RadioRoundedIcon from '@mui/icons-material/RadioRounded';

import ROUTES from 'docs/src/route';
import { Link } from '@mui/docs/Link';
import heroVariables from 'docs/src/components/productBaseUI/heroVariables';

const Panel = styled('div')({
  width: 340,
  backgroundColor: 'var(--muidocs-palette-background-paper)',
  borderRadius: 'min(var(--border-radius) * 2, 32px)',
  border: 'var(--border-width) solid',
  borderColor: 'var(--border-color)',
  boxShadow: 'var(--Panel-shadow)',
  overflow: 'hidden',
});

const StyledLabel = styled('label')({
  fontSize: 12,
  fontWeight: 600,
  color: 'var(--muidocs-palette-text-secondary)',
  margin: '0.25rem 0',
});

const StyledLabelCategory = styled('label')({
  fontSize: 10,
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '.08rem',
  color: 'var(--muidocs-palette-text-secondary)',
  margin: '0.5rem 0.4rem',
});

const StyledParagraph = styled('p')({
  margin: 0,
  fontSize: 14,
  fontWeight: 600,
  color: 'text.primary',
});

const StyledSwitchLabel = styled('label')({
  margin: 0,
  fontSize: 14,
  fontWeight: 600,
  color: 'text.primary',
});

const StyledTabsList = styled('div')({
  display: 'flex',
  borderBottom: 'var(--border-width) solid var(--border-color)',
  background: 'var(--TabsList-background)',
  padding: '4px',
});

const StyledTab = styled('button')({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  justifyContent: 'center',
  gap: 6,
  position: 'relative',
  flex: 1,
  maxHeight: 42,
  padding: '0.75rem 0.875rem',
  background: 'transparent',
  border: 'none',
  borderRadius: 'var(--Tab-radius)',
  fontSize: 14,
  fontWeight: 600,
  color: 'var(--muidocs-palette-text-secondary)',
  userSelect: 'none',
  transition: 'all 100ms ease',
  '&:hover:not(.base--selected)': {
    background: 'var(--Tab-hoverBackground)',
  },
  '&:focus-visible': {
    outline: '3px solid var(--muidocs-palette-primary-300)',
    outlineOffset: -4,
  },
  '&.base--selected': {
    color: 'var(--color-primary)',
    '&::after': {
      content: '""',
      display: 'block',
      height: 'max(2px, var(--border-width, 0px))',
      left: 2,
      right: 2,
      bottom: 'var(--Tab-activeSelector)',
      position: 'absolute',
      backgroundColor: 'var(--color-primary)',
    },
  },
});

const StyledSelectButton = styled('button')({
  display: 'flex',
  width: '100%',
  padding: '8px 12px',
  cursor: 'pointer',
  backgroundColor: 'var(--Button-bg)',
  border: 'var(--border-style)',
  borderColor: 'var(--Button-border)',
  borderRadius: 'var(--border-radius)',
  boxShadow: 'var(--Button-shadow)',
  fontFamily: 'var(--muidocs-font-family)',
  fontSize: '0.875rem',
  fontWeight: 500,
  color: 'var(--Button-color)',
  lineHeight: 21 / 14,
  userSelect: 'none',
  transition: 'all 100ms ease',
  '&:hover': {
    backgroundColor: 'var(--Button-bg-hover)',
    borderColor: 'var(--Button-border-hover)',
    boxShadow: 'none',
  },
  '&:focus-visible': {
    outline: '3px solid var(--muidocs-palette-primary-300)',
  },
  '& svg:last-child': {
    marginLeft: 'auto',
  },
  '& svg:first-child': {
    marginRight: 'var(--Select-spacing)',
  },
});

const StyledLinkButton = styled(Link)({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  padding: '8px 12px',
  cursor: 'pointer',
  backgroundColor: 'var(--LinkButton-bg)',
  border: 'var(--border-style)',
  borderColor: 'var(--LinkButton-border)',
  borderRadius: 'var(--border-radius)',
  boxShadow: 'var(--LinkButton-shadow)',
  fontFamily: 'var(--muidocs-font-family)',
  fontSize: '0.875rem',
  fontWeight: 600,
  color: 'var(--LinkButton-color) !important',
  lineHeight: 21 / 14,
  userSelect: 'none',
  transition: 'all 100ms ease',
  '&:hover': {
    backgroundColor: 'var(--LinkButton-bg-hover)',
    borderColor: 'var(--LinkButton-border-hover)',
    boxShadow: 'none',
  },
  '&:focus-visible': {
    outline: '3px solid var(--muidocs-palette-primary-300)',
  },
});

const StyledButton = styled('button')({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  padding: '8px 12px',
  cursor: 'pointer',
  backgroundColor: 'var(--Button-bg)',
  border: 'var(--border-style)',
  borderColor: 'var(--Button-border)',
  borderRadius: 'var(--border-radius)',
  boxShadow: 'var(--Button-shadow)',
  fontFamily: 'var(--muidocs-font-family)',
  fontSize: '0.875rem',
  fontWeight: 600,
  color: 'var(--Button-color)',
  lineHeight: 21 / 14,
  userSelect: 'none',
  transition: 'all 100ms ease',
  '&:hover': {
    backgroundColor: 'var(--Button-bg-hover)',
    borderColor: 'var(--Button-border-hover)',
    boxShadow: 'none',
  },
  '&:focus-visible': {
    outline: '3px solid var(--muidocs-palette-primary-300)',
  },
});

const Popup = styled('div')({
  zIndex: 1,
});

const MenuRoot = styled('div')({
  zIndex: 1,
});

const StyledListbox = styled('ul')({
  '--_listbox-radius': 'min(var(--border-radius), 12px)',
  width: 'calc(320px - 1rem)',
  maxHeight: 'calc(320px - 1rem)',
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
  border: 'var(--border-width) solid',
  borderColor: 'var(--Select-ringColor, var(--border-color))',
  borderRadius: 'var(--_listbox-radius)',
  backgroundColor: 'var(--muidocs-palette-background-default)',
  boxShadow: 'var(--Panel-shadow)',
  padding: 'calc(var(--Select-spacing) * 0.5)',
  gap: 'calc(var(--Select-spacing) * 0.2)',
  fontFamily: 'var(--muidocs-font-family)',
  fontSize: '0.875rem',
  lineHeight: 21 / 14,
  margin: '6px 0',
  '& li': {
    display: 'flex',
    borderRadius: '12px',
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
      border: 'var(--border-width) solid transparent',
      padding: 'calc(var(--Select-spacing) * 0.5)',
      fontSize: '0.875rem',
      fontWeight: 500,
      color: 'var(--muidocs-palette-text-secondary)',
      alignItems: 'center',
      cursor: 'pointer',
      borderRadius: 'calc(var(--_listbox-radius) - var(--Select-spacing) * 0.05)',
      '&:hover, &.base-Option-highlighted': {
        backgroundColor: 'var(--Option-hoverBackground, var(--muidocs-palette-grey-50))',
        color: 'var(--muidocs-palette-text-primary)',
      },
      '&.base--selected': {
        backgroundColor: 'var(--Option-selectedBackground, var(--muidocs-palette-grey-50))',
        borderColor: 'var(--border-color)',
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
    value: 25,
    label: '25°C',
  },
  {
    value: 50,
    label: '50°C',
  },
  {
    value: 75,
    label: '75°C',
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
  --_margin: 4px;
  color: var(--color-primary);
  height: 8px;
  width: 100%;
  max-width: calc(100% - var(--_margin));
  padding: 16px 0;
  margin: 0 var(--_margin);
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
    border-radius: var(--border-radius);
    background-color: var(--color-primary-light)
  }

  & .${sliderClasses.track} {
    display: block;
    position: absolute;
    height: 4px;
    border-radius: var(--border-radius);
    background-color: currentColor;
  }

  & .${sliderClasses.thumb} {
    position: absolute;
    width: 16px;
    height: 16px;
    margin-left: -6px;
    margin-top: -6px;
    box-sizing: border-box;
    border-radius: var(--border-radius);
    outline: 0;
    background-color: var(--color-primary);
    transition-property: box-shadow, transform;
    transition-timing-function: ease;
    transition-duration: 120ms;
    transform-origin: center;

    &:hover,
    &.${sliderClasses.focusVisible} {
      box-shadow: 0 0 0 6px var(--Slider-thumb-focus);
    }

    &.${sliderClasses.active} {
      box-shadow: 0 0 0 8px var(--Slider-thumb-focus);
      outline: none;
      transform: scale(1.2);
    }
  }

  & .${sliderClasses.mark} {
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: var(--border-radius);
    background-color: var(--color-primary-light);
    top: 44%;
    transform: translateX(-50%);
  }

  & .${sliderClasses.markActive} {
    background-color: var(--color-primary);
  }

  & .${sliderClasses.markLabel} {
    font-weight: 600;
    font-size: 10px;
    position: absolute;
    top: 24px;
    transform: translateX(-50%);
    margin-top: 8px;
    &[data-index="0"] {
      transform: translateX(calc(-1 * var(--_margin)));
    }
    &[data-index="4"] {
      transform: translate(-100%);
    }
  }
`);

const StyledSwitch = styled('span')`
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
    background: var(--Switch-background, var(--muidocs-palette-grey-300));
    border-radius: max(2px, var(--border-radius) * 4);
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
    transition: background-color ease 100ms;
  }

  &:hover {
    & .${switchClasses.track} {
      background: var(--Switch-hoverBackground, var(--muidocs-palette-grey-400));
    }
  }

  & .${switchClasses.thumb} {
    display: block;
    width: 14px;
    height: 14px;
    top: 3px;
    left: 3px;
    border-radius: max(2px, var(--border-radius));
    background-color: #fff;
    position: relative;
    transition-property: left;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 120ms;
  }

  &.${switchClasses.focusVisible} {
    border-radius: max(2px, var(--border-radius) * 4);
    outline: 3px solid var(--muidocs-palette-primary-300);
  }

  &.${switchClasses.checked} {
    & .${switchClasses.thumb} {
      left: 17px;
      top: 3px;
      background-color: #fff;
    }

    & .${switchClasses.track} {
      background: var(--muidocs-palette-primary-500);
    }

    &:hover {
      & .${switchClasses.track} {
        background: var(--muidocs-palette-primary-700);
      }
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
`;

const Backdrop = React.forwardRef<HTMLDivElement, { open?: boolean; className: string }>(
  (props, ref) => {
    const { open, className, ...other } = props;
    return <div className={clsx({ 'base-Backdrop-open': open }, className)} ref={ref} {...other} />;
  },
);

const StyledModal = styled(Modal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &.${modalClasses.hidden} {
    visibility: hidden;
  }
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
  opacity: ${({ open }) => (open ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

const AnimatedElement = React.forwardRef(function AnimatedElement(
  props: {
    in?: boolean;
    onEnter?: () => void;
    onExited?: () => void;
    children: React.ReactNode;
  },
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const { in: inProp, onEnter = () => {}, onExited = () => {}, ...other } = props;

  React.useEffect(() => {
    if (inProp) {
      onEnter();
    }
  }, [inProp, onEnter]);

  const handleTransitionEnd = React.useCallback(() => {
    if (!inProp) {
      onExited();
    }
  }, [inProp, onExited]);

  return <div onTransitionEnd={handleTransitionEnd} data-open={inProp} {...other} ref={ref} />;
});

const Dialog = styled(AnimatedElement)({
  backgroundColor: 'var(--muidocs-palette-background-default)',
  borderRadius: 'min(var(--border-radius) * 2, 32px)',
  border: 'var(--border-width) solid',
  borderColor: 'var(--border-color)',
  overflow: 'hidden',
  padding: '1.5rem',
  textAlign: 'center',
  outline: 'none',
  maxWidth: 500,
  width: 'auto',
  transform: 'translateY(8px)',
  opacity: 0,
  transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
  '&[data-open="true"]': {
    transform: 'translateY(0)',
    opacity: 1,
    boxShadow: 'var(--Panel-shadow)',
    transition: 'opacity 0.3s ease, transform 0.3s ease',
  },
});

const StyledBadge = styled(Badge)(
  ({ theme }) => `
  box-sizing: border-box;
  list-style: none;
  font-family: 'IBM Plex Sans', sans-serif;
  position: relative;
  display: inline-block;

  & .${badgeClasses.badge} {
    --_scale: 1.5em;
    z-index: auto;
    position: absolute;
    top: 0;
    right: 0;
    font-size: 0.75rem;
    border-radius: var(--_scale);
    line-height: var(--_scale);
    width: var(--_scale);
    height: var(--_scale);
    color: #fff;
    font-weight: 600;
    white-space: nowrap;
    text-align: center;
    background: var(--muidocs-palette-error-main);
    outline: 3px solid ${
      theme.palette.mode === 'dark' ? 'var(--muidocs-palette-primaryDark-900)' : '#FFF'
    };
    transform: translate(50%, -50%);
    transform-origin: 100% 0;
  }
  `,
);

const StyledMenuItem = styled(MenuItem)(
  ({ theme }) => `
  list-style: none;
  padding: 6px 8px;
  margin: 4px 0;
  cursor: default;
  user-select: none;
  border-radius: min(var(--border-radius), 8px);
  font-weight: 500;

  &:last-of-type {
    border-bottom: none;
  }

  &.${menuItemClasses.focusVisible} {
    outline: 3px solid var(--muidocs-palette-primary-300);
    background-color: ${
      theme.palette.mode === 'dark'
        ? 'var(--muidocs-palette-grey-800)'
        : 'var(--muidocs-palette-grey-50)'
    };
  }

  &:hover:not(.${menuItemClasses.disabled}) {
    background-color: ${
      theme.palette.mode === 'dark'
        ? 'var(--muidocs-palette-primaryDark-700)'
        : 'var(--muidocs-palette-grey-50)'
    };
    color: ${
      theme.palette.mode === 'dark'
        ? 'var(--muidocs-palette-grey-300)'
        : 'var(--muidocs-palette-grey-900)'
    };
  }
  `,
);

const StyledMenuListbox = styled('ul')`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 230px;
  overflow: auto;
  outline: 0;
  background-color: var(--muidocs-palette-background-default);
  border-radius: min(var(--border-radius), 16px);
  border: var(--border-width) solid;
  border-color: var(--border-color);
  box-shadow: var(--Panel-shadow);
`;

const StyledMenuButton = styled(MenuButton)({
  padding: 0,
  cursor: 'pointer',
  border: 'none',
  background: 'transparent',
  borderRadius: 'var(--avatar-radius)',
  transition: 'all 100ms ease',

  '&:focus-visible': {
    outline: '3px solid var(--muidocs-palette-primary-300)',
  },
});

const snackbarInRight = keyframes`
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0);
  }
`;

const StyledSnackbar = styled(Snackbar)(css`
  background-color: var(--muidocs-palette-background-default);
  border-radius: min(var(--border-radius), 32px);
  border: var(--border-width) solid;
  border-color: var(--border-color);
  box-shadow: var(--Panel-shadow);
  position: fixed;
  z-index: 1200;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 1rem;
  right: 16px;
  bottom: 16px;
  left: auto;
  max-width: 560px;
  min-width: 300px;
  padding: 0.75rem 1rem;
  animation: ${snackbarInRight} 200ms;
  transition: transform 0.2s ease-out;

  & svg {
    color: var(--muidocs-palette-success-600);
  }

  & [data-title] {
    font-size: 0.875rem;
    font-weight: 600;
  }

  & [data-description] {
    color: var(--muidocs-palette-text-secondary);
    font-size: 0.75rem;
    font-weight: 500;
  }
`);

const StyledInputElement = styled('input')({
  marginTop: '8px',
  width: '100%',
  maxWidth: '100%',
  border: 'var(--border-width, 1px) solid',
  borderColor: 'var(--Select-ringColor, var(--border-color))',
  borderRadius: 'var(--border-radius)',
  padding: '8px 12px',
  backgroundColor: 'var(--Select-background)',
  display: 'flex',
  color: 'var(--muidocs-palette-text-secondary)',
  alignItems: 'center',
  fontSize: '0.875rem',
  fontFamily: 'var(--muidocs-font-family)',
  lineHeight: 21 / 14,
  boxShadow: 'var(--formControl-shadow, 0px 2px 2px rgba(205, 210, 215, 0.3))',
  '&:hover': {
    borderColor: 'var(--Input-border)',
  },
  '&:focus': {
    borderColor: 'var(--Input-border)',
    boxShadow: 'var(--Input-focus-border)',
  },
  '&:focus-visible': {
    // Firefox
    outline: 0,
  },
});

// Input
const CustomInput = React.forwardRef(function CustomInput(
  props: InputProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return <Input slots={{ input: StyledInputElement }} {...props} ref={ref} />;
});

export default function BaseUIThemesDemo() {
  const [design, setDesign] = React.useState(0);
  // Modal
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  // Snackbar
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleCloseSnackbar = (_: any, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleClickSnackbar = () => {
    setOpenSnackbar(true);
  };
  // Menu
  const [isOpenMenu, setOpenMenu] = React.useState(false);

  return (
    <Fade in timeout={700}>
      <Panel sx={{ ...heroVariables[design] }}>
        <Tabs value={design} onChange={(event, newValue) => setDesign(newValue as number)}>
          <TabsList slots={{ root: StyledTabsList }}>
            <Tab slots={{ root: StyledTab }} value={0}>
              <AutoAwesomeRounded sx={{ fontSize: 15 }} />
              Sleek
            </Tab>
            <Tab slots={{ root: StyledTab }} value={1}>
              <RadioRoundedIcon sx={{ fontSize: 15 }} />
              Retro
            </Tab>
            <Tab slots={{ root: StyledTab }} value={2}>
              <InterestsRoundedIcon sx={{ fontSize: 15 }} />
              Playful
            </Tab>
          </TabsList>
        </Tabs>
        {/* Notification component */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: '1rem',
            borderBottom: 'var(--border-width) solid var(--border-color)',
          }}
        >
          <StyledParagraph>Notifications</StyledParagraph>
          <Dropdown
            open={isOpenMenu}
            onOpenChange={(_, open) => {
              setOpenMenu(open);
            }}
          >
            <StyledMenuButton>
              <StyledBadge badgeContent={5}>
                <Box
                  component="img"
                  alt="Michał Dudak, the leading engineer for Base UI."
                  src="/static/branding/about/michał-dudak.png"
                  sx={{
                    display: 'inline-block',
                    verticalAlign: 'middle',
                    height: 32,
                    width: 32,
                    borderRadius: 'var(--avatar-radius)',
                    border: 'var(--border-width) solid var(--border-color)',
                    background: 'var(--color-primary-light)',
                    '&:hover': {
                      background: 'var(--color-primary)',
                    },
                  }}
                />
              </StyledBadge>
            </StyledMenuButton>
            <Menu
              slots={{ root: MenuRoot, listbox: StyledMenuListbox }}
              slotProps={{ root: { disablePortal: true }, listbox: { id: 'simple-menu' } }}
            >
              <StyledLabelCategory>Notification menu</StyledLabelCategory>
              <CustomInput aria-label="Demo input" placeholder="Search for a component…" />
              <StyledMenuItem>Request a component</StyledMenuItem>
              <StyledMenuItem>Get started</StyledMenuItem>
              <StyledMenuItem>View all</StyledMenuItem>
            </Menu>
          </Dropdown>
        </Box>
        {/* Select component */}
        <Box
          sx={{
            p: '1rem 1rem 1.5rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            borderBottom: 'var(--border-width) solid var(--border-color)',
          }}
        >
          <StyledLabel htmlFor="base-ui-select">Select a component</StyledLabel>
          <Select
            id="base-ui-select"
            name="base-ui-select"
            defaultValue={10}
            slots={{
              root: StyledSelectButton,
              popup: Popup,
              listbox: StyledListbox,
            }}
            slotProps={{
              popup: {
                disablePortal: true,
              },
            }}
          >
            <StyledLabelCategory>Input</StyledLabelCategory>
            <Option value={10}>
              <AutoAwesomeRounded fontSize="small" />
              Autocomplete
            </Option>
            <Option value={20}>
              <SmartButtonRounded fontSize="small" />
              Button
            </Option>
            <Option value={30}>
              <InputRounded fontSize="small" />
              Input
            </Option>
            <Option value={40}>
              <PlaylistAddCheckRounded fontSize="small" />
              Select
            </Option>
            <Option value={50}>
              <ToggleOnRoundedIcon fontSize="small" />
              Switch
            </Option>
            <Option value={60}>
              <LinearScaleRounded fontSize="small" />
              Slider
            </Option>
            <StyledLabelCategory>Data display</StyledLabelCategory>
            <Option value={70}>
              <CircleNotificationsRounded fontSize="small" />
              Badge
            </Option>
            <StyledLabelCategory>Feedback</StyledLabelCategory>
            <Option value={80}>
              <ReportGmailerrorredRounded fontSize="small" />
              Snackbar
            </Option>
            <StyledLabelCategory>Navigation</StyledLabelCategory>
            <Option value={90}>
              <MenuOpenRounded fontSize="small" />
              Menu
            </Option>
            <Option value={100}>
              <FirstPageRounded fontSize="small" />
              Table Pagination
            </Option>
            <Option value={110}>
              <TabRounded fontSize="small" />
              Tabs
            </Option>
          </Select>
        </Box>
        {/* Slider component */}
        <Box
          sx={{
            px: '1rem',
            pt: '1rem',
            pb: '1.5rem',
            borderBottom: 'var(--border-width) solid var(--border-color)',
          }}
        >
          <StyledLabel>Choose a temperature</StyledLabel>
          <StyledSlider
            aria-label="Temperature"
            defaultValue={37}
            getAriaValueText={valuetext}
            marks={marks}
          />
        </Box>
        {/* Switch component */}
        <Box
          sx={{
            p: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            borderBottom: 'var(--border-width) solid var(--border-color)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <StyledSwitchLabel id="make-it-your-own">Make it your own</StyledSwitchLabel>
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
            <StyledSwitchLabel id="use-every-component">Use every component</StyledSwitchLabel>
            <Switch
              slots={{
                root: StyledSwitch,
              }}
              slotProps={{
                input: { 'aria-labelledby': 'use-every-component' },
              }}
            />
          </Box>
        </Box>
        {/* Modal and Snackbar component */}
        <Box
          sx={{
            display: 'flex',
            p: '1rem',
            gap: '0.5rem',
            borderBottom: 'var(--border-width) solid var(--border-color)',
            '& > button': { flex: 1 },
          }}
        >
          <StyledButton type="button" onClick={handleOpenModal}>
            View modal
          </StyledButton>
          <StyledModal
            disablePortal
            aria-labelledby="unstyled-modal-title"
            aria-describedby="unstyled-modal-description"
            open={openModal}
            onClose={handleCloseModal}
            closeAfterTransition
            slots={{ backdrop: StyledBackdrop }}
            keepMounted
          >
            <Dialog in={openModal}>
              <Box
                component="h2"
                id="unstyled-modal-title"
                sx={{ mt: 1, mb: 0.5, textWrap: 'balance' }}
              >
                Oh, hey, this is a Base UI modal.
              </Box>
              <Box
                component="p"
                id="unstyled-modal-description"
                sx={{ m: 0, mb: 4, color: 'text.secondary', textWrap: 'balance' }}
              >
                Base UI modals manages modal stacking when more than one is needed, creates a
                backdrop to disable interaction with the rest of the app, and a lot more.
              </Box>
              <StyledButton onClick={handleCloseModal}>Close</StyledButton>
            </Dialog>
          </StyledModal>
          <StyledButton type="button" onClick={handleClickSnackbar}>
            View snackbar
          </StyledButton>
          <StyledSnackbar open={openSnackbar} autoHideDuration={5000} onClose={handleCloseSnackbar}>
            <CheckCircleRoundedIcon fontSize="small" />
            <div>
              <div data-title>This is a Base UI snackbar.</div>
              <div data-description>Free to design as you want it.</div>
            </div>
          </StyledSnackbar>
        </Box>
        {/* Button "View all components" component */}
        <Box sx={{ display: 'flex', p: '1rem', gap: '0.5rem', '& > button': { flex: 1 } }}>
          <StyledLinkButton href={ROUTES.baseComponents}>
            View all components <ChevronRightRoundedIcon fontSize="small" />
          </StyledLinkButton>
        </Box>
      </Panel>
    </Fade>
  );
}
