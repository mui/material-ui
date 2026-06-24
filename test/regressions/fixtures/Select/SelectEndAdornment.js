import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';

// https://github.com/mui/material-ui/issues/45270
// The endAdornment must sit left of the chevron (not over it) and the value must clear
// both, across variants and with a start adornment present.
const variants = ['outlined', 'filled', 'standard'];

export default function SelectEndAdornment() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 320, p: 2 }}>
      {variants.map((variant) => (
        <Select
          key={variant}
          variant={variant}
          value="Twenty"
          endAdornment={
            <InputAdornment position="end">
              <IconButton edge="end">
                <RefreshIcon />
              </IconButton>
            </InputAdornment>
          }
        >
          <MenuItem value="Twenty">Twenty</MenuItem>
        </Select>
      ))}
      <Select
        variant="outlined"
        value="Twenty"
        startAdornment={
          <InputAdornment position="start">
            <IconButton edge="start">
              <RefreshIcon />
            </IconButton>
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <IconButton edge="end">
              <RefreshIcon />
            </IconButton>
          </InputAdornment>
        }
      >
        <MenuItem value="Twenty">Twenty</MenuItem>
      </Select>
    </Box>
  );
}
