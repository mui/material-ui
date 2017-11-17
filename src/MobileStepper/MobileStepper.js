// @flow weak
// @inheritedComponent Paper

import React from 'react';
import type { Element } from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import Paper from '../Paper';
import { capitalizeFirstLetter } from '../utils/helpers';
import { LinearProgress } from '../Progress';

export const styles = (theme: Object) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: theme.palette.background.default,
    padding: theme.spacing.unit,
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
});

export type Position = 'bottom' | 'top' | 'static';
export type Type = 'text' | 'dots' | 'progress';

type ProvidedProps = {
  activeStep: number,
  classes: Object,
  position: Position,
  type: Type,
};

export type Props = {
  /**
   * Set the active step (zero based index).
   * Defines which dot is highlighted when the type is 'dots'.
   */
  activeStep?: number,
  /**
   * A back button element. For instance, it can be be a `Button` or a `IconButton`.
   */
  backButton: Element<any>,
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * A next button element. For instance, it can be be a `Button` or a `IconButton`.
   */
  nextButton: Element<any>,
  /**
   * Set the positioning type.
   */
  position?: Position,
  /**
   * The total steps.
   */
  steps: number,
  /**
   * The type of mobile stepper to use.
   */
  type?: Type,
};

function MobileStepper(props: ProvidedProps & Props) {
  const {
    activeStep,
    backButton,
    classes,
    className: classNameProp,
    position,
    type,
    nextButton,
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
      {backButton}
      {type === 'dots' && (
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
        </div>
      )}
      {type === 'progress' && (
        <div className={classes.progress}>
          <LinearProgress mode="determinate" value={Math.ceil(activeStep / (steps - 1) * 100)} />
        </div>
      )}
      {nextButton}
    </Paper>
  );
}

MobileStepper.defaultProps = {
  activeStep: 0,
  position: 'bottom',
  type: 'dots',
};

export default withStyles(styles, { name: 'MuiMobileStepper' })(MobileStepper);
