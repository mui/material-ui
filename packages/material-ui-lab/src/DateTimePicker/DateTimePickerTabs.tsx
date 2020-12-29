import * as React from 'react';
import clsx from 'clsx';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Paper from '@material-ui/core/Paper';
import { createStyles, WithStyles, withStyles, Theme, useTheme } from '@material-ui/core/styles';
import TimeIcon from '../internal/svg-icons/Time';
import DateRangeIcon from '../internal/svg-icons/DateRange';
import { WrapperVariantContext } from '../internal/pickers/wrappers/WrapperVariantContext';
import { DateTimePickerView } from '../internal/pickers/typings/Views';

const viewToTabIndex = (openView: DateTimePickerView) => {
  if (openView === 'date' || openView === 'year') {
    return 'date';
  }

  return 'time';
};

const tabIndexToView = (tab: DateTimePickerView) => {
  if (tab === 'date') {
    return 'date';
  }

  return 'hours';
};

export interface DateTimePickerTabsProps {
  dateRangeIcon?: React.ReactNode;
  onChange: (view: DateTimePickerView) => void;
  timeIcon?: React.ReactNode;
  view: DateTimePickerView;
}

export const styles = (theme: Theme) => {
  const tabsBackground =
    theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.background.default;

  return createStyles({
    root: {},
    modeDesktop: {
      order: 1,
    },
    tabs: {
      color: theme.palette.getContrastText(tabsBackground),
      backgroundColor: tabsBackground,
    },
  });
};

export type DateTimePickerTabsClassKey = keyof WithStyles<typeof styles>['classes'];

/**
 * @ignore - internal component.
 */
const DateTimePickerTabs: React.FC<DateTimePickerTabsProps & WithStyles<typeof styles>> = (
  props,
) => {
  const {
    classes,
    dateRangeIcon = <DateRangeIcon />,
    onChange,
    timeIcon = <TimeIcon />,
    view,
  } = props;

  const theme = useTheme();
  const wrapperVariant = React.useContext(WrapperVariantContext);
  const indicatorColor = theme.palette.mode === 'light' ? 'secondary' : 'primary';

  const handleChange = (event: React.ChangeEvent<{}>, value: DateTimePickerView) => {
    if (value !== viewToTabIndex(view)) {
      onChange(tabIndexToView(value));
    }
  };

  return (
    <Paper className={clsx(classes.root, { [classes.modeDesktop]: wrapperVariant === 'desktop' })}>
      <Tabs
        variant="fullWidth"
        value={viewToTabIndex(view)}
        onChange={handleChange}
        className={classes.tabs}
        indicatorColor={indicatorColor}
      >
        <Tab
          value="date"
          aria-label="pick date"
          icon={<React.Fragment>{dateRangeIcon}</React.Fragment>}
        />
        <Tab
          value="time"
          aria-label="pick time"
          icon={<React.Fragment>{timeIcon}</React.Fragment>}
        />
      </Tabs>
    </Paper>
  );
};

export default withStyles(styles, { name: 'MuiDateTimePickerTabs' })(DateTimePickerTabs);
