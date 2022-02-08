import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { DateRange } from '@mui/lab/DateRangePicker';
import StaticDateRangePicker from '@mui/lab/StaticDateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import Frame from 'docs/src/components/action/Frame';
import { brandingDarkTheme } from 'docs/src/modules/brandingTheme';

const startDate = new Date();
startDate.setDate(10);
const endDate = new Date();
endDate.setDate(endDate.getDate() + 28);

export default function XDateRangeDemo() {
  const [value, setValue] = React.useState<DateRange<Date>>([startDate, endDate]);
  return (
    <Frame>
      <Frame.Demo sx={{ p: 2 }}>
        <Paper
          variant="outlined"
          sx={{
            '& > div': {
              borderRadius: 1,
              overflow: 'auto',
              bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.900' : '#fff'),
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
            '& .PrivatePickersSlideTransition-root': {
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
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticDateRangePicker
              displayStaticWrapperAs="desktop"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(startProps, endProps) => (
                <React.Fragment>
                  <TextField {...startProps} />
                  <Box sx={{ mx: 2 }}> to </Box>
                  <TextField {...endProps} />
                </React.Fragment>
              )}
            />
          </LocalizationProvider>
        </Paper>
      </Frame.Demo>
      <ThemeProvider theme={brandingDarkTheme}>
        <Frame.Info
          sx={{
            py: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Box sx={{ width: 'max-content', mx: 'auto' }}>
              <Typography variant="caption" color="primary.300">
                Start
              </Typography>
              <Typography variant="body2" color="text.primary">
                {value[0]?.toDateString()}
              </Typography>
            </Box>
          </Box>
          <KeyboardArrowRightRounded sx={{ mx: 2, color: 'text.secondary' }} />{' '}
          <Box sx={{ flex: 1 }}>
            <Box sx={{ width: 'max-content', mx: 'auto' }}>
              <Typography variant="caption" color="primary.300">
                End
              </Typography>
              <Typography variant="body2" color="text.primary">
                {value[1]?.toDateString()}
              </Typography>
            </Box>
          </Box>
        </Frame.Info>
      </ThemeProvider>
    </Frame>
  );
}
