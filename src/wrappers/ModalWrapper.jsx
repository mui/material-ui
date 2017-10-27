import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalDialog from '../_shared/ModalDialog';
import DateTextField from '../_shared/DateTextField';

export default class ModalWrapper extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    value: PropTypes.string.isRequired,
    format: PropTypes.string.isRequired,
    onAccept: PropTypes.func.isRequired,
    onDismiss: PropTypes.func.isRequired,
    date: PropTypes.object.isRequired,
    dialogContentClassName: PropTypes.string,
  }

  static defaultProps = {
    dialogContentClassName: '',
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
      value, format, children, dialogContentClassName, ...other
    } = this.props;

    return (
      <div>
        <DateTextField
          value={value}
          format={format}
          onClick={this.togglePicker}
          {...other}
        />

        <ModalDialog
          open={this.state.open}
          onAccept={this.handleAccept}
          onDismiss={this.handleDismiss}
          dialogContentClassName={dialogContentClassName}
        >
          { children }
        </ModalDialog>
      </div>
    );
  }
}
