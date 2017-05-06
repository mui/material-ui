// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';

export const styleSheet = createStyleSheet('MuiGridTile', (theme) => {
  return {
    root: {
      position: 'relative',
      display: 'block',
      height: '100%',
      overflow: 'hidden',
      fontFamily: theme.typography.fontFamily,
    },
    childImg: {
      height: '100%',
      transform: 'translateX(-50%)',
      position: 'relative',
      left: '50%',
      maxWidth: 'none', // Reset to initial value to override docs-site App-frame.
    },
  };
});

/**
 * ```sx
 * <GridTile>
 *   <img src="image.jpg" />
 *   <GridTileTitlebar title="GridTile" />
 * </GridTile>
 * ```
 */
export default class GridTile extends Component {
  static propTypes = {
    /**
     * Theoretically you can pass any node as children, but the main use case is to pass an img,
     * in which case GridTile takes care of making the image "cover" available space
     * (similar to `background-size: cover` or to `object-fit: cover`).
     */
    children: PropTypes.node.isRequired,
    /**
     * The CSS `className` of the root element.
     */
    className: PropTypes.string,
    /**
     * Width of the tile in number of grid cells.
     */
    cols: PropTypes.number,
    /**
     * Either a string used as tag name for the tile root element, or a ReactElement.
     * This is useful when you have, for example, a custom implementation of a navigation
     * link (that knows about your routes) and you want to use it as the primary tile action.
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
  };

  static defaultProps = {
    cols: 1,
    rows: 1,
    containerElement: 'div',
  };

  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  componentDidMount() {
    this.ensureImageCover();
  }

  componentDidUpdate() {
    this.ensureImageCover();
  }

  ensureImageCover() {
    let imgEl = this.imgElement;

    if (imgEl) {
      const fit = () => {
        if (imgEl.offsetWidth < imgEl.parentNode.offsetWidth) {
          const { theme: { dir } } = this.context.styleManager;
          const isRtl = dir === 'rtl';
          imgEl.style.height = 'auto';
          if (isRtl) {
            imgEl.style.right = '0';
          } else {
            imgEl.style.left = '0';
          }
          imgEl.style.width = '100%';
          imgEl.style.top = '50%';
          imgEl.style.transform = 'translateY(-50%)';
          imgEl.style.WebkitTransform = 'translateY(-50%)';
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

  render() {
    const {
      children,
      className: classNameProp,
      cols, // eslint-disable-line no-unused-vars
      containerElement,
      rows, // eslint-disable-line no-unused-vars
      ...other
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet);

    const newChildren = React.Children.map(children, (child) => {
      if (child.type === 'img') {
        return React.cloneElement(child, {
          key: 'img',
          ref: (img) => { this.imgElement = img; },
          className: classes.childImg,
        });
      }
      return child;
    });

    const className = classNames(
      classes.root,
      classNameProp,
    );

    const containerProps = {
      className,
      ...other,
    };

    return React.isValidElement(containerElement) ?
      React.cloneElement(containerElement, containerProps, [newChildren]) :
      React.createElement(containerElement, containerProps, [newChildren]);
  }
}
