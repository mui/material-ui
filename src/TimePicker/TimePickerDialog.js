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
    paper: {
      fontSize: 14,
      width: '280px',
    },
    landscapePaper: {
      width: '480px',
    },
  };
});

class TimePickerDialog extends Component {
  static propTypes = {
    autoOk: PropTypes.bool,
    cancelLabel: PropTypes.node,
    format: PropTypes.oneOf(['ampm', '24hr']),
    initialTime: PropTypes.object,
    landscape: PropTypes.bool,
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
      landscape,
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
        paperClassName={classNames(classes.paper, { [classes.landscapePaper]: landscape })}
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
          landscape={landscape}
          onChangeMinutes={onClockChangeMinutes}
        />
        }
        <DialogActions>{actions}</DialogActions>
      </Dialog>
    );
  }
}

export default TimePickerDialog;
