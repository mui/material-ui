import * as React from 'react';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import useButton from '@mui/base/useButton';
import Stack from '@mui/material/Stack';

const css = `
  .github-button {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Noto Sans,
        Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;
    word-wrap: break-word;
    box-sizing: border-box;
    text-decoration: none;
    position: relative;
    display: inline-block;
    padding: 5px 16px;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
    border: 1px solid;
    border-radius: 6px;
    appearance: none;
    transition: 80ms cubic-bezier(0.33, 1, 0.68, 1);
    transition-property: color, background-color, box-shadow, border-color;
    color: #fff;
    background-color: #1f883d;
    border-color: rgba(240, 246, 252, 0.1);
    box-shadow: 0 0 transparent, 0 0 transparent;
    margin-left: 16px !important;
    text-align: center !important;
  }

  .github-button:hover {
    transition-duration: 80ms;
  }

  .github-button:active {
    transition: none;
  }

  .github-button:hover:not([disabled]) {
    color: #fff;
    background-color: #2c974b;
  }

  .github-button:active:not([disabled]) {
    background-color: #298e46;
    box-shadow: inset 0px 1px 0px rgba(0, 45, 17, 0.2);
  }

  .github-button[disabled] {
    cursor: not-allowed;
    box-shadow: none;
    color: rgba(255, 255, 255, 0.8);
    background-color: rgb(148, 211, 162);
  }
`;

export default function App() {
  const buttonRef = React.useRef();

  const { getRootProps } = useButton({
    ref: buttonRef,
  });

  return (
    <React.Fragment>
      <style type="text/css">{css}</style>
      <Stack spacing={2} direction="row">
        <ButtonUnstyled className="github-button">Create Repository</ButtonUnstyled>

        <button type="button" {...getRootProps()} className="github-button">
          Create Repository
        </button>
      </Stack>
    </React.Fragment>
  );
}
