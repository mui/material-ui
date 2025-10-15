import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Grid from '@mui/joy/Grid';
import Typography from '@mui/joy/Typography';

export default function ChildrenCenteredGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
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
        {['Jimmy', 'Michal', 'Jun', 'Marija'].map((name, index) => (
          <Grid
            key={name}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 180,
            }}
            size={{ xs: 12, sm: 6, md: 3 }}
          >
            <Avatar src={`/static/images/avatar/${index + 1}.jpg`} size="lg" />
            <Typography sx={{ ml: 1.5 }}>{name}</Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
