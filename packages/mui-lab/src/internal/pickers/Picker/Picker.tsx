import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useViews } from '../hooks/useViews';
import ClockPicker from '../../../ClockPicker/ClockPicker';
import { ClockPickerView } from '../../../ClockPicker';
import CalendarPicker, { CalendarPickerView } from '../../../CalendarPicker';
import { KeyboardDateInput } from '../KeyboardDateInput';
import { useIsLandscape } from '../hooks/useIsLandscape';
import { WrapperVariant, WrapperVariantContext } from '../wrappers/WrapperVariantContext';
import { DateInputPropsLike } from '../wrappers/WrapperProps';
import { PickerSelectionState } from '../hooks/usePickerState';
import {
  BasePickerProps,
  CalendarAndClockProps,
  ToolbarComponentProps,
} from '../typings/BasePicker';
import { AllAvailableViews } from '../typings/Views';
import PickerView from './PickerView';

export interface ExportedPickerProps<View extends AllAvailableViews>
  extends Omit<BasePickerProps<unknown, unknown>, 'value' | 'onChange'>,
    Omit<CalendarAndClockProps<unknown>, 'onViewChange' | 'openTo' | 'view'> {
  dateRangeIcon?: React.ReactNode;
  /**
   * Callback fired on view change.
   */
  onViewChange?: (view: View) => void;
  /**
   * First view to show.
   */
  openTo: View;
  timeIcon?: React.ReactNode;
  /**
   * Array of views to show.
   */
  views: readonly View[];
}

export interface PickerProps<View extends AllAvailableViews> extends ExportedPickerProps<View> {
  autoFocus?: boolean;
  date: any;
  DateInputProps: DateInputPropsLike;
  isMobileKeyboardViewOpen: boolean;
  onDateChange: (
    date: any,
    currentWrapperVariant: WrapperVariant,
    isFinish?: PickerSelectionState,
  ) => void;
  toggleMobileKeyboardView: () => void;
}

export const MobileKeyboardInputView = styled('div')({
  padding: '16px 24px',
});

const PickerRoot = styled('div', { skipSx: true })<{ ownerState: { isLandscape: boolean } }>(
  ({ ownerState }) => ({
    display: 'flex',
    flexDirection: 'column',
    ...(ownerState.isLandscape && {
      flexDirection: 'row',
    }),
  }),
);

const MobileKeyboardTextFieldProps = { fullWidth: true };

const isDatePickerView = (view: AllAvailableViews): view is CalendarPickerView =>
  view === 'year' || view === 'month' || view === 'day';

const isTimePickerView = (view: AllAvailableViews): view is ClockPickerView =>
  view === 'hours' || view === 'minutes' || view === 'seconds';

function Picker<View extends AllAvailableViews>(props: PickerProps<View>) {
  const {
    autoFocus,
    className,
    date,
    DateInputProps,
    isMobileKeyboardViewOpen,
    onDateChange,
    onViewChange,
    openTo,
    orientation,
    showToolbar,
    toggleMobileKeyboardView,
    ToolbarComponent = () => null,
    toolbarFormat,
    toolbarPlaceholder,
    toolbarTitle,
    views,
    ...other
  } = props;
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

  const handleViewChange = React.useCallback(
    (newView: View) => {
      if (isMobileKeyboardViewOpen) {
        toggleMobileKeyboardView();
      }
      if (onViewChange) {
        onViewChange(newView);
      }
    },
    [isMobileKeyboardViewOpen, onViewChange, toggleMobileKeyboardView],
  );

  const { openView, nextView, previousView, setOpenView, handleChangeAndOpenNext } = useViews({
    view: undefined,
    views,
    openTo,
    onChange: handleDateChange,
    onViewChange: handleViewChange,
  });

  return (
    <PickerRoot ownerState={{ isLandscape }}>
      {toShowToolbar && (
        <ToolbarComponent
          {...other}
          views={views}
          isLandscape={isLandscape}
          date={date}
          onChange={handleDateChange}
          setOpenView={setOpenView as NonNullable<ToolbarComponentProps['setOpenView']>}
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
              <CalendarPicker
                autoFocus={autoFocus}
                date={date}
                onViewChange={setOpenView as CalendarAndClockProps<unknown>['onViewChange']}
                onChange={handleChangeAndOpenNext}
                view={openView}
                // Unclear why the predicate `isDatePickerView` does not imply the casted type
                views={views.filter(isDatePickerView) as CalendarPickerView[]}
                {...other}
              />
            )}

            {isTimePickerView(openView) && (
              <ClockPicker
                {...other}
                autoFocus={autoFocus}
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
    </PickerRoot>
  );
}

export default Picker;
