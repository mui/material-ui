import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { PickersShortcutsItem, DateRange } from '@mui/x-date-pickers-pro';
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Frame from 'docs/src/components/action/Frame';
import { startOfWeek, endOfWeek, subDays, startOfMonth, endOfMonth, addMonths } from 'date-fns';
import { Chip, Divider, List, ListItem } from '@mui/material';

const startDate = new Date();
startDate.setDate(10);
const endDate = new Date();
endDate.setDate(endDate.getDate() + 28);

function CustomRangeShortcuts(props: PickersShortcutsProps<DateRange<Dayjs>>) {
  const { items, onChange, isValid } = props;

  if (items == null || items.length === 0) {
    return null;
  }

  const resolvedItems = items.map((item) => {
    const newValue = item.getValue({ isValid });

    return {
      label: item.label,
      onClick: () => {
        onChange(newValue);
      },
      disabled: !isValid(newValue),
    };
  });

  return (
    <Box
      sx={{
        gridRow: 1,
        gridColumn: 2,
      }}
    >
      <List
        dense
        sx={(theme) => ({
          display: 'flex',
          px: theme.spacing(4),
          '& .MuiListItem-root': {
            py: 2,
            pl: 0,
            pr: theme.spacing(1),
          },
        })}
      >
        {resolvedItems.map((item) => {
          return (
            <ListItem key={item.label}>
              <Chip {...item} />
            </ListItem>
          );
        })}
      </List>
      <Divider />
    </Box>
  );
}

export default function XDateRangeDemo() {
  const [value, setValue] = React.useState<DateRange<Date>>([startDate, endDate]);
  const today = new Date();
  const shortcutsItems: PickersShortcutsItem<DateRange<Date>>[] = [
    {
      label: 'This Week',
      getValue: () => {
        return [startOfWeek(today), endOfWeek(today)];
      },
    },
    {
      label: 'Last Week',
      getValue: () => {
        const prevWeek = subDays(today, 7);
        return [startOfWeek(prevWeek), endOfWeek(prevWeek)];
      },
    },
    {
      label: 'Last 7 Days',
      getValue: () => {
        return [subDays(today, 7), today];
      },
    },
    {
      label: 'Current Month',
      getValue: () => {
        return [startOfMonth(today), endOfMonth(today)];
      },
    },
    {
      label: 'Next Month',
      getValue: () => {
        const nextMonth = addMonths(today, 1);
        return [startOfMonth(nextMonth), endOfMonth(nextMonth)];
      },
    },
    { label: 'Reset', getValue: () => [null, null] },
  ];

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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticDateRangePicker
              displayStaticWrapperAs="desktop"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              slots={{
                shortcuts: CustomRangeShortcuts,
              }}
              slotProps={{
                shortcuts: {
                  items: shortcutsItems,
                },
              }}
            />
          </LocalizationProvider>
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
            🎉&nbsp;&nbsp;&nbsp;Stable version available now for your project!
          </Typography>
          <Button
            variant="outlined"
            href="/x/react-Date-pickers/Date-range-picker/"
            component="a"
            sx={{ mt: { xs: 2, sm: 0 }, color: 'primary.300' }}
          >
            Check the docs
          </Button>
        </Box>
      </Frame.Info>
    </Frame>
  );
}
