const React = require('react');
const ReactDOM = require('react-dom');
const ContextPure = require('../mixins/context-pure');
const StylePropable = require('../mixins/style-propable');
const WindowListenable = require('../mixins/window-listenable');
const CssEvent = require('../utils/css-event');
const KeyCode = require('../utils/key-code');
const Calendar = require('./calendar');
const Dialog = require('../dialog');
const DatePickerInline = require('./date-picker-inline');
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
    container: React.PropTypes.oneOf(['dialog', 'inline']),
    DateTimeFormat: React.PropTypes.func,
    locale: React.PropTypes.string,
    wordings: React.PropTypes.object,
    disableYearSelection: React.PropTypes.bool,
    initialDate: React.PropTypes.object,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    onAccept: React.PropTypes.func,
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
      container: 'dialog',
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
      container,
      onDismiss,
      onShow,
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
    // will change later when Popover is available.
    const Container = (container === 'inline' ? DatePickerInline : Dialog);
    return (
      <Container
        {...other}
        ref="dialog"
        style={styles.root}
        contentStyle={styles.dialogContent}
        bodyStyle={styles.dialogBodyContent}
        actions={actions}
        onDismiss={typeof onDismiss === 'function' && onDismiss}
        onShow={typeof onShow === 'function' && onShow}
        repositionOnUpdate={false}
        open={this.state.open}
        onRequestClose={this.dismiss}>
        <Calendar
          DateTimeFormat={DateTimeFormat}
          locale={locale}
          ref="calendar"
          onDayTouchTap={this._onDayTouchTap}
          initialDate={this.props.initialDate}
          open={this.state.open}
          minDate={this.props.minDate}
          maxDate={this.props.maxDate}
          shouldDisableDate={this.props.shouldDisableDate}
          showYearSelector={this.props.showYearSelector}
          mode={this.props.mode} />
      </Container>
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

  _handleWindowKeyUp(e) {
    if (this.state.open) {
      switch (e.keyCode) {
        case KeyCode.ENTER:
          this._handleOKTouchTap();
          break;
      }
    }
  },

});

module.exports = DatePickerDialog;
