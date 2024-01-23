import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const data = [
  { title: '5.8M', metadata: 'Weekly downloads on npm' },
  { title: '90.5k', metadata: 'Stars on GitHub' },
  { title: '2.9k', metadata: 'Open-source contributors' },
  { title: '18.9k', metadata: 'Followers on X' },
];

export default function MuiStatistics() {
  return (
    <Box
      data-mui-color-scheme="dark"
      sx={(theme) => ({
        pt: 2.5,
        pb: 3,
        px: { xs: 3, sm: 0 },
        display: 'flex',
        justifyContent: 'center',
        gap: 2,
        width: '100%',
        flexWrap: 'wrap',
        background: `linear-gradient(180deg, ${alpha(
          theme.palette.primary[900],
          0.1,
        )} 2%, transparent 80%)`,
      })}
    >
      {data.map((item) => (
        <Box key={item.title} sx={{ width: { xs: '100%', sm: 200 } }}>
          <Typography
            component="p"
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            sx={(theme) => ({
              color: 'primary.main',
              ...theme.applyDarkStyles({
                color: 'primary.200',
              }),
            })}
          >
            {item.title}
          </Typography>
          <Typography color="text.secondary" textAlign="center">
            {item.metadata}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
