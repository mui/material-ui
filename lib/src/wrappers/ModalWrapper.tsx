import { Omit } from '@material-ui/core';
import { DialogProps as DialogPropsType } from '@material-ui/core/Dialog';
import keycode from 'keycode';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import DateTextField, { DateTextFieldProps } from '../_shared/DateTextField';
import ModalDialog from '../_shared/ModalDialog';
import DomainPropTypes from '../constants/prop-types';

export interface ModalWrapperProps extends Partial<DateTextFieldProps> {
  onAccept?: () => void;
  onDismiss?: () => void;
  onClear?: () => void;
  onSetToday?: () => void;
  onOpen?: () => void;
  onClose?: () => void;
  dialogContentClassName?: string;
  okLabel?: React.ReactNode;
  cancelLabel?: React.ReactNode;
  clearLabel?: React.ReactNode;
  todayLabel?: React.ReactNode;
  showTodayButton?: boolean;
  container?: React.ReactNode;
  DialogProps?: Partial<Omit<DialogPropsType, 'classes'>>;
  isAccepted?: boolean;
}

export default class ModalWrapper extends React.PureComponent<
  ModalWrapperProps
> {
  public static propTypes = {
    /** "OK" label message */
    okLabel: PropTypes.node,
    /** "Cancel" label message */
    cancelLabel: PropTypes.node,
    /** "Clear" label message */
    clearLabel: PropTypes.node,
    /** If true clear button will be displayed */
    clearable: PropTypes.bool,
    /** "Today" label message */
    todayLabel: PropTypes.string,
    /**
     * If true today button will be displayed
     * <b>Note*</b> that clear button has higher priority
     */
    showTodayButton: PropTypes.bool,
    /** On open callback [(e: Event) => void] */
    onOpen: PropTypes.func,
    /** On close callback [(e: Event) => void] */
    format: PropTypes.string,
    /** Dialog props passed to material-ui Dialog */
    DialogProps: PropTypes.object,
    value: DomainPropTypes.date,
    invalidLabel: PropTypes.node,
    labelFunc: PropTypes.func,
    onClose: PropTypes.func,
    onAccept: PropTypes.func,
    onDismiss: PropTypes.func,
    onClear: PropTypes.func,
    onSetToday: PropTypes.func,
    children: PropTypes.node.isRequired,
    dialogContentClassName: PropTypes.string,
    isAccepted: PropTypes.bool.isRequired,
  };

  public static defaultProps = {
    dialogContentClassName: '',
    invalidLabel: undefined,
    value: new Date(),
    labelFunc: undefined,
    okLabel: 'OK',
    cancelLabel: 'Cancel',
    clearLabel: 'Clear',
    todayLabel: 'Today',
    clearable: false,
    showTodayButton: false,
    format: undefined,
    onAccept: undefined,
    onDismiss: undefined,
    onClear: undefined,
    onOpen: undefined,
    onClose: undefined,
    onSetToday: undefined,
    DialogProps: undefined,
  };

  public static getDerivedStateFromProps(nextProps: ModalWrapperProps) {
    // only if accept = true close the dialog
    if (nextProps.isAccepted) {
      return {
        open: false,
      };
    }

    return null;
  }

  public state = {
    open: false,
  };

  public handleKeyDown = (event: KeyboardEvent) => {
    switch (keycode(event)) {
      case 'enter':
        this.handleAccept();
        break;
      default:
        // if keycode is not handled, stop execution
        return;
    }

    // if event was handled prevent other side effects
    event.preventDefault();
  };

  public handleSetTodayDate = () => {
    if (this.props.onSetToday) {
      this.props.onSetToday();
    }
  };

  public open = () => {
    this.setState({ open: true });
    if (this.props.onOpen) {
      this.props.onOpen();
    }
  };

  public close = () => {
    this.setState({ open: false });
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  public handleAccept = () => {
    this.close();
    if (this.props.onAccept) {
      this.props.onAccept();
    }
  };

  public handleDismiss = () => {
    this.close();
    if (this.props.onDismiss) {
      this.props.onDismiss();
    }
  };

  public handleClear = () => {
    this.close();
    if (this.props.onClear) {
      this.props.onClear();
    }
  };

  public render() {
    const {
      value,
      format,
      children,
      dialogContentClassName,
      onAccept,
      onDismiss,
      invalidLabel,
      labelFunc,
      okLabel,
      cancelLabel,
      clearLabel,
      clearable,
      todayLabel,
      showTodayButton,
      onOpen,
      onClose,
      onSetToday,
      isAccepted,
      DialogProps,
      ...other
    } = this.props;

    return (
      <React.Fragment>
        <DateTextField
          value={value}
          format={format}
          onClick={this.open}
          // onFocus={this.togglePicker} <- Currently not properly works with .blur() on TextField
          invalidLabel={invalidLabel}
          labelFunc={labelFunc}
          clearable={clearable}
          {...other}
        />

        <ModalDialog
          open={this.state.open}
          onKeyDown={this.handleKeyDown as any}
          onClear={this.handleClear}
          onAccept={this.handleAccept}
          onDismiss={this.handleDismiss}
          onSetToday={this.handleSetTodayDate}
          dialogContentClassName={dialogContentClassName}
          clearLabel={clearLabel}
          todayLabel={todayLabel}
          okLabel={okLabel}
          cancelLabel={cancelLabel}
          clearable={clearable}
          showTodayButton={showTodayButton}
          children={children}
          {...DialogProps}
        />
      </React.Fragment>
    );
  }
}
