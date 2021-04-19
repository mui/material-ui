import { BasePickerProps } from '../typings/BasePicker';
import { ExportedDateInputProps } from '../PureDateInput';

export interface AllSharedPickerProps<TInputValue = any, TDateValue = any>
  extends BasePickerProps<TInputValue, TDateValue>,
    ExportedDateInputProps<TInputValue, TDateValue> {}
