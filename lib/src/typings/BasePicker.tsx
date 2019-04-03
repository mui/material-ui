import { DateType } from '../constants/prop-types';
import { MaterialUiPickersDate } from './date';

export interface BasePickerProps {
  /** Picker value */
  value: DateType;
  /** onChange callback */
  onChange: (date: MaterialUiPickersDate) => void;
  /** Auto accept date on selection */
  autoOk?: boolean;
  /** Control 12h or 24h view mode for clock */
  ampm?: boolean;
  /** Format string */
  format?: string;
  /** Dynamic formatter of text field label */
  labelFunc?: (date: MaterialUiPickersDate, invalidLabel: string) => string;
  /** Date that will be initially highlighted */
  initialFocusedDate?: DateType;
  /** Message displaying in text field, if date is invalid (doesn't work in keyboard mode) */
  invalidLabel?: string;
  /** Message displaying in text field, if null passed (doesn't work in keyboard mode) */
  emptyLabel?: string;
  /** Callback fired when date isAccepted */
  onAccept?: (date: MaterialUiPickersDate) => void;
  /** Callback fired when new error should be displayed */
  onError?: (error: React.ReactNode, value: MaterialUiPickersDate) => void;
  /** On open callback */
  onOpen?: () => void;
  /** On close callback */
  onClose?: () => void;
  minDate?: DateType;
  maxDate?: DateType;
  mergePreviousDateOnChange?: boolean;
  forwardedRef?: any;
}
