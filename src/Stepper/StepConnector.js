// @flow

import React from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import type { Orientation } from './Stepper';

export const styles = (theme: Object) => ({
  root: {
    flex: '1 1 auto',
  },
  line: {
    display: 'block',
    borderColor: theme.palette.line.stepper,
  },
  rootVertical: {
    marginLeft: 12, // half icon
    padding: `0 0 ${theme.spacing.unit}px`,
  },
  lineHorizontal: {
    borderTopStyle: 'solid',
    borderTopWidth: 1,
  },
  lineVertical: {
    borderLeftStyle: 'solid',
    borderLeftWidth: 1,
    minHeight: 24,
  },
  alternativeLabelRoot: {
    position: 'absolute',
    top: theme.spacing.unit + 4,
    left: 'calc(50% + 20px)',
    right: 'calc(-50% + 20px)',
  },
  alternativeLabelLine: {
    marginLeft: 0,
  },
});

type ProvidedProps = {
  alternativeLabel: boolean,
  classes: Object,
  orientation: Orientation,
};

export type Props = {
  /**
   * @ignore
   * Set internally by Step when it's supplied with the alternativeLabel property.
   */
  alternativeLabel?: boolean,
  /**
   * Useful to extend the style applied to the component.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * @ignore
   */
  orientation?: Orientation,
};

/**
 * @ignore - internal component.
 */
function StepConnector(props: ProvidedProps & Props) {
  const { alternativeLabel, className: classNameProp, classes, orientation, ...other } = props;

  const className = classNames(
    {
      [classes.root]: !alternativeLabel,
      [classes.rootVertical]: orientation === 'vertical',
      [classes.alternativeLabelRoot]: alternativeLabel,
    },
    classNameProp,
  );
  const lineClassName = classNames(classes.line, {
    [classes.lineHorizontal]: orientation === 'horizontal',
    [classes.lineVertical]: orientation === 'vertical',
    [classes.alternativeLabelLine]: alternativeLabel,
  });

  return (
    <div className={className} {...other}>
      <span className={lineClassName} />
    </div>
  );
}

StepConnector.defaultProps = {
  alternativeLabel: false,
  orientation: 'horizontal',
};

export default withStyles(styles)(StepConnector);
