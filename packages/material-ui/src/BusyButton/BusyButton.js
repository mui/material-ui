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
  /* Styles applied to the pendingIndicator element if `pendingPosition="center"`. */
  pendingIndicatorCenter: {
    left: '50%',
    transform: 'translate(-50%)',
  },
  /* Styles applied to the pendingIndicator element if `pendingPosition="start"`. */
  pendingIndicatorStart: {
    left: 16,
  },
  /* Styles applied to the pendingIndicator element if `pendingPosition="end"`. */
  pendingIndicatorEnd: {
    right: 16,
  },
  /* Styles applied to the endIcon element if `pending={true}` and `pendingPosition="end"`. */
  endIconLoadingEnd: {
    visibility: 'hidden',
  },
  /* Styles applied to the startIcon element if `pending={true}` and `pendingPosition="start"`. */
  startIconLoadingStart: {
    visibility: 'hidden',
  },
  /* Styles applied to the label element if `pending={true}` and `pendingPosition="center"`. */
  labelLoadingCenter: {
    visibility: 'hidden',
  },
});

const PendingIndicator = <CircularProgress color="inherit" size={16} />

const BusyButton = React.forwardRef(function BusyButton(props, ref) {
  const { 
    classes,
    className,
    disabled = false,
    pending = false,
    pendingPosition = 'center',
    children,
    pendingIndicator = PendingIndicator,
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
        startIcon: classes[`startIcon${pending ? 'Loading' : ''}${capitalize(pendingPosition)}`],
        endIcon: classes[`endIcon${pending ? 'Loading' : ''}${capitalize(pendingPosition)}`],
        label: classes[`label${pending ? 'Loading' : ''}${capitalize(pendingPosition)}`],
      }}
      {...other}
    >
      {pending && (
        <div
          className={clsx(
            classes.pendingIndicator,
            classes[`pendingIndicator${capitalize(pendingPosition)}`],
          )}
        >
          {pendingIndicator}
        </div>
      )}
      {children}
    </Button>
  );
});

export default withStyles(styles, { name: 'MuiBusyButton' })(BusyButton);
