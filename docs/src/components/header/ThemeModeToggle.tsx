import * as React from 'react';
import { styled, alpha } from '@material-ui/core/styles';
import SwitchUnstyled, {
  switchUnstyledClasses,
  SwitchUnstyledProps,
} from '@material-ui/unstyled/SwitchUnstyled';
import DarkModeOutlined from '@material-ui/icons/DarkModeOutlined';
import LightModeOutlined from '@material-ui/icons/LightModeOutlined';

const Root = styled('span')(({ theme }) => ({
  fontSize: 0,
  color: '#fff',
  position: 'relative',
  display: 'inline-block',
  width: 40,
  height: 17,
  backgroundColor: theme.palette.grey[100],
  borderRadius: 10,
  margin: 10,
  cursor: 'pointer',
  transition: theme.transitions.create('background-color'),
  [`& .${switchUnstyledClasses.thumb}`]: {
    display: 'block',
    position: 'absolute',
    padding: 2,
    width: 24,
    height: 24,
    top: -3,
    left: 0,
    borderRadius: 24,
    backgroundColor: theme.palette.primary.main,
    transform: 'rotate(-90deg)',
    transition: theme.transitions.create(['transform', 'left']),
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      borderRadius: '50%',
      zIndex: -1,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      transform: 'scale(0)',
      transition: theme.transitions.create('transform'),
      backgroundColor: alpha(theme.palette.primary.main, 0.4),
    },
  },
  [`&.${switchUnstyledClasses.checked} .${switchUnstyledClasses.thumb}`]: {
    left: 16,
    transform: 'rotate(0deg)',
  },
  [`&.${switchUnstyledClasses.focusVisible} .${switchUnstyledClasses.thumb}`]: {
    '&:before': {
      transform: 'scale(1.3)',
    },
  },
  [`& .${switchUnstyledClasses.input}`]: {
    cursor: 'inherit',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    opacity: 0,
    zIndex: 1,
    margin: 0,
  },
  [`&.${switchUnstyledClasses.checked}`]: {
    background: theme.palette.primary[200],
  },
}));

const ThemeModeToggle = (props: SwitchUnstyledProps) => {
  return (
    <SwitchUnstyled
      {...props}
      components={{ Root }}
      componentsProps={{
        thumb: {
          children: props.checked ? (
            <LightModeOutlined fontSize="small" />
          ) : (
            <DarkModeOutlined fontSize="small" />
          ),
        },
        input: { 'aria-label': 'Theme mode toggle' },
      }}
    />
  );
};

export default ThemeModeToggle;
