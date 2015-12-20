import React from 'react';
import StylePropable from '../mixins/style-propable';
import WindowListenable from '../mixins/window-listenable';
import KeyCode from '../utils/key-code';
import Clock from './clock';
import Dialog from '../dialog';
import FlatButton from '../flat-button';
import muiThemeable from '../muiThemeable';

let TimePickerDialog = React.createClass({

  mixins: [StylePropable, WindowListenable],

  propTypes: {
    /**
     * The MUI Theme to use to render this component with.
     */
    _muiTheme: React.PropTypes.object.isRequired,

    autoOk: React.PropTypes.bool,
    format: React.PropTypes.oneOf(['ampm', '24hr']),
    initialTime: React.PropTypes.object,
    onAccept: React.PropTypes.func,
    onDismiss: React.PropTypes.func,
    onShow: React.PropTypes.func,
  },

  getInitialState() {
    return {
      open: false,
    };
  },

  windowListeners: {
    keyup: '_handleWindowKeyUp',
  },


  getTheme() {
    return this.props._muiTheme.timePicker;
  },

  render() {
    let {
      initialTime,
      onAccept,
      format,
      autoOk,
      ...other,
    } = this.props;

    let styles = {
      root: {
        fontSize: 14,
        color: this.getTheme().clockColor,
      },
      dialogContent: {
        width: 280,
      },
      body: {
        padding: 0,
      },
    };

    let actions = [
      <FlatButton
        key={0}
        label="Cancel"
        secondary={true}
        onTouchTap={this.dismiss} />,
      <FlatButton
        key={1}
        label="OK"
        secondary={true}
        onTouchTap={this._handleOKTouchTap} />,
    ];

    const onClockChangeMinutes = (autoOk === true ? this._handleOKTouchTap : undefined);

    return (
      <Dialog {...other}
        ref="dialogWindow"
        style={this.mergeAndPrefix(styles.root)}
        bodyStyle={this.mergeAndPrefix(styles.body)}
        actions={actions}
        contentStyle={styles.dialogContent}
        repositionOnUpdate={false}
        open={this.state.open}
        onRequestClose={this.dismiss}>
        <Clock
          ref="clock"
          format={format}
          initialTime={initialTime}
          onChangeMinutes={onClockChangeMinutes} />
      </Dialog>
    );
  },

  show() {
    if (this.props.onShow && !this.state.open) this.props.onShow();
    this.setState({
      open: true,
    });
  },

  dismiss() {
    if (this.props.onDismiss && this.state.open) this.props.onDismiss();
    this.setState({
      open: false,
    });
  },

  _handleOKTouchTap() {
    this.dismiss();
    if (this.props.onAccept) {
      this.props.onAccept(this.refs.clock.getSelectedTime());
    }
  },

  _handleWindowKeyUp(event) {
    if (this.state.open) {
      switch (event.keyCode) {
        case KeyCode.ENTER:
          this._handleOKTouchTap();
          break;
      }
    }
  },

});

TimePickerDialog = muiThemeable(TimePickerDialog);

export default TimePickerDialog;
