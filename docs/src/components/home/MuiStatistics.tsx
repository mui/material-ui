import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const data = [
  { title: '4M', metadata: 'Weekly downloads on npm' },
  { title: '85k', metadata: 'Stars on GitHub' },
  { title: '2.7k', metadata: 'Open-source contributors' },
  { title: '18.4k', metadata: 'Followers on Twitter' },
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
              borderColor: 'primary.100',
              ...theme.applyDarkStyles({
                borderColor: 'primaryDark.600',
              }),
            })}
          >
            <Typography
              component="div"
              variant="h4"
              fontWeight="bold"
              sx={(theme) => ({
                color: 'primary.main',
                ...theme.applyDarkStyles({
                  color: 'primary.200',
                }),
              })}
            >
              {item.title}
            </Typography>
            <Typography
              sx={(theme) => ({
                color: 'grey.800',
                ...theme.applyDarkStyles({
                  color: 'grey.300',
                }),
              })}
            >
              {item.metadata}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
