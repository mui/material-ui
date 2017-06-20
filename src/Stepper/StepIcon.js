import React from "react";
import PropTypes from "prop-types";
import { createStyleSheet } from "jss-theme-reactor";
import classNames from "classnames";
import CheckCircle from "material-ui-icons/CheckCircle";
import withStyles from "../styles/withStyles";
import StepPositionIcon from './StepPositionIcon';

export const styleSheet = createStyleSheet("MuiStepIcon", theme => ({
  checkIcon: {
    fill: theme.palette.primary[500],
    display: "block",
  },
}));

function StepIcon(props) {
  const { completed, icon, active, classes, theme } = props;
  const iconType = typeof icon;

  if (iconType === "number" || iconType === "string") {
    if (completed) {
      return <CheckCircle className={classes.checkIcon} />;
    }
    return (
      <StepPositionIcon
        theme={theme}
        classes={classes}
        position={icon}
        active={active}
      />
    );
  }

  return icon;
}

StepIcon.propTypes = {
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * The icon displayed by the step label.
   */
  icon: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.number
  ]),
};

export default withStyles(styleSheet)(StepIcon);
