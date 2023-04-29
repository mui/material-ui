import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Frame from 'docs/src/components/action/Frame';
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';
import { PickersShortcutsItem, PickersShortcutsProps, DateRange } from '@mui/x-date-pickers-pro';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { startOfWeek, endOfWeek, subDays } from 'date-fns';

const startDate = new Date();
startDate.setDate(10);
const endDate = new Date();
endDate.setDate(endDate.getDate() + 28);

function CustomRangeShortcuts(props: PickersShortcutsProps<DateRange<Date>>) {
  const { items, onChange, isValid } = props;

  if (items == null || items.length === 0) {
    return null;
  }

  const resolvedItems = items.map((item: PickersShortcutsItem<DateRange<Date>>) => {
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
              value={[startDate, endDate]}
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
            View more demos
          </Button>
        </Box>
      </Frame.Info>
    </Frame>
  );
}
