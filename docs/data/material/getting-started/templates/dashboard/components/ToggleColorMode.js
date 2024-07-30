import * as React from 'react';
import PropTypes from 'prop-types';

import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded';
import MenuButton from './MenuButton';

function ToggleColorMode({ mode, toggleColorMode, ...props }) {
  return (
    <MenuButton
      onClick={toggleColorMode}
      size="small"
      aria-label="button to toggle theme"
      {...props}
    >
      {mode === 'dark' ? (
        <WbSunnyRoundedIcon fontSize="small" />
      ) : (
        <ModeNightRoundedIcon fontSize="small" />
      )}
    </MenuButton>
  );
}

ToggleColorMode.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default ToggleColorMode;
