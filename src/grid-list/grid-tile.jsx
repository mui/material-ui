import React from 'react';
import ReactDOM from 'react-dom';
import StylePropable from '../mixins/style-propable';
import DefaultRawTheme from '../styles/raw-themes/light-raw-theme';
import ThemeManager from '../styles/theme-manager';

const GridTile = React.createClass({

  propTypes: {
    /**
     * An IconButton element to be used as secondary action target
     * (primary action target is the tile itself).
     */
    actionIcon: React.PropTypes.element,

    /**
     * Position of secondary action IconButton.
     */
    actionPosition: React.PropTypes.oneOf(['left', 'right']),

    /**
     * Theoretically you can pass any node as children, but the main use case is to pass an img,
     * in whichcase GridTile takes care of making the image "cover" available space
     * (similar to background-size: cover or to object-fit:cover).
     */
    children: React.PropTypes.node,

    /**
     * Width of the tile in number of grid cells.
     */
    cols: React.PropTypes.number,

    /**
     * Either a string used as tag name for the tile root element, or a ReactComponent.
     * This is useful when you have, for example, a custom implementation of
     * a navigation link (that knowsabout your routes) and you want to use it as primary tile action.
     * In case you pass a ReactComponent, please make sure that it passes all props,
     * accepts styles overrides and render it's children.
     */
    rootClass: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object,
    ]),

    /**
     * Height of the tile in number of grid cells.
     */
    rows: React.PropTypes.number,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,

    /**
     * String or element serving as subtitle (support text).
     */
    subtitle: React.PropTypes.node,

    /**
     * Title to be displayed on tile.
     */
    title: React.PropTypes.node,

    /**
     * Style used for title bar background.
     * Useful for setting custom gradients for example
     */
    titleBackground: React.PropTypes.string,

    /**
     * Position of the title bar (container of title, subtitle and action icon).
     */
    titlePosition: React.PropTypes.oneOf(['top', 'bottom']),
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [
    StylePropable,
  ],

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

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentDidMount() {
    this._ensureImageCover();
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  getStyles() {
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
        display: 'flex',
        alignItems: 'center',
      },
      titleWrap: {
        flexGrow: 1,
        marginLeft: actionPos !== 'left' ? gutterLess : 0,
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

    const mergedRootStyles = this.mergeStyles(styles.root, style);

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
      <RootTag style={this.prepareStyles(mergedRootStyles)} {...other}>
        {newChildren}
        {titleBar}
      </RootTag>
    );
  },
});

export default GridTile;
