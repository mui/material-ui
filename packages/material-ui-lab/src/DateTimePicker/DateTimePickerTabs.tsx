import * as React from 'react';
import clsx from 'clsx';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Paper from '@material-ui/core/Paper';
import { MuiStyles, WithStyles, withStyles, useTheme, StyleRules } from '@material-ui/core/styles';
import TimeIcon from '../internal/svg-icons/Time';
import DateRangeIcon from '../internal/svg-icons/DateRange';
import { WrapperVariantContext } from '../internal/pickers/wrappers/WrapperVariantContext';
import { DateTimePickerView } from './shared';

type TabValue = 'date' | 'time';

const viewToTab = (openView: DateTimePickerView): TabValue => {
  // TODO: what happens if `openView` is `month`?
  if (openView === 'day' || openView === 'year') {
    return 'date';
  }

  return 'time';
};

const tabToView = (tab: TabValue): DateTimePickerView => {
  if (tab === 'date') {
    return 'day';
  }

  return 'hours';
};

export interface DateTimePickerTabsProps {
  dateRangeIcon?: React.ReactNode;
  onChange: (view: DateTimePickerView) => void;
  timeIcon?: React.ReactNode;
  view: DateTimePickerView;
}

export type DateTimePickerTabsClassKey = 'root' | 'modeDesktop' | 'tabs';

export const styles: MuiStyles<DateTimePickerTabsClassKey> = (
  theme,
): StyleRules<DateTimePickerTabsClassKey> => {
  const tabsBackground =
    theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.background.default;

  return {
    root: {},
    modeDesktop: {
      order: 1,
    },
    tabs: {
      color: theme.palette.getContrastText(tabsBackground),
      backgroundColor: tabsBackground,
    },
  };
};

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

  const handleChange = (event: React.SyntheticEvent, value: TabValue) => {
    onChange(tabToView(value));
  };

  return (
    <Paper className={clsx(classes.root, { [classes.modeDesktop]: wrapperVariant === 'desktop' })}>
      <Tabs
        variant="fullWidth"
        value={viewToTab(view)}
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
