import React from "react";
import { withStyles } from "@material-ui/core";

const styles = {
  test: {
    backgroundColor: "purple",
    color: "white"
  }
};

function MyComponent({ classes }) {
  return <div className={classes.test}>Styled</div>;
}

const StyledMyComponent = withStyles(styles)(MyComponent);

export default StyledMyComponent;
