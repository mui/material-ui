import * as React from 'react';
import { DateType } from '../constants/prop-types';
import { MaterialUiPickersDate } from '../typings/date';
import { Utils } from '../typings/utils';
import { withUtils, WithUtilsProps } from './WithUtils';

export interface InnerBasePickerProps {
  utils: Utils<MaterialUiPickersDate>;
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
  pick12hOr24hFormat: (
    default12hFormat: string,
    default24hFormat: string
  ) => string;
}

export interface BasePickerProps {
  value: DateType;
  onChange: (date: MaterialUiPickersDate) => void;
  autoOk?: boolean;
  ampm?: boolean;
  format?: string;
  labelFunc?: (date: MaterialUiPickersDate, invalidLabel: string) => string;
  disableOpenOnEnter?: boolean;
  forwardedRef?: any;
  initialFocusedDate?: DateType;
}

export interface OuterBasePickerProps extends BasePickerProps, WithUtilsProps {
  children: (options: InnerBasePickerProps) => React.ReactNode;
}

const getInitialDate = ({
  utils,
  value,
  initialFocusedDate,
}: OuterBasePickerProps) => {
  const initialDate = value || initialFocusedDate || utils.date();
  const date = utils.date(initialDate);

  return utils.isValid(date) ? date : utils.date();
};

export class BasePicker extends React.Component<
  OuterBasePickerProps & WithUtilsProps
> {
  public state = {
    date: getInitialDate(this.props),
    isAccepted: false,
  };

  public componentDidUpdate(prevProps: OuterBasePickerProps) {
    const { utils, value } = this.props;
    if (prevProps.value !== value || prevProps.utils.locale !== utils.locale) {
      this.changeDate(getInitialDate(this.props));
    }
  }

  public changeDate = (date: MaterialUiPickersDate, callback?: any) =>
    this.setState({ date }, callback);

  public handleAcceptedChange = (isAccepted: boolean, callback?: any) =>
    this.setState({ isAccepted }, callback);

  public handleClear = () => this.props.onChange(null);

  public handleAccept = () => this.props.onChange(this.state.date);

  public handleSetTodayDate = () =>
    this.handleChange(this.props.utils.date(), false);

  public handleTextFieldChange = (date: MaterialUiPickersDate) => {
    const { onChange } = this.props;
    if (date === null) {
      onChange(null);
    } else {
      this.changeDate(date, () => onChange(date));
    }
  };

  public pick12hOr24hFormat = (
    default12hFormat: string,
    default24hFormat: string
  ): string => {
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
