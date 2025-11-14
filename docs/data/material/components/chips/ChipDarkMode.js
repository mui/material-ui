import * as React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

export default function ChipDarkMode() {
  const [deleted, setDeleted] = React.useState({});

  const handleDelete = (chipLabel) => {
    setDeleted({ ...deleted, [chipLabel]: true });
  };

  const chipVariants = [
    { label: 'Default', variant: 'filled', color: 'default' },
    { label: 'Primary', variant: 'filled', color: 'primary' },
    { label: 'Success', variant: 'filled', color: 'success' },
    { label: 'Outlined', variant: 'outlined', color: 'primary' },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ p: 2, mb: 3, bgcolor: 'background.level1' }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Chips automatically adapt their appearance for dark mode. Toggle your theme to see the color scheme change.
        </Typography>
      </Paper>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 3,
        }}
      >
        {/* Light mode chips */}
        <div>
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
            Light Mode
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
            {chipVariants.map((chip) => (
              <Chip
                key={chip.label}
                label={chip.label}
                variant={chip.variant}
                color={chip.color}
                onDelete={() => handleDelete(`light-${chip.label}`)}
                sx={{ backgroundColor: undefined }}
              />
            ))}
          </Stack>
  </div>

  {/* Dark mode chips */}
  <div>
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
            Dark Mode
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              flexWrap: 'wrap',
              gap: 1,
              p: 2,
              bgcolor: '#1e1e1e',
              borderRadius: 1,
              '& .MuiChip-root': {
                backgroundColor: '#2d2d2d',
                color: '#fff',
              },
              '& .MuiChip-outlined': {
                backgroundColor: 'transparent',
                borderColor: '#555',
                color: '#fff',
              },
              '& .MuiChip-colorPrimary': {
                backgroundColor: '#1976d2',
                color: '#fff',
              },
              '& .MuiChip-colorSuccess': {
                backgroundColor: '#388e3c',
                color: '#fff',
              },
            }}
          >
            {chipVariants.map((chip) => (
              <Chip
                key={chip.label}
                label={chip.label}
                variant={chip.variant}
                color={chip.color}
                onDelete={() => handleDelete(`dark-${chip.label}`)}
              />
            ))}
          </Stack>
        </div>
      </Box>
    </Box>
  );
}
