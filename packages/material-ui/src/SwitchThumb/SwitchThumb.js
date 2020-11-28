import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: theme.shadows[1],
    backgroundColor: 'currentColor',
    width: 20,
    height: 20,
    borderRadius: '50%',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const SwitchThumb = (props) => {
  const { classes: propClasses, className, ...restProps } = props;
  const classes = useStyles();
  return <span className={clsx(classes.root, propClasses?.root, className)} {...restProps} />;
};

SwitchThumb.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * the thumb contents. For example, icons can be passed in here to decorate the thumb.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  classes: PropTypes.oneOf(['root']),
  /**
   * @ignore
   */
  className: PropTypes.string,
};

export default SwitchThumb;
