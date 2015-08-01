let React = require('react/addons');
let StylePropable = require('../mixins/style-propable');
let MenuItem = require('../lists/list-item');

let SideNavHeader = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    desktop: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    innerDivStyle: React.PropTypes.object,
    insetChildren: React.PropTypes.bool,
    focusState: React.PropTypes.oneOf([
      'none',
      'focused',
      'keyboard-focused',
    ]),
  },

  getDefaultProps() {
    return {
      disabled: true,
      focusState: 'none',
    };
  },

  render() {
    let {
      disabled,
      innerDivStyle,
      desktop,
      style,
      ...other,
    } = this.props;

    let mergedStyles = this.mergeAndPrefix({
      color: this.context.muiTheme.palette.textColor,
      backgroundColor: this.context.muiTheme.palette.primary1Color,
      fontSize: desktop ? 18 : 20,
    }, style);

    let mergedInnerDivStyles = this.mergeAndPrefix({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }, innerDivStyle);

    return (
      <MenuItem {...other} disabled={disabled}
         style={mergedStyles} innerDivStyle={mergedInnerDivStyles}>
        {this.props.children}
      </MenuItem>
    );
  },
});

module.exports = SideNavHeader;
