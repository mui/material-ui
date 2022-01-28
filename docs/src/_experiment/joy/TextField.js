/* eslint-disable react/prop-types */
import * as React from 'react';
import { styled } from '@mui/joy/styles';
import Input from 'docs/src/_experiment/joy/Input';

const FormControl = styled('div')(() => ({}));

const FormLabel = styled('label')(({ theme }) => [
  { display: 'flex', alignItems: 'center', gap: '0.25rem' },
  theme.typography.smallButtonText,
]);

const FormLabelContainer = styled('label')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '0.25rem',
});

const FormHelperText = styled('span')(({ theme, ownerState }) => ({
  marginTop: '0.25rem',
  ...theme.typography.smallText,
  color: theme.vars.palette.text.tertiary,
  ...(ownerState.error && {
    color: theme.vars.palette.danger.textColor,
  }),
}));

export default function TextField({
  label,
  id,
  error = false,
  helperText = '',
  fullWidth = false,
  ...props
}) {
  const ownerState = {
    error,
    fullWidth,
    ...props,
  };
  return (
    <FormControl>
      <FormLabelContainer>
        <FormLabel htmlFor={id}>{label}</FormLabel>
      </FormLabelContainer>
      <Input id={id} {...props} error={error} />
      {helperText && <FormHelperText ownerState={ownerState}>{helperText}</FormHelperText>}
    </FormControl>
  );
}
