import * as React from 'react';
import MuiLink from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import { useTranslate } from 'docs/src/modules/utils/i18n';

const StyledLink = styled(MuiLink)(({ theme }) => ({
  position: 'fixed',
  padding: theme.spacing(1, 2),
  backgroundColor: (theme.vars || theme).palette.secondary[700],
  color: '#fff',
  outlineOffset: 2,
  '&:hover': {
    color: '#fff',
  },
  borderRadius: theme.shape.borderRadius,
  left: theme.spacing(2),
  zIndex: theme.zIndex.tooltip + 1,
  top: theme.spacing(-10),
  transition: theme.transitions.create('top', {
    easing: theme.transitions.easing.easeIn,
    duration: theme.transitions.duration.leavingScreen,
  }),
  '&:focus': {
    top: theme.spacing(2),
    transition: theme.transitions.create('top', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  '@media (prefers-reduced-motion: reduce)': {
    top: theme.spacing(2),
    transition: theme.transitions.create('opacity'),
    opacity: 0,
    '&:focus': {
      opacity: 1,
      transition: theme.transitions.create('opacity'),
    },
  },
  '@media print': {
    display: 'none',
  },
}));

export default function SkipLink() {
  const t = useTranslate();

  return <StyledLink href="#main-content">{t('appFrame.skipToContent')}</StyledLink>;
}
