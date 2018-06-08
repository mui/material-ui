import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import ModalDialog from '../_shared/ModalDialog';
import DateTextField from '../_shared/DateTextField';
import DomainPropTypes from '../constants/prop-types';

export default class ModalWrapper extends PureComponent {
  static propTypes = {
    /** Picker value */
    value: DomainPropTypes.date,
    /** Format string */
    invalidLabel: PropTypes.node,
    /** Function for dynamic rendering label (date, invalidLabel) => string */
    labelFunc: PropTypes.func,
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
    /** On open callback */
    onOpen: PropTypes.func,
    /** On close callback */
    onClose: PropTypes.func,
    /** Format string */
    format: PropTypes.string,
    onAccept: PropTypes.func,
    onDismiss: PropTypes.func,
    onClear: PropTypes.func,
    onSetToday: PropTypes.func,
    children: PropTypes.node.isRequired,
    dialogContentClassName: PropTypes.string,
  }

  static defaultProps = {
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
  }

  state = {
    open: false,
  }

  handleKeyDown = (event) => {
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

  handleSetTodayDate = () => {
    if (this.props.onSetToday) {
      this.props.onSetToday();
    }
  }

  open = () => {
    this.setState({ open: true });
    if (this.props.onOpen) {
      this.props.onOpen();
    }
  }

  close = () => {
    this.setState({ open: false });
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  handleAccept = () => {
    this.close();
    if (this.props.onAccept) {
      this.props.onAccept();
    }
  }

  handleDismiss = () => {
    this.close();
    if (this.props.onDismiss) {
      this.props.onDismiss();
    }
  }

  handleClear = () => {
    this.close();
    if (this.props.onClear) {
      this.props.onClear();
    }
  }

  render() {
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
      ...other
    } = this.props;

    return (
      <Fragment>
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
          onKeyDown={this.handleKeyDown}
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
        >
          {children}
        </ModalDialog>
      </Fragment>
    );
  }
}
