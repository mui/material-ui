import React from 'react';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { Omit } from '@material-ui/types';

const styles = createStyles({
  root: {
    background: (props: MyButtonRawProps) =>
      props.color === 'red'
        ? 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
        : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: (props: MyButtonRawProps) =>
      props.color === 'red'
        ? '0 3px 5px 2px rgba(255, 105, 135, .3)'
        : '0 3px 5px 2px rgba(33, 203, 243, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    margin: 8,
  },
});

interface MyButtonRawProps {
  color: 'red' | 'blue';
}

function MyButtonRaw(
  props: WithStyles<typeof styles> & Omit<ButtonProps, keyof MyButtonRawProps> & MyButtonRawProps,
) {
  const { classes, color, ...other } = props;
  return <Button className={classes.root} {...other} />;
}

const MyButton = withStyles(styles)(MyButtonRaw);

export default function AdaptingHOC() {
  return (
    <React.Fragment>
      <MyButton color="red">Red</MyButton>
      <MyButton color="blue">Blue</MyButton>
    </React.Fragment>
  );
}
