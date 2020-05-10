import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  /* Styles applied to the root. */
  root: {
    marginRight: 4,
    width: 15,
    height: 15,
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    '& svg': {
      fontSize: 18,
    },
  },
};

const TreeItemIcon = React.forwardRef(function TreeItemIcon(props, ref) {
  const { classes, className, icon, ...rest } = props;

  return (
    <div ref={ref} className={clsx(classes.root, className)} {...rest}>
      {icon}
    </div>
  );
});

TreeItemIcon.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  icon: PropTypes.node,
  onClick: PropTypes.func,
};

export default withStyles(styles, { name: 'MuiTreeItemIcon' })(TreeItemIcon);
