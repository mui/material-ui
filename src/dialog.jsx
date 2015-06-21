let React = require('react');
let StylePropable = require('./mixins/style-propable');
let DialogWindow = require('./dialog-window');


let Dialog = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    title: React.PropTypes.node,
    contentInnerStyle: React.PropTypes.object
  },

  getStyles: function() {
    let spacing = this.context.muiTheme.spacing;
    let gutter = spacing.desktopGutter + 'px ';
    let styles = {
      title: {
        margin: 0,
        padding: gutter + gutter + '0 ' + gutter,
        color: this.context.muiTheme.palette.textColor,
        fontSize: '24px',
        lineHeight: '32px',
        fontWeight: '400'
      },
      content: {
        padding: spacing.desktopGutter
      }
    };
    return styles;
  },

  render: function() {
    let {
      className,
      contentInnerStyle,
      ...other
    } = this.props;

    let styles = this.getStyles();

    let title;
    if (this.props.title) {
      // If the title is a string, wrap in an h3 tag.
      // If not, just use it as a node.
      title = Object.prototype.toString.call(this.props.title) === '[object String]' ?
        <h3 style={styles.title}>{this.props.title}</h3> :
        this.props.title;
    }

    return (
      <DialogWindow
        {...other}
        ref="dialogWindow"
        className={className}
        style={this.props.style}>

        {title}

        <div ref="dialogContent" style={this.mergeAndPrefix(styles.content, contentInnerStyle)}>
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
