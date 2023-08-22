/* eslint-disable react/prop-types */
import * as React from 'react';
import copy from 'clipboard-copy';
import { SxProps } from '@mui/system';
import { styled, Theme } from '@mui/material/styles';
import ContentCopyRounded from '@mui/icons-material/ContentCopyRounded';
import CheckRounded from '@mui/icons-material/CheckRounded';

const Button = styled('button')(({ theme }) => ({
  boxSizing: 'border-box',
  minWidth: 64,
  margin: 0,
  marginTop: 16,
  cursor: 'copy',
  padding: 0,
  display: 'inline-flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  verticalAlign: 'middle',
  gap: 8,
  outline: 0,
  border: 0,
  boxShadow: 'none',
  backgroundColor: 'transparent',
  fontFamily: theme.typography.fontFamilyCode,
  fontSize: theme.typography.pxToRem(12),
  textDecoration: 'none',
  textTransform: 'initial',
  lineHeight: 1.5,
  letterSpacing: 0,
  transition: theme.transitions.create('color', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.shortest,
  }),
  WebkitTapHighlightColor: 'transparent',
  WebkitFontSmoothing: 'subpixel-antialiased',
  color: (theme.vars || theme).palette.grey[600],
  '&:hover, &:focus-visible': {
    color: (theme.vars || theme).palette.primary.main,
    '@media (hover: none)': {
      color: (theme.vars || theme).palette.grey[600],
    },
  },
  '& svg': {
    display: 'inline-block',
    position: 'relative',
    right: 3,
    top: 1,
    opacity: 0,
    transition: theme.transitions.create('opacity', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shortest,
    }),
  },
  '&:focus svg': {
    opacity: 1,
  },
}));

export default function NpmCopyButton(
  props: React.HTMLAttributes<HTMLButtonElement> & { installation: string; sx?: SxProps<Theme> },
) {
  const { installation, onClick, sx, ...other } = props;
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
      {...other}
    >
      <strong>$</strong>
      {installation}
      {copied ? (
        <CheckRounded color="inherit" sx={{ fontSize: 15 }} />
      ) : (
        <ContentCopyRounded color="inherit" sx={{ fontSize: 15 }} />
      )}
    </Button>
  );
}
