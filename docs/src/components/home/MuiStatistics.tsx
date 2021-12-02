import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const data = [
  { title: '2.3M', metadata: 'Weekly downloads on npm' },
  { title: '72.7k', metadata: 'Stars on GitHub' },
  { title: '2.2k', metadata: 'Open-source contributors' },
  { title: '15.8k', metadata: 'Followers on Twitter' },
];

export default function MuiStatistics() {
  return (
    <Grid item xs={12} md={6} container spacing={2}>
      {data.map((item) => (
        <Grid key={item.title} item xs={6}>
          <Box
            sx={{
              height: '100%',
              p: 1,
              pl: 2,
              borderLeft: '4px solid',
              borderColor: (theme) =>
                theme.palette.mode === 'dark' ? 'primaryDark.600' : 'primary.100',
            }}
          >
            <Typography
              component="div"
              variant="h3"
              color={(theme) => (theme.palette.mode === 'dark' ? 'primary.200' : 'primary.main')}
              fontWeight="bold"
            >
              {item.title}
            </Typography>
            <Typography
              color={(theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800')}
            >
              {item.metadata}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
