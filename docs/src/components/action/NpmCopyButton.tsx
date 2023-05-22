import * as React from 'react';
import copy from 'clipboard-copy';
import Button, { ButtonProps } from '@mui/base/Button';
import { styled, SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import ContentCopyRounded from '@mui/icons-material/ContentCopyRounded';
import CheckRounded from '@mui/icons-material/CheckRounded';

const StyledButton = styled(Button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  outline: 0;
  border: 0;
  margin: 0;
  user-select: none;
  vertical-align: middle;
  text-decoration: none;
  text-transform: initial;
  scroll-snap-margin-top: calc(var(--MuiDocs-header-height) + 32px);
  scroll-margin-top: calc(var(--MuiDocs-header-height) + 32px);
  min-width: 64px;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  box-shadow: none;
  border-radius: 6px;
  cursor: copy;
  padding: 0;
  width: max-content;
  background-color: transparent;
  color: var(--muidocs-palette-grey-600);
  font-family: Menlo, Consolas, 'Droid Sans Mono', monospace;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 1.5;
  letter-spacing: 0;
  -webkit-font-smoothing: subpixel-antialiased;
  margin-top: 16px;

  &:hover,
  &.Mui-focusVisible {
    color: var(--muidocs-palette-primary-main);
    & svg {
      opacity: 1;
    }
  }

  & svg {
    display: inline-block;
    position: absolute;
    color: var(--muidocs-palette-primary-main);
    right: -22px;
    top: -1px;
    opacity: 0;
    transition-property: opacity;
    transition-duration: 100ms;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

export default function NpmCopyButton({
  installation,
  onClick,
  sx,
  ...props
}: ButtonProps & { installation: string; sx?: SxProps<Theme> }) {
  const [copied, setCopied] = React.useState(false);
  const handleCopy = () => {
    setCopied(true);
    copy(installation).then(() => {
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <Button
      slots={{ root: StyledButton }}
      onClick={(event) => {
        handleCopy();
        onClick?.(event);
      }}
      {...props}
    >
      <strong>$</strong>&nbsp;{installation}
      {copied ? (
        <CheckRounded color="primary" fontSize="small" />
      ) : (
        <ContentCopyRounded fontSize="small" />
      )}
    </Button>
  );
}
