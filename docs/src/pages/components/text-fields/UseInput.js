import * as React from 'react';
import { useInput } from '@mui/core';
import { styled } from '@mui/system';

const StyledInputElement = styled('input')(`
  width: 200px;
  font-size: 1rem;
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 400;
  line-height: 1.4375em;
  background: rgb(243, 246, 249);
  border: 1px solid #E5E8EC;
  border-radius: 10px;
  padding: 6px 10px;
  color: #20262D;
  transition: width 300ms ease;

  &:hover {
    background: #EAEEF3;
    border-color: #E5E8EC;
  }

  &:focus {
    outline: none;
    width: 220px;
    transition: width 200ms ease-out;
  }
`);

const CustomInput = React.forwardRef(function CustomInput(props, ref) {
  const { getRootProps, getInputProps } = useInput(props, ref);

  return (
    <div {...getRootProps()}>
      <StyledInputElement {...props} {...getInputProps()} />
    </div>
  );
});

export default function UseInput() {
  return <CustomInput aria-label="Demo input" placeholder="Type something..." />;
}
