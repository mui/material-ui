const React = require('react');
const StylePropable = require('../mixins/style-propable');
const WindowListenable = require('../mixins/window-listenable');
const KeyCode = require('../utils/key-code');
const Clock = require('./clock');
const Dialog = require('../dialog');
const FlatButton = require('../flat-button');
const DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');
const ThemeManager = require('../styles/theme-manager');
const ContextPure = require('../mixins/context-pure');


const TimePickerDialog = React.createClass({

  mixins: [
    StylePropable, 
    WindowListenable, 
    ContextPure,
  ],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    autoOk: React.PropTypes.bool,
    initialTime: React.PropTypes.object,
    onAccept: React.PropTypes.func,
    onShow: React.PropTypes.func,
    onDismiss: React.PropTypes.func,
    onRequestClose: React.PropTypes.func,
    open: React.PropTypes.bool,
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

  getDefaultProps() {
    return {
      onRequestClose: () => {},
      onShow: () => {},
      onDismiss: () => {},
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
    
    const onClockChangeMinutes = (autoOk === true ? this._handleOKTouchTap : undefined);
    return (
      <Dialog {...other}
        style={this.mergeAndPrefix(styles.root)}
        bodyStyle={this.mergeAndPrefix(styles.body)}
        actions={actions}
        contentStyle={styles.dialogContent}
        open={this.props.open}
        onDismiss={this._handleDialogDismiss}
        onShow={this.props.onShow}
        repositionOnUpdate={false}>
        <Clock
          ref="clock"
          format={format}
          initialTime={initialTime}
          onChangeMinutes={onClockChangeMinutes} />
      </Dialog>
    );
  },

  _handleCancelTouchTap() {
    this.props.onRequestClose();
  },

  _handleOKTouchTap() {
    this.props.onRequestClose();
    if (this.props.onAccept) {
      this.props.onAccept(this.refs.clock.getSelectedTime());
    }
  },

  _handleDialogDismiss() {
    this.setState({open:false});  
    this.props.onRequestClose();
    this.props.onDismiss();
  },

  _handleWindowKeyUp(e) {
    if (this.props.open) {
      switch (e.keyCode) {
        case KeyCode.ENTER:
          this._handleOKTouchTap();
          break;
      }
    }
  },

});

module.exports = TimePickerDialog;
