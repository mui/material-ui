import * as React from 'react';
import { styled } from '@material-ui/core/styles';
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
  width: 46,
  height: 17,
  backgroundColor: theme.palette.grey[100],
  borderRadius: 10,
  margin: 10,
  cursor: 'pointer',
  transition: theme.transitions.create('background-color'),
  [`& .${switchUnstyledClasses.thumb}`]: {
    display: 'block',
    position: 'absolute',
    padding: 4,
    width: 28,
    height: 28,
    top: -6,
    left: 0,
    borderRadius: 24,
    backgroundColor: theme.palette.primary.main,
    transform: 'rotate(-90deg)',
    transition: theme.transitions.create(['transform', 'left']),
  },
  [`&.${switchUnstyledClasses.checked} .${switchUnstyledClasses.thumb}`]: {
    left: 18,
    transform: 'rotate(0deg)',
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
            <DarkModeOutlined fontSize="small" />
          ) : (
            <LightModeOutlined fontSize="small" />
          ),
        },
        input: { 'aria-label': 'Theme mode toggle' },
      }}
    />
  );
};

export default ThemeModeToggle;
