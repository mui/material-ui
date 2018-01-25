import {Moment} from 'moment'

export interface PickerBaseProps {
  onChange: (date: Date | Moment) => void;
  autoOk?: boolean;
  returnMoment?: boolean;
  ampm?: boolean;
}