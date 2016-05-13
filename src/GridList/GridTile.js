import React, {Component, PropTypes} from 'react';

function getStyles(props, context, state) {
  const {
    baseTheme,
    gridTile,
  } = context.muiTheme;

  const actionPos = props.actionIcon && props.actionPosition;
  
  let tileSize = '80px'
  let imageSize = '48px'
  let backgroundColor = 'white';
  let borderColor = '#ccc';
  if (state.hovered) {
    backgroundColor = '#e3e3e3';
  }
  if (state.selected) {
    backgroundColor = '#aadbee';
    borderColor= '#aadbee';
  }      
   
  const styles = {
    root: {
      position: 'relative',
      display: 'block',
      height: tileSize,
      width: tileSize,
      backgroundColor: backgroundColor,
      border: '1px solid',
      borderColor: borderColor,
    },
    titleBar: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: tileSize,
      [props.titlePosition]: 0,
      height: 20,
      display: 'flex',
      alignItems: 'center',
      padding: '5px 5px 0',
    },
    titleWrap: {
      flexGrow: 1,
      marginLeft:  0,
      marginRight: 0,      
      overflow: 'hidden',  
      textAlign: 'center',   
    },
    title: {
      fontSize: '12px',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
           
    },
    childImg: {
      height: imageSize,
      width: imageSize,
      border: 0,
      boxShadow: 'none',
      margin: 0,
      padding: 0,
      position: 'relative',
    },
  };
  return styles;
}

class GridTile extends Component {
  static propTypes = {
    /**
     * An IconButton element to be used as secondary action target
     * (primary action target is the tile itself).
     */
    actionIcon: PropTypes.element,
    /**
     * Position of secondary action IconButton.
     */
    actionPosition: PropTypes.oneOf(['left', 'right']),
    /**
     * Theoretically you can pass any node as children, but the main use case is to pass an img,
     * in whichcase GridTile takes care of making the image "cover" available space
     * (similar to background-size: cover or to object-fit:cover).
     */
    children: PropTypes.node,
    /**
     * Width of the tile in number of grid cells.
     */
    cols: PropTypes.number,
    /**
     * Either a string used as tag name for the tile root element, or a ReactElement.
     * This is useful when you have, for example, a custom implementation of
     * a navigation link (that knows about your routes) and you want to use it as the primary tile action.
     * In case you pass a ReactElement, please ensure that it passes all props,
     * accepts styles overrides and render it's children.
     */
    containerElement: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
    /**
     * Height of the tile in number of grid cells.
     */
    rows: PropTypes.number,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
    /**
     * String or element serving as subtitle (support text).
     */
    subtitle: PropTypes.node,
    /**
     * Title to be displayed on tile.
     */
    title: PropTypes.node,
    /**
     * Style used for title bar background.
     * Useful for setting custom gradients for example
     */
    titleBackground: PropTypes.string,
    /**
     * Position of the title bar (container of title, subtitle and action icon).
     */
    titlePosition: PropTypes.oneOf(['top', 'bottom']),
    
    onClick: PropTypes.func,
  };
  
  state = {
    hovered: false,
    selected: false
  };
  
  static defaultProps = {
    titlePosition: 'bottom',
    titleBackground: 'rgba(0, 0, 0, 0.4)',
    actionPosition: 'right',
    cols: 1,
    rows: 1,
    containerElement: 'div',
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.ensureImageCover();
  }

  componentDidUpdate() {
    this.ensureImageCover();
  }

  ensureImageCover() {
    let imgEl = this.refs.img;

    if (imgEl) {
      const fit = () => {
        if (imgEl.offsetWidth < imgEl.parentNode.offsetWidth) {
          imgEl.style.height = '48px';          
          imgEl.style.width = '48px';          
          imgEl.style.border= '0';
          imgEl.style.boxShadow= 'none';
          imgEl.style.margin= '0';
          imgEl.style.padding= '0';
          imgEl.style.margin= '16px';          
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
  }

  handleMouseEnter = (event) => {
    // Cancel hover styles for touch devices
    this.setState({hovered: true});
  };

  handleMouseLeave = (event) => {
    this.setState({hovered: false});
  };
    
  handleClick = (event) => {
    this.setState({selected: !this.state.selected});
    this.props.onClick(event);
  };
  
  render() {
    const {
      title,
      subtitle,
      titlePosition, // eslint-disable-line no-unused-vars
      titleBackground, // eslint-disable-line no-unused-vars
      actionIcon, // eslint-disable-line no-unused-vars
      actionPosition, // eslint-disable-line no-unused-vars
      style,
      children,
      containerElement,
      url,
      ...other,
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context, this.state);
    const mergedRootStyles = Object.assign(styles.root, style);

    let titleBar = null;

    titleBar = (        
        <div  
        key="titlebar" style={prepareStyles(styles.titleBar)}>
          <div style={prepareStyles(styles.titleWrap)}>
            <a style={prepareStyles(styles.title)} href={url}>{title}</a>            
          </div>            
        </div>        
    );

    let newChildren = children;

    // if there is a single image passed as children
    // clone it and add our styles
    if (React.Children.count(children) === 1) {
      newChildren = React.Children.map(children, (child) => {
        if (child.type === 'img') {
          return React.cloneElement(child, {
            key: 'img',
            ref: 'img',
            style: prepareStyles(Object.assign({}, styles.childImg, child.props.style)),
          });
        } else {
          return child;
        }
      });
    }

    const containerProps = {
      style: prepareStyles(mergedRootStyles),
      onMouseLeave:this.handleMouseLeave,
      onMouseEnter:this.handleMouseEnter,
      onClick:this.handleClick,
      ...other,
    };

    return React.isValidElement(containerElement) ?
      React.cloneElement(containerElement, containerProps, [newChildren, titleBar]) :
      React.createElement(containerElement, containerProps, [newChildren, titleBar]);
  }
}

export default GridTile;
