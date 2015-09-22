let React = require('react/addons');
let StylePropable = require('../mixins/style-propable');
let MenuItem = require('../lists/list-item');

let SideNavSubheader = React.createClass({

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
        subheaderItemBackgroundColor: '#FFFFFF',
        subheaderItemTextColor: '#000000',
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
      ...other,
    } = this.props;

    let mergedStyles = this.mergeAndPrefix({
      color: this.getTheme().subheaderItemTextColor,
      backgroundColor: this.getTheme().subheaderItemBackgroundColor,
      fontSize: '13px',
      fontWeight: 'bold',
    }, style);

    let mergedInnerDivStyles = this.mergeAndPrefix({
      display: 'flex',
      alignItems: 'center',
    }, mergedStyles, innerDivStyle);

    return (
      <MenuItem {...other} disabled={disabled} style={mergedStyles} innerDivStyle={mergedInnerDivStyles}>
        {this.props.children}
      </MenuItem>
    );
  },
});

module.exports = SideNavSubheader;
