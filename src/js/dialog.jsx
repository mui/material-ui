var React = require('react');
var Classable = require('./mixins/classable');
var DialogWindow = require('./dialog-window');

var Dialog = React.createClass({

  mixins: [Classable],

  propTypes: {
    title: React.PropTypes.node
  },

  render: function() {
    var {
      className,
      ...other
    } = this.props;
    var classes = this.getClasses('mui-dialog');
    var title;

    if (this.props.title) {
      // If the title is a string, wrap in an h3 tag.
      // If not, just use it as a node.
      title = toString.call(this.props.title) === '[object String]' ?
        <h3 className="mui-dialog-title">{this.props.title}</h3> :
        this.props.title;
    }

    return (
      <DialogWindow
        {...other}
        ref="dialogWindow"
        className={classes}>

        {title}
        <div ref="dialogContent" className="mui-dialog-content">
          {this.props.children}
        </div>

      </DialogWindow>
    );
  },

  dismiss: function() {
    this.refs.dialogWindow.dismiss();
  },

  show: function() {
    this.refs.dialogWindow.show();
  }

});

module.exports = Dialog;
