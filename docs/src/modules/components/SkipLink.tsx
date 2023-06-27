import * as React from 'react';
import MuiLink from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import { useTranslate } from 'docs/src/modules/utils/i18n';

const StyledLink = styled(MuiLink)(({ theme }) => ({
  position: 'fixed',
  padding: theme.spacing(1),
  background: (theme.vars || theme).palette.background.paper,
  transition: theme.transitions.create('top', {
    easing: theme.transitions.easing.easeIn,
    duration: theme.transitions.duration.leavingScreen,
  }),
  left: theme.spacing(2),
  top: theme.spacing(-10),
  zIndex: theme.zIndex.tooltip + 1,
  '&:focus': {
    top: theme.spacing(2),
    transition: theme.transitions.create('top', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  '@media print': {
    display: 'none',
  },
}));

export default function SkipLink() {
  const t = useTranslate();

  return (
    <StyledLink color="secondary" href="#main-content">
      {t('appFrame.skipToContent')}
    </StyledLink>
  );
}
