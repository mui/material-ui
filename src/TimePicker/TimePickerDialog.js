// @flow weak

import React, { PropTypes, Component } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import EventListener from 'react-event-listener';
import keycode from 'keycode';
import Clock from './Clock';
import { Dialog, DialogActions } from '../Dialog';
import Button from '../Button';

export const styleSheet = createStyleSheet('TimePickerDialog', () => {
  return {
    dialogRoot: {
      fontSize: 14,
    },
    paper: {
      width: '280px',
    },
  };
});

class TimePickerDialog extends Component {
  static propTypes = {
    autoOk: PropTypes.bool,
    cancelLabel: PropTypes.node,
    format: PropTypes.oneOf(['ampm', '24hr']),
    initialTime: PropTypes.object,
    okLabel: PropTypes.node,
    onAccept: PropTypes.func,
    onDismiss: PropTypes.func,
    onShow: PropTypes.func,
    style: PropTypes.object,
  };

  static defaultProps = {
    okLabel: 'OK',
    cancelLabel: 'Cancel',
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  static muiName = 'TimePickerDialog';

  state = {
    open: false,
  };

  show() {
    if (this.props.onShow && !this.state.open) this.props.onShow();
    this.setState({
      open: true,
    });
  }

  dismiss() {
    if (this.props.onDismiss && this.state.open) this.props.onDismiss();
    this.setState({
      open: false,
    });
  }

  handleRequestClose = () => {
    this.dismiss();
  };

  handleClickCancel = () => {
    this.dismiss();
  };

  handleClickOK = () => {
    if (this.props.onAccept) {
      this.props.onAccept(this.clock.getSelectedTime());
    }
    this.setState({
      open: false,
    });
  };

  handleKeyUp = (event) => {
    switch (keycode(event)) {
      case 'enter':
        this.handleClickOK();
        break;
      default:
        break;
    }
  };

  clock = undefined;

  render() {
    const {
      initialTime,
      onAccept, // eslint-disable-line no-unused-vars
      format,
      autoOk,
      okLabel,
      cancelLabel,
      style,
      ...other
    } = this.props;

    const actions = [
      <Button
        key={0}
        primary
        onClick={this.handleClickCancel}
      >
        {cancelLabel}
      </Button>,
      <Button
        key={1}
        primary
        onClick={this.handleClickOK}
      >
        {okLabel}
      </Button>,
    ];

    const onClockChangeMinutes = autoOk === true ? this.handleClickOK : undefined;
    const open = this.state.open;
    const classes = this.context.styleManager.render(styleSheet);

    return (
      <Dialog
        {...other}
        className={classNames(classes.dialogRoot)}
        paperClassName={classNames(classes.paper)}
        style={style}
        open={open}
        onRequestClose={this.handleRequestClose}
      >
        {open &&
          <EventListener target="window" onKeyUp={this.handleKeyUp} />
        }
        {open &&
        <Clock
          ref={(clock) => { this.clock = clock; }}
          format={format}
          initialTime={initialTime}
          onChangeMinutes={onClockChangeMinutes}
        />
        }
        <DialogActions>{actions}</DialogActions>
      </Dialog>
    );
  }
}

export default TimePickerDialog;
