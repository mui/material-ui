import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Frame from 'docs/src/components/action/Frame';
import { LineChart } from '@mui/x-charts/LineChart';

export default function XDateRangeDemo() {
  return (
    <Frame>
      <Frame.Demo sx={{ p: 2 }}>
        <Paper
          variant="outlined"
          sx={[
            {
              '& > div': {
                borderRadius: 1,
                overflow: 'auto',
                bgcolor: '#fff',
              },
              '& > div > div > div > div': {
                flexGrow: 1,
              },
              '& .MuiTypography-subtitle1': {
                fontSize: '0.875rem',
              },
              '& .MuiTypography-caption': {
                width: 28,
                height: 32,
              },
              '& .MuiPickersSlideTransition-root': {
                minWidth: 258,
                minHeight: 238,
              },
              '& [role="row"]': {
                margin: '4px 0',
              },
              '& .MuiDateRangePickerDay-root': {
                lineHeight: 0,
                margin: 0,
              },
              '& .MuiPickersDay-root': {
                width: 28,
                height: 28,
                fontWeight: 400,
              },
            },
            (theme) =>
              theme.applyDarkStyles({
                '& > div': {
                  bgcolor: 'primaryDark.900',
                },
              }),
          ]}
        >
          <LineChart series={[{ data: [1, 2, 3, 4, 5] }]} />
        </Paper>
      </Frame.Demo>
      <Frame.Info data-mui-color-scheme="dark">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="body2" fontWeight="bold" sx={{ mr: 1 }}>
            🎯&nbsp;&nbsp;&nbsp;Alpha version available now for your project!
          </Typography>
          <Button
            variant="outlined"
            href="/x/react-charts/"
            component="a"
            sx={{ mt: { xs: 2, sm: 0 }, color: 'primary.300' }}
          >
            View more demos
          </Button>
        </Box>
      </Frame.Info>
    </Frame>
  );
}
