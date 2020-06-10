import * as React from 'react';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import capitalize from '../utils/capitalize';
import Button from '../Button';
import CircularProgress from '../CircularProgress';

export const styles = () => ({
  /* Styles applied to the root element. */
  root: {},
  /* Styles applied to the root element if `loading={true}`. */
  loading: {},
  /* Styles applied to the loadingIndicator element. */
  loadingIndicator: {
    position: 'absolute',
    visibility: 'visible',
  },
  /* Styles applied to the loadingIndicator element if `loadingIndicatorPosition="center"`. */
  loadingIndicatorCenter: {
    left: '50%',
    transform: 'translate(-50%)',
  },
  /* Styles applied to the loadingIndicator element if `loadingIndicatorPosition="start"`. */
  loadingIndicatorStart: {
    left: 10,
  },
  /* Styles applied to the loadingIndicator element if `loadingIndicatorPosition="end"`. */
  loadingIndicatorEnd: {
    right: 10,
  },
  /* Styles applied to the endIcon element if `loading={true}` and `loadingIndicatorPosition="end"`. */
  endIconLoadingEnd: {
    visibility: 'hidden'
  },
  /* Styles applied to the startIcon element if `loading={true}` and `loadingIndicatorPosition="start"`. */
  startIconLoadingStart: {
    visibility: 'hidden'
  },
  /* Styles applied to the label element if `loading={true}` and `loadingIndicatorPosition="center"`. */
  labelLoadingCenter: {
    visibility: 'hidden',
  },
});

const LoadingButton = React.forwardRef(function LoadingButton(props, ref) {
  const {
    classes,
    className,
    disabled = false,
    loading = false,
    loadingIndicatorPosition = 'start',
    children,
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
      disabled={disabled || loading}
      ref={ref}
      classes={{
        startIcon: classes[`startIcon${loading ? 'Loading' : ''}${capitalize(loadingIndicatorPosition)}`],
        endIcon: classes[`endIcon${loading ? 'Loading' : ''}${capitalize(loadingIndicatorPosition)}`],
        label: classes[`label${loading ? 'Loading' : ''}${capitalize(loadingIndicatorPosition)}`]
      }}
      {...other}
    >
      {loading && <div className={clsx(classes.loadingIndicator, classes[`loadingIndicator${capitalize(loadingIndicatorPosition)}`])}>{loadingIndicator}</div>}
      {children}
    </Button>
  );
});

export default withStyles(styles, { name: 'MuiLoadingButton' })(LoadingButton);
