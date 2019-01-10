import * as PropTypes from 'prop-types';
import * as React from 'react';

import { IUtils } from '@date-io/core/IUtils';
import { DateType, DomainPropTypes } from '../constants/prop-types';
import { MaterialUiPickersDate } from '../typings/date';
import { withUtils, WithUtilsProps } from './WithUtils';

export interface BasePickerRenderArgs {
  utils: IUtils<MaterialUiPickersDate>;
  date: MaterialUiPickersDate;
  isAccepted: boolean;
  handleClear: () => void;
  handleAccept: () => void;
  handleSetTodayDate: () => void;
  handleDismiss: () => void;
  changeDate: (date: MaterialUiPickersDate, callback?: any) => void;
  handleChange: (date: MaterialUiPickersDate, isFinish?: boolean) => void;
  handleTextFieldChange: (date: MaterialUiPickersDate | null) => void;
  handleAcceptedChange: (isAccepted: boolean, callback?: any) => void;
  pick12hOr24hFormat: (default12hFormat: string, default24hFormat: string) => string;
}

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
  /** Do not open picker on enter keypress */
  disableOpenOnEnter?: boolean;
  /** Date that will be initially highlighted */
  initialFocusedDate?: DateType;
  forwardedRef?: any;
  mergePreviousDateOnChange?: boolean;
}

export interface OuterBasePickerProps extends BasePickerProps, WithUtilsProps {
  children: (options: BasePickerRenderArgs) => React.ReactNode;
}

const getInitialDate = ({ utils, value, initialFocusedDate }: OuterBasePickerProps) => {
  const initialDate = value || initialFocusedDate || utils.date();
  const date = utils.date(initialDate);

  return date && utils.isValid(date) ? date : utils.date();
};

export class BasePicker extends React.Component<OuterBasePickerProps & WithUtilsProps> {
  public static propTypes = {
    value: DomainPropTypes.date,
    onChange: PropTypes.func.isRequired,
    autoOk: PropTypes.bool,
    initialFocusedDate: PropTypes.any,
  };

  public static defaultProps = {
    value: new Date(),
    autoOK: false,
    ampm: true,
  };

  public state = {
    date: getInitialDate(this.props),
    isAccepted: false,
  };

  public componentDidUpdate(prevProps: OuterBasePickerProps) {
    const { utils, value, initialFocusedDate } = this.props;
    if (
      prevProps.value !== value ||
      prevProps.utils.locale !== utils.locale ||
      prevProps.initialFocusedDate !== initialFocusedDate
    ) {
      this.changeDate(getInitialDate(this.props));
    }
  }

  public changeDate = (date: MaterialUiPickersDate, callback?: any) =>
    this.setState({ date }, callback);

  public handleAcceptedChange = (isAccepted: boolean, callback?: any) =>
    this.setState({ isAccepted }, callback);

  public handleClear = () => this.props.onChange(null);

  public handleAccept = () => this.props.onChange(this.state.date);

  public handleSetTodayDate = () => this.handleChange(this.props.utils.date(), false);

  public handleTextFieldChange = (date: MaterialUiPickersDate) => {
    const { onChange, utils, mergePreviousDateOnChange } = this.props;

    if (mergePreviousDateOnChange) {
      date = utils.mergeDateAndTime(this.state.date, date);
    }

    if (date === null) {
      onChange(null);
    } else {
      this.changeDate(date, () => onChange(date));
    }
  };

  public pick12hOr24hFormat = (default12hFormat: string, default24hFormat: string): string => {
    const { format, ampm } = this.props;
    if (format) {
      return format;
    }

    return ampm ? default12hFormat : default24hFormat;
  };

  public handleChange = (newDate: MaterialUiPickersDate, isFinish = true) => {
    const { autoOk, onChange } = this.props;

    this.changeDate(newDate, () => {
      if (isFinish && autoOk) {
        onChange(newDate);
        // pass down accept true, and make it false in the next tick
        this.handleAcceptedChange(true, () => this.handleAcceptedChange(false));
      }
    });
  };

  public handleDismiss = () => {
    this.setState({ date: getInitialDate(this.props) });
  };

  public render() {
    return this.props.children({
      ...this.state,
      utils: this.props.utils,
      changeDate: this.changeDate,
      handleAcceptedChange: this.handleAcceptedChange,
      handleClear: this.handleClear,
      handleAccept: this.handleAccept,
      handleDismiss: this.handleDismiss,
      handleSetTodayDate: this.handleSetTodayDate,
      handleTextFieldChange: this.handleTextFieldChange,
      pick12hOr24hFormat: this.pick12hOr24hFormat,
      handleChange: this.handleChange,
    });
  }
}

export default withUtils()(BasePicker);
