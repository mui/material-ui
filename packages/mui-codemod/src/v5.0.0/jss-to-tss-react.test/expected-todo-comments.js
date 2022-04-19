import React from "react";
import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
const useStyles = makeStyles()((_theme, _params, classes) => ({
  test: {
    backgroundColor: "purple",
    color: "white",
    [`&.${classes.qualifier}`]: {
      textDecoration: props => (props.textDecoration)
    },
  },
  qualifier: {},
}));

// TODO jss-to-tss-react codemod: Unable to handle style definition reliably.
const useStyles2 = makeStyles()({
  test2: props => ({
    backgroundColor: "blue",
    color: "lime"
  })
});

function InnerComponent() {
  const { classes } = useStyles2();
  return <div className={classes.test2}>Inner Test</div>;
}
export default function ComponentUsingStyles(props) {
  const { classes, cx } = useStyles(props, {
    props: props
  });
  return <>
    <div className={classes.test}>Test<InnerComponent/></div>
    <div className={cx(classes.test, classes.qualifier)}>Qualifier Test</div>
    </>;
}
