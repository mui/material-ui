import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import ModalDialog from '../_shared/ModalDialog';
import DateTextField from '../_shared/DateTextField';
import DomainPropTypes from '../constants/prop-types';

export default class ModalWrapper extends PureComponent {
  static propTypes = {
    /* Picker value */
    value: DomainPropTypes.date,
    /* Format string */
    invalidLabel: PropTypes.string,
    /* Function for dynamic rendering label (date, invalidLabel) => string */
    labelFunc: PropTypes.func,
    /* "OK" label message */
    okLabel: PropTypes.string,
    /* "Cancel" label message */
    cancelLabel: PropTypes.string,
    /* "Clear" label message */
    clearLabel: PropTypes.string,
    /* If true clear button will be displayed */
    clearable: PropTypes.bool,
    /* On open callback */
    onOpen: PropTypes.func,
    /* On close callback */
    onClose: PropTypes.func,
    /* Format string */
    format: PropTypes.string,
    children: PropTypes.node.isRequired,
    onAccept: PropTypes.func,
    onDismiss: PropTypes.func,
    onClear: PropTypes.func,
    dialogContentClassName: PropTypes.string,
  }

  static defaultProps = {
    dialogContentClassName: '',
    invalidLabel: undefined,
    value: new Date(),
    labelFunc: undefined,
    okLabel: undefined,
    cancelLabel: undefined,
    clearLabel: undefined,
    format: undefined,
    onAccept: undefined,
    onDismiss: undefined,
    onClear: undefined,
    clearable: false,
    onOpen: undefined,
    onClose: undefined,
  }

  state = {
    open: false,
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
      onOpen,
      onClose,
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
          onClear={this.handleClear}
          onAccept={this.handleAccept}
          onDismiss={this.handleDismiss}
          dialogContentClassName={dialogContentClassName}
          clearLabel={clearLabel}
          okLabel={okLabel}
          cancelLabel={cancelLabel}
          clearable={clearable}
        >
          {children}
        </ModalDialog>
      </Fragment>
    );
  }
}
