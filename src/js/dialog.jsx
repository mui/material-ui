var React = require('react');
var StylePropable = require('./mixins/style-propable');
var CustomVariables = require('./styles/variables/custom-variables');
var DialogWindow = require('./dialog-window');

var Dialog = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    title: React.PropTypes.string
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
      title,
      ...other
    } = this.props;

    return (
      <DialogWindow
        {...other}
        ref="dialogWindow"
        style={this.props.style}>

        <h3 style={this.title()}>{this.props.title}</h3>
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
