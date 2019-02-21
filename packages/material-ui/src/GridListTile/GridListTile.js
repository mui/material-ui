import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import EventListener from 'react-event-listener';
import debounce from 'debounce'; // < 1kb payload overhead when lodash/debounce is > 3kb.
import withStyles from '../styles/withStyles';
import withForwardedRef from '../utils/withForwardedRef';

export const styles = {
  /* Styles applied to the root element. */
  root: {
    boxSizing: 'border-box',
    flexShrink: 0,
  },
  /* Styles applied to the `div` element that wraps the children. */
  tile: {
    position: 'relative',
    display: 'block', // In case it's not rendered with a div.
    height: '100%',
    overflow: 'hidden',
  },
  /* Styles applied to an `img` element child, if needed to ensure it covers the tile. */
  imgFullHeight: {
    height: '100%',
    transform: 'translateX(-50%)',
    position: 'relative',
    left: '50%',
  },
  /* Styles applied to an `img` element child, if needed to ensure it covers the tile. */
  imgFullWidth: {
    width: '100%',
    position: 'relative',
    transform: 'translateY(-50%)',
    top: '50%',
  },
};

class GridListTile extends React.Component {
  constructor() {
    super();

    if (typeof window !== 'undefined') {
      this.handleResize = debounce(() => {
        this.fit();
      }, 166); // Corresponds to 10 frames at 60 Hz.
    }
  }

  componentDidMount() {
    this.ensureImageCover();
  }

  componentDidUpdate() {
    this.ensureImageCover();
  }

  componentWillUnmount() {
    this.handleResize.clear();
  }

  fit = () => {
    const imgElement = this.imgElement;

    if (!imgElement || !imgElement.complete) {
      return;
    }

    if (
      imgElement.width / imgElement.height >
      imgElement.parentNode.offsetWidth / imgElement.parentNode.offsetHeight
    ) {
      imgElement.classList.remove(...this.props.classes.imgFullWidth.split(' '));
      imgElement.classList.add(...this.props.classes.imgFullHeight.split(' '));
    } else {
      imgElement.classList.remove(...this.props.classes.imgFullHeight.split(' '));
      imgElement.classList.add(...this.props.classes.imgFullWidth.split(' '));
    }

    imgElement.removeEventListener('load', this.fit);
  };

  ensureImageCover() {
    if (!this.imgElement) {
      return;
    }

    if (this.imgElement.complete) {
      this.fit();
    } else {
      this.imgElement.addEventListener('load', this.fit);
    }
  }

  render() {
    const {
      children,
      classes,
      className,
      cols,
      component: Component,
      innerRef,
      rows,
      ...other
    } = this.props;

    return (
      <Component className={clsx(classes.root, className)} ref={innerRef} {...other}>
        <EventListener target="window" onResize={this.handleResize} />
        <div className={classes.tile}>
          {React.Children.map(children, child => {
            if (!React.isValidElement(child)) {
              return null;
            }

            if (child.type === 'img') {
              return React.cloneElement(child, {
                ref: node => {
                  this.imgElement = node;
                },
              });
            }

            return child;
          })}
        </div>
      </Component>
    );
  }
}

GridListTile.propTypes = {
  /**
   * Theoretically you can pass any node as children, but the main use case is to pass an img,
   * in which case GridListTile takes care of making the image "cover" available space
   * (similar to `background-size: cover` or to `object-fit: cover`).
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Width of the tile in number of grid cells.
   */
  cols: PropTypes.number,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.elementType,
  /**
   * @ignore
   * from `withForwardRef`
   */
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  /**
   * Height of the tile in number of grid cells.
   */
  rows: PropTypes.number,
};

GridListTile.defaultProps = {
  cols: 1,
  component: 'li',
  rows: 1,
};

export default withStyles(styles, { name: 'MuiGridListTile' })(withForwardedRef(GridListTile));
