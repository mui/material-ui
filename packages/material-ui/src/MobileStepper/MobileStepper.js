// @inheritedComponent Paper

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import Paper from '../Paper';
import { capitalize } from '../utils/helpers';
import LinearProgress from '../LinearProgress';

export const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: theme.palette.background.default,
    padding: 8,
  },
  positionBottom: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: theme.zIndex.mobileStepper,
  },
  positionTop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: theme.zIndex.mobileStepper,
  },
  positionStatic: {},
  dots: {
    display: 'flex',
    flexDirection: 'row',
  },
  dot: {
    backgroundColor: theme.palette.action.disabled,
    borderRadius: '50%',
    width: 8,
    height: 8,
    margin: '0 2px',
  },
  dotActive: {
    backgroundColor: theme.palette.primary.main,
  },
  progress: {
    width: '50%',
  },
});

function MobileStepper(props) {
  const {
    activeStep,
    backButton,
    classes,
    className: classNameProp,
    nextButton,
    position,
    steps,
    variant,
    ...other
  } = props;

  const className = classNames(
    classes.root,
    classes[`position${capitalize(position)}`],
    classNameProp,
  );

  return (
    <Paper square elevation={0} className={className} {...other}>
      {backButton}
      {variant === 'dots' && (
        <div className={classes.dots}>
          {[...new Array(steps)].map((_, step) => {
            const dotClassName = classNames(classes.dot, {
              [classes.dotActive]: step === activeStep,
            });
            // eslint-disable-next-line react/no-array-index-key
            return <div key={step} className={dotClassName} />;
          })}
        </div>
      )}
      {variant === 'progress' && (
        <LinearProgress
          className={classes.progress}
          variant="determinate"
          value={Math.ceil((activeStep / (steps - 1)) * 100)}
        />
      )}
      {nextButton}
    </Paper>
  );
}

MobileStepper.propTypes = {
  /**
   * Set the active step (zero based index).
   * Defines which dot is highlighted when the variant is 'dots'.
   */
  activeStep: PropTypes.number,
  /**
   * A back button element. For instance, it can be be a `Button` or a `IconButton`.
   */
  backButton: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css-api) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * A next button element. For instance, it can be be a `Button` or a `IconButton`.
   */
  nextButton: PropTypes.node,
  /**
   * Set the positioning type.
   */
  position: PropTypes.oneOf(['bottom', 'top', 'static']),
  /**
   * The total steps.
   */
  steps: PropTypes.number.isRequired,
  /**
   * The type of mobile stepper to use.
   */
  variant: PropTypes.oneOf(['text', 'dots', 'progress']),
};

MobileStepper.defaultProps = {
  activeStep: 0,
  position: 'bottom',
  variant: 'dots',
};

export default withStyles(styles, { name: 'MuiMobileStepper' })(MobileStepper);
