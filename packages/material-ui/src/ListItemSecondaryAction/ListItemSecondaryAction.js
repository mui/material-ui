import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import ListContext from '../List/ListContext';
import withStyles from '../styles/withStyles';

export const styles = {
  /* Styles applied to the root element. */
  root: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: 'translateY(-50%)',
  },
  /* Styles applied to the root element when the parent `ListItem` has `disableGutters={true}`. */
  disableGutters: {
    right: 0,
  },
};

/**
 * Must be used as the last child of ListItem to function properly.
 */
const ListItemSecondaryAction = React.forwardRef(function ListItemSecondaryAction(props, ref) {
  const { classes, className, ...other } = props;
  const context = React.useContext(ListContext);

  return (
    <div
      className={clsx(
        classes.root,
        { [classes.disableGutters]: context.disableGutters },
        className,
      )}
      ref={ref}
      {...other}
    />
  );
});

ListItemSecondaryAction.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component, normally an `IconButton` or selection control.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
};

ListItemSecondaryAction.muiName = 'ListItemSecondaryAction';

export default withStyles(styles, { name: 'MuiListItemSecondaryAction' })(ListItemSecondaryAction);
