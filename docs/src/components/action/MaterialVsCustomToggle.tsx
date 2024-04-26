import * as React from 'react';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

interface MaterialVsCustomToggleProps {
  customized: boolean;
  setCustomized: React.Dispatch<boolean>;
}

export default function MaterialVsCustomToggle({
  customized,
  setCustomized,
}: MaterialVsCustomToggleProps) {
  const handleToggle = () => {
    setCustomized(!customized);
  };

  return (
    <Box
      sx={(theme) => ({
        position: 'absolute',
        top: 0,
        right: 0,
        p: 1.5,
        zIndex: 3,
        background: `linear-gradient(to bottom, ${(theme.vars || theme).palette.common.black} 70%, transparent)`,
      })}
    >
      <FormControlLabel
        control={<Switch checked={customized} onChange={handleToggle} />}
        label={customized ? 'Custom theme on' : 'Custom theme off'}
        labelPlacement="start"
        sx={{
          m: 0,
          '.MuiFormControlLabel-label': {
            mr: 1,
            fontSize: '0.75rem',
            color: customized ? 'primary.200' : 'text.secondary',
            opacity: customized ? 1 : 0.5,
            fontWeight: 'medium',
          },
        }}
      />
    </Box>
  );
}
