import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  preWrap: {
    whiteSpace: "pre-wrap"
  }
});

const ComponentUsingStyles = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.preWrap}>Test</div>
  );
}
