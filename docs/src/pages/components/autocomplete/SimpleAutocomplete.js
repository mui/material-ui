import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

const suggestions = [
  { label: 'Afghanistan' },
  { label: 'Aland Islands' },
  { label: 'Albania' },
  { label: 'Algeria' },
  { label: 'American Samoa' },
  { label: 'Andorra' },
  { label: 'Angola' },
  { label: 'Anguilla' },
  { label: 'Antarctica' },
  { label: 'Antigua and Barbuda' },
  { label: 'Argentina' },
  { label: 'Armenia' },
  { label: 'Aruba' },
  { label: 'Australia' },
  { label: 'Austria' },
  { label: 'Azerbaijan' },
  { label: 'Bahamas' },
  { label: 'Bahrain' },
  { label: 'Bangladesh' },
  { label: 'Barbados' },
  { label: 'Belarus' },
  { label: 'Belgium' },
  { label: 'Belize' },
  { label: 'Benin' },
  { label: 'Bermuda' },
  { label: 'Bhutan' },
  { label: 'Bolivia, Plurinational State of' },
  { label: 'Bonaire, Sint Eustatius and Saba' },
  { label: 'Bosnia and Herzegovina' },
  { label: 'Botswana' },
  { label: 'Bouvet Island' },
  { label: 'Brazil' },
  { label: 'British Indian Ocean Territory' },
  { label: 'Brunei Darussalam' },
];

function getSuggestions(value) {
  const enhancedValue = value.trim().toLowerCase();
  const length = enhancedValue.length;

  return length
    ? suggestions
        .filter(suggestion => suggestion.label.slice(0, length).toLowerCase() === enhancedValue)
        .slice(0, 5)
    : [];
}

function getSuggestionValue(suggestion) {
  return suggestion.label;
}

export default function SimpleAutocomplete() {
  const [value, setValue] = React.useState('');
  const classes = useStyles();

  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleSuggestionSelect = newValue => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Autocomplete
        label="Country"
        name="country"
        placeholder="Search a country (starts with A or B)..."
        id="simple-autocomplete"
        getSuggestions={getSuggestions}
        getSuggestionValue={getSuggestionValue}
        onChange={handleChange}
        onSuggestionSelect={handleSuggestionSelect}
        value={value}
        fullWidth
      />
    </div>
  );
}
