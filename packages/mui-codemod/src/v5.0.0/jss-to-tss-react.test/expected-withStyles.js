import React from "react";
import { withStyles } from 'tss-react/mui';

const styles = {
  test: {
    backgroundColor: "purple",
    color: "white"
  }
};

function MyComponent({ classes }) {
  return <div className={classes.test}>Styled</div>;
}

const StyledMyComponent = withStyles(MyComponent, styles);

export default StyledMyComponent;
