import { DateTimePickerView } from '../DateTimePicker';
import { BasePickerProps } from '../typings/BasePicker';
import { ExportedDateInputProps } from '../_shared/PureDateInput';
import { DateValidationProps } from '../_helpers/text-field-helper';
import { WithDateAdapterProps } from '../_shared/withDateAdapterProp';

export type AnyPickerView = DateTimePickerView;

export type AllSharedPickerProps = WithDateAdapterProps &
  BasePickerProps &
  ExportedDateInputProps &
  DateValidationProps;

export interface WithViewsProps<T extends AnyPickerView> {
  /**
   * Array of views to show
   */
  views?: T[];
  /** First view to show */
  openTo?: T;
}

export type WithDateInputProps = DateValidationProps & BasePickerProps & ExportedDateInputProps;
