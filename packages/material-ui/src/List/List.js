import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
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
  /* Styles applied to the root element if dense. */
  dense: {},
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
    component: Component = 'ul',
    dense = false,
    disablePadding = false,
    subheader,
    ...other
  } = props;

  const context = React.useMemo(() => ({ dense }), [dense]);

  return (
    <ListContext.Provider value={context}>
      <Component
        className={clsx(
          classes.root,
          {
            [classes.dense]: dense,
            [classes.padding]: !disablePadding,
            [classes.subheader]: subheader,
          },
          className,
        )}
        ref={ref}
        {...other}
      >
        {subheader}
        {children}
      </Component>
    </ListContext.Provider>
  );
});

List.propTypes = {
  /**
   * The content of the component.
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
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes /* @typescript-to-proptypes-ignore */.elementType,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input will be used for
   * the list and list items.
   * The prop is available to descendant components as the `dense` context.
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

export default withStyles(styles, { name: 'MuiList' })(List);
