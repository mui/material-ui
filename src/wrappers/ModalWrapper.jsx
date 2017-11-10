import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ModalDialog from '../_shared/ModalDialog';
import DateTextField from '../_shared/DateTextField';
import DomainPropTypes from '../constants/prop-types';

export default class ModalWrapper extends PureComponent {
  static propTypes = {
    value: DomainPropTypes.date,
    children: PropTypes.node.isRequired,
    format: PropTypes.string.isRequired,
    onAccept: PropTypes.func.isRequired,
    onDismiss: PropTypes.func.isRequired,
    dialogContentClassName: PropTypes.string,
    invalidLabel: PropTypes.string,
  }

  static defaultProps = {
    dialogContentClassName: '',
    invalidLabel: undefined,
    value: new Date(),
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
      ...other
    } = this.props;

    return (
      <div>
        <DateTextField
          value={value}
          format={format}
          onClick={this.togglePicker}
          onFocus={this.togglePicker}
          invalidLabel={invalidLabel}
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
