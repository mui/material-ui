import * as React from 'react';
import copy from 'clipboard-copy';
import { Button as ButtonUnstyled, ButtonProps } from '@mui/base/Button';
import { SxProps } from '@mui/system';
import { styled, Theme } from '@mui/material/styles';
import ContentCopyRounded from '@mui/icons-material/ContentCopyRounded';
import CheckRounded from '@mui/icons-material/CheckRounded';

const Button = styled(ButtonUnstyled)(({ theme }) => ({
  boxSizing: 'border-box',
  position: 'relative',
  minWidth: 64,
  margin: 0,
  marginTop: 16,
  cursor: 'copy',
  padding: 0,
  width: 'max-content',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  verticalAlign: 'middle',
  gap: 8,
  outline: 0,
  border: 0,
  boxShadow: 'none',
  backgroundColor: 'transparent',
  color: (theme.vars || theme).palette.grey[600],
  fontFamily: theme.typography.fontFamilyCode,
  fontSize: theme.typography.pxToRem(12),
  textDecoration: 'none',
  textTransform: 'initial',
  lineHeight: 1.5,
  letterSpacing: 0,
  transition: theme.transitions.create(['background-color', 'color'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.shortest,
  }),
  WebkitTapHighlightColor: 'transparent',
  WebkitFontSmoothing: 'subpixel-antialiased',
  '& svg': {
    display: 'inline-block',
    position: 'absolute',
    right: -20,
    top: 1,
    opacity: 0,
    color: (theme.vars || theme).palette.primary.main,
    transition: theme.transitions.create('opacity', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shortest,
    }),
  },
  '&:hover, & .Mui-focusVisible': {
    color: (theme.vars || theme).palette.primary.main,
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
