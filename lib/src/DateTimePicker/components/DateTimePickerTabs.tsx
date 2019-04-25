import * as React from 'react';
import * as PropTypes from 'prop-types';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Paper from '@material-ui/core/Paper';
import { Theme } from '@material-ui/core';
import { TimeIcon } from '../../_shared/icons/TimeIcon';
import { DateTimePickerViewType } from '../DateTimePickerRoot';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { DateRangeIcon } from '../../_shared/icons/DateRangeIcon';

const viewToTabIndex = (openView: DateTimePickerViewType) => {
  if (openView === 'date' || openView === 'year') {
    return 'date';
  }

  return 'time';
};

const tabIndexToView = (tab: DateTimePickerViewType) => {
  if (tab === 'date') {
    return 'date';
  }

  return 'hours';
};

export interface DateTimePickerTabsProps {
  view: DateTimePickerViewType;
  onChange: (view: DateTimePickerViewType) => void;
  dateRangeIcon: React.ReactNode;
  timeIcon: React.ReactNode;
}

export const useStyles = makeStyles(
  (theme: Theme) => {
    // prettier-ignore
    const tabsBackground = theme.palette.type === 'light'
    ? theme.palette.primary.main
    : theme.palette.background.default;

    return {
      tabs: {
        color: theme.palette.getContrastText(tabsBackground),
        backgroundColor: tabsBackground,
      },
    };
  },
  { name: 'MuiPickerDTTabs' }
);

export const DateTimePickerTabs: React.SFC<DateTimePickerTabsProps> = ({
  view,
  onChange,
  dateRangeIcon,
  timeIcon,
}) => {
  const classes = useStyles();
  const theme = useTheme<Theme>();
  const indicatorColor = theme.palette.type === 'light' ? 'secondary' : 'primary';
  const handleChange = (e: React.ChangeEvent<{}>, value: DateTimePickerViewType) => {
    if (value !== viewToTabIndex(view)) {
      onChange(tabIndexToView(value));
    }
  };

  return (
    <Paper>
      <Tabs
        variant="fullWidth"
        value={viewToTabIndex(view)}
        onChange={handleChange}
        className={classes.tabs}
        indicatorColor={indicatorColor}
      >
        <Tab value="date" icon={<>{dateRangeIcon}</>} />
        <Tab value="time" icon={<>{timeIcon!}</>} />
      </Tabs>
    </Paper>
  );
};

(DateTimePickerTabs as any).propTypes = {
  view: PropTypes.string.isRequired,
  dateRangeIcon: PropTypes.node.isRequired,
  timeIcon: PropTypes.node.isRequired,
};

DateTimePickerTabs.defaultProps = {
  dateRangeIcon: <DateRangeIcon />,
  timeIcon: <TimeIcon />,
};

export default DateTimePickerTabs;
