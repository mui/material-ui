const React = require('react');
const Styles = require('../styles');
const StylePropable = require('../mixins/style-propable');
const ThemeManager = require('../styles/theme-manager');
const DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');


const CardMedia = React.createClass({

  mixins:[StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext () {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  getInitialState() {
    return { 
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps (nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  propTypes: {
    overlay: React.PropTypes.node,
    style: React.PropTypes.object,
    overlayStyle: React.PropTypes.object,
    overlayContainerStyle: React.PropTypes.object,
    overlayContentStyle: React.PropTypes.object,
    mediaStyle: React.PropTypes.object,
    expandable: React.PropTypes.bool,
    actAsExpander: React.PropTypes.bool,
  },

  getStyles() {
    return {
      root: {
        position: 'relative',
      },
      overlayContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
      },
      overlay: {
        height: '100%',
        position: 'relative',
      },
      overlayContent: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        paddingTop: 8,
        background: Styles.Colors.lightBlack,
      },
      media: {},
      mediaChild: {
        verticalAlign: 'top',
        maxWidth: '100%',
        minWidth: '100%',
        width:'100%',
      },
    };
  },

  render() {
    let styles = this.getStyles();
    let rootStyle = this.prepareStyles(styles.root, this.props.style);
    let mediaStyle = this.prepareStyles(styles.media, this.props.mediaStyle);
    let overlayContainerStyle = this.prepareStyles(styles.overlayContainer, this.props.overlayContainerStyle);
    let overlayContentStyle = this.prepareStyles(styles.overlayContent, this.props.overlayContentStyle);
    let overlayStyle = this.prepareStyles(styles.overlay, this.props.overlayStyle);

    let children = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {style: this.prepareStyles(styles.mediaChild, child.props.style)});
    });

    let overlayChildren = React.Children.map(this.props.overlay, (child) => {
      if (child.type.displayName === 'CardHeader' || child.type.displayName === 'CardTitle') {
        return React.cloneElement(child, {
          titleColor: Styles.Colors.darkWhite,
          subtitleColor: Styles.Colors.lightWhite,
        });
      }
      else if (child.type.displayName === 'CardText') {
        return React.cloneElement(child, {
          color: Styles.Colors.darkWhite,
        });
      }
      else {
        return child;
      }
    });

    return (
      <div {...this.props} style={rootStyle}>
        <div style={mediaStyle}>
          {children}
        </div>
        {(this.props.overlay) ?
          <div style={overlayContainerStyle}>
            <div style={overlayStyle}>
              <div style={overlayContentStyle}>
                {overlayChildren}
              </div>
            </div>
          </div> : ''}
      </div>
    );
  },
});

module.exports = CardMedia;
