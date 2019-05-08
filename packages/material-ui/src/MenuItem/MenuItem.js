import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import ListItem from '../ListItem';

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    ...theme.typography.subtitle1,
    minHeight: 48,
    paddingTop: 4,
    paddingBottom: 4,
    boxSizing: 'border-box',
    width: 'auto',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  /* Styles applied to the root element if `disableGutters={false}`. */
  gutters: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  /* Styles applied to the root element if `selected={true}`. */
  selected: {},
});

const MenuItem = React.forwardRef(function MenuItem(props, ref) {
  const {
    classes,
    className,
    component = 'li',
    disableGutters = false,
    role = 'menuitem',
    selected,
    tabIndex: tabIndexProp,
    ...other
  } = props;

  let tabIndex;
  if (!props.disabled) {
    tabIndex = tabIndexProp !== undefined ? tabIndexProp : -1;
  }
  return (
    <ListItem
      button
      role={role}
      tabIndex={tabIndex}
      component={component}
      selected={selected}
      disableGutters={disableGutters}
      className={clsx(
        classes.root,
        {
          [classes.selected]: selected,
          [classes.gutters]: !disableGutters,
        },
        className,
      )}
      ref={ref}
      {...other}
    />
  );
});

MenuItem.propTypes = {
  /**
   * Menu item contents.
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
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.elementType,
  /**
   * @ignore
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the left and right padding is removed.
   */
  disableGutters: PropTypes.bool,
  /**
   * @ignore
   */
  role: PropTypes.string,
  /**
   * @ignore
   */
  selected: PropTypes.bool,
  /**
   * @ignore
   */
  tabIndex: PropTypes.number,
};

export default withStyles(styles, { name: 'MuiMenuItem' })(MenuItem);
