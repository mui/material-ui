import { BasePickerProps } from '../typings/BasePicker';
import { ExportedDateInputProps } from '../PureDateInput';
import { AllAvailableViews } from '../typings/Views';

export interface AllSharedPickerProps<TInputValue = any, TDateValue = any>
  extends BasePickerProps<TInputValue, TDateValue>,
    ExportedDateInputProps<TInputValue, TDateValue> {}

export interface WithViewsProps<T extends AllAvailableViews> {
  /**
   * First view to show.
   */
  openTo?: T;
  /**
   * Array of views to show.
   */
  views?: readonly T[];
}
