import React from "react";
import { makeStyles } from 'tss-react/mui';

function mixins() {
  return {
    test: {
      backgroundColor: "purple",
      color: "white"
    }
  };
}

const useStyles = makeStyles()(theme => {
  return mixins();
});

const useStyles2 = makeStyles()(theme => ({
  ...mixins(),
  test2: {
    color: "red"
  }
}));

export default function ComponentUsingStyles(props) {
  const { classes, cx } = useStyles();
  const { classes: classes2 } = useStyles2();
  return <div className={cx(classes.test, classes2.test2)}>Test</div>;
}
