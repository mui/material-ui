import * as React from 'react';
import { styled } from '@mui/joy/styles';
import Input from '@mui/joy/Input';

const StyledInput = styled('input')({
  border: 'none', // remove the native input width
  minWidth: 0, // remove the native input width
  outline: 0, // remove the native input outline
  padding: 0, // remove the native input padding
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
  },
});

const StyledLabel = styled('label')({
  position: 'absolute',
});

const InnerInput = React.forwardRef<
  HTMLInputElement,
  JSX.IntrinsicElements['input']
>(function InnerInput(props, ref) {
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
      slots={{ input: InnerInput }}
      slotProps={{ input: { placeholder: 'A placeholder' } }}
      sx={{ '--Input-minHeight': '56px' }}
    />
  );
}
