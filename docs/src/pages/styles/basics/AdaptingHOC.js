import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    background: props =>
      `linear-gradient(45deg, ${props.color === 'red'
        ? '#FE6B8B 30%, #FF8E53' : '#2196F3 30%, #21CBF3'}
      90%)`,
    border: 0,
    borderRadius: 3,
    boxShadow: props =>
      `0 3px 5px 2px rgba(${props.color === 'red'
          ? '255, 105, 135, .3' : '33, 203, 243, .3'})`,
    color: 'white',
    height: 48,
    padding: '0 30px',
    margin: 8,
  },
};

function MyButtonRaw(props) {
  const { classes, color, ...other } = props;
  return <Button className={classes.root} {...other} />;
}

MyButtonRaw.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
};

const MyButton = withStyles(styles)(MyButtonRaw);

function AdaptingHOC() {
  return (
    <React.Fragment>
      <MyButton color="red">Red</MyButton>
      <MyButton color="blue">Blue</MyButton>
    </React.Fragment>
  );
}

export default AdaptingHOC;
