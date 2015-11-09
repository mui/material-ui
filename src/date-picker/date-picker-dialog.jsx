const React = require('react');
const ReactDOM = require('react-dom');
const ContextPure = require('../mixins/context-pure');
const StylePropable = require('../mixins/style-propable');
const WindowListenable = require('../mixins/window-listenable');
const CssEvent = require('../utils/css-event');
const KeyCode = require('../utils/key-code');
const Calendar = require('./calendar');
const Dialog = require('../dialog');
const FlatButton = require('../flat-button');
const DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');
const ThemeManager = require('../styles/theme-manager');
const DateTime = require('../utils/date-time');

const DatePickerDialog = React.createClass({

  mixins: [
    StylePropable,
    WindowListenable,
    ContextPure,
  ],

  statics: {
    getRelevantContextKeys(muiTheme) {
      return {
        buttonColor: muiTheme.datePicker.calendarTextColor,
      };
    },
    getChildrenClasses() {
      return [
        Calendar,
        Dialog,
      ];
    },
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    DateTimeFormat: React.PropTypes.func,
    locale: React.PropTypes.string,
    wordings: React.PropTypes.object,
    disableYearSelection: React.PropTypes.bool,
    initialDate: React.PropTypes.object,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    onAccept: React.PropTypes.func,
    onClickAway: React.PropTypes.func,
    onDismiss: React.PropTypes.func,
    onShow: React.PropTypes.func,
    style: React.PropTypes.object,
    shouldDisableDate: React.PropTypes.func,
    showYearSelector: React.PropTypes.bool,
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

  getDefaultProps: function() {
    return {
      DateTimeFormat: DateTime.DateTimeFormat,
      locale: 'en-US',
      wordings: {
        ok: 'OK',
        cancel: 'Cancel',
      },
    };
  },

  windowListeners: {
    keyup: '_handleWindowKeyUp',
  },

  getInitialState() {
    return {
      open: false,
      isCalendarActive: false,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps (nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  render() {
    let {
      DateTimeFormat,
      locale,
      wordings,
      initialDate,
      onAccept,
      style,
      ...other,
    } = this.props;

    const {
      calendarTextColor,
    } = this.constructor.getRelevantContextKeys(this.state.muiTheme);

    let styles = {
      root: {
        fontSize: 14,
        color: calendarTextColor,
      },

      dialogContent: {
        width: this.props.mode === 'landscape' ? 480 : 320,
      },

      dialogBodyContent: {
        padding: 0,
      },

      actions: {
        marginRight: 8,
      },
    };

    let actions = [
      <FlatButton
        key={0}
        label={wordings.cancel}
        secondary={true}
        style={styles.actions}
        onTouchTap={this._handleCancelTouchTap} />,
    ];

    if (!this.props.autoOk) {
      actions.push(
        <FlatButton
          key={1}
          label={wordings.ok}
          secondary={true}
          disabled={this.refs.calendar !== undefined && this.refs.calendar.isSelectedDateDisabled()}
          style={styles.actions}
          onTouchTap={this._handleOKTouchTap} />
      );
    }

    return (
      <Dialog {...other}
        ref="dialog"
        style={styles.root}
        contentStyle={styles.dialogContent}
        bodyStyle={styles.dialogBodyContent}
        actions={actions}
        onDismiss={this._handleDialogDismiss}
        onShow={this._handleDialogShow}
        onClickAway={this._handleDialogClickAway}
        repositionOnUpdate={false}
        open={this.state.open}
        onRequestClose={this.dismiss}>
        <Calendar
          DateTimeFormat={DateTimeFormat}
          locale={locale}
          ref="calendar"
          onDayTouchTap={this._onDayTouchTap}
          initialDate={this.props.initialDate}
          isActive={this.state.isCalendarActive}
          minDate={this.props.minDate}
          maxDate={this.props.maxDate}
          shouldDisableDate={this.props.shouldDisableDate}
          showYearSelector={this.props.showYearSelector}
          mode={this.props.mode} />
      </Dialog>
    );
  },

  show() {
    this.setState({
      open: true,
    });
  },

  dismiss() {
    this.setState({
      open: false,
    });
  },

  _onDayTouchTap() {
    if (this.props.autoOk) {
      setTimeout(this._handleOKTouchTap, 300);
    }
  },

  _handleCancelTouchTap() {
    this.dismiss();
  },

  _handleOKTouchTap() {
    if (this.props.onAccept && !this.refs.calendar.isSelectedDateDisabled()) {
      this.props.onAccept(this.refs.calendar.getSelectedDate());
    }

    this.dismiss();
  },

  _handleDialogShow() {
    this.setState({
      isCalendarActive: true,
    });

    if (this.props.onShow) this.props.onShow();
  },

  _handleDialogDismiss() {
    CssEvent.onTransitionEnd(ReactDOM.findDOMNode(this.refs.dialog), () => {
      this.setState({
        isCalendarActive: false,
      });
    });

    if (this.props.onDismiss) this.props.onDismiss();
  },

  _handleDialogClickAway() {
    CssEvent.onTransitionEnd(ReactDOM.findDOMNode(this.refs.dialog), () => {
      this.setState({
        isCalendarActive: false,
      });
    });

    if (this.props.onClickAway) this.props.onClickAway();
  },

  _handleWindowKeyUp(e) {
    if (this.state.isCalendarActive) {
      switch (e.keyCode) {
        case KeyCode.ENTER:
          this._handleOKTouchTap();
          break;
      }
    }
  },

});

module.exports = DatePickerDialog;
