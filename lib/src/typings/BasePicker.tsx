import { MaterialUiPickersDate } from './date';
import { ParsableDate } from '../constants/prop-types';
import { ToolbarComponentProps } from '../Picker/Picker';

export interface BasePickerProps {
  /** Picker value */
  value: ParsableDate;
  /** onChange callback @DateIOType */
  onChange: (date: MaterialUiPickersDate | null, keyboardInputValue?: string) => void;
  /**
   * Auto accept date on selection
   * @default false
   */
  autoOk?: boolean;
  /** Format string */
  format?: string;
  /** Disable picker and text field */
  disabled?: boolean;
  /** Make picker read only */
  readOnly?: boolean;
  /** Date that will be initially highlighted if null was passed */
  initialFocusedDate?: ParsableDate;
  /** Callback fired when date is accepted @DateIOType */
  onAccept?: (date: MaterialUiPickersDate) => void;
  /** Callback fired when new error should be displayed
   * (!! This is a side effect. Be careful if you want to rerender the component) @DateIOType
   */
  onError?: (error: React.ReactNode, value: MaterialUiPickersDate | ParsableDate) => void;
  /** On open callback */
  onOpen?: () => void;
  /** On close callback */
  onClose?: () => void;
  /** Controlled picker open state */
  open?: boolean;
  /**
   * Show toolbar even in desktop mode
   */
  showToolbar?: boolean;
  /** Force rendering in particular orientation */
  orientation?: 'portrait' | 'landscape';
  /** Component that will replace default toolbar renderer */
  ToolbarComponent?: React.ComponentType<ToolbarComponentProps>;
  /**
   * Mobile picker title, displaying in the toolbar
   * @default "SELECT DATE"
   */
  title?: string;
  /**
   * Compare dates by the exact timestamp, instead of start/end of date
   * @default false
   */
  strictCompareDates?: boolean;
}
