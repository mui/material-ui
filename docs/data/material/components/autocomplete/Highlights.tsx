import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import top100Films from './top100Films';

export default function Highlights() {
  return (
    <Autocomplete
      sx={{ width: 300 }}
      options={top100Films}
      renderInput={(params) => (
        <TextField {...params} label="Highlights" margin="normal" />
      )}
      renderOption={(props, option, { inputValue }) => {
        const { key, ...optionProps } = props;
        const matches = match(option.label, inputValue, { insideWords: true });
        const parts = parse(option.label, matches);

        return (
          <li key={key} {...optionProps}>
            <div>
              {parts.map((part, index) => (
                <Box
                  key={index}
                  component={part.highlight ? 'mark' : 'span'}
                  sx={(theme) => ({
                    backgroundColor: part.highlight
                      ? alpha(theme.palette.warning.main, 0.24)
                      : 'transparent',
                    borderRadius: 0.5,
                    color: 'inherit',
                    fontWeight: part.highlight ? 700 : 400,
                    paddingInline: part.highlight ? 0.25 : 0,
                  })}
                >
                  {part.text}
                </Box>
              ))}
            </div>
          </li>
        );
      }}
    />
  );
}
