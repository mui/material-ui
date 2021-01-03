import * as React from 'react';
import clsx from 'clsx';
import { styled, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { useViews } from '../hooks/useViews';
import ClockPicker from '../../../ClockPicker/ClockPicker';
import DayPicker from '../../../DayPicker/DayPicker';
import { KeyboardDateInput } from '../KeyboardDateInput';
import { useIsLandscape } from '../hooks/useIsLandscape';
import { DIALOG_WIDTH, VIEW_HEIGHT } from '../constants/dimensions';
import { WrapperVariantContext } from '../wrappers/WrapperVariantContext';
import { WrapperVariant } from '../wrappers/Wrapper';
import { DateInputPropsLike } from '../wrappers/WrapperProps';
import { PickerSelectionState } from '../hooks/usePickerState';
import { BasePickerProps, CalendarAndClockProps } from '../typings/BasePicker';
import { WithViewsProps } from './SharedPickerProps';
import { AllAvailableViews, TimePickerView, DatePickerView } from '../typings/Views';
import PickerView from './PickerView';

export interface ExportedPickerProps<TView extends AllAvailableViews>
  extends Omit<BasePickerProps, 'value' | 'onChange'>,
    CalendarAndClockProps<unknown>,
    WithViewsProps<TView> {
  dateRangeIcon?: React.ReactNode;
  timeIcon?: React.ReactNode;
}

export interface PickerProps<TView extends AllAvailableViews, TDateValue = any>
  extends ExportedPickerProps<TView> {
  isMobileKeyboardViewOpen: boolean;
  toggleMobileKeyboardView: () => void;
  DateInputProps: DateInputPropsLike;
  date: TDateValue;
  onDateChange: (
    date: TDateValue,
    currentWrapperVariant: WrapperVariant,
    isFinish?: PickerSelectionState,
  ) => void;
}

export const MobileKeyboardInputView = styled('div')(
  {
    padding: '16px 24px',
  },
  { name: 'MuiPickersMobileKeyboardInputView' },
);

export const styles = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  landscape: {
    flexDirection: 'row',
  },
  pickerView: {
    overflowX: 'hidden',
    width: DIALOG_WIDTH,
    maxHeight: VIEW_HEIGHT,
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
  },
});

export type PickerClassKey = keyof WithStyles<typeof styles>['classes'];

const MobileKeyboardTextFieldProps = { fullWidth: true };

const isDatePickerView = (view: AllAvailableViews): view is DatePickerView =>
  view === 'year' || view === 'month' || view === 'date';

const isTimePickerView = (view: AllAvailableViews): view is TimePickerView =>
  view === 'hours' || view === 'minutes' || view === 'seconds';

function Picker({
  classes,
  className,
  date,
  DateInputProps,
  isMobileKeyboardViewOpen,
  onDateChange,
  openTo = 'date',
  orientation,
  showToolbar,
  toggleMobileKeyboardView,
  ToolbarComponent = () => null,
  toolbarFormat,
  toolbarPlaceholder,
  toolbarTitle,
  views = ['year', 'month', 'date', 'hours', 'minutes', 'seconds'],
  ...other
}: PickerProps<AllAvailableViews> & WithStyles<typeof styles>) {
  const isLandscape = useIsLandscape(views, orientation);
  const wrapperVariant = React.useContext(WrapperVariantContext);

  const toShowToolbar =
    typeof showToolbar === 'undefined' ? wrapperVariant !== 'desktop' : showToolbar;

  const handleDateChange = React.useCallback(
    (newDate: unknown, selectionState?: PickerSelectionState) => {
      onDateChange(newDate, wrapperVariant, selectionState);
    },
    [onDateChange, wrapperVariant],
  );

  const { openView, nextView, previousView, setOpenView, handleChangeAndOpenNext } = useViews({
    view: undefined,
    views,
    openTo,
    onChange: handleDateChange,
  });

  React.useEffect(() => {
    if (isMobileKeyboardViewOpen && toggleMobileKeyboardView) {
      toggleMobileKeyboardView();
    }
    // React on `openView` change
  }, [openView]); // eslint-disable-line

  return (
    <div
      className={clsx(classes.root, className, {
        [classes.landscape]: isLandscape,
      })}
    >
      {toShowToolbar && (
        <ToolbarComponent
          {...other}
          views={views}
          isLandscape={isLandscape}
          date={date}
          onChange={handleDateChange}
          setOpenView={setOpenView}
          openView={openView}
          toolbarTitle={toolbarTitle}
          toolbarFormat={toolbarFormat}
          toolbarPlaceholder={toolbarPlaceholder}
          isMobileKeyboardViewOpen={isMobileKeyboardViewOpen}
          toggleMobileKeyboardView={toggleMobileKeyboardView}
        />
      )}

      <PickerView>
        {isMobileKeyboardViewOpen ? (
          <MobileKeyboardInputView>
            <KeyboardDateInput
              {...DateInputProps}
              ignoreInvalidInputs
              disableOpenPicker
              TextFieldProps={MobileKeyboardTextFieldProps}
            />
          </MobileKeyboardInputView>
        ) : (
          <React.Fragment>
            {isDatePickerView(openView) && (
              <DayPicker
                date={date}
                onViewChange={setOpenView}
                onChange={handleChangeAndOpenNext}
                view={openView}
                views={views.filter(isDatePickerView)}
                {...other}
              />
            )}

            {isTimePickerView(openView) && (
              <ClockPicker
                {...other}
                date={date}
                view={openView}
                onChange={handleChangeAndOpenNext}
                openNextView={() => setOpenView(nextView)}
                openPreviousView={() => setOpenView(previousView)}
                nextViewAvailable={!nextView}
                previousViewAvailable={!previousView || isDatePickerView(previousView)}
                showViewSwitcher={wrapperVariant === 'desktop'}
              />
            )}
          </React.Fragment>
        )}
      </PickerView>
    </div>
  );
}

export default withStyles(styles, { name: 'MuiPicker' })(Picker);
