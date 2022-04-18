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

const useStyles = makeStyles(theme => {
  return mixins();
});

export default function ComponentUsingStyles(props) {
  const classes = useStyles();
  return <div className={classes.test}>Test</div>;
}
