var React = require('react');
var StylePropable = require('./mixins/style-propable');
var CustomVariables = require('./styles/variables/custom-variables');
var DialogWindow = require('./dialog-window');

var Dialog = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    title: React.PropTypes.node
  },

  /** Styles */
  title: function() {
    var gutter = CustomVariables.spacing.desktopGutter + 'px ';
    return {
      padding: gutter + gutter + '0 ' + gutter,
      marginBottom: 0,
    }
  },
  content: function() {
    return {
      padding: CustomVariables.spacing.desktopGutter
    }
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
        <h3 style={this.title()}>{this.props.title}</h3> :
        this.props.title;
    }

    return (
      <DialogWindow
        {...other}
        ref="dialogWindow"
        style={this.props.style}>

        {title}
        
        <div ref="dialogContent" style={this.content()}>
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
