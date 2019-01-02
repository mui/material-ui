import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment, {
  InputAdornmentProps as MuiInputAdornmentProps,
} from '@material-ui/core/InputAdornment';
import TextField, { BaseTextFieldProps, TextFieldProps } from '@material-ui/core/TextField';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import { InputProps as InputPropsType } from '@material-ui/core/Input';
import { MaskedInputProps } from 'react-text-mask';
import DomainPropTypes, { DateType } from '../constants/prop-types';
import { MaterialUiPickersDate } from '../typings/date';
import { ExtendMui } from '../typings/extendMui';
import MaskedInput from './MaskedInput';
import { withUtils, WithUtilsProps } from './WithUtils';

const getDisplayDate = ({
  utils,
  value,
  format,
  invalidLabel,
  emptyLabel,
  labelFunc,
}: DateTextFieldProps) => {
  const isEmpty = value === null;
  const date = utils.date(value);

  if (labelFunc) {
    return labelFunc(isEmpty ? null : date, invalidLabel!);
  }

  if (isEmpty) {
    return emptyLabel;
  }

  return utils.isValid(date) ? utils.format(date, format) : invalidLabel;
};

const getError = (value: MaterialUiPickersDate, props: DateTextFieldProps): React.ReactNode => {
  const {
    utils,
    maxDate,
    minDate,
    disablePast,
    disableFuture,
    maxDateMessage,
    minDateMessage,
    invalidDateMessage,
  } = props;

  if (!utils.isValid(value)) {
    // if null - do not show error
    if (utils.isNull(value)) {
      return '';
    }

    return invalidDateMessage;
  }

  if (
    (maxDate && utils.isAfter(value, utils.endOfDay(utils.date(maxDate)))) ||
    (disableFuture && utils.isAfter(value, utils.endOfDay(utils.date())))
  ) {
    return maxDateMessage;
  }

  if (
    (minDate && utils.isBefore(value, utils.startOfDay(utils.date(minDate)))) ||
    (disablePast && utils.isBefore(value, utils.startOfDay(utils.date())))
  ) {
    return minDateMessage;
  }

  return '';
};

export interface DateTextFieldProps
  extends WithUtilsProps,
    ExtendMui<BaseTextFieldProps, 'onError' | 'onChange' | 'value'> {
  // Properly extend different variants from mui textfield
  variant?: TextFieldProps['variant'];
  InputProps?: TextFieldProps['InputProps'];
  inputProps?: TextFieldProps['inputMode'];
  value: DateType;
  minDate?: DateType;
  /** Error message, shown if date is less then minimal date */
  minDateMessage?: React.ReactNode;
  disablePast?: boolean;
  disableFuture?: boolean;
  maxDate?: DateType;
  /** Error message, shown if date is more then maximal date */
  maxDateMessage?: React.ReactNode;
  /** Input mask, used in keyboard mode read more <a href="https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#readme">here</a> */
  mask?: MaskedInputProps['mask'];
  pipe?: any;
  keepCharPositions?: boolean;
  onChange: (date: MaterialUiPickersDate) => void;
  onClear?: () => void;
  /** On/off manual keyboard input mode */
  keyboard?: boolean;
  /** Format string */
  format: string;
  /** Message displaying in text field, if date is invalid (doesn't work in keyboard mode) */
  invalidLabel?: string;
  /** Message displaying in text field, if null passed (doesn't work in keyboard mode) */
  emptyLabel?: string;
  /** Do not open picker on enter keypress */
  disableOpenOnEnter?: boolean;
  /** Dynamic label generation function [(date: Date, invalidLabel: string) => string] */
  labelFunc?: (date: MaterialUiPickersDate, invalidLabel: string) => string;
  /** Icon displayed for open picker button in keyboard mode */
  keyboardIcon?: React.ReactNode;
  /** Message, appearing when date cannot be parsed */
  invalidDateMessage?: React.ReactNode;
  /** If true clear button will be displayed */
  clearable?: boolean;
  /** Component that should replace the default Material-UI TextField */
  TextFieldComponent?:
    | React.ComponentType<TextFieldProps>
    | React.ReactType<React.HTMLAttributes<any>>;
  /** Props to pass to keyboard input adornment */
  InputAdornmentProps?: Partial<MuiInputAdornmentProps>;
  /** Specifies position of keyboard button adornment */
  adornmentPosition?: MuiInputAdornmentProps['position'];
  onClick: (e: React.SyntheticEvent) => void;
  /* Callback firing when date that applied in the keyboard is invalid **/
  onError?: (newValue: MaterialUiPickersDate, error: React.ReactNode) => void;
  /* Callback firing on change input in keyboard mode **/
  onInputChange?: (e: React.FormEvent<HTMLInputElement>) => void;
}

export class DateTextField extends React.PureComponent<DateTextFieldProps> {
  public static propTypes: any = {
    value: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(Date),
    ]),
    minDate: DomainPropTypes.date,
    maxDate: DomainPropTypes.date,
    disablePast: PropTypes.bool,
    disableFuture: PropTypes.bool,
    format: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onClear: PropTypes.func,
    onClick: PropTypes.func.isRequired,
    clearable: PropTypes.bool,
    utils: PropTypes.object.isRequired,
    disabled: PropTypes.bool,
    InputProps: PropTypes.shape({}),
    mask: PropTypes.any,
    minDateMessage: PropTypes.node,
    maxDateMessage: PropTypes.node,
    invalidLabel: PropTypes.string,
    emptyLabel: PropTypes.string,
    labelFunc: PropTypes.func,
    keyboard: PropTypes.bool,
    keyboardIcon: PropTypes.node,
    disableOpenOnEnter: PropTypes.bool,
    invalidDateMessage: PropTypes.node,
    TextFieldComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    InputAdornmentProps: PropTypes.object,
    adornmentPosition: PropTypes.oneOf(['start', 'end']),
    onError: PropTypes.func,
    onInputChange: PropTypes.func,
    pipe: PropTypes.func,
    keepCharPositions: PropTypes.bool,
  };

  public static defaultProps = {
    disabled: false,
    invalidLabel: 'Unknown',
    emptyLabel: '',
    value: new Date(),
    labelFunc: undefined,
    format: undefined,
    InputProps: undefined,
    keyboard: false,
    mask: undefined,
    keyboardIcon: 'event',
    disableOpenOnEnter: false,
    invalidDateMessage: 'Invalid Date Format',
    clearable: false,
    onBlur: undefined,
    onClear: undefined,
    disablePast: false,
    disableFuture: false,
    onError: undefined,
    onInputChange: undefined,
    minDate: '1900-01-01',
    maxDate: '2100-01-01',
    minDateMessage: 'Date should not be before minimal date',
    maxDateMessage: 'Date should not be after maximal date',
    TextFieldComponent: TextField,
    InputAdornmentProps: {},
    adornmentPosition: 'end' as MuiInputAdornmentProps['position'],
    pipe: undefined,
    keepCharPositions: false,
  };

  public static updateState = (props: DateTextFieldProps) => ({
    value: props.value,
    displayValue: getDisplayDate(props),
    error: getError(props.utils.date(props.value), props),
  });

  public state = DateTextField.updateState(this.props);

  public componentDidUpdate(prevProps: DateTextFieldProps) {
    if (
      !this.props.utils.isEqual(this.props.value, prevProps.value) ||
      prevProps.format !== this.props.format ||
      prevProps.maxDate !== this.props.maxDate ||
      prevProps.minDate !== this.props.minDate ||
      prevProps.emptyLabel !== this.props.emptyLabel ||
      prevProps.utils !== this.props.utils
    ) {
      this.setState(DateTextField.updateState(this.props));
    }
  }

  public commitUpdates = (value: string) => {
    const { onChange, clearable, onClear, utils, format, onError } = this.props;

    if (value === '') {
      if (this.props.value === null) {
        this.setState(DateTextField.updateState(this.props));
      } else if (clearable && onClear) {
        onClear();
      }

      return;
    }

    const oldValue = utils.date(this.state.value);
    const newValue = utils.parse(value, format);
    const error = getError(newValue, this.props);

    this.setState(
      {
        error,
        displayValue: value,
        value: error ? newValue : oldValue,
      },
      () => {
        if (!error && !utils.isEqual(newValue, oldValue)) {
          onChange(newValue);
        }

        if (error && onError) {
          onError(newValue, error);
        }
      }
    );
  };

  public handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.keyboard) {
      e.preventDefault();
      e.stopPropagation();

      this.commitUpdates(e.target.value);
      if (this.props.onBlur) {
        this.props.onBlur(e);
      }
    }
  };

  public handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { utils, format, onInputChange } = this.props;
    const parsedValue = utils.parse(e.target.value, format);

    if (onInputChange) {
      onInputChange(e);
    }

    this.setState({
      displayValue: e.target.value,
      error: getError(parsedValue, this.props),
    });
  };

  public handleFocus = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!this.props.keyboard) {
      this.openPicker(e);
    }
  };

  public handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      if (!this.props.disableOpenOnEnter) {
        this.openPicker(e);
      } else {
        // @ts-ignore TODO check me
        this.commitUpdates(e.target.value);
      }
    }
  };

  public openPicker = (e: React.SyntheticEvent) => {
    const { disabled, onClick } = this.props;

    if (!disabled) {
      onClick!(e);
    }
  };

  public render() {
    const {
      adornmentPosition,
      clearable,
      disabled,
      disableFuture,
      disableOpenOnEnter,
      disablePast,
      emptyLabel,
      format,
      InputAdornmentProps,
      InputProps,
      invalidDateMessage,
      invalidLabel,
      keyboard,
      keyboardIcon,
      labelFunc,
      mask,
      maxDate,
      maxDateMessage,
      minDate,
      minDateMessage,
      onBlur,
      onClear,
      onClick,
      pipe,
      keepCharPositions,
      TextFieldComponent,
      utils,
      value,
      onInputChange,
      ...other
    } = this.props;

    const { displayValue, error } = this.state;
    const localInputProps = {
      inputComponent: MaskedInput,
      inputProps: {
        mask: !keyboard ? null : mask,
        pipe: !keyboard ? null : pipe,
        keepCharPositions: !keyboard ? undefined : keepCharPositions,
        readOnly: !keyboard,
      },
    };

    if (keyboard) {
      localInputProps[`${adornmentPosition}Adornment`] = (
        <InputAdornment position={adornmentPosition!} {...InputAdornmentProps}>
          <IconButton disabled={disabled} onClick={this.openPicker}>
            <Icon>{keyboardIcon}</Icon>
          </IconButton>
        </InputAdornment>
      );
    }

    const Component = TextFieldComponent! as React.ComponentType<any>;
    const inputProps = {
      ...localInputProps,
      ...InputProps,
    } as Partial<InputPropsType>;

    return (
      <Component
        onClick={this.handleFocus}
        error={!!error}
        helperText={error}
        onKeyPress={this.handleKeyPress}
        onBlur={this.handleBlur}
        disabled={disabled}
        value={displayValue}
        {...other}
        onError={undefined}
        onChange={this.handleChange}
        InputProps={inputProps}
      />
    );
  }
}

export default withUtils()(DateTextField);
