import * as React from 'react';
import { styled } from '@mui/system';
import ButtonUnstyled, { buttonClasses } from '@mui/base/Button';

const Button = styled(ButtonUnstyled)`
  padding-inline: 1rem;
  padding-block: 0.5rem;
  font-size: 1rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  border-radius: 4px;
  border: 2px solid rgba(0 0 0 / 0.5);
  background-color: initial;
  &:hover {
    background-color: rgba(0 0 0 / 0.08);
    border-color: rgba(0 0 0 / 0.72);
  }
  &:active {
    background-color: rgba(0 0 0 / 0.12);
    transform: translateY(2px);
  }
  &.${buttonClasses.focusVisible} {
    outline: 3px solid rgba(0 0 0 / 0.3);
    border-color: rgba(0 0 0 / 0.72);
  }
  &.${buttonClasses.disabled} {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default function App() {
  return <Button>Hello from Base UI</Button>;
}
