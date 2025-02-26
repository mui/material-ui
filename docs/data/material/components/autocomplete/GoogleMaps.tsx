import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Paper, { PaperProps } from '@mui/material/Paper';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import parse from 'autosuggest-highlight/parse';
// For the sake of this demo, we have to use debounce to reduce Google Maps Places API quote use
// But prefer to use throttle in practice
// import throttle from 'lodash/throttle';
import { debounce } from '@mui/material/utils';

// This key was created specifically for the demo in mui.com.
// You need to create a new one for your application.
const GOOGLE_MAPS_API_KEY = 'AIzaSyC3aviU6KHXAjoSnxcw6qbOhjnFctbxPkE';

const useEnhancedEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

function loadScript(src: string, position: HTMLElement) {
  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.src = src;
  position.appendChild(script);
  return script;
}

interface MainTextMatchedSubstrings {
  offset: number;
  length: number;
}
interface StructuredFormatting {
  main_text: string;
  main_text_matched_substrings: readonly MainTextMatchedSubstrings[];
  secondary_text?: string;
}
interface PlaceType {
  description: string;
  structured_formatting: StructuredFormatting;
}

function CustomPaper(props: PaperProps) {
  const theme = useTheme();

  return (
    <Paper {...props}>
      {props.children}
      {/* Legal requirment https://developers.google.com/maps/documentation/javascript/policies#logo */}
      <Box
        sx={(staticTheme) => ({
          display: 'flex',
          justifyContent: 'flex-end',
          p: 1,
          pt: '1px',
          ...staticTheme.applyStyles('dark', {
            opacity: 0.8,
          }),
        })}
      >
        <img
          src={
            theme.palette.mode === 'dark'
              ? 'https://maps.gstatic.com/mapfiles/api-3/images/powered-by-google-on-non-white3_hdpi.png'
              : 'https://maps.gstatic.com/mapfiles/api-3/images/powered-by-google-on-white3_hdpi.png'
          }
          alt=""
          width="120"
          height="14"
        />
      </Box>
    </Paper>
  );
}

const fetch = debounce(
  async (
    request: { input: string; sessionToken: any },
    callback: (results?: readonly PlaceType[]) => void,
  ) => {
    try {
      const { suggestions } = await (
        window as any
      ).google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(
        request,
      );

      callback(
        suggestions.map((suggestion: any) => {
          const place = suggestion.placePrediction;
          // Map to the old AutocompleteService.getPlacePredictions format
          // https://developers.google.com/maps/documentation/javascript/places-migration-autocomplete
          return {
            description: place.text.text,
            structured_formatting: {
              main_text: place.mainText.text,
              main_text_matched_substrings: place.mainText.matches.map(
                (match: any) => ({
                  offset: match.startOffset,
                  length: match.endOffset - match.startOffset,
                }),
              ),
              secondary_text: place.secondaryText?.text,
            },
          };
        }),
      );
    } catch (err: any) {
      if (err.message === 'Quota exceeded for quota') {
        callback(request.input.length === 1 ? fakeAnswer.p : fakeAnswer.paris);
      }

      throw err;
    }
  },
  400,
);

const emptyOptions = [] as any;
let sessionToken: any;

export default function GoogleMaps() {
  const [value, setValue] = React.useState<PlaceType | null>(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState<readonly PlaceType[]>(emptyOptions);
  const callbackId = React.useId().replace(/:/g, '');
  const [loaded, setLoaded] = React.useState(false);

  if (typeof window !== 'undefined') {
    if (!document.querySelector('#google-maps')) {
      const GOOGLE_NAMESPACE = '_google_callback';
      const globalContext =
        // @ts-ignore
        window[GOOGLE_NAMESPACE] || (window[GOOGLE_NAMESPACE] = {});
      globalContext[callbackId] = () => {
        setLoaded(true);
      };

      const script = loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&loading=async&callback=${GOOGLE_NAMESPACE}.${callbackId}`,
        document.querySelector('head')!,
      );
      script.id = 'google-maps';
    } else if ((window as any).google && !loaded) {
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
      sessionToken = new (
        window as any
      ).google.maps.places.AutocompleteSessionToken();
    }

    fetch({ input: inputValue, sessionToken }, (results?: readonly PlaceType[]) => {
      if (!active) {
        return;
      }

      let newOptions: readonly PlaceType[] = [];

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
      slots={{
        paper: CustomPaper,
      }}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText="No locations"
      onChange={(event: any, newValue: PlaceType | null) => {
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
          matches.map((match: any) => [match.offset, match.offset + match.length]),
        );
        return (
          <li key={key} {...optionProps}>
            <Grid container sx={{ alignItems: 'center' }}>
              <Grid sx={{ display: 'flex', width: 44 }}>
                <LocationOnIcon sx={{ color: 'text.secondary' }} />
              </Grid>
              <Grid sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
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
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}

// Fake data in case Google Map Places API returns a rate limit.
const fakeAnswer = {
  p: [
    {
      description: 'Portugal',
      structured_formatting: {
        main_text: 'Portugal',
        main_text_matched_substrings: [{ offset: 0, length: 1 }],
      },
    },
    {
      description: 'Puerto Rico',
      structured_formatting: {
        main_text: 'Puerto Rico',
        main_text_matched_substrings: [{ offset: 0, length: 1 }],
      },
    },
    {
      description: 'Pakistan',
      structured_formatting: {
        main_text: 'Pakistan',
        main_text_matched_substrings: [{ offset: 0, length: 1 }],
      },
    },
    {
      description: 'Philippines',
      structured_formatting: {
        main_text: 'Philippines',
        main_text_matched_substrings: [{ offset: 0, length: 1 }],
      },
    },
    {
      description: 'Paris, France',
      structured_formatting: {
        main_text: 'Paris',
        main_text_matched_substrings: [{ offset: 0, length: 1 }],
        secondary_text: 'France',
      },
    },
  ],
  paris: [
    {
      description: 'Paris, France',
      structured_formatting: {
        main_text: 'Paris',
        main_text_matched_substrings: [{ offset: 0, length: 5 }],
        secondary_text: 'France',
      },
    },
    {
      description: 'Paris, TX, USA',
      structured_formatting: {
        main_text: 'Paris',
        main_text_matched_substrings: [{ offset: 0, length: 5 }],
        secondary_text: 'TX, USA',
      },
    },
    {
      description: "Paris Beauvais Airport, Route de l'Aéroport, Tillé, France",
      structured_formatting: {
        main_text: 'Paris Beauvais Airport',
        main_text_matched_substrings: [{ offset: 0, length: 5 }],
        secondary_text: "Route de l'Aéroport, Tillé, France",
      },
    },
    {
      description: 'Paris Las Vegas, South Las Vegas Boulevard, Las Vegas, NV, USA',
      structured_formatting: {
        main_text: 'Paris Las Vegas',
        main_text_matched_substrings: [{ offset: 0, length: 5 }],
        secondary_text: 'South Las Vegas Boulevard, Las Vegas, NV, USA',
      },
    },
    {
      description: "Paris La Défense Arena, Jardin de l'Arche, Nanterre, France",
      structured_formatting: {
        main_text: 'Paris La Défense Arena',
        main_text_matched_substrings: [{ offset: 0, length: 5 }],
        secondary_text: "Jardin de l'Arche, Nanterre, France",
      },
    },
  ],
};
