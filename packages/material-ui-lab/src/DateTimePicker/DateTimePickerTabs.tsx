import * as React from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { styled } from '@material-ui/core/styles';
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

const DateTimePickerTabsRoot = styled('div', { skipSx: true })<{ styleProps: StyleProps }>(
  ({ styleProps }) => ({
    ...(styleProps.wrapperVariant === 'desktop' && {
      order: 1,
    }),
  }),
);

/**
 * @ignore - internal component.
 */
const DateTimePickerTabs = (props: DateTimePickerTabsProps) => {
  const { dateRangeIcon = <DateRangeIcon />, onChange, timeIcon = <TimeIcon />, view } = props;

  const wrapperVariant = React.useContext(WrapperVariantContext);
  const TabIndicatorProps = { style: { bottom: 'auto', top: '0' } };
  const TabStyle = { boxShadow: '0px 1px 0px 0px inset rgb(0 0 0 / 12%)' };
  const styleProps = { ...props, wrapperVariant };

  const handleChange = (event: React.SyntheticEvent, value: TabValue) => {
    onChange(tabToView(value));
  };

  return (
    <DateTimePickerTabsRoot styleProps={styleProps}>
      <Tabs
        variant="fullWidth"
        value={viewToTab(view)}
        onChange={handleChange}
        style={TabStyle}
        TabIndicatorProps={TabIndicatorProps}
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
    </DateTimePickerTabsRoot>
  );
};

export default DateTimePickerTabs;
