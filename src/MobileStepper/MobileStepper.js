// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import withStyles from '../styles/withStyles';
import Paper from '../Paper';
import Button from '../Button';
import { capitalizeFirstLetter } from '../utils/helpers';
import KeyboardArrowLeft from '../svg-icons/keyboard-arrow-left';
import KeyboardArrowRight from '../svg-icons/keyboard-arrow-right';
import { LinearProgress } from '../Progress';

export const styleSheet = createStyleSheet('MuiMobileStepper', theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: theme.palette.background.default,
    height: 50,
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
  button: {},
  dots: {
    display: 'flex',
    flexDirection: 'row',
  },
  dot: {
    backgroundColor: theme.palette.action.disabled,
    borderRadius: '50%',
    width: theme.spacing.unit,
    height: theme.spacing.unit,
    margin: '0 2px',
  },
  dotActive: {
    backgroundColor: theme.palette.primary[500],
  },
  progress: {
    width: '50%',
  },
}));

function MobileStepper(props) {
  const {
    activeStep,
    backButtonText,
    classes,
    className: classNameProp,
    disableBack,
    disableNext,
    position,
    type,
    nextButtonText,
    onBack,
    onNext,
    steps,
    ...other
  } = props;

  const className = classNames(
    classes.root,
    classes[`position${capitalizeFirstLetter(position)}`],
    classNameProp,
  );

  return (
    <Paper square elevation={0} className={className} {...other}>
      <Button className={classes.button} onClick={onBack} disabled={disableBack}>
        <KeyboardArrowLeft />{backButtonText}
      </Button>
      {type === 'dots' &&
        <div className={classes.dots}>
          {[...new Array(steps)].map((_, step) => {
            const dotClassName = classNames(
              {
                [classes.dotActive]: step === activeStep,
              },
              classes.dot,
            );
            // eslint-disable-next-line react/no-array-index-key
            return <div key={step} className={dotClassName} />;
          })}
        </div>}
      {type === 'progress' &&
        <div className={classes.progress}>
          <LinearProgress mode="determinate" value={Math.ceil(activeStep / (steps - 1) * 100)} />
        </div>}
      <Button className={classes.button} onClick={onNext} disabled={disableNext}>
        {nextButtonText}<KeyboardArrowRight />
      </Button>
    </Paper>
  );
}

MobileStepper.propTypes = {
  /**
   * Set the active step (zero based index). This will enable `Step` control helpers.
   */
  activeStep: PropTypes.number,
  /**
   * Set the text that appears for the back button.
   */
  backButtonText: PropTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Set to true to disable the back button.
   */
  disableBack: PropTypes.bool,
  /**
   * Set to true to disable the next button.
   */
  disableNext: PropTypes.bool,
  /**
   * Set the text that appears for the next button.
   */
  nextButtonText: PropTypes.node,
  /**
   * Passed into the onTouchTap prop of the Back button.
   */
  onBack: PropTypes.func.isRequired,
  /**
   * Passed into the onTouchTap prop of the Next button.
   */
  onNext: PropTypes.func.isRequired,
  /**
   * Set the text that appears for the next button.
   */
  position: PropTypes.oneOf(['bottom', 'top', 'static']),
  /**
   * The total steps.
   */
  steps: PropTypes.number.isRequired,
  /**
   * The type of mobile stepper to use.
   */
  type: PropTypes.oneOf(['text', 'dots', 'progress']),
};

MobileStepper.defaultProps = {
  activeStep: 0,
  backButtonText: 'Back',
  disableBack: false,
  disableNext: false,
  nextButtonText: 'Next',
  position: 'bottom',
  type: 'dots',
};

export default withStyles(styleSheet)(MobileStepper);
