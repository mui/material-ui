import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import useTheme from '../styles/useTheme';
import capitalize from '../utils/capitalize';

export const styles = theme => {
  const align = theme.direction === 'rtl' ? 'right' : 'left';

  return {
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
      transition: theme.transitions.create([`padding-${align}`, 'border-color', 'border-width'], {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.easeOut,
      }),
    },
    /* Styles applied to the legend element when `labelWidth` is provided. */
    legend: {
      textAlign: 'left',
      padding: 0,
      lineHeight: '11px', // sync with `height` in `legend` styles
      transition: theme.transitions.create('width', {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.easeOut,
      }),
    },
    /* Styles applied to the legend element. */
    legendLabelled: {
      textAlign: 'left',
      padding: 0,
      height: 11, // sync with `lineHeight` in `legend` styles
      fontSize: '0.75rem',
      visibility: 'hidden',
      maxWidth: 0.01,
      transition: theme.transitions.create('max-width', {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.easeOut,
      }),
      '& span': {
        paddingLeft: 4,
        paddingRight: 6,
      },
    },
    legendNotched: {
      maxWidth: 1000,
      transition: theme.transitions.create('max-width', {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.easeOut,
      }),
    },
  };
};

/**
 * @ignore - internal component.
 */
const NotchedOutline = React.forwardRef(function NotchedOutline(props, ref) {
  const {
    children,
    classes,
    className,
    label,
    labelWidth: labelWidthProp,
    notched,
    style,
    ...other
  } = props;
  const theme = useTheme();
  const align = theme.direction === 'rtl' ? 'right' : 'left';

  if (label !== undefined) {
    return (
      <fieldset
        aria-hidden
        className={clsx(classes.root, className)}
        ref={ref}
        style={style}
        {...other}
      >
        <legend
          className={clsx(classes.legendLabelled, {
            [classes.legendNotched]: notched,
          })}
        >
          {/* Use the nominal use case of the legend, avoid rendering artefacts. */}
          {/* eslint-disable-next-line react/no-danger */}
          {label ? <span>{label}</span> : <span dangerouslySetInnerHTML={{ __html: '&#8203;' }} />}
        </legend>
      </fieldset>
    );
  }

  const labelWidth = labelWidthProp > 0 ? labelWidthProp * 0.75 + 8 : 0.01;

  return (
    <fieldset
      aria-hidden
      style={{
        [`padding${capitalize(align)}`]: 8 + (notched ? 0 : labelWidth / 2),
        ...style,
      }}
      className={clsx(classes.root, className)}
      ref={ref}
      {...other}
    >
      <legend
        className={classes.legend}
        style={{
          // IE 11: fieldset with legend does not render
          // a border radius. This maintains consistency
          // by always having a legend rendered
          width: notched ? labelWidth : 0.01,
        }}
      >
        {/* Use the nominal use case of the legend, avoid rendering artefacts. */}
        {/* eslint-disable-next-line react/no-danger */}
        <span dangerouslySetInnerHTML={{ __html: '&#8203;' }} />
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
   * The width of the label.
   */
  labelWidth: PropTypes.number.isRequired,
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
