import React from "react";
import { withStyles } from "@material-ui/core";
import clsx from "clsx";

const styles1 = {
  test: {
    backgroundColor: "purple",
    color: "white"
  }
};

function Comp1({ classes }) {
  return <div className={classes.test}>Comp1</div>;
}

const StyledComp1 = withStyles(styles1)(Comp1);

const styles2 = {
  test: {
    backgroundColor: "black",
    color: "lime"
  },
  test2: {
    backgroundColor: "white",
    color: "purple",
    "&$test": {
      backgroundColor: "pink",
      color: "blue"
    }
  }
};

function Comp2({ classes }) {
  return (
    <>
      <div className={classes.test}>Comp2 test</div>
      <StyledComp1 />
      <div className={classes.test2}>Comp2 test2</div>
      <div className={clsx(classes.test, classes.test2)}>
        Comp2 test and test2
      </div>
    </>
  );
}

const StyledComp2 = withStyles(styles2)(Comp2);

export default StyledComp2;
