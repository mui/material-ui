import * as React from 'react';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import capitalize from '../utils/capitalize';
import Button from '../Button';
import CircularProgress from '../CircularProgress';

export const styles = () => ({
  /* Styles applied to the root element. */
  root: {},
  /* Styles applied to the root element if `pending={true}`. */
  pending: {},
  /* Styles applied to the pendingIndicator element. */
  pendingIndicator: {
    position: 'absolute',
    visibility: 'visible',
    display: 'flex',
  },
  /* Styles applied to the pendingIndicator element if `pendingIndicatorPosition="center"`. */
  pendingIndicatorCenter: {
    left: '50%',
    transform: 'translate(-50%)',
  },
  /* Styles applied to the pendingIndicator element if `pendingIndicatorPosition="start"`. */
  pendingIndicatorStart: {
    left: 10,
  },
  /* Styles applied to the pendingIndicator element if `pendingIndicatorPosition="end"`. */
  pendingIndicatorEnd: {
    right: 10,
  },
  /* Styles applied to the endIcon element if `pending={true}` and `pendingIndicatorPosition="end"`. */
  endIconLoadingEnd: {
    visibility: 'hidden'
  },
  /* Styles applied to the startIcon element if `pending={true}` and `pendingIndicatorPosition="start"`. */
  startIconLoadingStart: {
    visibility: 'hidden'
  },
  /* Styles applied to the label element if `pending={true}` and `pendingIndicatorPosition="center"`. */
  labelLoadingCenter: {
    visibility: 'hidden',
  },
});

const BusyButton = React.forwardRef(function BusyButton(props, ref) {
  const {
    classes,
    className,
    disabled = false,
    pending = false,
    pendingIndicatorPosition = 'start',
    children,
    pendingIndicator = <CircularProgress color="inherit" size={16} />,
    ...other
  } = props;

  return (
    <Button
      className={clsx(
        classes.root,
        {
          [classes.pending]: pending,
        },
        className,
      )}
      disabled={disabled || pending}
      ref={ref}
      classes={{
        startIcon: classes[`startIcon${pending ? 'Loading' : ''}${capitalize(pendingIndicatorPosition)}`],
        endIcon: classes[`endIcon${pending ? 'Loading' : ''}${capitalize(pendingIndicatorPosition)}`],
        label: classes[`label${pending ? 'Loading' : ''}${capitalize(pendingIndicatorPosition)}`]
      }}
      {...other}
    >
      {pending && <div className={clsx(classes.pendingIndicator, classes[`pendingIndicator${capitalize(pendingIndicatorPosition)}`])}>{pendingIndicator}</div>}
      {children}
    </Button>
  );
});

export default withStyles(styles, { name: 'MuiBusyButton' })(BusyButton);
