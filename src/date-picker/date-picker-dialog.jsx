let React = require('react');
let ReactDOM = require('react-dom');
let StylePropable = require('../mixins/style-propable');
let WindowListenable = require('../mixins/window-listenable');
let CssEvent = require('../utils/css-event');
let KeyCode = require('../utils/key-code');
let Calendar = require('./calendar');
let Dialog = require('../dialog');
let FlatButton = require('../flat-button');


let DatePickerDialog = React.createClass({

  mixins: [StylePropable, WindowListenable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    disableYearSelection: React.PropTypes.bool,
    initialDate: React.PropTypes.object,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    onAccept: React.PropTypes.func,
    onClickAway: React.PropTypes.func,
    onDismiss: React.PropTypes.func,
    onShow: React.PropTypes.func,
    shouldDisableDate: React.PropTypes.func,
    showYearSelector: React.PropTypes.bool,
  },

  windowListeners: {
    keyup: '_handleWindowKeyUp',
  },

  getInitialState() {
    return {
      isCalendarActive: false,
      showMonthDayPicker: true,
    };
  },

  render() {
    let {
      initialDate,
      onAccept,
      style,
      ...other,
    } = this.props;

    let styles = {
      root: {
        color: this.context.muiTheme.component.datePicker.calendarTextColor,
        fontSize: 14,
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
        label="Cancel"
        secondary={true}
        style={styles.actions}
        onClick={this._handleCancelClick} />,
    ];

    if (!this.props.autoOk) {
      actions.push(
        <FlatButton
          key={1}
          label="OK"
          secondary={true}
          disabled={this.refs.calendar !== undefined && this.refs.calendar.isSelectedDateDisabled()}
          style={styles.actions}
          onClick={this._handleOKClick} />
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
        repositionOnUpdate={false}>
        <Calendar
          ref="calendar"
          onDayClick={this._onDayClick}
          initialDate={this.props.initialDate}
          isActive={this.state.isCalendarActive}
          minDate={this.props.minDate}
          maxDate={this.props.maxDate}
          shouldDisableDate={this.props.shouldDisableDate}
          shouldShowMonthDayPickerFirst={this.state.showMonthDayPicker}
          showYearSelector={this.props.showYearSelector}
          mode={this.props.mode} />
      </Dialog>
    );
  },

  show() {
    this.refs.dialog.show();
  },

  dismiss() {
    this.refs.dialog.dismiss();
  },

  _onDayClick() {
    if (this.props.autoOk) {
      setTimeout(this._handleOKClick, 300);
    }
  },

  _handleCancelClick() {
    this.dismiss();
  },

  _handleOKClick() {
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
        showMonthDayPicker: true,
      });
    });

    if (this.props.onDismiss) this.props.onDismiss();
  },

  _handleDialogClickAway() {
    CssEvent.onTransitionEnd(ReactDOM.findDOMNode(this.refs.dialog), () => {
      this.setState({
        isCalendarActive: false,
        showMonthDayPicker: true,
      });
    });

    if (this.props.onClickAway) this.props.onClickAway();
  },

  _handleWindowKeyUp(e) {
    if (this.state.isCalendarActive) {
      switch (e.keyCode) {
        case KeyCode.ENTER:
          this._handleOKClick();
          break;
      }
    }
  },

});

module.exports = DatePickerDialog;
