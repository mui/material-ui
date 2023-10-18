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

function Comp3({ classes }) {
  return <div className={classes.test}>Inline Styles
    <div className={classes.test2}>Nested Inline Styles</div>
  </div>;
}
const StyledComp3a = withStyles({test: {backgroundColor: "yellow"}})(Comp3);
const StyledComp3b = withStyles({test: {backgroundColor: "yellow", color: "lime", "& $test2": {backgroundColor: "orange"}}, test2: {}})(Comp3);

const styles3c = (theme) => {
  const bgColor1 = theme.palette.primary.main;
  const color1 = theme.palette.primary.contrastText;
  const bgColor2 = theme.palette.secondary.main;
  const color2 = theme.palette.secondary.contrastText;
  return {
    test: {
      backgroundColor: bgColor1,
      color: color1,
      "& $test2": {
        backgroundColor: bgColor2,
        color: color2
      }
    },
    test2: {}
  };
};
const StyledComp3c = withStyles(styles3c)(Comp3);

export default function App() {
  return <>
    <StyledComp2/>
    <StyledComp3a/>
    <StyledComp3b/>
    <StyledComp3c/>
  </>;
}
