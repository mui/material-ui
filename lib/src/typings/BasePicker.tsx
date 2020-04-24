import { MaterialUiPickersDate } from './date';
import { ParsableDate } from '../constants/prop-types';
import { ToolbarComponentProps } from '../Picker/Picker';

export interface BasePickerProps<
  TInputValue = ParsableDate,
  TDateValue = MaterialUiPickersDate | null
> {
  /** Picker value */
  value: TInputValue;
  /** onChange callback @DateIOType */
  onChange: (date: TDateValue, keyboardInputValue?: string) => void;
  /**
   * Auto accept date on selection
   * @default false
   */
  autoOk?: boolean;
  /** Format string */
  inputFormat?: string;
  /** Disable picker and text field */
  disabled?: boolean;
  /** Make picker read only */
  readOnly?: boolean;
  /** Date that will be initially highlighted if null was passed */
  defaultHighlight?: ParsableDate;
  /** Callback fired when date is accepted @DateIOType */
  onAccept?: (date: TDateValue) => void;
  /** Callback fired when new error should be displayed
   * (!! This is a side effect. Be careful if you want to rerender the component) @DateIOType
   */
  onError?: (error: React.ReactNode, value: TInputValue | TDateValue) => void;
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
  toolbarTitle?: React.ReactNode;
  /** Date format, that is displaying in toolbar */
  toolbarFormat?: string;
  /** className applied to the root component */
  className?: string;
}
