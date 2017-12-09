import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';

export const styles = theme => ({
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

/**
 * @ignore - internal component.
 */
function StepConnector(props) {
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

StepConnector.propTypes = {
  /**
   * @ignore
   * Set internally by Step when it's supplied with the alternativeLabel property.
   */
  alternativeLabel: PropTypes.bool,
  /**
   * Useful to extend the style applied to the component.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
};

StepConnector.defaultProps = {
  alternativeLabel: false,
  orientation: 'horizontal',
};

export default withStyles(styles, { name: 'MuiStepConnector' })(StepConnector);
