import * as React from 'react';
import * as PropTypes from 'prop-types';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import Zoom from '@mui/material/Zoom';
import { useTranslate } from 'docs/src/modules/utils/i18n';

function BackToTop(props) {
  const t = useTranslate();
  const { window: windowProp, onClick, sx, ...other } = props;

  const trigger = useScrollTrigger({
    target: windowProp ? windowProp() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onClick?.(event);
  };

  return (
    <Zoom in={trigger}>
      <Box
        role="presentation"
        {...other}
        onClick={handleClick}
        sx={[
          { position: 'fixed', bottom: 24, right: 24, zIndex: 10 },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <Tooltip title="Scroll to top">
          <Fab
            color="primary"
            size="small"
            aria-label={t('backToTop')}
            sx={{
              boxShadow: (theme) =>
                `0px 4px 20px ${
                  theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(170, 180, 190, 0.3)'
                }`,
            }}
          >
            <KeyboardArrowUpRoundedIcon />
          </Fab>
        </Tooltip>
      </Box>
    </Zoom>
  );
}

BackToTop.propTypes = {
  onClick: PropTypes.func,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  window: PropTypes.func,
};

export default BackToTop;
