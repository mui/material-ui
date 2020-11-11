import { BasePickerProps } from '../typings/BasePicker';
import { ExportedDateInputProps } from '../PureDateInput';
import { WithDateAdapterProps } from '../withDateAdapterProp';
import { PickerSelectionState } from '../hooks/usePickerState';
import { DateInputPropsLike } from '../wrappers/WrapperProps';
import { AllAvailableViews } from '../typings/Views';
import { WrapperVariant } from '../wrappers/Wrapper';

export type AllSharedPickerProps<TInputValue = any, TDateValue = any> = BasePickerProps<
  TInputValue,
  TDateValue
> &
  ExportedDateInputProps<TInputValue, TDateValue> &
  WithDateAdapterProps<TDateValue>;

export interface SharedPickerProps<TInputValue, TDateValue, TInputProps = DateInputPropsLike> {
  isMobileKeyboardViewOpen: boolean;
  toggleMobileKeyboardView: () => void;
  DateInputProps: TInputProps;
  date: TDateValue;
  onDateChange: (
    date: TDateValue,
    currentWrapperVariant: WrapperVariant,
    isFinish?: PickerSelectionState,
  ) => void;
}

export interface WithViewsProps<T extends AllAvailableViews> {
  /**
   * Array of views to show.
   */
  views?: T[];
  /**
   * First view to show.
   */
  openTo?: T;
}
