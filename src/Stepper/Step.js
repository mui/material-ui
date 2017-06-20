// @flow weak

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { createStyleSheet } from "jss-theme-reactor";
import withStyles from "../styles/withStyles";

export const styleSheet = createStyleSheet("MuiStep", theme => ({
  root: {
    flex: "0 0 auto"
  },
  horizontal: {
    marginLeft: -6,
  },
  vertical: {
    marginLeft: -14,
  }
}));

function Step(props) {
  const {
    active,
    completed,
    disabled,
    index,
    last,
    orientation,
    children,
    classes,
    ...other
  } = props;

  const className = classNames(
    classes.root,
    classes[orientation]
  );

  return (
    <div className={className} {...other}>
      {React.Children.map(children, child =>
        React.cloneElement(
          child,
          {
            active,
            completed,
            disabled,
            icon: index + 1,
            last,
            orientation,
            ...child.props,
          },
        )
      )}
    </div>
  );
}

Step.propTypes = {
  /**
   * Sets the step as active. Is passed to child components.
   */
  active: PropTypes.bool,
  /**
   * Should be `Step` sub-components such as `StepLabel`.
   */
  children: PropTypes.node,
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
   * @ignore
   * Used internally for numbering.
   */
  index: PropTypes.number.isRequired,
  /**
   * @ignore
   */
  last: PropTypes.bool,
  /**
   * @ignore
   */
  orientation: PropTypes.oneOf(["horizontal", "vertical"]).isRequired,
};

export default withStyles(styleSheet)(Step);
