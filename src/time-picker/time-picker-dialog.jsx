let React = require('react');
let StylePropable = require('../mixins/style-propable');
let WindowListenable = require('../mixins/window-listenable');
let KeyCode = require('../utils/key-code');
let Clock = require('./clock');
let Dialog = require('../dialog');
let FlatButton = require('../flat-button');


let TimePickerDialog = React.createClass({

  mixins: [StylePropable, WindowListenable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    initialTime: React.PropTypes.object,
    onAccept: React.PropTypes.func,
    onShow: React.PropTypes.func,
    onDismiss: React.PropTypes.func,
  },

  windowListeners: {
    keyup: '_handleWindowKeyUp',
  },


  getTheme() {
    return this.context.muiTheme.component.timePicker;
  },

  render() {
    let {
      initialTime,
      onAccept,
      format,
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
        padding:0,
      },
    };

    let actions = [
      <FlatButton
        key={0}
        label="Cancel"
        secondary={true}
        onClick={this._handleCancelClick} />,
      <FlatButton
        key={1}
        label="OK"
        secondary={true}
        onClick={this._handleOKClick} />,
    ];

    return (
      <Dialog {...other}
        ref="dialogWindow"
        style={this.mergeAndPrefix(styles.root)}
        bodyStyle={this.mergeAndPrefix(styles.body)}
        actions={actions}
        contentStyle={styles.dialogContent}
        onDismiss={this._handleDialogDismiss}
        onShow={this._handleDialogShow}
        repositionOnUpdate={false}>
        <Clock
          ref="clock"
          format={format}
          initialTime={initialTime} />
      </Dialog>
    );
  },

  show() {
    this.refs.dialogWindow.show();
  },

  dismiss() {
    this.refs.dialogWindow.dismiss();
  },

  _handleCancelClick() {
    this.dismiss();
  },

  _handleOKClick() {
    this.dismiss();
    if (this.props.onAccept) {
      this.props.onAccept(this.refs.clock.getSelectedTime());
    }
  },

  _handleDialogShow() {
    if (this.props.onShow) {
      this.props.onShow();
    }
  },

  _handleDialogDismiss() {
    if (this.props.onDismiss) {
      this.props.onDismiss();
    }
  },

  _handleWindowKeyUp(e) {
    if (this.refs.dialogWindow.isOpen()) {
      switch (e.keyCode) {
        case KeyCode.ENTER:
          this._handleOKClick();
          break;
      }
    }
  },

});

module.exports = TimePickerDialog;
