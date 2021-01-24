import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';

export const styles = (theme) => {
  return {
    /* Styles applied to the root element. */
    root: {
      textAlign: 'left',
      position: 'absolute',
      bottom: 0,
      right: 0,
      top: -5,
      left: 0,
      margin: 0,
      padding: '0 8px',
      pointerEvents: 'none',
      borderRadius: 'inherit',
      borderStyle: 'solid',
      borderWidth: 1,
      overflow: 'hidden',
    },
    legendLabelled: {
      display: 'block',
      width: 'auto',
      padding: 0,
      height: 11, // sync with `lineHeight` in `legend` styles
      fontSize: '0.75em',
      visibility: 'hidden',
      maxWidth: 0.01,
      transition: theme.transitions.create('max-width', {
        duration: 50,
        easing: theme.transitions.easing.easeOut,
      }),
      '& > span': {
        paddingLeft: 5,
        paddingRight: 5,
        display: 'inline-block',
      },
    },
    /* Styles applied to the legend element is notched. */
    legendNotched: {
      maxWidth: 1000,
      transition: theme.transitions.create('max-width', {
        duration: 100,
        easing: theme.transitions.easing.easeOut,
        delay: 50,
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
    notched,
    style,
    ...other
  } = props;

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
