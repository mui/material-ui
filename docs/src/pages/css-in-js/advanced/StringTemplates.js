import React from 'react';
import { jssPreset, StylesProvider, makeStyles } from '@material-ui/styles';
import { create } from 'jss';
import jssTemplate from 'jss-plugin-template';
import Button from '@material-ui/core/Button';

const jss = create({
  plugins: [jssTemplate(), ...jssPreset().plugins],
});

const useStyles = makeStyles({
  root: `
    background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
    border-radius: 3;
    border: 0;
    color: white;
    height: 48px;
    padding: 0 30px;
    box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
  `,
});

function Child() {
  const classes = useStyles();
  return <Button className={classes.root}>String templates</Button>;
}

function StringTemplates() {
  return (
    <StylesProvider jss={jss}>
      <Child />
    </StylesProvider>
  );
}

export default StringTemplates;
