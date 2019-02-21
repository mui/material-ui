import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import SelectableGroup from '@material-ui/lab/SelectableGroup';
import useSelectedState from '@material-ui/lab/SelectableGroup/useSelectedState';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

function SelectableCheckbox(props) {
  const { value, ...other } = props;
  const { toggle, isValueSelected } = useSelectedState();

  const handleChange = event => toggle(event, event.target.value);

  return (
    <Checkbox checked={isValueSelected(value)} onClick={handleChange} value={value} {...other} />
  );
}

SelectableCheckbox.propTypes = {
  value: PropTypes.any,
};

function Checkboxes() {
  const classes = useStyles();
  const [selected, setSelected] = React.useState([]);

  const handleChange = (event, newSelected) => setSelected(newSelected);

  return (
    <div className={classes.root}>
      <SelectableGroup onChange={handleChange}>
        <FormGroup>
          <FormControlLabel control={<SelectableCheckbox value="gilad" />} label="Gilad Gray" />
          <FormControlLabel control={<SelectableCheckbox value="jason" />} label="Jason Killian" />
          <FormControlLabel
            control={<SelectableCheckbox value="antoine" />}
            label="Antoine Llorca"
          />
        </FormGroup>
      </SelectableGroup>
      <Typography>{`Selected Value: ${JSON.stringify(selected)}`}</Typography>
    </div>
  );
}

export default Checkboxes;
