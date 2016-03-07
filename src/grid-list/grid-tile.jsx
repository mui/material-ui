import React from 'react';
import getMuiTheme from '../styles/getMuiTheme';

function getStyles(props, state) {
  const {
    baseTheme,
    gridTile,
  } = state.muiTheme;

  const actionPos = props.actionIcon && props.actionPosition;

  const styles = {
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
      [props.titlePosition]: 0,
      height: props.subtitle ? 68 : 48,
      background: props.titleBackground,
      display: 'flex',
      alignItems: 'center',
    },
    titleWrap: {
      flexGrow: 1,
      marginLeft: actionPos !== 'left' ? baseTheme.spacing.desktopGutterLess : 0,
      marginRight: actionPos === 'left' ? baseTheme.spacing.desktopGutterLess : 0,
      color: gridTile.textColor,
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
}

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

  childContextTypes: {
    muiTheme: React.PropTypes.object,
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

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme || getMuiTheme(),
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

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      muiTheme: nextContext.muiTheme || this.state.muiTheme,
    });
  },

  componentDidUpdate() {
    this._ensureImageCover();
  },

  _ensureImageCover() {
    let imgEl = this.refs.img;

    if (imgEl) {
      const fit = () => {
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

    const {
      prepareStyles,
    } = this.state.muiTheme;

    const styles = getStyles(this.props, this.state);

    const mergedRootStyles = Object.assign(styles.root, style);

    let titleBar = null;

    if (title) {
      titleBar = (
        <div style={prepareStyles(styles.titleBar)}>
          <div style={prepareStyles(styles.titleWrap)}>
            <div style={prepareStyles(styles.title)}>{title}</div>
            {
              subtitle ? (<div style={prepareStyles(styles.subtitle)}>{subtitle}</div>) : null
            }
          </div>
          {
            actionIcon ? (<div style={prepareStyles(styles.actionIcon)}>{actionIcon}</div>) : null
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
            style: prepareStyles(Object.assign({}, styles.childImg, child.props.style)),
          });
        } else {
          return child;
        }
      });
    }

    const RootTag = rootClass;
    return (
      <RootTag style={prepareStyles(mergedRootStyles)} {...other}>
        {newChildren}
        {titleBar}
      </RootTag>
    );
  },
});

export default GridTile;
