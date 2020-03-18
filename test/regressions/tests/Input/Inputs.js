import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: 200,
  },
  input: {
    margin: 10,
  },
  large: {
    width: 300,
  },
};

function Inputs(props) {
  const { classes } = props;
  const inputRef = React.useRef();

  React.useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div>
      <div className={classes.container}>
        <Input value="Hello world" className={classes.input} />
        <Input placeholder="Placeholder" className={classes.input} />
        <Input value="Disabled" className={classes.input} disabled />
        <Input error value="Error" className={classes.input} />
        <Input value="Focused" inputRef={inputRef} className={classes.input} />
        <Input type="search" defaultValue="Hello world" />
      </div>
      <Input value="Large input" className={clsx(classes.input, classes.large)} />
    </div>
  );
}

Inputs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Inputs);
