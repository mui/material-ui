import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';

export default function FullBorderedGrid() {
  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid
        container
        sx={{
          '--Grid-borderWidth': '1px',
          borderTop: 'var(--Grid-borderWidth) solid',
          borderLeft: 'var(--Grid-borderWidth) solid',
          borderColor: 'divider',
          '& > div': {
            borderRight: 'var(--Grid-borderWidth) solid',
            borderBottom: 'var(--Grid-borderWidth) solid',
            borderColor: 'divider',
          },
        }}
      >
        {[...Array(6)].map((_, index) => (
          <Grid
            key={index}
            minHeight={160}
            size={{
              xs: 12,
              sm: 6,
              md: 4,
              lg: 3,
            }}
          />
        ))}
      </Grid>
    </Box>
  );
}
