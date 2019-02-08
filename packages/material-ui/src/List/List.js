import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { componentPropType } from '@material-ui/utils';
import withStyles from '../styles/withStyles';
import ListContext from './ListContext';

export const styles = {
  /* Styles applied to the root element. */
  root: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    position: 'relative',
  },
  /* Styles applied to the root element if `disablePadding={false}`. */
  padding: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  /* Styles applied to the root element if `dense={true}` & `disablePadding={false}`. */
  dense: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  /* Styles applied to the root element if a `subheader` is provided. */
  subheader: {
    paddingTop: 0,
  },
};

const List = React.forwardRef(function List(props, ref) {
  const {
    children,
    classes,
    className,
    component: Component,
    dense,
    disablePadding,
    subheader,
    ...other
  } = props;

  return (
    <Component
      className={clsx(
        classes.root,
        {
          [classes.dense]: dense && !disablePadding,
          [classes.padding]: !disablePadding,
          [classes.subheader]: subheader,
        },
        className,
      )}
      ref={ref}
      {...other}
    >
      <ListContext.Provider value={{ dense }}>
        {subheader}
        {children}
      </ListContext.Provider>
    </Component>
  );
});

List.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css-api) below for more details.
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
  component: componentPropType,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input will be used for
   * the list and list items. The property is available to descendant components as the
   * `dense` context.
   */
  dense: PropTypes.bool,
  /**
   * If `true`, vertical padding will be removed from the list.
   */
  disablePadding: PropTypes.bool,
  /**
   * The content of the subheader, normally `ListSubheader`.
   */
  subheader: PropTypes.node,
};

List.defaultProps = {
  component: 'ul',
  dense: false,
  disablePadding: false,
};

export default withStyles(styles, { name: 'MuiList' })(List);
