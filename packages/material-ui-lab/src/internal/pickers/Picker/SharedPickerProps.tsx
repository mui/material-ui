import { BasePickerProps } from '../typings/BasePicker';
import { ExportedDateInputProps } from '../PureDateInput';
import { WithDateAdapterProps } from '../withDateAdapterProp';
import { AllAvailableViews } from '../typings/Views';

export type AllSharedPickerProps<TInputValue = any, TDateValue = any> = BasePickerProps<
  TInputValue,
  TDateValue
> &
  ExportedDateInputProps<TInputValue, TDateValue> &
  WithDateAdapterProps<TDateValue>;

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
