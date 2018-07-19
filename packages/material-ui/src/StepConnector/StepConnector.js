import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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
    left: 'calc(50% + 20px)',
    right: 'calc(-50% + 20px)',
  },
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

function StepConnector(props) {
  const { alternativeLabel, className: classNameProp, classes, orientation, ...other } = props;

  const className = classNames(
    classes.root,
    classes[orientation],
    {
      [classes.alternativeLabel]: alternativeLabel,
    },
    classNameProp,
  );
  const lineClassName = classNames(classes.line, {
    [classes.lineHorizontal]: orientation === 'horizontal',
    [classes.lineVertical]: orientation === 'vertical',
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
   * Override or extend the styles applied to the component.
   * See [CSS API](#css-api) below for more details.
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
