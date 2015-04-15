var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Spacing = require('./styles/spacing');
var DialogWindow = require('./dialog-window');

var Dialog = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    title: React.PropTypes.node
  },

  /** Styles */
  _title: function() {
    var gutter = Spacing.desktopGutter + 'px ';
    return {
      padding: gutter + gutter + '0 ' + gutter,
      color: this.context.theme.palette.textColor
    }
  },
  _content: function() {
    return {
      padding: Spacing.desktopGutter,
    }
  },

  render: function() {
    var {
      className,
      ...other
    } = this.props;

    var title;
    if (this.props.title) {
      // If the title is a string, wrap in an h3 tag.
      // If not, just use it as a node.
      title = toString.call(this.props.title) === '[object String]' ?
        <h3 style={this._title()}>{this.props.title}</h3> :
        this.props.title;
    }

    return (
      <DialogWindow
        {...other}
        ref="dialogWindow"
        className={className}
        style={this.props.style}>

        {title}

        <div ref="dialogContent" style={this._content()}>
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
