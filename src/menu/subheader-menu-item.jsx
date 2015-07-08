let React = require('react');
let StylePropable = require('../mixins/style-propable');
let Typography = require('../styles/typography');


let SubheaderMenuItem = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
      index: React.PropTypes.number.isRequired,
      text: React.PropTypes.string.isRequired,
      firstChild: React.PropTypes.bool,
      className: React.PropTypes.string,
  },

  getTheme() {
    return this.context.muiTheme.component.menuSubheader;
  },

  getSpacing() {
    return this.context.muiTheme.spacing;
  },

  getStyles() {
    let gutterMini = this.getSpacing().desktopGutterMini;
    let subheaderHeight = this.getSpacing().desktopSubheaderHeight;
    let styles = {
      root: {
        boxSizing: 'border-box',
        fontSize: '13px',
        letterSpacing: 0,
        fontWeight: Typography.fontWeightMedium,
        margin: 0,
        height: subheaderHeight + gutterMini,
        lineHeight: subheaderHeight + 'px',
        color: this.getTheme().textColor,
        borderTop: 'solid 1px ' + this.getTheme().borderColor,
        paddingTop: gutterMini,
        marginTop: gutterMini,
      },
      rootWhenFirstChild: {
        height: subheaderHeight,
        borderTop: 'none',
        paddingTop: 0,
        marginTop: 0,
      },
    };

    return styles;
  },

  render() {
    return (
        <div
          key={this.props.index}
          className={this.props.className}
          style={this.mergeAndPrefix(
            this.getStyles().root,
            this.props.firstChild && this.getStyles().rootWhenFirstChild,
            this.props.style
          )}>
            {this.props.text}
        </div>
    );
  },

});

module.exports = SubheaderMenuItem;
