import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
  children: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing(3),
  },
}));

export default function IndeterminateCheckbox() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([true, false]);

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([checked[0], event.target.checked]);
  };

  const children = (
    <div className={classes.children}>
      <FormControlLabel
        label="Child 1"
        control={
          <Checkbox
            checked={checked[0]}
            color="primary"
            onChange={handleChange2}
          />
        }
      />
      <FormControlLabel
        label="Child 2"
        control={
          <Checkbox
            checked={checked[1]}
            color="primary"
            onChange={handleChange3}
          />
        }
      />
    </div>
  );

  return (
    <div>
      <FormControlLabel
        label="Parent"
        control={
          <Checkbox
            checked={checked[0] && checked[1]}
            indeterminate={checked[0] !== checked[1]}
            onChange={handleChange1}
            color="primary"
          />
        }
      />
      {children}
    </div>
  );
}
