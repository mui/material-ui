import * as React from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Paper from '@material-ui/core/Paper';
import { useTheme, experimentalStyled as styled } from '@material-ui/core/styles';
import TimeIcon from '../internal/svg-icons/Time';
import DateRangeIcon from '../internal/svg-icons/DateRange';
import {
  WrapperVariantContext,
  WrapperVariant,
} from '../internal/pickers/wrappers/WrapperVariantContext';
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

type StyleProps = DateTimePickerTabsProps & { wrapperVariant: WrapperVariant };

const DateTimePickerTabsRoot = styled(Paper, { skipSx: true })<{ styleProps: StyleProps }>(
  ({ styleProps = {} }) => ({
    ...(styleProps.wrapperVariant === 'desktop' && {
      order: 1,
    }),
  }),
);

const DateTimePickerTabsTabs = styled(Tabs, { skipSx: true })(({ theme }) => {
  const tabsBackground =
    theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.background.default;
  return {
    color: theme.palette.getContrastText(tabsBackground),
    backgroundColor: tabsBackground,
  };
});

/**
 * @ignore - internal component.
 */
const DateTimePickerTabs = (props: DateTimePickerTabsProps) => {
  const { dateRangeIcon = <DateRangeIcon />, onChange, timeIcon = <TimeIcon />, view } = props;

  const theme = useTheme();
  const wrapperVariant = React.useContext(WrapperVariantContext);
  const indicatorColor = theme.palette.mode === 'light' ? 'secondary' : 'primary';

  const styleProps = { ...props, wrapperVariant };

  const handleChange = (event: React.SyntheticEvent, value: TabValue) => {
    onChange(tabToView(value));
  };

  return (
    <DateTimePickerTabsRoot styleProps={styleProps}>
      <DateTimePickerTabsTabs
        variant="fullWidth"
        value={viewToTab(view)}
        onChange={handleChange}
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
      </DateTimePickerTabsTabs>
    </DateTimePickerTabsRoot>
  );
};

export default DateTimePickerTabs;
