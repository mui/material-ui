import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const data = [
  { title: '3.2M', metadata: 'Weekly downloads on npm' },
  { title: '78k', metadata: 'Stars on GitHub' },
  { title: '2.4k', metadata: 'Open-source contributors' },
  { title: '17k', metadata: 'Followers on Twitter' },
];

export default function MuiStatistics() {
  return (
    <Grid item xs={12} md={6} container spacing={4}>
      {data.map((item) => (
        <Grid key={item.title} item xs={6}>
          <Box
            sx={(theme) => ({
              height: '100%',
              p: 0.5,
              pl: 2,
              borderLeft: '2px solid',
              ...theme.getStyle({
                borderColor: {
                  default: 'primary.100',
                  dark: 'primaryDark.600',
                },
              }),
            })}
          >
            <Typography
              component="div"
              variant="h4"
              fontWeight="bold"
              sx={(theme) =>
                theme.getStyle({
                  color: {
                    default: 'primary.main',
                    dark: 'primary.200',
                  },
                })
              }
            >
              {item.title}
            </Typography>
            <Typography
              sx={(theme) =>
                theme.getStyle({
                  color: {
                    default: 'grey.800',
                    dark: 'grey.300',
                  },
                })
              }
            >
              {item.metadata}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
