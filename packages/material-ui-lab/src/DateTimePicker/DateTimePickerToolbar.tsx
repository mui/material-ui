import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import { generateUtilityClasses } from '@material-ui/unstyled';
import PickersToolbarText from '../internal/pickers/PickersToolbarText';
import PickersToolbar from '../internal/pickers/PickersToolbar';
import PickersToolbarButton from '../internal/pickers/PickersToolbarButton';
import DateTimePickerTabs from './DateTimePickerTabs';
import { useUtils } from '../internal/pickers/hooks/useUtils';
import { WrapperVariantContext } from '../internal/pickers/wrappers/WrapperVariantContext';
import { ToolbarComponentProps } from '../internal/pickers/typings/BasePicker';
import { DateTimePickerView } from './shared';

const classes = generateUtilityClasses('PrivateDateTimePickerToolbar', ['penIcon']);

const DateTimePickerToolbarRoot = styled(PickersToolbar, { skipSx: true })({
  paddingLeft: 16,
  paddingRight: 16,
  justifyContent: 'space-around',
  [`& .${classes.penIcon}`]: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
});

const DateTimePickerToolbarDateContainer = styled('div', { skipSx: true })({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
});

const DateTimePickerToolbarTimeContainer = styled('div', { skipSx: true })({
  display: 'flex',
});

const DateTimePickerToolbarSeparator = styled(PickersToolbarText, { skipSx: true })({
  margin: '0 4px 0 2px',
  cursor: 'default',
});

/**
 * @ignore - internal component.
 */
const DateTimePickerToolbar = (props: ToolbarComponentProps) => {
  const {
    ampm,
    date,
    dateRangeIcon,
    hideTabs,
    isMobileKeyboardViewOpen,
    onChange,
    openView,
    setOpenView,
    timeIcon,
    toggleMobileKeyboardView,
    toolbarFormat,
    toolbarPlaceholder = '––',
    toolbarTitle = 'Select date & time',
    ...other
  } = props;
  const utils = useUtils();
  const wrapperVariant = React.useContext(WrapperVariantContext);
  const showTabs =
    wrapperVariant === 'desktop'
      ? true
      : !hideTabs && typeof window !== 'undefined' && window.innerHeight > 667;

  const formatHours = (time: unknown) =>
    ampm ? utils.format(time, 'hours12h') : utils.format(time, 'hours24h');

  const dateText = React.useMemo(() => {
    if (!date) {
      return toolbarPlaceholder;
    }

    if (toolbarFormat) {
      return utils.formatByString(date, toolbarFormat);
    }

    return utils.format(date, 'shortDate');
  }, [date, toolbarFormat, toolbarPlaceholder, utils]);

  return (
    <React.Fragment>
      {wrapperVariant !== 'desktop' && (
        <DateTimePickerToolbarRoot
          toolbarTitle={toolbarTitle}
          penIconClassName={classes.penIcon}
          isMobileKeyboardViewOpen={isMobileKeyboardViewOpen}
          toggleMobileKeyboardView={toggleMobileKeyboardView}
          {...other}
          isLandscape={false}
        >
          <DateTimePickerToolbarDateContainer>
            <PickersToolbarButton
              tabIndex={-1}
              variant="subtitle1"
              data-mui-test="datetimepicker-toolbar-year"
              onClick={() => setOpenView('year')}
              selected={openView === 'year'}
              value={date ? utils.format(date, 'year') : '–'}
            />
            <PickersToolbarButton
              tabIndex={-1}
              variant="h4"
              data-mui-test="datetimepicker-toolbar-day"
              onClick={() => setOpenView('day')}
              selected={openView === 'day'}
              value={dateText}
            />
          </DateTimePickerToolbarDateContainer>
          <DateTimePickerToolbarTimeContainer>
            <PickersToolbarButton
              variant="h3"
              data-mui-test="hours"
              onClick={() => setOpenView('hours')}
              selected={openView === 'hours'}
              value={date ? formatHours(date) : '--'}
            />
            <DateTimePickerToolbarSeparator variant="h3" value=":" />
            <PickersToolbarButton
              variant="h3"
              data-mui-test="minutes"
              onClick={() => setOpenView('minutes')}
              selected={openView === 'minutes'}
              value={date ? utils.format(date, 'minutes') : '--'}
            />
          </DateTimePickerToolbarTimeContainer>
        </DateTimePickerToolbarRoot>
      )}
      {showTabs && (
        <DateTimePickerTabs
          dateRangeIcon={dateRangeIcon}
          timeIcon={timeIcon}
          view={openView as DateTimePickerView}
          onChange={setOpenView}
        />
      )}
    </React.Fragment>
  );
};

export default DateTimePickerToolbar;
