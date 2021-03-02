import { BasePickerProps } from '../typings/BasePicker';
import { ExportedDateInputProps } from '../PureDateInput';
import { AllAvailableViews } from '../typings/Views';

export interface AllSharedPickerProps<TInputValue = any, TDateValue = any>
  extends BasePickerProps<TInputValue, TDateValue>,
    ExportedDateInputProps<TInputValue, TDateValue> {}

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
