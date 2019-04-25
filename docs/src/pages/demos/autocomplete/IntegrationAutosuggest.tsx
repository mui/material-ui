import React, { useState } from 'react';
import deburr from 'lodash/deburr';
import { ChangeEvent, SuggestionsFetchRequestedParams } from 'react-autosuggest';
import Autosuggest from './Autosuggest';

interface Country {
  label: string;
}

const countries: Country[] = [
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

function IntegrationAutosuggest() {
  const [label, setLabel] = useState('');
  const [suggestions, setSuggestions] = useState<Country[]>([]);

  // Returns the string value from the supplied suggestion
  const getSuggestionValue = (suggestion: Country) => suggestion.label;

  // Autosuggest will call this function whenever whenever the suggestion value changes
  const handleChange = (event: React.FormEvent<any>, params: ChangeEvent) => {
    setLabel(params.newValue);
  };

  // Teach Autosuggest how to calculate suggestions for any given input value
  const getSuggestions = (value: string) => {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
      ? []
      : countries.filter(country => {
          const keep =
            count < 5 && country.label.slice(0, inputLength).toLowerCase() === inputValue;

          if (keep) {
            count += 1;
          }

          return keep;
        });
  };

  // Autosuggest will call this function whenever it wants to update suggestions
  const handleSuggestionsFetchRequested = ({ value }: SuggestionsFetchRequestedParams) => {
    setSuggestions(getSuggestions(value));
  };

  // Autosuggest will call this function whenever it wants to clear suggestions
  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  return (
    <Autosuggest<Country>
      getSuggestionValue={getSuggestionValue}
      onChange={handleChange}
      onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
      onSuggestionsClearRequested={handleSuggestionsClearRequested}
      suggestions={suggestions}
      value={label}
    />
  );
}

export default IntegrationAutosuggest;
