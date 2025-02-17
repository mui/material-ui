import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function PopperComponent(props) {
  const { disablePortal, anchorEl, open, ...other } = props;
  return <div {...other} />;
}

PopperComponent.propTypes = {
  anchorEl: PropTypes.any,
  disablePortal: PropTypes.bool,
  open: PropTypes.bool.isRequired,
};

export default function OverridingInternalSlot() {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', width: 320, minHeight: 220 }}
    >
      <Autocomplete
        open
        options={['🆘 Need help', '✨ Improvement', '🚀 New feature', '🐛 Bug fix']}
        renderInput={(params) => <TextField {...params} />}
        slots={{
          popper: PopperComponent,
        }}
      />
    </Box>
  );
}
