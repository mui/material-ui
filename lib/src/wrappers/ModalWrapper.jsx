import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import ModalDialog from '../_shared/ModalDialog';
import DateTextField from '../_shared/DateTextField';
import DomainPropTypes from '../constants/prop-types';

export default class ModalWrapper extends PureComponent {
  static propTypes = {
    value: DomainPropTypes.date,
    children: PropTypes.node.isRequired,
    format: PropTypes.string,
    onAccept: PropTypes.func,
    onDismiss: PropTypes.func,
    onClear: PropTypes.func,
    dialogContentClassName: PropTypes.string,
    invalidLabel: PropTypes.string,
    labelFunc: PropTypes.func,
    okLabel: PropTypes.string,
    cancelLabel: PropTypes.string,
    clearLabel: PropTypes.string,
    clearable: PropTypes.bool,
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
  }

  state = {
    open: false,
  }

  open = () => {
    this.setState({ open: true });
  }

  close = () => {
    this.setState({ open: false });
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
