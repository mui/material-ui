import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '../styles';
import { capitalize } from '../utils/helpers';

export const styles = theme => {
  const light = theme.palette.type === 'light';
  const align = theme.direction === 'rtl' ? 'right' : 'left';

  return {
    /* Styles applied to the root element. */
    root: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      margin: 0,
      padding: 0,
      pointerEvents: 'none',
      borderRadius: theme.shape.borderRadius,
      borderStyle: 'solid',
      borderWidth: '1px',
      borderColor: light ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)',

      // Match the Input Label
      transition: theme.transitions.create([`padding-${align}`, 'border-color', 'border-width'], {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.easeOut,
      }),
    },
    /* Styles applied to the legend element. */
    legend: {
      textAlign: align,
      padding: 0,

      transition: theme.transitions.create('width', {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.easeOut,
      }),

      // Firefox workaround. Firefox will only obscure the
      // rendered height of the legend and, unlike other browsers,
      // will not push fieldset contents.
      '@supports (-moz-appearance:none)': {
        height: 2,
      },
    },
    /* Styles applied to the root element if the control is focused. */
    focused: {
      borderColor: theme.palette.primary.main,
      borderWidth: '2px',
    },
    /* Styles applied to the root element if `error={true}`. */
    error: {
      borderColor: theme.palette.error.main,
    },
    /* Styles applied to the root element if `disabled={true}`. */
    disabled: {
      borderColor: theme.palette.action.disabled,
    },
  };
};

/**
 * An outline for form control elements which opens to fit a label.
 */
function NotchedOutline(props) {
  const {
    disabled,
    error,
    children,
    classes,
    className,
    focused,
    notched,
    notchWidth,
    NotchProps,
    style,
    theme,
    ...other
  } = props;

  const align = theme.direction === 'rtl' ? 'right' : 'left';

  return (
    <fieldset
      aria-hidden
      {...other}
      style={{ [`padding${capitalize(align)}`]: 8 + (notched ? 0 : notchWidth / 2), ...style }}
      className={classNames(
        classes.root,
        {
          [classes.focused]: focused,
          [classes.error]: error,
          [classes.disabled]: disabled,
        },
        className,
      )}
    >
      <legend
        align={align}
        {...NotchProps}
        style={{
          // IE Fix: fieldset with legend does not render
          // a border radius. This maintains consistency
          // by always having a legend rendered
          width: notched ? notchWidth : 0.01,
          ...NotchProps.style,
        }}
        className={classes.legend}
      />
    </fieldset>
  );
}

NotchedOutline.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css-api) below for more details.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the outline should be displayed in a disabled state.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the outline should be displayed in an error state.
   */
  error: PropTypes.bool,
  /**
   * If `true`, the outline should be displayed in a focused state.
   */
  focused: PropTypes.bool,
  /**
   * If `true`, the outline is notched to accommodate text.
   */
  notched: PropTypes.bool,
  /**
   * The width of the notch, where a label will be placed.
   */
  NotchProps: PropTypes.object,
  /**
   * Props applied to the notch element.
   */
  notchWidth: PropTypes.number.isRequired,
  /**
   * @ignore
   */
  theme: PropTypes.object,
};

NotchedOutline.defaultProps = {
  NotchProps: {},
};

NotchedOutline.muiName = 'NotchedOutline';

export default withStyles(styles, { withTheme: true, name: 'MuiNotchedOutline' })(NotchedOutline);
