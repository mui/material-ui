// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import withStyles from '../styles/withStyles';
import Paper from '../Paper';
import Button from '../Button';
import KeyboardArrowLeft from '../svg-icons/keyboard-arrow-left';
import KeyboardArrowRight from '../svg-icons/keyboard-arrow-right';
import { LinearProgress } from '../Progress';

export const styleSheet = createStyleSheet('MuiMobileStepper', theme => ({
  mobileStepper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    position: 'fixed',
    bottom: 0,
    left: 0,
    zIndex: theme.zIndex.mobileStepper,
    backgroundColor: theme.palette.background.paper,
    padding: '6px',
  },
  button: {},
  dots: {
    display: 'flex',
    flexDirection: 'row',
  },
  dot: {
    backgroundColor: theme.palette.action.disabled,
    borderRadius: '50%',
    width: '10px',
    height: '10px',
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
    buttonClassName: buttonClassNameProp,
    classes,
    className: classNameProp,
    disableBack,
    disableNext,
    dotClassName: dotClassNameProp,
    dotsClassName: dotsClassNameProp,
    kind,
    onBack,
    onNext,
    progressClassName: progressClassNameProp,
    steps,
    ...other
  } = props;

  const className = classNames(classes.mobileStepper, classNameProp);
  const dotsClassName = classNames(classes.dots, dotsClassNameProp);
  const buttonClassName = classNames(classes.button, buttonClassNameProp);
  const progressClassName = classNames(classes.progress, progressClassNameProp);

  return (
    <Paper square elevation={0} className={className} {...other}>
      <Button className={buttonClassName} onClick={onBack} disabled={disableBack}>
        <KeyboardArrowLeft /> Back
      </Button>
      {kind === 'dots' &&
        <div className={dotsClassName}>
          {Array.from(Array(steps)).map((_, step) => {
            const dotClassName = classNames(
              {
                [classes.dot]: true,
                [classes.dotActive]: step === activeStep,
              },
              dotClassNameProp,
            );
            return <div key={step} className={dotClassName} />; // eslint-disable-line react/no-array-index-key,max-len
          })}
        </div>}
      {kind === 'progress' &&
        <div className={progressClassName}>
          <LinearProgress
            mode="determinate"
            value={activeStep === 0 ? 0 : Math.ceil(activeStep / (steps - 1) * 100)}
          />
        </div>}
      <Button className={buttonClassName} onClick={onNext} disabled={disableNext}>
        Next <KeyboardArrowRight />
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
   * @ignore
   */
  buttonClassName: PropTypes.string,
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
   * @ignore
   */
  dotClassName: PropTypes.string,
  /**
   * @ignore
   */
  dotsClassName: PropTypes.string,
  /**
   * The kind of mobile stepper to use.
   */
  kind: PropTypes.oneOf(['text', 'dots', 'progress']),
  /**
   * Passed into the onTouchTap prop of the Back button.
   */
  onBack: PropTypes.func.isRequired,
  /**
   * Passed into the onTouchTap prop of the Next button.
   */
  onNext: PropTypes.func.isRequired,
  /**
   * @ignore
   */
  progressClassName: PropTypes.string,
  /**
   * The total steps.
   */
  steps: PropTypes.number.isRequired,
};

MobileStepper.defaultProps = {
  activeStep: 0,
  kind: 'dots',
  disableBack: false,
  disableNext: false,
};

export default withStyles(styleSheet)(MobileStepper);
