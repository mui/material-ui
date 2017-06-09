import React, {Component} from 'react';
import PropTypes from 'prop-types';
import EventListener from 'react-event-listener';
import keycode from 'keycode';
import Clock from './Clock';
import Dialog from '../Dialog';
import FlatButton from '../FlatButton';
import Popover from '../Popover/Popover';
import PopoverAnimationVertical from '../Popover/PopoverAnimationVertical';

class TimePickerDialog extends Component {
  static propTypes = {
    animation: PropTypes.func,
    autoOk: PropTypes.bool,
    bodyStyle: PropTypes.object,
    cancelLabel: PropTypes.node,
    container: PropTypes.oneOf(['dialog', 'inline']),
    format: PropTypes.oneOf(['ampm', '24hr']),
    initialTime: PropTypes.object,
    minutesStep: PropTypes.number,
    okLabel: PropTypes.node,
    onAccept: PropTypes.func,
    onDismiss: PropTypes.func,
    onShow: PropTypes.func,
    style: PropTypes.object,
  };

  static defaultProps = {
    okLabel: 'OK',
    cancelLabel: 'Cancel',
    container: 'dialog',
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

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

  handleTouchTapCancel = () => {
    this.dismiss();
  };

  handleTouchTapOK = () => {
    if (this.props.onAccept) {
      this.props.onAccept(this.refs.clock.getSelectedTime());
    }
    this.setState({
      open: false,
    });
  };

  handleKeyUp = (event) => {
    switch (keycode(event)) {
      case 'enter':
        this.handleTouchTapOK();
        break;
    }
  };

  render() {
    const {
      bodyStyle,
      initialTime,
      onAccept, // eslint-disable-line no-unused-vars
      onDismiss, // eslint-disable-line no-unused-vars
      onShow, // eslint-disable-line no-unused-vars
      format,
      autoOk,
      okLabel,
      cancelLabel,
      style,
      minutesStep,
      container,
      animation,
      ...other
    } = this.props;

    const styles = {
      root: {
        fontSize: 14,
        color: this.context.muiTheme.timePicker.clockColor,
        minWidth: 280,
      },
      dialogContent: {
        width: 280,
      },
      body: {
        padding: 0,
      },
      actions: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        margin: 0,
        maxHeight: 48,
        padding: 8,
      },
    };

    const actions = [
      <FlatButton
        key={0}
        label={cancelLabel}
        primary={true}
        onTouchTap={this.handleTouchTapCancel}
      />,
      <FlatButton
        key={1}
        label={okLabel}
        primary={true}
        onTouchTap={this.handleTouchTapOK}
      />,
    ];

    const onClockChangeMinutes = autoOk === true ? this.handleTouchTapOK : undefined;
    const open = this.state.open;

    const Container = (container === 'inline' ? Popover : Dialog);

    return (
      <div {...other} ref="root">
        <Container
          anchorEl={this.refs.root} // For Popover
          animation={animation || PopoverAnimationVertical} // For Popover
          style={Object.assign(styles.root, style)}
          bodyStyle={Object.assign(styles.body, bodyStyle)}
          contentStyle={styles.dialogContent}
          repositionOnUpdate={false}
          open={open}
          onRequestClose={this.handleRequestClose}
        >
          {open &&
            <EventListener target="window" onKeyUp={this.handleKeyUp} />
          }
          {open &&
            <Clock
              ref="clock"
              format={format}
              initialTime={initialTime}
              onChangeMinutes={onClockChangeMinutes}
              minutesStep={minutesStep}
            />
          }
          <div style={styles.actions}>
            {actions}
          </div>
        </Container>
      </div>
    );
  }
}

export default TimePickerDialog;
