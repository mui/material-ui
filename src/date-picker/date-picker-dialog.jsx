var React = require('react');
var StylePropable = require('../mixins/style-propable');
var WindowListenable = require('../mixins/window-listenable');
var KeyCode = require('../utils/key-code');
var CustomVariables = require('../styles/variables/custom-variables.js');
var Calendar = require('./calendar');
var Dialog = require('../dialog');
var FlatButton = require('../flat-button');

var DatePickerDialog = React.createClass({

  mixins: [StylePropable, WindowListenable],

  propTypes: {
    initialDate: React.PropTypes.object,
    onAccept: React.PropTypes.func,
    onShow: React.PropTypes.func,
    onDismiss: React.PropTypes.func,
  },

  windowListeners: {
    'keyup': '_handleWindowKeyUp'
  },

  getInitialState: function() {
    return {
      isCalendarActive: false
    };
  },

  render: function() {
    var {
      initialDate,
      onAccept,
      style,
      ...other
    } = this.props;

    var styles = {
      root: {
        fontSize: '14px',
        color: CustomVariables.datePickerCalendarTextColor
      },
      
      dialogContents: {
        width: this.props.mode === 'landscape' ? '560px' : '280px'
      },
      
      dialogBodyContent: {
        padding: 0
      },

      actions: {
        marginRight: 8,
      }
    };

    var actions = [
      <FlatButton
        key={0}
        label="Cancel"
        secondary={true}
        style={styles.actions}
        onTouchTap={this._handleCancelTouchTap} />,
      <FlatButton
        key={1}
        label="OK"
        secondary={true}
        style={styles.actions}
        onTouchTap={this._handleOKTouchTap} />
    ];

    return (
      <Dialog {...other}
        ref="dialog"
        style={styles.root}
        contentStyle={styles.dialogContents}
        bodyStyle={styles.dialogBodyContent}
        actions={actions}
        onDismiss={this._handleDialogDismiss}
        onShow={this._handleDialogShow}
        repositionOnUpdate={false}>
        <Calendar
          ref="calendar"
          initialDate={this.props.initialDate}
          isActive={this.state.isCalendarActive}
          mode={this.props.mode} />
      </Dialog>
    );
  },

  show: function() {
    this.refs.dialog.show();
  },

  dismiss: function() {
    this.refs.dialog.dismiss();
  },

  _handleCancelTouchTap: function() {
    this.dismiss();
  },

  _handleOKTouchTap: function() {
    this.dismiss();
    if (this.props.onAccept) {
      this.props.onAccept(this.refs.calendar.getSelectedDate());
    }
  },

  _handleDialogShow: function() {
    this.setState({
      isCalendarActive: true
    });

    if(this.props.onShow) {
      this.props.onShow();
    }
  },

  _handleDialogDismiss: function() {
    this.setState({
      isCalendarActive: false
    });

    if(this.props.onDismiss) {
      this.props.onDismiss();
    }
  },

  _handleWindowKeyUp: function(e) {
    if (this.refs.dialog.isOpen()) {
      switch (e.keyCode) {
        case KeyCode.ENTER:
          this._handleOKTouchTap();
          break;
      }
    } 
  }

});

module.exports = DatePickerDialog;