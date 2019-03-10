import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function SimpleSelect() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    age: '',
    name: 'hai',
  });

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  function handleChange(event) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <form className={classes.root} autoComplete="off">
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-simple">Age</InputLabel>
        <Select
          value={values.age}
          onChange={handleChange}
          inputProps={{
            name: 'age',
            id: 'age-simple',
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-helper">Age</InputLabel>
        <Select
          value={values.age}
          onChange={handleChange}
          input={<Input name="age" id="age-helper" />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <FormHelperText>Some important helper text</FormHelperText>
      </FormControl>
      <FormControl className={classes.formControl}>
        <Select
          value={values.age}
          onChange={handleChange}
          displayEmpty
          name="age"
          className={classes.selectEmpty}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <FormHelperText>Without label</FormHelperText>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel shrink htmlFor="age-label-placeholder">
          Age
        </InputLabel>
        <Select
          value={values.age}
          onChange={handleChange}
          input={<Input name="age" id="age-label-placeholder" />}
          displayEmpty
          name="age"
          className={classes.selectEmpty}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <FormHelperText>Label + placeholder</FormHelperText>
      </FormControl>
      <FormControl className={classes.formControl} disabled>
        <InputLabel htmlFor="name-disabled">Name</InputLabel>
        <Select
          value={values.name}
          onChange={handleChange}
          input={<Input name="name" id="name-disabled" />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="hai">Hai</MenuItem>
          <MenuItem value="olivier">Olivier</MenuItem>
          <MenuItem value="kevin">Kevin</MenuItem>
        </Select>
        <FormHelperText>Disabled</FormHelperText>
      </FormControl>
      <FormControl className={classes.formControl} error>
        <InputLabel htmlFor="name-error">Name</InputLabel>
        <Select
          value={values.name}
          onChange={handleChange}
          name="name"
          renderValue={value => `⚠️  - ${value}`}
          input={<Input id="name-error" />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="hai">Hai</MenuItem>
          <MenuItem value="olivier">Olivier</MenuItem>
          <MenuItem value="kevin">Kevin</MenuItem>
        </Select>
        <FormHelperText>Error</FormHelperText>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="name-readonly">Name</InputLabel>
        <Select
          value={values.name}
          onChange={handleChange}
          input={<Input name="name" id="name-readonly" readOnly />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="hai">Hai</MenuItem>
          <MenuItem value="olivier">Olivier</MenuItem>
          <MenuItem value="kevin">Kevin</MenuItem>
        </Select>
        <FormHelperText>Read only</FormHelperText>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-auto-width">Age</InputLabel>
        <Select
          value={values.age}
          onChange={handleChange}
          input={<Input name="age" id="age-auto-width" />}
          autoWidth
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <FormHelperText>Auto width</FormHelperText>
      </FormControl>
      <FormControl className={classes.formControl}>
        <Select
          value={values.age}
          onChange={handleChange}
          name="age"
          displayEmpty
          className={classes.selectEmpty}
        >
          <MenuItem value="" disabled>
            Placeholder
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <FormHelperText>Placeholder</FormHelperText>
      </FormControl>
      <FormControl required className={classes.formControl}>
        <InputLabel htmlFor="age-required">Age</InputLabel>
        <Select
          value={values.age}
          onChange={handleChange}
          name="age"
          inputProps={{
            id: 'age-required',
          }}
          className={classes.selectEmpty}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
          Age
        </InputLabel>
        <Select
          value={values.age}
          onChange={handleChange}
          input={<OutlinedInput labelWidth={labelWidth} name="age" id="outlined-age-simple" />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel htmlFor="filled-age-simple">Age</InputLabel>
        <Select
          value={values.age}
          onChange={handleChange}
          input={<FilledInput name="age" id="filled-age-simple" />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </form>
  );
}

export default SimpleSelect;
