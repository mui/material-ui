import React, {Component, PropTypes} from 'react';
import EventListener from 'react-event-listener';
import keycode from 'keycode';
import Clock from './Clock';
import Dialog from '../Dialog';
import Popover from '../Popover';
import PopoverAnimationFromTop from '../Popover/PopoverAnimationVertical';

class TimePickerDialog extends Component {
  static propTypes = {
    autoOk: PropTypes.bool,
    cancelLabel: PropTypes.node,
    container: PropTypes.oneOf(['dialog', 'inline']),
    format: PropTypes.oneOf(['ampm', '24hr']),
    initialTime: PropTypes.object,
    okLabel: PropTypes.node,
    onAccept: PropTypes.func,
    onDismiss: PropTypes.func,
    onShow: PropTypes.func,
  };

  static defaultProps = {
    okLabel: 'OK',
    cancelLabel: 'Cancel',
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    open: false,
  };

  getTheme() {
    return this.context.muiTheme.timePicker;
  }

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
    this.dismiss();
    if (this.props.onAccept) {
      this.props.onAccept(this.refs.clock.getSelectedTime());
    }
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
      container,
      initialTime,
      onAccept, // eslint-disable-line no-unused-vars
      format,
      autoOk,
      okLabel,
      cancelLabel,
      ...other,
    } = this.props;

    const styles = {
      root: {
        fontSize: 14,
        color: this.getTheme().clockColor,
      },
      dialogContent: {
        width: 310,
      },
      dialogBodyContent: {
        padding: 0,
        minHeight: 434,
        minWidth: 310,
      },
    };
    const onClockChangeMinutes = autoOk === true ? this.handleTouchTapOK : undefined;
    const open = this.state.open;
    const Container = (container === 'inline' ? Popover : Dialog);

    return (
      <div {...other} ref="root">
        <Container
          {...other}
          anchorEl={this.refs.root} // For Popover
          animation={PopoverAnimationFromTop} // For Popover
          bodyStyle={styles.dialogBodyContent}
          contentStyle={styles.dialogContent}
          ref="dialogWindow"
          repositionOnUpdate={true}
          open={open}
          onRequestClose={this.handleRequestClose}
          style={styles.dialogBodyContent}
        >
          {open &&
            <EventListener elementName="window" onKeyUp={this.handleKeyUp} />
          }
          {open &&
            <Clock
              ref="clock"
              format={format}
              initialTime={initialTime}
              cancelLabel={cancelLabel}
              okLabel={okLabel}
              onChangeMinutes={onClockChangeMinutes}
              onTouchTapCancel={this.handleTouchTapCancel}
              onTouchTapOk={this.handleTouchTapOK}
            />
          }
        </Container>
      </div>
    );
  }
}

export default TimePickerDialog;
