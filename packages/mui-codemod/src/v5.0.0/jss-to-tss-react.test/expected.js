import React from "react";
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()({
  preWrap: {
    whiteSpace: "pre-wrap"
  }
});

const ComponentUsingStyles = (props) => {
  const { classes } = useStyles();
  return (
    <div className={classes.preWrap}>Test</div>
  );
}
