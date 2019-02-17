import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  foo: {
    "&.bar": {
      height: 100,
      width: 100,
      backgroundColor: "blue"
    }
  }
};

function HybridClass(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <div className={`${classes.foo} bar`} />
    </React.Fragment>
  );
}

HybridClass.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HybridClass);
