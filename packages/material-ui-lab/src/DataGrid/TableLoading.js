import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Backdrop from '@material-ui/core/Backdrop';

export const styles = () => ({
  /* Styles applied to the root element. */
  root: {
    position: 'absolute',
    zIndex: 1,
    display: 'block',
  },
});

/**
 * @ignore - internal component.
 */
const TableLoading = React.forwardRef(function TableLoading(props, ref) {
  const { classes, className, loading = false, ...other } = props;

  if (!loading) {
    return null;
  }

  return (
    <Backdrop
      className={clsx(classes.root, className)}
      ref={ref}
      open={loading}
      backgroundColor="white"
      {...other}
    >
      <LinearProgress />
    </Backdrop>
  );
});

TableLoading.propTypes = {
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
   * If `true`, the loading state is displayed.
   */
  loading: PropTypes.bool,
};

export default React.memo(withStyles(styles, { name: 'MuiTableLoading' })(TableLoading));
