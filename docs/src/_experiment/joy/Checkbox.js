/* eslint-disable react/prop-types */
import * as React from 'react';
import clsx from 'clsx';
import { styled } from '@mui/joy/styles';
import Check from '@mui/icons-material/CheckRounded';

const CheckboxRoot = styled('label')(({ theme }) => ({
  display: 'flex',
  gap: '0.5rem',
  textAlign: 'left', // force `left` in case parent specifiy other text-align
  ...theme.typography.body,
  lineHeight: '1.25rem',
}));

const CheckboxCheckbox = styled('div')(({ theme, ownerState }) => [
  {
    width: 20,
    height: 20,
    borderRadius: '4px',
    display: 'inline-flex',
    justifyContent: 'center',
    flexShrink: 0, // do not shrink if the label is very long
    alignItems: 'center',
    '&:focus-visible': {
      outlineColor: theme.vars.palette.primary[600],
      outlineOffset: '4px',
    },
  },
  ownerState.checked ? theme.variants.contained.primary : theme.variants.outlined.neutral,
  ownerState.checked ? theme.variants.containedHover.primary : theme.variants.outlinedHover.neutral,
  theme.variants.outlinedDisabled.neutral,
]);

export default function Checkbox({
  checked = false,
  id = '',
  label = '',
  disabled = false,
  ...props
}) {
  const ownerState = {
    checked,
    disabled,
    id,
    label,
    ...props,
  };
  return (
    <CheckboxRoot htmlFor={id} ownerState={ownerState}>
      <CheckboxCheckbox
        id={id}
        ownerState={ownerState}
        tabIndex={disabled ? '-1' : '0'}
        role="checkbox"
        aria-checked={checked}
        disabled={disabled}
        className={clsx(disabled && 'Mui-disabled')}
        {...props}
      >
        {checked && <Check fontSize="md" />}
      </CheckboxCheckbox>
      {label}
    </CheckboxRoot>
  );
}
