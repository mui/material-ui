// @flow weak

import React from 'react';
import type { Node } from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';

export const styles = (theme: Object) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    height: 56,
    backgroundColor: theme.palette.background.paper,
  },
});

type ProvidedProps = {
  classes: Object,
  /**
   * @ignore
   */
  theme?: Object,
};

export type Props = {
  /**
   * The content of the component.
   */
  children: Node,
  /**
   * @ignore
   */
  className?: string,
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * Callback fired when the value changes.
   *
   * @param {object} event The event source of the callback
   * @param {any} value We default to the index of the child
   */
  onChange?: Function,
  /**
   * If `true`, all `BottomNavigationButton`s will show their labels.
   * By default only the selected `BottomNavigationButton` will show its label.
   */
  showLabels: boolean,
  /**
   * The value of the currently selected `BottomNavigationButton`.
   */
  value: any,
};

class BottomNavigation extends React.Component<ProvidedProps & Props> {
  static defaultProps = {
    showLabels: false,
  };

  render() {
    const {
      children: childrenProp,
      classes,
      className: classNameProp,
      onChange,
      showLabels,
      value,
      ...other
    } = this.props;

    const className = classNames(classes.root, classNameProp);

    const children = React.Children.map(childrenProp, (child, childIndex) => {
      if (!React.isValidElement(child)) return null;
      const childValue = child.props.value || childIndex;
      return React.cloneElement(child, {
        selected: childValue === value,
        showLabel: child.props.showLabel !== undefined ? child.props.showLabel : showLabels,
        value: childValue,
        onChange,
      });
    });

    return (
      <div className={className} {...other}>
        {children}
      </div>
    );
  }
}

export default withStyles(styles, { name: 'MuiBottomNavigation' })(BottomNavigation);
