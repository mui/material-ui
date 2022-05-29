/* eslint-disable react/prop-types */
import * as React from 'react';
import { styled } from '@mui/joy/styles';

const ToggleButtonRoot = styled('button')(({ theme, ownerState }) => [
  {
    flexGrow: 1,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textTransform: 'uppercase',
    cursor: 'pointer',
    borderRadius: '2px',
    position: 'relative',
    '&:not(:first-of-type)': {
      marginLeft: 2,
    },
    ...theme.typography.smallButtonText,
    border: '1px solid transparent',
    backgroundColor: 'initial',
    ...theme.variants.plain.neutral,
  },
  ownerState.pressed && theme.variants.outlined[ownerState.color],
  ownerState.pressed && theme.variants.outlinedHover[ownerState.color],
  ownerState.pressed && {
    zIndex: 1,
    borderColor: theme.vars.palette.neutral.outlinedActiveBg,
  },
]);

export const ToggleButton = ({ color = 'primary', pressed = false, ...props }) => {
  const ownerState = {
    color,
    pressed,
    ...props,
  };
  return <ToggleButtonRoot ownerState={ownerState} aria-pressed={pressed} {...props} />;
};

export const ToggleButtonGroup = styled('div')(({ theme }) => ({
  // use CSS grid to make children width's equally, flex can't do this (not sure).
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(0px, 1fr))',
  minHeight: '2.5rem',
  width: '180px',
  maxWidth: '100%',
  borderRadius: '4px',
  padding: '3px',
  ...theme.variants.outlined.neutral,
  backgroundColor: theme.vars.palette.neutral.softBg,
}));
