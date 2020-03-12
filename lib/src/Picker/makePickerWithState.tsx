import * as React from 'react';
import { ParsableDate } from '../constants/prop-types';
import { MaterialUiPickersDate } from '../typings/date';
import { PureDateInput } from '../_shared/PureDateInput';
import { parsePickerInputValue } from '../_helpers/date-utils';
import { KeyboardDateInput } from '../_shared/KeyboardDateInput';
import { usePickerState } from '../_shared/hooks/usePickerState';
import { SomeWrapper, ExtendWrapper } from '../wrappers/Wrapper';
import { validateDateValue } from '../_helpers/text-field-helper';
import { withDateAdapterProp } from '../_shared/withDateAdapterProp';
import { makeWrapperComponent } from '../wrappers/makeWrapperComponent';
import { AnyPickerView, AllSharedPickerProps } from './SharedPickerProps';
import { Picker, ToolbarComponentProps, ExportedPickerProps } from './Picker';

type AllAvailableForOverrideProps = ExportedPickerProps<AnyPickerView>;

export interface MakePickerOptions<T extends unknown> {
  useDefaultProps: (props: T & AllSharedPickerProps) => Partial<T> & { inputFormat: string };
  DefaultToolbarComponent: React.ComponentType<ToolbarComponentProps>;
}

export function makePickerWithStateAndWrapper<
  T extends AllAvailableForOverrideProps,
  TWrapper extends SomeWrapper = any
>(Wrapper: TWrapper, { useDefaultProps, DefaultToolbarComponent }: MakePickerOptions<T>) {
  const PickerWrapper = makeWrapperComponent(Wrapper, {
    KeyboardDateInputComponent: KeyboardDateInput,
    PureDateInputComponent: PureDateInput,
  });

  function PickerWithState(props: T & AllSharedPickerProps & ExtendWrapper<TWrapper>) {
    const defaultProps = useDefaultProps(props);
    const allProps = { ...defaultProps, ...props };

    const { pickerProps, inputProps, wrapperProps } = usePickerState<
      ParsableDate,
      MaterialUiPickersDate
    >(allProps, parsePickerInputValue, validateDateValue);

    const {
      allowKeyboardControl,
      ampm,
      ampmInClock,
      dateRangeIcon,
      disableFuture,
      disablePast,
      showToolbar,
      hideTabs,
      leftArrowButtonProps,
      leftArrowIcon,
      loadingIndicator,
      maxDate,
      minDate,
      minutesStep,
      onMonthChange,
      onYearChange,
      openTo,
      orientation,
      renderDay,
      rightArrowButtonProps,
      rightArrowIcon,
      shouldDisableDate,
      shouldDisableTime,
      timeIcon,
      toolbarFormat,
      ToolbarComponent = DefaultToolbarComponent,
      views,
      toolbarTitle,
      disableTimeValidationIgnoreDatePart,
      showDaysOutsideCurrentMonth,
      disableHighlightToday,
      minTime,
      maxTime,
      ...restPropsForTextField
    } = allProps;

    return (
      <PickerWrapper inputProps={inputProps} wrapperProps={wrapperProps} {...restPropsForTextField}>
        <Picker
          {...pickerProps}
          DateInputProps={{ ...inputProps, ...restPropsForTextField }}
          allowKeyboardControl={allowKeyboardControl}
          ampm={ampm}
          ampmInClock={ampmInClock}
          dateRangeIcon={dateRangeIcon}
          disableFuture={disableFuture}
          disableHighlightToday={disableHighlightToday}
          disablePast={disablePast}
          disableTimeValidationIgnoreDatePart={disableTimeValidationIgnoreDatePart}
          hideTabs={hideTabs}
          leftArrowButtonProps={leftArrowButtonProps}
          leftArrowIcon={leftArrowIcon}
          loadingIndicator={loadingIndicator}
          maxDate={maxDate}
          maxTime={maxTime}
          minDate={minDate}
          minTime={minTime}
          minutesStep={minutesStep}
          onMonthChange={onMonthChange}
          onYearChange={onYearChange}
          openTo={openTo}
          orientation={orientation}
          renderDay={renderDay}
          rightArrowButtonProps={rightArrowButtonProps}
          rightArrowIcon={rightArrowIcon}
          shouldDisableDate={shouldDisableDate}
          shouldDisableTime={shouldDisableTime}
          showDaysOutsideCurrentMonth={showDaysOutsideCurrentMonth}
          showToolbar={showToolbar}
          timeIcon={timeIcon}
          toolbarFormat={toolbarFormat}
          ToolbarComponent={ToolbarComponent}
          toolbarTitle={toolbarTitle || restPropsForTextField?.label}
          views={views}
        />
      </PickerWrapper>
    );
  }

  return withDateAdapterProp(PickerWithState);
}
