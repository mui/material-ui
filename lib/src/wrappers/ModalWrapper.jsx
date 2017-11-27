import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ModalDialog from '../_shared/ModalDialog';
import DateTextField from '../_shared/DateTextField';
import DomainPropTypes from '../constants/prop-types';

export default class ModalWrapper extends PureComponent {
  static propTypes = {
    value: DomainPropTypes.date,
    children: PropTypes.node.isRequired,
    format: PropTypes.string,
    onAccept: PropTypes.func.isRequired,
    onDismiss: PropTypes.func.isRequired,
    dialogContentClassName: PropTypes.string,
    invalidLabel: PropTypes.string,
    labelFunc: PropTypes.func,
    okLabel: PropTypes.string,
    cancelLabel: PropTypes.string,
  }

  static defaultProps = {
    dialogContentClassName: '',
    invalidLabel: undefined,
    value: new Date(),
    labelFunc: undefined,
    okLabel: undefined,
    cancelLabel: undefined,
    format: undefined,
  }

  state = {
    open: false,
  }

  togglePicker = () => {
    this.setState({ open: !this.state.open });
  }

  handleAccept = () => {
    this.togglePicker(); // close
    this.props.onAccept();
  }

  handleDismiss = () => {
    this.togglePicker();
    this.props.onDismiss();
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
      ...other
    } = this.props;

    return (
      <div>
        <DateTextField
          value={value}
          format={format}
          onClick={this.togglePicker}
          // onFocus={this.togglePicker} <- Currently not properly works with .blur() on TextField
          invalidLabel={invalidLabel}
          labelFunc={labelFunc}
          {...other}
        />

        <ModalDialog
          open={this.state.open}
          onAccept={this.handleAccept}
          onDismiss={this.handleDismiss}
          dialogContentClassName={dialogContentClassName}
          okLabel={okLabel}
          cancelLabel={cancelLabel}
        >
          { children }
        </ModalDialog>
      </div>
    );
  }
}
