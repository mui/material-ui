import * as React from 'react';
import { styled } from '@mui/joy/styles';
import Input from '@mui/joy/Input';
import CheckCircleOutlined from '@mui/icons-material/CheckCircleOutlined';

const StyledInput = styled('input')(({ theme }) => ({
  border: 'none', // remove the native input width
  minWidth: 0, // remove the native input width
  outline: 0, // remove the native input outline
  padding: 0, // remove the native input padding
  paddingTop: '1em',
  flex: 1,
  color: 'inherit',
  backgroundColor: 'transparent',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  fontStyle: 'inherit',
  fontWeight: 'inherit',
  lineHeight: 'inherit',
  textOverflow: 'ellipsis',
  '&::placeholder': {
    opacity: 0,
    transition: '0.1s ease-out',
  },
  '&:focus::placeholder': {
    opacity: 1,
  },
  '&:focus + label, &:not(:placeholder-shown) + label': {
    top: '0.5rem',
    fontSize: '0.75rem',
  },
  '&:focus + label': {
    color: 'var(--Input-focusedHighlight)',
  },
}));

const StyledLabel = styled('label')(({ theme }) => ({
  position: 'absolute',
  lineHeight: 1,
  top: 'calc((var(--Input-minHeight) - 1em) / 2)',
  color: theme.vars.palette.text.tertiary,
  fontWeight: theme.vars.fontWeight.md,
  transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
}));

const InnerInput = React.forwardRef(function InnerInput(props, ref) {
  const id = React.useId();
  return (
    <React.Fragment>
      <StyledInput ref={ref} id={id} {...props} />
      <StyledLabel htmlFor={id}>Label</StyledLabel>
    </React.Fragment>
  );
});

export default function FloatingLabelInput() {
  return (
    <Input
      placeholder="Type in here…"
      endDecorator={<CheckCircleOutlined sx={{ color: 'text.tertiary' }} />}
      slots={{ input: InnerInput }}
      slotProps={{ input: { placeholder: 'A placeholder' } }}
      sx={{
        '--Input-minHeight': '56px',
        borderRadius: '6px',
      }}
    />
  );
}
