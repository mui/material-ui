import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import classNames from 'classnames';
import Collapse from '../transitions/Collapse';
import withStyles from '../styles/withStyles';

export const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit,
    marginLeft: 12, // half icon
    paddingLeft: theme.spacing.unit + 12, // margin + half icon
    paddingRight: theme.spacing.unit,
    borderLeft: `1px solid ${theme.palette.line.stepper}`,
  },
  last: {
    borderLeft: 'none',
  },
  transition: {},
});

function StepContent(props) {
  const {
    active,
    alternativeLabel,
    children,
    classes,
    className: classNameProp,
    completed,
    last,
    optional,
    orientation,
    transition: Transition,
    transitionDuration,
    ...other
  } = props;

  warning(
    orientation === 'vertical',
    'Material-UI: <StepContent /> is only designed for use with the vertical stepper.',
  );

  const className = classNames(
    classes.root,
    {
      [classes.last]: last,
    },
    classNameProp,
  );

  return (
    <div className={className} {...other}>
      <Transition
        in={active}
        className={classes.transition}
        timeout={transitionDuration}
        unmountOnExit
      >
        {children}
      </Transition>
    </div>
  );
}

StepContent.propTypes = {
  /**
   * @ignore
   * Expands the content.
   */
  active: PropTypes.bool,
  /**
   * @ignore
   * Set internally by Step when it's supplied with the alternativeLabel property.
   */
  alternativeLabel: PropTypes.bool,
  /**
   * Step content.
   */
  children: PropTypes.node,
  /**
   * @ignore
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
  last: PropTypes.bool,
  /**
   * @ignore
   * Set internally by Step when it's supplied with the optional property.
   */
  optional: PropTypes.bool,
  /**
   * @ignore
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * Collapse component.
   */
  transition: PropTypes.func,
  /**
   * Adjust the duration of the content expand transition.
   * Passed as a property to the transition component.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   */
  transitionDuration: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number }),
    PropTypes.oneOf(['auto']),
  ]),
};

StepContent.defaultProps = {
  transition: Collapse,
  transitionDuration: 'auto',
};

export default withStyles(styles, { name: 'MuiStepContent' })(StepContent);
