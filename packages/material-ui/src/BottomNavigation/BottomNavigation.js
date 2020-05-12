import * as React from 'react';
import { isFragment } from 'react-is';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';

export const styles = (theme) => ({
  /* Styles applied to the root element. */
  root: {
    display: 'flex',
    justifyContent: 'center',
    height: 56,
    backgroundColor: theme.palette.background.paper,
  },
});

const BottomNavigation = React.forwardRef(function BottomNavigation(props, ref) {
  const {
    children,
    classes,
    className,
    component: Component = 'div',
    onChange,
    showLabels = false,
    value,
    ...other
  } = props;

  return (
    <Component className={clsx(classes.root, className)} ref={ref} {...other}>
      {React.Children.map(children, (child, childIndex) => {
        if (!React.isValidElement(child)) {
          return null;
        }

        if (process.env.NODE_ENV !== 'production') {
          if (isFragment(child)) {
            console.error(
              [
                "Material-UI: The BottomNavigation component doesn't accept a Fragment as a child.",
                'Consider providing an array instead.',
              ].join('\n'),
            );
          }
        }

        const childValue = child.props.value === undefined ? childIndex : child.props.value;

        return React.cloneElement(child, {
          selected: childValue === value,
          showLabel: child.props.showLabel !== undefined ? child.props.showLabel : showLabels,
          value: childValue,
          onChange,
        });
      })}
    </Component>
  );
});

BottomNavigation.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes /* @typescript-to-proptypes-ignore */.elementType,
  /**
   * Callback fired when the value changes.
   *
   * @param {object} event The event source of the callback.
   * @param {any} value We default to the index of the child.
   */
  onChange: PropTypes.func,
  /**
   * If `true`, all `BottomNavigationAction`s will show their labels.
   * By default, only the selected `BottomNavigationAction` will show its label.
   */
  showLabels: PropTypes.bool,
  /**
   * The value of the currently selected `BottomNavigationAction`.
   */
  value: PropTypes.any,
};

export default withStyles(styles, { name: 'MuiBottomNavigation' })(BottomNavigation);
