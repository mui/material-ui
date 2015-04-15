var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Typography = require('./styles/typography');
var IconButton = require('./icon-button');
var NavigationMenu = require('./svg-icons/navigation-menu');
var Paper = require('./paper');

var AppBar = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    onMenuIconButtonTouchTap: React.PropTypes.func,
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

  /** Styles */

  _main: function() {
    return this.mergeAndPrefix({
      zIndex: 5,
      width: '100%',
      minHeight: this.getSpacing().desktopKeylineIncrement,
      backgroundColor: this.getThemeVariables().color,
    });
  },

  _title: function() {
    return {      
      float: 'left',
      paddingTop: 0,
      letterSpacing: 0,
      fontSize: '24px',
      fontWeight: Typography.fontWeightNormal,
      color: this.getThemeVariables().textColor,
      lineHeight: this.getSpacing().desktopKeylineIncrement + 'px',
    };
  },

  _iconButton: function() {
    var iconButtonSize = this.context.theme.component.button.iconButtonSize;
    return {
      style: {
        marginTop: (this.getThemeVariables().height - iconButtonSize) / 2,
        float: 'left',
        marginRight: 8,
        marginLeft: -16,
      },
      iconStyle: {
        fill: this.getThemeVariables().textColor,
        color: this.getThemeVariables().textColor,
      }
    }
  },

  _paper: function() {
    return {
      paddingLeft: this.getSpacing().desktopGutter,
      paddingRight: this.getSpacing().desktopGutter,
    };
  },

  componentDidMount: function() {
    if (process.NODE_ENV !== 'production' && 
       (this.props.iconElementLeft && this.props.iconClassNameLeft)) {
        var warning = 'Properties iconClassNameLeft and iconElementLeft cannot be simultaneously ' +
                      'defined. Please use one or the other.';
        console.warn(warning);
    }
  },

  getSpacing: function() {
    return this.context.theme.spacing;
  },

  getThemeVariables: function() {
    return this.context.theme.component.appBar;
  },

  render: function() {
    var {
      onTouchTap,
      ...other
    } = this.props;

    var title, menuElementLeft, menuElementRight;
    var iconRightStyle = this.mergeAndPrefix(this._iconButton().style, {
      float: 'right',
      marginRight: -16,
      marginLeft: 8,
    });



    if (this.props.title) {
      // If the title is a string, wrap in an h1 tag.
      // If not, just use it as a node.
      title = toString.call(this.props.title) === '[object String]' ?
        <h1 style={this._title()}>{this.props.title}</h1> :
        this.props.title;
    }

    if (this.props.showMenuIconButton) {
      if (this.props.iconElementLeft) {
        menuElementLeft = (
          <div style={this._iconButton().style}> 
            {this.props.iconElementLeft} 
          </div>
        );
      } else {
        var child = (this.props.iconClassNameLeft) ? '' : <NavigationMenu style={this._iconButton().iconStyle}/>;
        menuElementLeft = (
          <IconButton
            style={this._iconButton().style}
            iconStyle={this._iconButton().iconStyle}
            iconClassName={this.props.iconClassNameLeft}
            onTouchTap={this._onMenuIconButtonTouchTap}>
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
            iconStyle={this._iconButton().iconStyle}
            iconClassName={this.props.iconClassNameRight}
            onTouchTap={this._onMenuIconButtonTouchTap}>
          </IconButton>
        );
      }
    }

    return (
      <Paper rounded={false} className={this.props.className}  style={this._main()} innerStyle={this._paper()} zDepth={this.props.zDepth}>
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
