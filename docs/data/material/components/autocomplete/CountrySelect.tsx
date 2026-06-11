import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import countries from './countries';

export default function CountrySelect() {
  return (
    <Autocomplete
      sx={{ width: 320 }}
      options={countries}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Box
            key={key}
            component="li"
            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            {...optionProps}
          >
            <img
              loading="lazy"
              decoding="async"
              width={20}
              src={`https://flagcdn.com/${option.code.toLowerCase()}.svg`}
              alt=""
            />
            <Box
              component="span"
              sx={{
                minWidth: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {option.label} ({option.code})
            </Box>
            <Box
              component="span"
              sx={{ ml: 'auto', flexShrink: 0, whiteSpace: 'nowrap' }}
            >
              +{option.countryCallingCode}
            </Box>
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a country"
          slotProps={{
            ...params.slotProps,
            htmlInput: {
              ...params.slotProps.htmlInput,
              autoComplete: 'new-password', // disable autocomplete and autofill
            },
          }}
        />
      )}
    />
  );
}
