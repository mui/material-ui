import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '25ch',
    },
  }),
);

export default function LayoutTextFields() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <TextField
          id="outlined-full-width"
          label="Label"
          style={{ margin: 8 }}
          placeholder="Placeholder"
          helperText="Full width!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="None"
          id="outlined-margin-none"
          defaultValue="Default Value"
          className={classes.textField}
          helperText="Some important text"
        />
        <TextField
          label="Dense"
          id="outlined-margin-dense"
          defaultValue="Default Value"
          className={classes.textField}
          helperText="Some important text"
          margin="dense"
        />
        <TextField
          label="Normal"
          id="outlined-margin-normal"
          defaultValue="Default Value"
          className={classes.textField}
          helperText="Some important text"
          margin="normal"
        />
      </div>
      <div>
        <TextField
          id="filled-full-width"
          label="Label"
          style={{ margin: 8 }}
          placeholder="Placeholder"
          helperText="Full width!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
        />
        <TextField
          label="None"
          id="filled-margin-none"
          defaultValue="Default Value"
          className={classes.textField}
          helperText="Some important text"
          variant="filled"
        />
        <TextField
          label="Dense"
          id="filled-margin-dense"
          defaultValue="Default Value"
          className={classes.textField}
          helperText="Some important text"
          margin="dense"
          variant="filled"
        />
        <TextField
          label="Normal"
          id="filled-margin-normal"
          defaultValue="Default Value"
          className={classes.textField}
          helperText="Some important text"
          margin="normal"
          variant="filled"
        />
      </div>
      <div>
        <TextField
          id="standard-full-width"
          label="Label"
          style={{ margin: 8 }}
          placeholder="Placeholder"
          helperText="Full width!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
        />
        <TextField
          label="None"
          id="margin-none"
          defaultValue="Default Value"
          className={classes.textField}
          helperText="Some important text"
          variant="standard"
        />
        <TextField
          label="Dense"
          id="margin-dense"
          defaultValue="Default Value"
          className={classes.textField}
          helperText="Some important text"
          margin="dense"
          variant="standard"
        />
        <TextField
          label="Normal"
          id="margin-normal"
          defaultValue="Default Value"
          className={classes.textField}
          helperText="Some important text"
          margin="normal"
          variant="standard"
        />
      </div>
    </div>
  );
}
