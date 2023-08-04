import * as React from 'react';
import copy from 'clipboard-copy';
import { Button as ButtonUnstyled, ButtonProps } from '@mui/base/Button';
import { styled, SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import ContentCopyRounded from '@mui/icons-material/ContentCopyRounded';
import CheckRounded from '@mui/icons-material/CheckRounded';

const Button = styled(ButtonUnstyled)(({ theme }) => ({
  boxSizing: 'border-box',
  display: 'inline-flex',
  gap: 8,
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  '-webkit-tap-highlight-color': 'transparent',
  outline: 0,
  border: 0,
  margin: 0,
  verticalAlign: 'middle',
  textDecoration: 'none',
  textTransform: 'initial',
  minWidth: 64,
  // transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms','color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  boxShadow: 'none',
  cursor: 'copy',
  padding: 0,
  width: 'max-content',
  backgroundColor: 'transparent',
  color: theme.palette.grey[600],
  // fontFamily: theme.typography.fontFamilyCode,
  // fontSize: theme.typography.pxToRem(14),
  lineHeight: 1.5,
  letterSpacing: 0,
  // -webkit-font-smoothing: subpixel-antialiased;
  marginTop: 16,

  '& svg': {
    display: 'inline-block',
    position: 'absolute',
    color: theme.palette.primary.main,
    right: -20,
    top: 1,
    opacity: 0,
    transitionProperty: 'opacity',
    transitionDuration: '100ms',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // '&:hover'
  '& .Mui-focusVisible': {
    color: theme.palette.primary.main,

    '& svg': {
      opacity: 1,
    },
  },
}));

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
      onClick={(event: any) => {
        handleCopy();
        onClick?.(event);
      }}
      {...props}
    >
      <strong>$</strong>
      {installation}
      {copied ? (
        <CheckRounded color="primary" sx={{ fontSize: 15 }} />
      ) : (
        <ContentCopyRounded color="primary" sx={{ fontSize: 15 }} />
      )}
    </Button>
  );
}
