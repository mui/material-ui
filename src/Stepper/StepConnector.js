// @flow weak

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { createStyleSheet } from "jss-theme-reactor";
import withStyles from "../styles/withStyles";

export const styleSheet = createStyleSheet("MuiStepConnector", theme => ({
  root: {
    flex: "1 1 auto"
  },
  line: {
    display: "block",
    borderColor: theme.palette.line.stepper,
  },
  rootVertical: {
    marginLeft: 14 + 11 // padding + 1/2 icon
  },
  lineHorizontal: {
    marginLeft: -6,
    borderTopStyle: "solid",
    borderTopWidth: 1
  },
  lineVertical: {
    borderLeftStyle: "solid",
    borderLeftWidth: 1,
    minHeight: 28
  }
}));

function StepConnector(props) {
  const {
    className: classNameProp,
    classes,
    orientation,
    ...other
  } = props;

  const className = classNames(
    classes.root,
    { [classes.rootVertical]: orientation === "vertical" },
    classNameProp
  );
  const lineClassName = classNames(
    classes.line,
    {
      [classes.lineHorizontal]: orientation === 'horizontal',
      [classes.lineVertical]: orientation === 'vertical',
    }
  );

  return (
    <div className={className} {...other}>
      <span className={lineClassName} />
    </div>
  );
}

StepConnector.propTypes = {
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
  orientation: PropTypes.oneOf(["horizontal", "vertical"]).isRequired
};

export default withStyles(styleSheet)(StepConnector);
