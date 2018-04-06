import { MaterialUiPickersDate } from '../typings/date'
import { DateTextFieldProps } from './ModalDialog';

export interface PickerBaseProps {
    onChange: (date: MaterialUiPickersDate) => void;
    autoOk?: boolean;
    ampm?: boolean;
    pickerRef?: (e: Element) => void;

}