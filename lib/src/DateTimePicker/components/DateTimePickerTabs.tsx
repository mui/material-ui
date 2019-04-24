import * as React from 'react';
import * as PropTypes from 'prop-types';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Paper from '@material-ui/core/Paper';
import { Theme } from '@material-ui/core';
import { TimeIcon } from '../../_shared/icons/TimeIcon';
import { DateTimePickerViewType } from '../DateTimePickerRoot';
import { withStyles, WithStyles } from '@material-ui/styles';
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

export interface DateTimePickerTabsProps extends WithStyles<typeof styles, true> {
  view: DateTimePickerViewType;
  onChange: (view: DateTimePickerViewType) => void;
  dateRangeIcon: React.ReactNode;
  timeIcon: React.ReactNode;
}

export const DateTimePickerTabs: React.SFC<DateTimePickerTabsProps> = props => {
  const { view, onChange, classes, theme, dateRangeIcon, timeIcon } = props;

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

export const styles = (theme: Theme) => {
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
};

export default withStyles(styles, { name: 'MuiPickerDTTabs', withTheme: true })(DateTimePickerTabs);
