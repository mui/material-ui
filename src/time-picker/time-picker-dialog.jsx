const React = require('react');
const StylePropable = require('../mixins/style-propable');
const WindowListenable = require('../mixins/window-listenable');
const KeyCode = require('../utils/key-code');
const Clock = require('./clock');
const Dialog = require('../dialog');
const FlatButton = require('../flat-button');
const DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');
const ThemeManager = require('../styles/theme-manager');

const TimePickerDialog = React.createClass({

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

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext () {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  getInitialState () {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps (nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  windowListeners: {
    keyup: '_handleWindowKeyUp',
  },


  getTheme() {
    return this.state.muiTheme.timePicker;
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
        onTouchTap={this._handleCancelTouchTap} />,
      <FlatButton
        key={1}
        label="OK"
        secondary={true}
        onTouchTap={this._handleOKTouchTap} />,
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

  _handleCancelTouchTap() {
    this.dismiss();
  },

  _handleOKTouchTap() {
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
          this._handleOKTouchTap();
          break;
      }
    }
  },

});

module.exports = TimePickerDialog;
