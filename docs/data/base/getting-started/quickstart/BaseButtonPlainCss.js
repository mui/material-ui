import * as React from 'react';
import { Button, buttonClasses } from '@mui/base/Button';
import { useButton } from '@mui/base/useButton';
import Stack from '@mui/material/Stack';

// .mode-dark is provided by the MUI docs site
const css = `
  .demo {
    --btn-text: #fff;
    --btn-bg: #1f883d;
    --btn-hover: #2c974b;
    --btn-active-bg: #298e46;
    --btn-active-box-shadow: inset 0px 1px 0px rgba(0, 45, 17, 0.2);
    --btn-disabled: rgba(255, 255, 255, 0.8);
    --btn-disabled-bg: rgb(148, 211, 162);
  }

  .mode-dark .demo {
    --btn-bg: #238636;
    --btn-hover: #2ea043;
    --btn-active-bg: #238636;
    --btn-active-box-shadow: 0 0 transparent;
    --btn-disabled: rgba(255, 255, 255, 0.5);
    --btn-disabled-bg: rgba(25, 108, 46, 0.6);
  }

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
    color: var(--btn-text);
    background-color: var(--btn-bg);
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

  .github-button:hover:not(.${buttonClasses.disabled}) {
    color: var(--btn-text);
    background-color: var(--btn-hover);
  }

  .github-button:active:not(.${buttonClasses.disabled}) {
    background-color: var(--btn-active-bg);
    box-shadow: var(--btn-active-box-shadow);
  }

  .github-button.${buttonClasses.disabled} {
    cursor: not-allowed;
    box-shadow: none;
    color: var(--btn-disabled);
    background-color: var(--btn-disabled-bg);
  }
`;

export default function BaseButtonPlainCss() {
  const { getRootProps } = useButton({});
  return (
    <React.Fragment>
      <style type="text/css">{css}</style>
      <Stack spacing={2} direction="row" className="demo">
        <Button className="github-button">Create Repository</Button>
        <button type="button" {...getRootProps()} className="github-button">
          Create Repository
        </button>
      </Stack>
    </React.Fragment>
  );
}
