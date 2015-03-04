var React = require('react');
var Classable = require('./mixins/classable');
var CustomVariables = require('./styles/variables/custom-variables');
var IconButton = require('./icon-button');
var NavigationMenu = require('./svg-icons/navigation-menu');
var Paper = require('./paper');

var AppBar = React.createClass({

  mixins: [Classable],

  propTypes: {
    onMenuIconButtonTouchTap: React.PropTypes.func,
    showMenuIconButton: React.PropTypes.bool,
    title : React.PropTypes.string,
    zDepth: React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      showMenuIconButton: true,
      title: '',
      zDepth: 1
    }
  },

  /** Styles */

  _iconButton: function() {
    return {
      style: {
        marginTop: (CustomVariables.appBarHeight - CustomVariables.iconButtonSize) / 2,
        float: 'left',
        marginRight: 8,
        marginLeft: -16,
      },
      iconStyle: {
        fill: CustomVariables.appBarTextColor,
        color: CustomVariables.appBarTextColor,
      }
    }
  },

  render: function() {
    var {
      onTouchTap,
      ...other
    } = this.props;

    var classes = this.getClasses('mui-app-bar'),
      title, menuIconButton;

    if (this.props.title) {
      title = <h1 className="mui-app-bar-title">{this.props.title}</h1>;
    }

    if (this.props.showMenuIconButton) {
      menuIconButton = (
        <IconButton
          style={this._iconButton().style}
          onTouchTap={this._onMenuIconButtonTouchTap}>
            <NavigationMenu style={this._iconButton().iconStyle}/>
        </IconButton>
      );
    }

    return (
      <Paper rounded={false} className={classes} zDepth={this.props.zDepth}>
        {menuIconButton}
        {title}
        {this.props.children}
      </Paper>
    );
  },

  _onMenuIconButtonTouchTap: function(e) {
    if (this.props.onMenuIconButtonTouchTap) this.props.onMenuIconButtonTouchTap(e);
  }

});

module.exports = AppBar;
