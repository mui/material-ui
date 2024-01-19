import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const data = [
  { title: '4M', metadata: 'Weekly downloads on npm' },
  { title: '90k', metadata: 'Stars on GitHub' },
  { title: '2.7k', metadata: 'Open-source contributors' },
  { title: '18.9k', metadata: 'Followers on X' },
];

export default function MuiStatistics() {
  return (
    <Box sx={{ py: 3, display: 'flex', justifyContent: 'center', gap: 2, width: '100%' }}>
      {data.map((item) => (
        <Box key={item.title} sx={{ height: '100%', width: { xs: '100%', sm: 200 } }}>
          <Typography
            component="p"
            variant="h4"
            fontWeight="bold"
            sx={(theme) => ({
              textAlign: { xs: 'left', sm: 'center' },
              color: 'primary.main',
              ...theme.applyDarkStyles({
                color: 'primary.200',
              }),
            })}
          >
            {item.title}
          </Typography>
          <Typography color="text.secondary" sx={{ textAlign: { xs: 'left', sm: 'center' } }}>
            {item.metadata}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
