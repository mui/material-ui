import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { DateRange } from '@mui/x-date-pickers-pro/DateRangePicker';
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Frame from 'docs/src/components/action/Frame';
import { brandingDarkTheme } from 'docs/src/modules/brandingTheme';
import EmailSubscribe from 'docs/src/components/footer/EmailSubscribe';

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
        <Frame.Info>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              lineHeight: 1,
              mb: 0.5,
            }}
          >
            <Typography variant="body2" fontWeight="bold" sx={{ mr: 1 }}>
              Available in alpha!
            </Typography>
            <Chip
              label="See docs"
              size="small"
              href="/x/react-date-pickers/date-range-picker/"
              component="a"
              sx={{ fontWeight: 500, cursor: 'pointer' }}
            />
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Subscribe to our newsletter to get first-hand info about the development and release of
            new components.
          </Typography>
          <EmailSubscribe
            sx={{
              '& > div': {
                maxWidth: 'initial',
                border: '1px solid',
                borderColor: 'primaryDark.600',
              },
            }}
          />
        </Frame.Info>
      </ThemeProvider>
    </Frame>
  );
}
