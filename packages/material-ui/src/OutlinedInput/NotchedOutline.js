import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import useTheme from '../styles/useTheme';

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    top: -5,
    left: 0,
    margin: 0,
    padding: 0,
    paddingLeft: 8,
    pointerEvents: 'none',
    borderRadius: 'inherit',
    borderStyle: 'solid',
    borderWidth: 1,
    // Match the Input Label
    transition: theme.transitions.create(['border-color', 'border-width'], {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.easeOut,
    }),
  },
  /* Styles applied to the legend element. */
  legend: {
    textAlign: 'left',
    padding: 0,
    lineHeight: '11px',
    fontSize: '0.75rem',
    visibility: 'hidden',
    maxWidth: 0,
    transition: theme.transitions.create('max-width', {
      duration: 50,
      delay: 0,
    }),
    '& span': {
      paddingLeft: 4,
      paddingRight: 6,
    },
  },
  legendNotched: {
    maxWidth: 1000,
    transition: theme.transitions.create('max-width', {
      duration: 100,
      delay: 60,
    }),
  },
});

/**
 * @ignore - internal component.
 */
const NotchedOutline = React.forwardRef(function NotchedOutline(props, ref) {
  const {
    children,
    classes,
    className,
    label,
    notched,
    style,
    ...other
  } = props;

  return (
    <fieldset aria-hidden className={clsx(classes.root, className)} ref={ref} {...other}>
      <legend
        className={clsx(classes.legend, {
          [classes.legendNotched]: notched,
        })}
      >
        {/* Use the nominal use case of the legend, avoid rendering artefacts. */}
        {/* eslint-disable-next-line react/no-danger */}
        {label ? <span>{label}</span> : <span dangerouslySetInnerHTML={{ __html: '&#8203;' }} />}
      </legend>
    </fieldset>
  );
});

NotchedOutline.propTypes = {
  /**
   * The content of the component.
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
   * The label.
   */
  label: PropTypes.node,
  /**
   * If `true`, the outline is notched to accommodate the label.
   */
  notched: PropTypes.bool.isRequired,
  /**
   * @ignore
   */
  style: PropTypes.object,
};

export default withStyles(styles, { name: 'PrivateNotchedOutline' })(NotchedOutline);
