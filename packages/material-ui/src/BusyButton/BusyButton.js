import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { chainPropTypes } from '@material-ui/utils';
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

const PendingIndicator = <CircularProgress color="inherit" size={16} />;

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

BusyButton.propTypes = {
  /**
   * The content of the button.
   */
  children: PropTypes.node,
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
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes /* @typescript-to-proptypes-ignore */.elementType,
  /**
   * If `true`, the button will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, no elevation is used.
   */
  disableElevation: PropTypes.bool,
  /**
   * If `true`, the  keyboard focus ripple will be disabled.
   */
  disableFocusRipple: PropTypes.bool,
  /**
   * If `true`, the ripple effect will be disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `focusVisibleClassName`.
   */
  disableRipple: PropTypes.bool,
  /**
   * Element placed after the children.
   */
  endIcon: PropTypes.node,
  /**
   * @ignore
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * If `true`, the button will take up the full width of its container.
   */
  fullWidth: PropTypes.bool,
  /**
   * The URL to link to when the button is clicked.
   * If defined, an `a` element will be used as the root node.
   */
  href: PropTypes.string,
  /**
   * The content of the button.
   */
  pending: PropTypes.bool,
  /**
   * Element placed before the children if the button is in pending state.
   */
  pendingIndicator: PropTypes.node,
  /**
   * The pending indicator can be positioned on the start, end or the center of the Button.
   */
  pendingPosition: chainPropTypes(PropTypes.oneOf(['start', 'end', 'center']), (props) => {
    if (props.pendingPosition === 'start' && !props.startIcon) {
      return new Error(
        `Material-UI: The pendingPosition="start" should be used in combination with startIcon.`,
      );
    }
    if (props.pendingPosition === 'end' && !props.endIcon) {
      return new Error(
        `Material-UI: The pendingPosition="end" should be used in combination with endIcon.`,
      );
    }
    return null;
  }),
  /**
   * The size of the button.
   * `small` is equivalent to the dense button styling.
   */
  size: PropTypes.oneOf(['large', 'medium', 'small']),
  /**
   * Element placed before the children.
   */
  startIcon: PropTypes.node,
  /**
   * @ignore
   */
  type: PropTypes.oneOfType([PropTypes.oneOf(['button', 'reset', 'submit']), PropTypes.string]),
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
};

export default withStyles(styles, { name: 'MuiBusyButton' })(BusyButton);
