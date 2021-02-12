import { ParsableDate } from '../constants/prop-types';
import { AllAvailableViews } from './Views';

export type CalendarAndClockProps<
  TDate
> = import('@material-ui/lab/DayPicker/DayPicker').ExportedDayPickerProps<TDate> &
  import('@material-ui/lab/ClockPicker/ClockPicker').ExportedClockPickerProps<TDate>;

export type ToolbarComponentProps<
  TDate = unknown,
  TView extends AllAvailableViews = AllAvailableViews
> = CalendarAndClockProps<TDate> & {
  ampmInClock?: boolean;
  date: TDate;
  dateRangeIcon?: React.ReactNode;
  getMobileKeyboardInputViewButtonText?: () => string;
  hideTabs?: boolean;
  isLandscape: boolean;
  isMobileKeyboardViewOpen: boolean;
  onChange: import('../hooks/useViews').PickerOnChangeFn<TDate>;
  openView: TView;
  setOpenView: (view: TView) => void;
  timeIcon?: React.ReactNode;
  toggleMobileKeyboardView: () => void;
  toolbarFormat?: string;
  toolbarPlaceholder?: React.ReactNode;
  toolbarTitle?: React.ReactNode;
  views: TView[];
};

export interface BasePickerProps<TInputValue = ParsableDate, TDateValue = unknown> {
  /**
   * The value of the picker.
   */
  value: TInputValue;
  /**
   * Callback fired when the value (the selected date) changes @DateIOType.
   */
  onChange: (date: TDateValue, keyboardInputValue?: string) => void;
  /**
   * If `true` the popup or dialog will immediately close after submitting full date.
   * @default `true` for Desktop, `false` for Mobile (based on the chosen wrapper and `desktopModeMediaQuery` prop).
   */
  disableCloseOnSelect?: boolean;
  /**
   * Format string.
   */
  inputFormat?: string;
  /**
   * If `true`, the picker and text field are disabled.
   */
  disabled?: boolean;
  /**
   * Make picker read only.
   */
  readOnly?: boolean;
  /**
   * Callback fired when date is accepted @DateIOType.
   */
  onAccept?: (date: TDateValue | null) => void;
  /**
   * Callback fired when the popup requests to be opened.
   * Use in controlled mode (see open).
   */
  onOpen?: () => void;
  /**
   * Callback fired when the popup requests to be closed.
   * Use in controlled mode (see open).
   */
  onClose?: () => void;
  /**
   * Control the popup or dialog open state.
   */
  open?: boolean;
  /**
   * If `true`, show the toolbar even in desktop mode.
   */
  showToolbar?: boolean;
  /**
   * Force rendering in particular orientation.
   */
  orientation?: 'portrait' | 'landscape';
  /**
   * Component that will replace default toolbar renderer.
   */
  ToolbarComponent?: React.ComponentType<ToolbarComponentProps>;
  /**
   * Mobile picker title, displaying in the toolbar.
   * @default "SELECT DATE"
   */
  toolbarTitle?: React.ReactNode;
  /**
   * Mobile picker date value placeholder, displaying if `value` === `null`.
   * @default "–"
   */
  toolbarPlaceholder?: React.ReactNode;
  /**
   * Date format, that is displaying in toolbar.
   */
  toolbarFormat?: string;
  /**
   * className applied to the root component.
   */
  className?: string;
}
