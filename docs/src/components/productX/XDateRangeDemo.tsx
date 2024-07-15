import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';
import { PickersShortcutsItem, PickersShortcutsProps, DateRange } from '@mui/x-date-pickers-pro';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { HighlightedCode } from '@mui/docs/HighlightedCode';
import { startOfWeek, endOfWeek, subDays } from 'date-fns';
import Frame from 'docs/src/components/action/Frame';

const startDate = new Date();
startDate.setDate(10);
const endDate = new Date();
endDate.setDate(endDate.getDate() + 28);

function CustomRangeShortcuts(props: PickersShortcutsProps<DateRange<Date>>) {
  const { items, onChange, isValid, changeImportance = 'accept' } = props;

  if (items == null || items.length === 0) {
    return null;
  }

  const resolvedItems = items.map((item: PickersShortcutsItem<DateRange<Date>>) => {
    const newValue = item.getValue({ isValid });

    return {
      label: item.label,
      onClick: () => {
        onChange(newValue, changeImportance, item);
      },
      disabled: !isValid(newValue),
    };
  });

  return (
    <Box sx={{ gridRow: 1, gridColumn: 2 }}>
      <List
        sx={{
          display: 'flex',
          p: 1.5,
          gap: 1.5,
          '& .MuiListItem-root': {
            p: 0,
            width: 'fit-content',
          },
        }}
      >
        {resolvedItems.map((item) => {
          return (
            <ListItem key={item.label}>
              <Chip size="small" {...item} />
            </ListItem>
          );
        })}
      </List>
      <Divider />
    </Box>
  );
}

const code = `
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
</LocalizationProvider>`;

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
                bgcolor: '#FFF',
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
              '& .MuiPickersArrowSwitcher-root': {
                padding: 0,
                paddingTop: 0.5,
              },
              '& .MuiPickersDay-root': {
                width: 28,
                height: 28,
                fontWeight: 'regular',
              },
              '& .MuiDateRangePickerDay-day.Mui-selected': {
                fontWeight: 'semiBold',
              },
              '& .MuiDateRangePickerDay-day:not(.Mui-selected)': {
                borderColor: 'primary.300',
              },
            },
            (theme) =>
              theme.applyDarkStyles({
                '& > div': {
                  bgcolor: 'primaryDark.900',
                },
                '& .MuiDateRangePickerDay-day.Mui-selected': {
                  color: '#FFF',
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
      <Frame.Info data-mui-color-scheme="dark" sx={{ maxHeight: 300, overflow: 'auto' }}>
        <HighlightedCode copyButtonHidden plainStyle code={code} language="jsx" />
      </Frame.Info>
    </Frame>
  );
}
