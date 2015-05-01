var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Typography = require('./styles/typography');
var IconButton = require('./icon-button');
var NavigationMenu = require('./svg-icons/navigation-menu');
var Paper = require('./paper');

var AppBar = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    onLeftIconButtonTouchTap: React.PropTypes.func,
    onRightIconButtonTouchTap: React.PropTypes.func,
    showMenuIconButton: React.PropTypes.bool,
    iconClassNameLeft: React.PropTypes.string,
    iconClassNameRight: React.PropTypes.string,
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
    if (process.env.NODE_ENV !== 'production' && 
       (this.props.iconElementLeft && this.props.iconClassNameLeft)) {
        var warning = 'Properties iconClassNameLeft and iconElementLeft cannot be simultaneously ' +
                      'defined. Please use one or the other.';
        console.warn(warning);
    }
  },

  getSpacing: function() {
    return this.context.muiTheme.spacing;
  },

  getThemeVariables: function() {
    return this.context.muiTheme.component.appBar;
  },

  getStyles: function(){
    var iconButtonSize = this.context.muiTheme.component.button.iconButtonSize;
    var styles = {
      root: {
        zIndex: 5,
        width: '100%',
        minHeight: this.getSpacing().desktopKeylineIncrement,
        backgroundColor: this.getThemeVariables().color
      },
      title: {
        float: 'left',
        margin: 0,
        paddingTop: 0,
        letterSpacing: 0,
        fontSize: '24px',
        fontWeight: Typography.fontWeightNormal,
        color: this.getThemeVariables().textColor,
        lineHeight: this.getSpacing().desktopKeylineIncrement + 'px'
      },
      iconButton: {
        style: {
          marginTop: (this.getThemeVariables().height - iconButtonSize) / 2,
          float: 'left',
          marginRight: 8,
          marginLeft: -16
        },
        iconStyle: {
          fill: this.getThemeVariables().textColor,
          color: this.getThemeVariables().textColor
        }
      },
      paper: {
        paddingLeft: this.getSpacing().desktopGutter,
        paddingRight: this.getSpacing().desktopGutter
      }
    };
    return styles;
  },

  render: function() {
    var {
      onTouchTap,
      ...other
    } = this.props;
    var styles = this.getStyles();

    var title, menuElementLeft, menuElementRight;
    var iconRightStyle = this.mergeAndPrefix(styles.iconButton.style, {
      float: 'right',
      marginRight: -16,
      marginLeft: 8
    });

    if (this.props.title) {
      // If the title is a string, wrap in an h1 tag.
      // If not, just use it as a node.
      title = Object.prototype.toString.call(this.props.title) === '[object String]' ?
        <h1 style={this.mergeAndPrefix(styles.title)}>{this.props.title}</h1> :
        this.props.title;
    }

    if (this.props.showMenuIconButton) {
      if (this.props.iconElementLeft) {
        menuElementLeft = (
          <div style={styles.iconButton.style}> 
            {this.props.iconElementLeft} 
          </div>
        );
      } else {
        var child = (this.props.iconClassNameLeft) ? '' : <NavigationMenu style={this.mergeAndPrefix(styles.iconButton.iconStyle)}/>;
        menuElementLeft = (
          <IconButton
            style={this.mergeAndPrefix(styles.iconButton.style)}
            iconStyle={this.mergeAndPrefix(styles.iconButton.iconStyle)}
            iconClassName={this.props.iconClassNameLeft}
            onTouchTap={this._onLeftIconButtonTouchTap}>
              {child}
          </IconButton>
        );
      }

      if (this.props.iconElementRight) {
        menuElementRight = (
          <div style={iconRightStyle}> 
            {this.props.iconElementRight} 
          </div>
        );
      } else if (this.props.iconClassNameRight) {
        menuElementRight = (
          <IconButton
            style={iconRightStyle}
            iconStyle={this.mergeAndPrefix(styles.iconButton.iconStyle)}
            iconClassName={this.props.iconClassNameRight}
            onTouchTap={this._onRightIconButtonTouchTap}>
          </IconButton>
        );
      }
    }

    return (
      <Paper 
        rounded={false} 
        className={this.props.className}  
        style={this.mergeAndPrefix(styles.root, this.props.style)} 
        innerStyle={this.mergeAndPrefix(styles.paper)} 
        zDepth={this.props.zDepth}>
          {menuElementLeft}
          {title}
          {menuElementRight}
      </Paper>
    );
  },

  _onLeftIconButtonTouchTap: function(e) {
    if (this.props.onLeftIconButtonTouchTap) this.props.onLeftIconButtonTouchTap(e);
  },

  _onRightIconButtonTouchTap: function(e) {
    if (this.props.onRightIconButtonTouchTap) this.props.onRightIconButtonTouchTap(e);
  }

});

module.exports = AppBar;
