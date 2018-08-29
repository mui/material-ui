import { ComponentClass } from 'react';
import { Utils } from '../typings/utils';
import { InlineWrapperProps } from '../wrappers/InlineWrapper';
import { BasePickerProps } from '../_shared/BasePicker'
import { Omit } from '@material-ui/core'
import { MaterialUiPickersDate } from '../typings/date';

export interface TimePickerInlineProps extends
  BasePickerProps,
  Omit<InlineWrapperProps, 'onChange' | 'value'>
{ }

declare const TimePickerInline: ComponentClass<TimePickerInlineProps>;

export default TimePickerInline;
