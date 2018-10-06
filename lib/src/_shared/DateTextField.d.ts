import { ComponentClass, ReactNode } from 'react';
import { DateType } from '../constants/prop-types'
import { TextFieldProps } from '@material-ui/core/TextField';
import { Omit } from '@material-ui/core'
import { MaterialUiPickersDate } from '../typings/date'




declare const DateTextField: ComponentClass<DateTextFieldProps>;

export default DateTextField;
