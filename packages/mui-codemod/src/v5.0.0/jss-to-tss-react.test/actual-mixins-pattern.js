// Comment on first node where the first node will be removed and we should preserve this comment.
import clsx from "clsx";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

function mixins() {
  return {
    test: {
      backgroundColor: "purple",
      color: "white"
    }
  };
}
function cssProps() {
  return {
    paddingLeft: "8px"
  }
}

const useStyles = makeStyles(theme => {
  return mixins();
});

const useStyles2 = makeStyles(theme => ({
  ...mixins(),
  test2: {
    color: "red",
    ...cssProps()
  }
}));

export default function ComponentUsingStyles(props) {
  const classes = useStyles();
  const classes2 = useStyles2();
  return <div className={clsx(classes.test, classes2.test2)}>Test</div>;
}
