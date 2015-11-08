const React = require('react');
const ReactDOM = require('react-dom');
const StylePropable = require('../mixins/style-propable');
const DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');
const ThemeManager = require('../styles/theme-manager');

const GridTile = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    title: React.PropTypes.node,
    subtitle: React.PropTypes.node,
    titlePosition: React.PropTypes.oneOf(['top', 'bottom']),
    titleBackground: React.PropTypes.string,
    actionIcon: React.PropTypes.element,
    actionPosition: React.PropTypes.oneOf(['left', 'right']),
    cols: React.PropTypes.number,
    rows: React.PropTypes.number,
    style: React.PropTypes.object,
    rootClass: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object,
    ]),
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

  getDefaultProps() {
    return {
      titlePosition: 'bottom',
      titleBackground: 'rgba(0, 0, 0, 0.4)',
      actionPosition: 'right',
      cols: 1,
      rows: 1,
      rootClass: 'div',
    };
  },

  getInitialState () {
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

  getStyles()
  {
    const spacing = this.state.muiTheme.rawTheme.spacing;
    const themeVariables = this.state.muiTheme.gridTile;
    const actionPos = this.props.actionIcon ? this.props.actionPosition : null;
    const gutterLess = spacing.desktopGutterLess;

    let styles = {
      root: {
        position: 'relative',
        display: 'block',
        height: '100%',
        overflow: 'hidden',
      },
      titleBar: {
        position: 'absolute',
        left: 0,
        right: 0,
        [this.props.titlePosition]: 0,
        height: this.props.subtitle ? 68 : 48,
        background: this.props.titleBackground,
        display: '-webkit-box; display: -moz-box; display: -ms-flexbox; display: -webkit-flex; display: flex',
        alignItems: 'center',
      },
      titleWrap: {
        flexGrow: 1,
        marginLeft: actionPos === 'right' ? gutterLess : 0,
        marginRight: actionPos === 'left' ? gutterLess : 0,
        color: themeVariables.textColor,
        overflow: 'hidden',
      },
      title: {
        fontSize: '16px',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      },
      subtitle: {
        fontSize: '12px',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      },
      actionIcon: {
        order: actionPos === 'left' ? -1 : 1,
      },
      childImg: {
        height: '100%',
        transform: 'translateX(-50%)',
        position: 'relative',
        left: '50%',
      },
    };
    return styles;
  },

  componentDidMount() {
    this._ensureImageCover();
  },

  componeneDidUpdate() {
    this._ensureImageCover();
  },

  _ensureImageCover() {
    let imgEl = ReactDOM.findDOMNode(this.refs.img);

    if (imgEl) {
      let fit = () => {
        if (imgEl.offsetWidth < imgEl.parentNode.offsetWidth) {
          imgEl.style.height = 'auto';
          imgEl.style.left = '0';
          imgEl.style.width = '100%';
          imgEl.style.top = '50%';
          imgEl.style.transform = imgEl.style.WebkitTransform = 'translateY(-50%)';
        }
        imgEl.removeEventListener('load', fit);
        imgEl = null; // prevent closure memory leak
      };
      if (imgEl.complete) {
        fit();
      } else {
        imgEl.addEventListener('load', fit);
      }
    }
  },


  render() {
    const {
      title,
      subtitle,
      titlePosition,
      titleBackground,
      actionIcon,
      actionPosition,
      style,
      children,
      rootClass,
      ...other,
      } = this.props;

    const styles = this.getStyles();

    const mergedRootStyles = this.prepareStyles(styles.root, style);

    let titleBar = null;

    if (title) {
      titleBar = (
        <div style={this.prepareStyles(styles.titleBar)}>
          <div style={this.prepareStyles(styles.titleWrap)}>
            <div style={this.prepareStyles(styles.title)}>{title}</div>
            {
              subtitle ? (<div style={this.prepareStyles(styles.subtitle)}>{subtitle}</div>) : null
            }
          </div>
          {
            actionIcon ? (<div style={this.prepareStyles(styles.actionIcon)}>{actionIcon}</div>) : null
          }
        </div>
      );
    }

    let newChildren = children;

    // if there is an image passed as children
    // clone it an put our styles
    if (React.Children.count(children) === 1) {
      newChildren = React.Children.map(children, (child) => {
        if (child.type === 'img') {
          return React.cloneElement(child, {
            ref: 'img',
            style: this.prepareStyles(styles.childImg, child.props.style),
          });
        } else {
          return child;
        }
      });
    }

    const RootTag = rootClass;
    return (
      <RootTag style={mergedRootStyles} {...other}>
        {newChildren}
        {titleBar}
      </RootTag>
    );
  },
});

module.exports = GridTile;
