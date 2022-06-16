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

export const useExportedStyles = makeStyles({
  test: {
    backgroundColor: "purple",
    color: "white",
  }
});

const useStyles2 = makeStyles({
  test2: props => ({
    backgroundColor: "blue",
    color: "lime"
  })
});

const useStyles3 = makeStyles({
  test3: props => {
    return {
      backgroundColor: "blue",
      color: "lime"
    };
  }
});

const useGlobalStyles = makeStyles(() => ({
  '@global': {
    '.sample': {
      backgroundColor: "purple",
      color: "white",
    }
  }
}));

function InnerComponent() {
  const classes = useStyles2();
  return <div className={classes.test2}>Inner Test</div>;
}
function ComponentUsingStyles(props) {
  const classes = useStyles(props);
  return <>
    <div className={classes.test}>Test<InnerComponent/></div>
    <div className={clsx(classes.test, classes.qualifier)}>Qualifier Test</div>
    </>;
}

export default useStyles3;
