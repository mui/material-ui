import * as React from 'react';
import { isFragment } from 'react-is';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import StepperContext from '../Stepper/StepperContext';
import StepContext from './StepContext';

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
    active: activeProp,
    children,
    classes,
    className,
    completed: completedProp,
    disabled: disabledProp,
    expanded = false,
    index,
    last,
    ...other
  } = props;

  const { activeStep, connector, alternativeLabel, orientation, nonLinear } = React.useContext(
    StepperContext,
  );

  let [active = false, completed = false, disabled = false] = [
    activeProp,
    completedProp,
    disabledProp,
  ];

  if (activeStep === index) {
    active = activeProp !== undefined ? activeProp : true;
  } else if (!nonLinear && activeStep > index) {
    completed = completedProp !== undefined ? completedProp : true;
  } else if (!nonLinear && activeStep < index) {
    disabled = disabledProp !== undefined ? disabledProp : true;
  }

  const contextValue = React.useMemo(
    () => ({ index, last, expanded, icon: index + 1, active, completed, disabled }),
    [index, last, expanded, active, completed, disabled],
  );

  const newChildren = (
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
      {connector && alternativeLabel && index !== 0 ? connector : null}

      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return null;
        }

        if (process.env.NODE_ENV !== 'production') {
          if (isFragment(child)) {
            console.error(
              [
                "Material-UI: The Step component doesn't accept a Fragment as a child.",
                'Consider providing an array instead.',
              ].join('\n'),
            );
          }
        }

        return React.cloneElement(child, {
          ...child.props,
        });
      })}
    </div>
  );

  return (
    <StepContext.Provider value={contextValue}>
      {connector && !alternativeLabel && index !== 0 ? (
        <React.Fragment>
          {connector}
          {newChildren}
        </React.Fragment>
      ) : (
        newChildren
      )}
    </StepContext.Provider>
  );
});

Step.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Sets the step as active. Is passed to child components.
   */
  active: PropTypes.bool,
  /**
   * Should be `Step` sub-components such as `StepLabel`, `StepContent`.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
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
   * The position of the step.
   */
  index: PropTypes.number,
  /**
   * If `true`, the Step will be displayed as rendered last.
   */
  last: PropTypes.bool,
};

export default withStyles(styles, { name: 'MuiStep' })(Step);
