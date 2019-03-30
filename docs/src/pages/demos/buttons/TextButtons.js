import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

function TextButtons() {
  const classes = useStyles();

  return (
    <div>
      <Button className={classes.button}>Default</Button>
      <Button color="primary" className={classes.button}>
        Primary
      </Button>
      <Button color="secondary" className={classes.button}>
        Secondary
      </Button>
      <Button disabled className={classes.button}>
        Disabled
      </Button>
      <Button href="#text-buttons" className={classes.button}>
        Link
      </Button>
      <input
        accept="image/*"
        className={classes.input}
        id="text-button-file"
        multiple
        type="file"
      />
      <label htmlFor="text-button-file">
        <Button component="span" className={classes.button}>
          Upload
        </Button>
      </label>
    </div>
  );
}

export default TextButtons;
