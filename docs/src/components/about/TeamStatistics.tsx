import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const data = [
  { title: '2014', metadata: 'The starting year' },
  { title: '100%', metadata: 'Remote team' },
  { title: '+14', metadata: 'Countries represented' },
];

export default function TeamStatistics() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      {data.map((item) => (
        <Box key={item.title}>
          <Box
            sx={(theme) => ({
              height: '100%',
              minWidth: 200,
              p: 1,
              pl: 2,
              // borderLeft: '1px solid',
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
            <Typography textAlign="center" color="text.secondary">
              {item.metadata}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
