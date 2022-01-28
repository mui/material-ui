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
    border: '1px solid',
    position: 'relative',
    '&:first-of-type': {
      borderTopLeftRadius: theme.vars.radius.xs,
      borderBottomLeftRadius: theme.vars.radius.xs,
    },
    '&:last-of-type': {
      borderTopRightRadius: theme.vars.radius.xs,
      borderBottomRightRadius: theme.vars.radius.xs,
    },
    '&:not(:first-of-type)': {
      marginLeft: -1,
    },
    borderColor: theme.vars.palette.neutral.outlinedBorder,
    ...theme.typography.smallButtonText,
    ...(!ownerState.pressed && {
      color: theme.vars.palette.neutral.textColor,
      backgroundColor: theme.vars.palette.background.body,
      ...theme.variants.lightHover.neutral,
    }),
  },
  ownerState.pressed && {
    zIndex: 1,
    '&:first-of-type': {
      borderRightColor: theme.vars.palette[ownerState.color].outlinedBorder,
    },
    '&:last-of-type': {
      borderLeftColor: theme.vars.palette[ownerState.color].outlinedBorder,
    },
    '&:not(:first-of-type):not(:last-of-type)': {
      borderRightColor: theme.vars.palette[ownerState.color].outlinedBorder,
      borderLeftColor: theme.vars.palette[ownerState.color].outlinedBorder,
    },
  },
  ownerState.pressed && theme.variants.light[ownerState.color],
  ownerState.pressed && theme.variants.lightHover[ownerState.color],
]);

export const ToggleButton = ({ color = 'primary', pressed = false, ...props }) => {
  const ownerState = {
    color,
    pressed,
    ...props,
  };
  return <ToggleButtonRoot ownerState={ownerState} aria-pressed={pressed} {...props} />;
};

export const ToggleButtonGroup = styled('div')(() => [
  {
    // use CSS grid to make children width's equally, flex can't do this (not sure).
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(0px, 1fr))',
    minHeight: '2.5rem',
    width: '180px',
    maxWidth: '100%',
  },
]);
