// @flow weak

import React from 'react';
import type { ChildrenArray, ComponentType } from 'react';
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

type DefaultProps = {
  classes: Object,
};

export type Props = {
  /**
   * Theoretically you can pass any node as children, but the main use case is to pass an img,
   * in which case GridListTile takes care of making the image "cover" available space
   * (similar to `background-size: cover` or to `object-fit: cover`).
   */
  children?: $ReadOnlyArray<ChildrenArray<*>>,
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * Width of the tile in number of grid cells.
   */
  cols?: number,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component?: string | ComponentType<*>,
  /**
   * Height of the tile in number of grid cells.
   */
  rows?: number,
};

type AllProps = DefaultProps & Props;

class GridListTile extends React.Component<AllProps> {
  props: AllProps;
  static defaultProps = {
    cols: 1,
    rows: 1,
    component: 'li',
  };

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
  }, 166);

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
      imgElement.classList.remove(this.props.classes.imgFullWidth);
      imgElement.classList.add(this.props.classes.imgFullHeight);
    } else {
      imgElement.classList.remove(this.props.classes.imgFullHeight);
      imgElement.classList.add(this.props.classes.imgFullWidth);
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
      // $FlowFixMe - no idea why it cannot find component on intersection
      component: ComponentProp,
      rows,
      ...other
    } = this.props;

    return (
      <ComponentProp className={classNames(classes.root, className)} {...other}>
        <EventListener target="window" onResize={this.handleResize} />
        <div className={classes.tile}>
          {React.Children.map(children, child => {
            if (child.type === 'img') {
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
      </ComponentProp>
    );
  }
}

export default withStyles(styles, { name: 'MuiGridListTile' })(GridListTile);
