let React = require('react/addons');
let StylePropable = require('../mixins/style-propable');
let MenuItem = require('../lists/list-item');

let SideNavHeader = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    disabled: React.PropTypes.bool,
    lineHeight: React.PropTypes.string,
    innerDivStyle: React.PropTypes.object,
    insetChildren: React.PropTypes.bool,
  },

  getTheme() {
    if(this.context.muiTheme.component.sideNav)
      return this.context.muiTheme.component.sideNav;
    else
      return {
        headerItemBackgroundColor: '#2196f3',
        headerItemTextColor: Colors.black,
      };
  },

  getDefaultProps() {
    return {
      disabled: true,
    };
  },

  render() {
    let {
      disabled,
      innerDivStyle,
      style,
      lineHeight,
      ...other,
    } = this.props;

    let mergedStyles = this.mergeAndPrefix({
      color: this.getTheme().headerItemTextColor,
      backgroundColor: this.getTheme().headerItemBackgroundColor,
      fontSize: 20,
      lineHeight: lineHeight? lineHeight : '32px',
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
