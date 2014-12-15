var React = require('react'),
  Classable = require('./mixins/classable'),
  DialogWindow = require('./dialog-window.jsx'),
  FlatButton = require('./flat-button.jsx');

var Dialog = React.createClass({

  mixins: [Classable],

  propTypes: {
    title: React.PropTypes.string,
    actions: React.PropTypes.array
  },

  getDefaultProps: function() {
    return {
      actions: []
    };
  },

  render: function() {
    var 
      {
        className,
        title,
        actions,
        ...other
      } = this.props,
      classes = this.getClasses('mui-dialog'),
      actions = this._getDialogActions();

    return (
      <DialogWindow {...other} ref="dialogWindow" className={classes}>
        <h3 className="mui-dialog-title">{this.props.title}</h3>
        <div ref="dialogContent" className="mui-dialog-content">
          {this.props.children}
        </div>
        <div className="mui-dialog-actions">
          <div className="mui-dialog-actions-right">{actions}</div>
        </div>
      </DialogWindow>
    );
  },

  dismiss: function() {
    this.refs.dialogWindow.dismiss();
  },

  show: function() {
    this.refs.dialogWindow.show();
  },

  _getDialogActions: function() {
    return this.props.actions.map(function(a, index) {

      var onClickHandler = a.onClick ? a.onClick : this.dismiss;
      return (
        <FlatButton
          className="mui-dialog-action"
          key={index}
          primary={true}
          onClick={onClickHandler}
          label={a.text} />
      );

    }.bind(this));
  }

});

module.exports = Dialog;