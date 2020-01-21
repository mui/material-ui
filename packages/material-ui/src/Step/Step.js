import React from 'react';
import { isFragment } from 'react-is';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';

export const styles = {
  /* Styles applied to the root element. */
  root: {},
  /* Styles applied to the root element if `orientation="horizontal"`. */
  horizontal: {
    paddingLeft: 8,
    paddingRight: 8,
  },
  /* Styles applied to the root element if `orientation="vertical"`. */
  vertical: {},
  /* Styles applied to the root element if `alternativeLabel={true}`. */
  alternativeLabel: {
    flex: 1,
    position: 'relative',
  },
  /* Pseudo-class applied to the root element if `completed={true}`. */
  completed: {},
};

const Step = React.forwardRef(function Step(props, ref) {
  const {
    active = false,
    alternativeLabel,
    children,
    classes,
    className,
    completed = false,
    connector,
    disabled = false,
    expanded = false,
    index,
    last,
    orientation,
    ...other
  } = props;

  return (
    <div
      className={clsx(
        classes.root,
        classes[orientation],
        {
          [classes.alternativeLabel]: alternativeLabel,
          [classes.completed]: completed,
        },
        className,
      )}
      ref={ref}
      {...other}
    >
      {connector &&
        alternativeLabel &&
        index !== 0 &&
        React.cloneElement(connector, {
          orientation,
          alternativeLabel,
          index,
          active,
          completed,
          disabled,
        })}
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) {
          return null;
        }

        if (process.env.NODE_ENV !== 'production') {
          if (isFragment(child)) {
            console.error(
              [
                "Material-UI: the Step component doesn't accept a Fragment as a child.",
                'Consider providing an array instead.',
              ].join('\n'),
            );
          }
        }

        return React.cloneElement(child, {
          active,
          alternativeLabel,
          completed,
          disabled,
          expanded,
          last,
          icon: index + 1,
          orientation,
          ...child.props,
        });
      })}
    </div>
  );
});

Step.propTypes = {
  /**
   * Sets the step as active. Is passed to child components.
   */
  active: PropTypes.bool,
  /**
   * @ignore
   * Set internally by Stepper when it's supplied with the alternativeLabel property.
   */
  alternativeLabel: PropTypes.bool,
  /**
   * Should be `Step` sub-components such as `StepLabel`, `StepContent`.
   */
  children: PropTypes.node,
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
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * @ignore
   * Passed down from Stepper if alternativeLabel is also set.
   */
  connector: PropTypes.element,
  /**
   * Mark the step as disabled, will also disable the button if
   * `StepButton` is a child of `Step`. Is passed to child components.
   */
  disabled: PropTypes.bool,
  /**
   * Expand the step.
   */
  expanded: PropTypes.bool,
  /**
   * @ignore
   * Used internally for numbering.
   */
  index: PropTypes.number,
  /**
   * @ignore
   */
  last: PropTypes.bool,
  /**
   * @ignore
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
};

export default withStyles(styles, { name: 'MuiStep' })(Step);
