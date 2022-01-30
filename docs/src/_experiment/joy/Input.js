/* eslint-disable react/prop-types */
import * as React from 'react';
import clsx from 'clsx';
import { styled } from '@mui/joy/styles';

const InputRoot = styled('div')(({ ownerState }) => [
  {
    '--Input-minHeight': '2.5rem',
    position: 'relative',
    display: 'flex',
    ...(ownerState.disabled && {
      '& *': {
        pointerEvents: 'none !important',
      },
    }),
  },
]);

const InputInput = styled('input')(({ theme, ownerState }) => [
  {
    backgroundColor: 'transparent',
    minHeight: 'var(--Input-minHeight)',
    borderRadius: theme.vars.radius.xs,
    padding: '0 1rem',
    flex: 1,
    outline: 'none',
    ...(ownerState.startAdornment && {
      paddingLeft: 'var(--Input-minHeight)', // equal to input's height
    }),
    ...(ownerState.endAdornment && {
      paddingRight: 'var(--Input-minHeight)', // equal to input's height
    }),
    ...(ownerState.fullWidth && {
      width: '100%',
    }),
    maxWidth: '100%',
    ...theme.typography.body,
    '&::placeholder': {
      color: theme.vars.palette.neutral[500],
    },
    '&:after': {
      display: 'block',
      content: '""',
      position: 'absolute',
      pointerEvents: 'none',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      border: '2px solid',
      borderColor: 'transparent',
    },
    '&:focus-visible + div': {
      borderColor: theme.vars.palette[ownerState.error ? 'danger' : ownerState.color][600],
    },
  },
  theme.variants.outlined.neutral,
  ownerState.error && {
    borderColor: theme.vars.palette.danger[600],
  },
  theme.variants.outlinedDisabled.neutral,
]);

const InputBorder = styled('div')(({ theme }) => ({
  position: 'absolute',
  pointerEvents: 'none',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  border: '2px solid',
  borderColor: 'transparent',
  borderRadius: theme.vars.radius.xs,
}));

const InputAdornment = styled('div')(({ theme, ownerState }) => ({
  position: 'absolute',
  top: 0,
  bottom: 0,
  width: 'var(--Input-minHeight)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: theme.vars.palette.neutral.textColor,
  pointerEvents: 'none',
  border: '1px solid transparent', // to have content within input's border
  ...(ownerState.end
    ? {
        right: 0,
      }
    : {
        left: 0,
      }),
}));

export default function Input({
  startAdornment = null,
  endAdornment = null,
  color = 'primary',
  error = false,
  fullWidth = false,
  disabled = false,
  ...props
}) {
  const ownerState = {
    color,
    startAdornment,
    endAdornment,
    error,
    fullWidth,
    ...props,
  };
  return (
    <InputRoot ownerState={ownerState}>
      {startAdornment && (
        <InputAdornment ownerState={{ ...ownerState }}>{startAdornment}</InputAdornment>
      )}
      <InputInput
        ownerState={ownerState}
        disabled={disabled}
        {...props}
        className={clsx(disabled && 'Mui-disabled')}
      />
      <InputBorder />
      {endAdornment && (
        <InputAdornment ownerState={{ ...ownerState, end: true }}>{endAdornment}</InputAdornment>
      )}
    </InputRoot>
  );
}
