import * as React from 'react';
import { Button, buttonClasses } from '@mui/base/Button';
import { styled, alpha } from '@mui/system';

const CustomButton = styled(Button)(
  ({ theme }) => `
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans',
        Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
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
    background-color: ${theme.palette.mode === 'dark' ? '#238636' : '#1f883d'};
    border-color: ${
      theme.palette.mode === 'dark'
        ? 'rgba(240, 246, 252, 0.1)'
        : 'rgba(31, 35, 40, 0.15)'
    };
    box-shadow: ${
      theme.palette.mode === 'dark'
        ? '0 0 transparent, 0 0 transparent'
        : '0 1px 0 rgba(27, 31, 36, 0.1)'
    };
    margin-left: 16px !important;
    text-align: center !important;

    &:hover {
      transition-duration: 80ms;
    }

    &:active {
      transition: none;
    }

    &:disabled {
      cursor: not-allowed;
      box-shadow: none;
    }

    &:hover:not(.${buttonClasses.disabled}) {
      background-color: ${theme.palette.mode === 'dark' ? '#2ea043' : '#2c974b'};
    }

    &:active:not(.${buttonClasses.disabled}) {
      background-color: ${theme.palette.mode === 'dark' ? '#238636' : '#298e46'};
      box-shadow: ${
        theme.palette.mode === 'dark'
          ? '0 0 transparent'
          : 'rgba(0, 45, 17, 0.2) 0px 1px 0px inset'
      }
    }

    &.${buttonClasses.disabled} {
      color: ${
        theme.palette.mode === 'dark' ? alpha('#fff', 0.5) : alpha('#fff', 0.5)
      };
      background-color: ${
        theme.palette.mode === 'dark' ? alpha('#196c2e', 0.6) : alpha('#196c2e', 0.6)
      };
    }
  `,
);

export default function Tutorial() {
  return (
    <div style={{ marginTop: 16, paddingTop: 16, paddingBottom: 16 }}>
      <CustomButton>Create Repository</CustomButton>
    </div>
  );
}
