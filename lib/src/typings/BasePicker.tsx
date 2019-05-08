import { MaterialUiPickersDate } from './date';
import { ParsableDate } from '../constants/prop-types';

export interface BasePickerProps {
  /** Picker value */
  value: ParsableDate;
  /** onChange callback */
  onChange: (date: MaterialUiPickersDate) => void;
  /**
   * Auto accept date on selection
   * @default false
   */
  autoOk?: boolean;
  /** Format string */
  format?: string;
  /** Disable datepicker and text field */
  disabled?: boolean;
  /** Dynamic formatter of text field label */
  labelFunc?: (date: MaterialUiPickersDate, invalidLabel: string) => string;
  /** Date that will be initially highlighted */
  initialFocusedDate?: ParsableDate;
  /**
   * Message displaying in text field, if date is invalid (doesn't work in keyboard mode)
   * @default 'unknown'
   */
  invalidLabel?: string;
  /**
   * Message displaying in text field, if null passed (doesn't work in keyboard mode)
   * @default ' '
   */
  emptyLabel?: string;
  /** Callback fired when date isAccepted */
  onAccept?: (date: MaterialUiPickersDate) => void;
  /** Callback fired when new error should be displayed */
  onError?: (error: React.ReactNode, value: MaterialUiPickersDate | ParsableDate) => void;
  /** On open callback */
  onOpen?: () => void;
  /** On close callback */
  onClose?: () => void;
  /** Controlled picker open state */
  open?: boolean;
  mergePreviousDateOnChange?: boolean;
  forwardedRef?: any;
}
