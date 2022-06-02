import * as React from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import Fade from '@mui/material/Fade';
import { useTranslate } from 'docs/src/modules/utils/i18n';

export default function BackToTop() {
  const t = useTranslate();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 200,
  });

  const handleClick = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <Fade in={trigger}>
      <Tooltip title="Scroll to top">
        <Fab
          sx={(theme) => ({
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 10,
            backgroundColor:
              theme.palette.mode === 'dark'
                ? theme.palette.primaryDark[400]
                : theme.palette.primary[100],
            boxShadow: `0px 4px 20px ${
              theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(170, 180, 190, 0.3)'
            }`,
            '&:hover': {
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[500]
                  : theme.palette.primary[200],
            },
            '&:active': {
              boxShadow: `0px 4px 20px ${
                theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(170, 180, 190, 0.6)'
              }`,
            },
          })}
          size="small"
          aria-label={t('backToTop')}
          onClick={handleClick}
          data-ga-event-category="docs"
          data-ga-event-action="click-back-to-top"
        >
          <KeyboardArrowUpRoundedIcon
            sx={{
              color: (theme) =>
                theme.palette.mode === 'dark'
                  ? theme.palette.primary[200]
                  : theme.palette.primary[800],
            }}
          />
        </Fab>
      </Tooltip>
    </Fade>
  );
}
