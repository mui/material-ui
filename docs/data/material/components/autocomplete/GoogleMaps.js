import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid2 from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';

// This key was created specifically for the demo in mui.com.
// You need to create a new one for your application.
const GOOGLE_MAPS_API_KEY = 'AIzaSyC3aviU6KHXAjoSnxcw6qbOhjnFctbxPkE';

const useEnhancedEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

function loadScript(src, position) {
  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.src = src;
  position.appendChild(script);
  return script;
}

const fetch = throttle(async (request, callback) => {
  const { suggestions } =
    await window.google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(
      request,
    );

  callback(
    suggestions.map((suggestion) => {
      const place = suggestion.placePrediction;
      // Map to the old AutocompleteService.getPlacePredictions format
      // https://developers.google.com/maps/documentation/javascript/places-migration-autocomplete
      return {
        description: place.text.text,
        structured_formatting: {
          main_text: place.mainText.text,
          main_text_matched_substrings: place.mainText.matches.map((match) => ({
            offset: match.startOffset,
            length: match.endOffset - match.startOffset,
          })),
          secondary_text: place.secondaryText?.text,
        },
      };
    }),
  );
}, 300);

const emptyOptions = [];
let sessionToken;

export default function GoogleMaps() {
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState(emptyOptions);
  const callbackId = React.useId().replace(/:/g, '');
  const [loaded, setLoaded] = React.useState(false);

  if (typeof window !== 'undefined') {
    if (!document.querySelector('#google-maps')) {
      const GOOGLE_NAMESPACE = '_google_callback';
      const globalContext =
        window[GOOGLE_NAMESPACE] || (window[GOOGLE_NAMESPACE] = {});
      globalContext[callbackId] = () => {
        setLoaded(true);
      };

      const script = loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&loading=async&callback=${GOOGLE_NAMESPACE}.${callbackId}`,
        document.querySelector('head'),
      );
      script.id = 'google-maps';
    } else if (window.google && !loaded) {
      setLoaded(true);
    }
  }

  useEnhancedEffect(() => {
    if (!loaded) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(value ? [value] : emptyOptions);
      return undefined;
    }

    // Allow to resolve the out of order request resolution.
    let active = true;

    if (!sessionToken) {
      sessionToken = new window.google.maps.places.AutocompleteSessionToken();
    }

    fetch({ input: inputValue, sessionToken }, (results) => {
      if (!active) {
        return;
      }

      let newOptions = [];

      if (results) {
        newOptions = results;

        if (value) {
          newOptions = [
            value,
            ...results.filter((result) => result.description !== value.description),
          ];
        }
      } else if (value) {
        newOptions = [value];
      }
      setOptions(newOptions);
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, loaded]);

  return (
    <Autocomplete
      sx={{ width: 300 }}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.description
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText="No locations"
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Add a location" fullWidth />
      )}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        const matches = option.structured_formatting.main_text_matched_substrings;

        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match) => [match.offset, match.offset + match.length]),
        );
        return (
          <li key={key} {...optionProps}>
            <Grid2 container sx={{ alignItems: 'center' }}>
              <Grid2 sx={{ display: 'flex', width: 44 }}>
                <LocationOnIcon sx={{ color: 'text.secondary' }} />
              </Grid2>
              <Grid2 sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                {parts.map((part, index) => (
                  <Box
                    key={index}
                    component="span"
                    sx={{
                      fontWeight: part.highlight
                        ? 'fontWeightBold'
                        : 'fontWeightRegular',
                    }}
                  >
                    {part.text}
                  </Box>
                ))}
                {option.structured_formatting.secondary_text ? (
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {option.structured_formatting.secondary_text}
                  </Typography>
                ) : null}
              </Grid2>
            </Grid2>
          </li>
        );
      }}
    />
  );
}
