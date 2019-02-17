import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  "@global": {
    ".cssjss-advanced-global-example": {
      height: 100,
      width: 100,
      backgroundColor: "red"
    }
  },
};

function GlobalClass() {
  return (
    <React.Fragment>
      <div className="cssjss-advanced-global-example" />
    </React.Fragment>
  );
}

export default withStyles(styles)(GlobalClass);
