var React = require('react');
var Classable = require('./mixins/classable');
var IconButton = require('./icon-button');
var NavigationMenu = require('./svg-icons/navigation-menu');
var Paper = require('./paper');

var AppBar = React.createClass({

  mixins: [Classable],

  propTypes: {
    onMenuIconButtonTouchTap: React.PropTypes.func,
    showMenuIconButton: React.PropTypes.bool,
    iconClassNameLeft: React.PropTypes.string,
    iconElementLeft: React.PropTypes.element,
    iconElementRight: React.PropTypes.element,
    title : React.PropTypes.node,
    zDepth: React.PropTypes.number,
  },

  getDefaultProps: function() {
    return {
      showMenuIconButton: true,
      title: '',
      zDepth: 1
    }
  },

  componentDidMount: function() {
    if (process.NODE_ENV !== 'production' && 
       (this.props.iconElementLeft && this.props.iconClassNameLeft)) {
        var warning = 'Properties iconClassNameLeft and iconElementLeft cannot be simultaneously ' +
                      'defined. Please use one or the other.';
        console.warn(warning);
    }
  },

  render: function() {
    var {
      onTouchTap,
      ...other
    } = this.props;

    var classes = this.getClasses('mui-app-bar'),
      title, menuElementLeft, menuElementRight;

    if (this.props.title) {
      // If the title is a string, wrap in an h1 tag.
      // If not, just use it as a node.
      title = toString.call(this.props.title) === '[object String]' ?
        <h1 className="mui-app-bar-title">{this.props.title}</h1> :
        this.props.title;
    }

    if (this.props.showMenuIconButton) {
      if (this.props.iconElementLeft) {
        menuElementLeft = (
          <div className="mui-app-bar-navigation-icon-button"> 
            {this.props.iconElementLeft} 
          </div>
        );
      } else {
        var child = (this.props.iconClassNameLeft) ? '' : <NavigationMenu/>;
        menuElementLeft = (
          <IconButton
            className="mui-app-bar-navigation-icon-button" 
            iconClassName={this.props.iconClassNameLeft}
            onTouchTap={this._onMenuIconButtonTouchTap}>
              {child}
          </IconButton>
        );
      }
    }

    menuElementRight = (this.props.children) ? this.props.children : 
                       (this.props.iconElementRight) ? this.props.iconElementRight : '';

    return (
      <Paper rounded={false} className={classes} zDepth={this.props.zDepth}>
        {menuElementLeft}
        {title}
        {menuElementRight}
      </Paper>
    );
  },

  _onMenuIconButtonTouchTap: function(e) {
    if (this.props.onMenuIconButtonTouchTap) this.props.onMenuIconButtonTouchTap(e);
  }

});

module.exports = AppBar;
