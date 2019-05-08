import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    flex: '1 1 auto',
  },
  /* Styles applied to the root element if `orientation="horizontal"`. */
  horizontal: {},
  /* Styles applied to the root element if `orientation="vertical"`. */
  vertical: {
    marginLeft: 12, // half icon
    padding: '0 0 8px',
  },
  /* Styles applied to the root element if `alternativeLabel={true}`. */
  alternativeLabel: {
    position: 'absolute',
    top: 8 + 4,
    left: 'calc(-50% + 20px)',
    right: 'calc(50% + 20px)',
  },
  /* Styles applied to the root element if `active={true}`. */
  active: {},
  /* Styles applied to the root element if `completed={true}`. */
  completed: {},
  /* Styles applied to the root element if `disabled={true}`. */
  disabled: {},
  /* Styles applied to the line element. */
  line: {
    display: 'block',
    borderColor: theme.palette.type === 'light' ? theme.palette.grey[400] : theme.palette.grey[600],
  },
  /* Styles applied to the root element if `orientation="horizontal"`. */
  lineHorizontal: {
    borderTopStyle: 'solid',
    borderTopWidth: 1,
  },
  /* Styles applied to the root element if `orientation="vertical"`. */
  lineVertical: {
    borderLeftStyle: 'solid',
    borderLeftWidth: 1,
    minHeight: 24,
  },
});

const StepConnector = React.forwardRef(function StepConnector(props, ref) {
  const {
    active,
    alternativeLabel = false,
    classes,
    className: classNameProp,
    completed,
    disabled,
    index,
    orientation = 'horizontal',
    ...other
  } = props;

  return (
    <div
      className={clsx(
        classes.root,
        classes[orientation],
        {
          [classes.alternativeLabel]: alternativeLabel,
          [classes.active]: active,
          [classes.completed]: completed,
          [classes.disabled]: disabled,
        },
        classNameProp,
      )}
      ref={ref}
      {...other}
    >
      <span
        className={clsx(classes.line, {
          [classes.lineHorizontal]: orientation === 'horizontal',
          [classes.lineVertical]: orientation === 'vertical',
        })}
      />
    </div>
  );
});

StepConnector.propTypes = {
  /**
   * @ignore
   */
  active: PropTypes.bool,
  /**
   * @ignore
   * Set internally by Step when it's supplied with the alternativeLabel property.
   */
  alternativeLabel: PropTypes.bool,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   */
  completed: PropTypes.bool,
  /**
   * @ignore
   */
  disabled: PropTypes.bool,
  /**
   * @ignore
   */
  index: PropTypes.number,
  /**
   * @ignore
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
};

export default withStyles(styles, { name: 'MuiStepConnector' })(StepConnector);
