import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing(1),
    },
  }),
);

function ComposedTextField() {
  const [labelWidth, setLabelWidth] = React.useState(0);
  const [name, setName] = React.useState('Composed TextField');
  const labelRef = React.useRef<HTMLLabelElement>(null);
  const classes = useStyles();

  React.useEffect(() => {
    setLabelWidth(labelRef.current!.offsetWidth);
  }, []);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  return (
    <div className={classes.container}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="component-simple">Name</InputLabel>
        <Input id="component-simple" value={name} onChange={handleChange} />
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="component-helper">Name</InputLabel>
        <Input
          id="component-helper"
          value={name}
          onChange={handleChange}
          aria-describedby="component-helper-text"
        />
        <FormHelperText id="component-helper-text">Some important helper text</FormHelperText>
      </FormControl>
      <FormControl className={classes.formControl} disabled>
        <InputLabel htmlFor="component-disabled">Name</InputLabel>
        <Input id="component-disabled" value={name} onChange={handleChange} />
        <FormHelperText>Disabled</FormHelperText>
      </FormControl>
      <FormControl className={classes.formControl} error>
        <InputLabel htmlFor="component-error">Name</InputLabel>
        <Input
          id="component-error"
          value={name}
          onChange={handleChange}
          aria-describedby="component-error-text"
        />
        <FormHelperText id="component-error-text">Error</FormHelperText>
      </FormControl>
      <FormControl className={classes.formControl} variant="outlined">
        <InputLabel ref={labelRef} htmlFor="component-outlined">
          Name
        </InputLabel>
        <OutlinedInput
          id="component-outlined"
          value={name}
          onChange={handleChange}
          labelWidth={labelWidth}
        />
      </FormControl>
      <FormControl className={classes.formControl} variant="filled">
        <InputLabel htmlFor="component-filled">Name</InputLabel>
        <FilledInput id="component-filled" value={name} onChange={handleChange} />
      </FormControl>
    </div>
  );
}

export default ComposedTextField;
