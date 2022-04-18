import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

function mixins() {
  return {
    test: {
      backgroundColor: "purple",
      color: "white"
    }
  };
}

const useStyles = makeStyles(theme => {
  return mixins();
});

const useStyles2 = makeStyles(theme => ({
  ...mixins(),
  test2: {
    color: "red"
  }
}));

export default function ComponentUsingStyles(props) {
  const classes = useStyles();
  const classes2 = useStyles2();
  return <div className={clsx(classes.test, classes2.test2)}>Test</div>;
}
