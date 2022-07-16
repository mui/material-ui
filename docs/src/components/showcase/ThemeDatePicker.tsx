import * as React from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import { iconButtonClasses } from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

export default function ThemeDatePicker() {
  const [value, setValue] = React.useState<Date | null>(new Date());
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Fade in timeout={700}>
        <Box
          sx={(theme) => ({
            '& > div': {
              border: '1px solid',
              borderColor: 'grey.200',
              borderRadius: 1,
              [theme.getColorSchemeSelector('dark')]: {
                borderColor: 'primaryDark.500',
              },
            },
            '& > div > div > div': {
              width: '100%',
            },
            [`& .${iconButtonClasses.root}`]: {
              color: 'primary.500',
              [theme.getColorSchemeSelector('dark')]: {
                color: 'primary.300',
              },
            },
            '& .MuiPickerStaticWrapper-root': {
              bgcolor: '#fff',
              [theme.getColorSchemeSelector('dark')]: {
                bgcolor: 'primaryDark.800',
              },
            },
            '& .MuiCalendarPicker-root': {
              width: '100%',
              '& .MuiTypography-caption': {
                color: 'grey.700',
                height: 24,
                [theme.getColorSchemeSelector('dark')]: {
                  color: 'grey.600',
                },
              },
              '[role="presentation"]': {
                '& .MuiIconButton-root': {
                  padding: 0,
                },
              },
              '& .PrivatePickersSlideTransition-root': {
                minHeight: 180,
              },
              '& .PrivatePickersYear-yearButton': {
                fontSize: '1rem',
              },
              '& [role="row"]': {
                justifyContent: 'space-around',
              },
              '& .MuiCalendarPicker-viewTransitionContainer > div > div': {
                justifyContent: 'space-around',
              },
              '& .MuiPickersDay-root': {
                width: 24,
                height: 24,
                fontWeight: 500,
                [theme.getColorSchemeSelector('dark')]: {
                  color: 'primary.200',
                },
                '&.Mui-selected': {
                  color: '#fff',
                },
                '&.MuiPickersDay-today': {
                  '&:not(.Mui-selected)': {
                    borderColor: 'primary.main',
                  },
                },
              },
            },
          })}
        >
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </Box>
      </Fade>
    </LocalizationProvider>
  );
}
