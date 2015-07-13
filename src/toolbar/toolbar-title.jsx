let React = require('react');
let StylePropable = require('../mixins/style-propable');


let ToolbarTitle = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    text: React.PropTypes.string,
  },

  getTheme() {
    return this.context.muiTheme.component.toolbar;
  },

  render() {
    let {
      style,
      text,
      ...other,
    } = this.props;

    let styles = this.mergeAndPrefix({
      paddingRight: this.context.muiTheme.spacing.desktopGutterLess,
      lineHeight: this.getTheme().height + 'px',
      fontSize: this.getTheme().titleFontSize + 'px',
      display: 'inline-block',
      position: 'relative',
    }, style);

    return (
      <span style={styles} {...other} >{text}</span>
    );
  },

});

module.exports = ToolbarTitle;
