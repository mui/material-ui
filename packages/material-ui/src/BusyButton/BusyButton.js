import * as React from 'react';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import Button from '../Button';
import CircularProgress from '../CircularProgress';

export const styles = () => ({
  /* Styles applied to the root element. */
  root: {},
  /* Styles applied to the root element if `loading={true}`. */
  loading: {},
});

const BusyButton = React.forwardRef(function BusyButton(props, ref) {
  const {
    classes,
    className,
    disabled = false,
    loading = false,
    startIcon,
    loadingIndicator = <CircularProgress color="inherit" size={16} />,
    ...other
  } = props;

  return (
    <Button
      className={clsx(
        classes.root,
        {
          [classes.loading]: loading,
        },
        className,
      )}
      startIcon={loading ? loadingIndicator : startIcon}
      disabled={disabled || loading}
      ref={ref}
      {...other}
    />
  );
});

export default withStyles(styles, { name: 'MuiBusyButton' })(BusyButton);
