import React from "react";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles(() => ({
  test: {
    backgroundColor: "purple",
    color: "white",
    "&$qualifier": {
      textDecoration: props => (props.textDecoration)
    },
  },
  qualifier: {},
}));

const useStyles2 = makeStyles({
  test2: props => ({
    backgroundColor: "blue",
    color: "lime"
  })
});

function InnerComponent() {
  const classes = useStyles2();
  return <div className={classes.test2}>Inner Test</div>;
}
export default function ComponentUsingStyles(props) {
  const classes = useStyles(props);
  return <>
    <div className={classes.test}>Test<InnerComponent/></div>
    <div className={clsx(classes.test, classes.qualifier)}>Qualifier Test</div>
    </>;
}
