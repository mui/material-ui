import React from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    input: {
      marginLeft: 8,
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      width: 1,
      height: 28,
      margin: 4,
    },
    popper: {
      margin: theme.spacing(1, 0),
    },
  }),
);

interface OptionType {
  label: string;
}

const suggestions: OptionType[] = [
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

function getSuggestions(value: string) {
  const enhancedValue = value.trim().toLowerCase();
  const length = enhancedValue.length;

  return length
    ? suggestions
        .filter(suggestion => suggestion.label.slice(0, length).toLowerCase() === enhancedValue)
        .slice(0, 5)
    : [];
}

function getSuggestionValue(suggestion: OptionType) {
  return suggestion.label;
}

export default function CustomizedAutocomplete() {
  const [value, setValue] = React.useState('');
  const classes = useStyles();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSuggestionSelect = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <Autocomplete
      id="customized-autocomplete"
      classes={{
        popper: classes.popper,
      }}
      value={value}
      onChange={handleChange}
      onSuggestionSelect={handleSuggestionSelect}
      getSuggestions={getSuggestions}
      getSuggestionValue={getSuggestionValue}
    >
      {/* Make sure the input element is always inside the element that ref is referring to */}
      {({ ref, onChange, onFocus, onKeyDown }) => (
        <Paper className={classes.root} ref={ref}>
          <IconButton className={classes.iconButton} aria-label="menu">
            <MenuIcon />
          </IconButton>
          <InputBase
            className={classes.input}
            onChange={onChange}
            onFocus={onFocus}
            onKeyDown={onKeyDown}
            value={value}
            placeholder="Search Google Maps"
            inputProps={{ 'aria-label': 'search google maps' }}
          />
          <IconButton className={classes.iconButton} aria-label="search">
            <SearchIcon />
          </IconButton>
          <Divider className={classes.divider} />
          <IconButton color="primary" className={classes.iconButton} aria-label="directions">
            <DirectionsIcon />
          </IconButton>
        </Paper>
      )}
    </Autocomplete>
  );
}
