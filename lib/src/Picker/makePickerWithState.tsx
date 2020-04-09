import * as React from 'react';
import { useUtils } from '../_shared/hooks/useUtils';
import { ParsableDate } from '../constants/prop-types';
import { MaterialUiPickersDate } from '../typings/date';
import { parsePickerInputValue } from '../_helpers/date-utils';
import { SomeWrapper, ExtendWrapper } from '../wrappers/Wrapper';
import { KeyboardDateInput } from '../_shared/KeyboardDateInput';
import { usePickerState } from '../_shared/hooks/usePickerState';
import { validateDateValue } from '../_helpers/text-field-helper';
import { ResponsiveWrapper } from '../wrappers/ResponsiveWrapper';
import { withDateAdapterProp } from '../_shared/withDateAdapterProp';
import { makeWrapperComponent } from '../wrappers/makeWrapperComponent';
import { PureDateInput, DateInputProps } from '../_shared/PureDateInput';
import { AnyPickerView, AllSharedPickerProps } from './SharedPickerProps';
import { Picker, ToolbarComponentProps, ExportedPickerProps } from './Picker';

type AllAvailableForOverrideProps = ExportedPickerProps<AnyPickerView>;

export interface MakePickerOptions<T extends unknown> {
  useDefaultProps: (props: T & AllSharedPickerProps) => Partial<T> & { inputFormat: string };
  DefaultToolbarComponent: React.ComponentType<ToolbarComponentProps>;
}

export function makePickerWithStateAndWrapper<
  T extends AllAvailableForOverrideProps,
  TWrapper extends SomeWrapper = typeof ResponsiveWrapper
>(Wrapper: TWrapper, { useDefaultProps, DefaultToolbarComponent }: MakePickerOptions<T>) {
  const PickerWrapper = makeWrapperComponent<DateInputProps, ParsableDate, MaterialUiPickersDate>(
    Wrapper,
    {
      KeyboardDateInputComponent: KeyboardDateInput,
      PureDateInputComponent: PureDateInput,
    }
  );

  function PickerWithState(props: T & AllSharedPickerProps & ExtendWrapper<TWrapper>) {
    const utils = useUtils();
    const defaultProps = useDefaultProps(props);
    const allProps = { ...defaultProps, ...props };

    const { pickerProps, inputProps, wrapperProps } = usePickerState<
      ParsableDate,
      MaterialUiPickersDate
    >(allProps, {
      emptyValue: null,
      parseInput: parsePickerInputValue,
      validateInput: validateDateValue,
      areValuesEqual: (a, b) => utils.isEqual(a, b),
    });

    const {
      allowKeyboardControl,
      ampm,
      ampmInClock,
      dateRangeIcon,
      disableFuture,
      disableHighlightToday,
      disablePast,
      disableTimeValidationIgnoreDatePart,
      hideTabs,
      leftArrowButtonProps,
      leftArrowButtonText,
      leftArrowIcon,
      loadingIndicator,
      maxDate,
      maxTime,
      minDate,
      // @ts-ignore Especial DateTimePicker only prop that are needed only on the upper level
      minDateTime,
      // @ts-ignore Especial DateTimePicker only prop that are needed only on the upper level
      maxDateTime,
      minTime,
      minutesStep,
      onMonthChange,
      onYearChange,
      openTo,
      orientation,
      renderDay,
      rightArrowButtonProps,
      rightArrowButtonText,
      rightArrowIcon,
      shouldDisableDate,
      shouldDisableTime,
      showDaysOutsideCurrentMonth,
      showToolbar,
      timeIcon,
      ToolbarComponent = DefaultToolbarComponent,
      toolbarFormat,
      toolbarTitle,
      value,
      views,
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
          leftArrowButtonText={leftArrowButtonText}
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
          rightArrowButtonText={rightArrowButtonText}
          shouldDisableDate={shouldDisableDate}
          shouldDisableTime={shouldDisableTime}
          showDaysOutsideCurrentMonth={showDaysOutsideCurrentMonth}
          showToolbar={showToolbar}
          timeIcon={timeIcon}
          ToolbarComponent={ToolbarComponent}
          toolbarFormat={toolbarFormat}
          toolbarTitle={toolbarTitle || restPropsForTextField?.label}
          views={views}
        />
      </PickerWrapper>
    );
  }

  const FinalPickerComponent = withDateAdapterProp(PickerWithState);
  return React.forwardRef<HTMLInputElement, React.ComponentProps<typeof FinalPickerComponent>>(
    (props, ref) => <FinalPickerComponent {...props} forwardedRef={ref} />
  );
}
