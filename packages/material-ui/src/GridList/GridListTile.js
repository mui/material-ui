import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import EventListener from 'react-event-listener';
import debounce from 'lodash/debounce';
import withStyles from '../styles/withStyles';

export const styles = {
  root: {
    boxSizing: 'border-box',
    flexShrink: 0,
  },
  tile: {
    position: 'relative',
    display: 'block', // In case it's not renderd with a div.
    height: '100%',
    overflow: 'hidden',
  },
  imgFullHeight: {
    height: '100%',
    transform: 'translateX(-50%)',
    position: 'relative',
    left: '50%',
  },
  imgFullWidth: {
    width: '100%',
    position: 'relative',
    transform: 'translateY(-50%)',
    top: '50%',
  },
};

class GridListTile extends React.Component {
  componentDidMount() {
    this.ensureImageCover();
  }

  componentDidUpdate() {
    this.ensureImageCover();
  }

  componentWillUnmount() {
    this.handleResize.cancel();
  }

  imgElement = null;

  handleResize = debounce(() => {
    this.fit();
  }, 166); // Corresponds to 10 frames at 60 Hz.

  fit = () => {
    const imgElement = this.imgElement;

    if (!imgElement) {
      return;
    }

    if (!imgElement.complete) {
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
    const { children, classes, className, cols, component: Component, rows, ...other } = this.props;

    return (
      <Component className={classNames(classes.root, className)} {...other}>
        <EventListener target="window" onResize={this.handleResize} />
        <div className={classes.tile}>
          {React.Children.map(children, child => {
            if (child && child.type === 'img') {
              return React.cloneElement(child, {
                key: 'img',
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
   * Useful to extend the style applied to components.
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
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
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

export default withStyles(styles, { name: 'MuiGridListTile' })(GridListTile);
