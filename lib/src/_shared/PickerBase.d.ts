import {Moment} from 'moment'
import { DateTextFieldProps } from './ModalDialog';

export interface PickerBaseProps {
  onChange: (date: Date | Moment) => void;
  autoOk?: boolean;
  returnMoment?: boolean;
  ampm?: boolean;
}