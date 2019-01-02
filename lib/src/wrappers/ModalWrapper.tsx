import { Omit } from '@material-ui/core';
import { DialogProps as DialogPropsType } from '@material-ui/core/Dialog';
import keycode from 'keycode';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import DateTextField, { DateTextFieldProps } from '../_shared/DateTextField';
import ModalDialog from '../_shared/ModalDialog';
import DomainPropTypes from '../constants/prop-types';

export interface ModalWrapperProps extends Omit<DateTextFieldProps, 'utils' | 'onClick'> {
  onAccept?: () => void;
  onDismiss?: () => void;
  onClear?: () => void;
  onSetToday?: () => void;
  /** On open callback */
  onOpen?: () => void;
  /** On close callback */
  onClose?: () => void;
  /** "OK" label message */
  okLabel?: React.ReactNode;
  /** "Cancel" label message */
  cancelLabel?: React.ReactNode;
  /** "Clear" label message */
  clearLabel?: React.ReactNode;
  /** "Today" label message */
  todayLabel?: React.ReactNode;
  showTabs?: boolean;
  /**
   * If true today button will be displayed
   * <b>Note*</b> that clear button has higher priority
   */
  showTodayButton?: boolean;
  container?: React.ReactNode;
  DialogProps?: Partial<Omit<DialogPropsType, 'classes'>>;
  isAccepted?: boolean;
}

export default class ModalWrapper extends React.PureComponent<ModalWrapperProps> {
  public static propTypes: any = {
    okLabel: PropTypes.node,
    cancelLabel: PropTypes.node,
    clearLabel: PropTypes.node,
    clearable: PropTypes.bool,
    todayLabel: PropTypes.string,
    showTodayButton: PropTypes.bool,
    onOpen: PropTypes.func,
    format: PropTypes.string,
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
    isAccepted: PropTypes.bool.isRequired,
  };

  public static defaultProps = {
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
    isAccepted: false,
  };

  public static getDerivedStateFromProps(nextProps: ModalWrapperProps) {
    // only if accept = true close the dialog
    if (nextProps.isAccepted) {
      if (nextProps.onClose) {
        nextProps.onClose();
      }

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
      showTabs,
      ...other
    } = this.props;

    return (
      <React.Fragment>
        <DateTextField
          value={value}
          format={format}
          onClick={this.open}
          invalidLabel={invalidLabel}
          labelFunc={labelFunc}
          clearable={clearable}
          {...other}
        />

        <ModalDialog
          showTabs={showTabs}
          open={this.state.open}
          onKeyDownInner={this.handleKeyDown}
          onClear={this.handleClear}
          onAccept={this.handleAccept}
          onDismiss={this.handleDismiss}
          onSetToday={this.handleSetTodayDate}
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
