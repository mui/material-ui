'use client';
import * as React from 'react';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const options = ['New York', 'New Orleans', 'New Delhi', 'London', 'Paris'];
const filterOptions = createFilterOptions<string>();
const getOptionLabel = (option: string) => option;

export default function AutocompleteFreeSoloEnter() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string | null>(null);
  const [inputValue, setInputValue] = React.useState('');
  const [highlightedOption, setHighlightedOption] = React.useState<string | null>(null);
  const [submitCount, setSubmitCount] = React.useState(0);

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement> & { defaultMuiPrevented?: boolean },
  ) => {
    if (event.key !== 'Enter') {
      return;
    }

    const textbox = event.currentTarget.querySelector('[role="combobox"]');
    const activeDescendantId = textbox?.getAttribute('aria-activedescendant');
    const activeOption = activeDescendantId ? document.getElementById(activeDescendantId) : null;
    const activeOptionIndex = Number(activeOption?.getAttribute('data-option-index'));
    const filteredOptions = filterOptions(options, { inputValue, getOptionLabel });
    const activeDescendantOption = Number.isNaN(activeOptionIndex)
      ? null
      : filteredOptions[activeOptionIndex];
    const optionToCommit = activeDescendantOption ?? highlightedOption;

    if (!optionToCommit) {
      return;
    }

    event.defaultMuiPrevented = true;
    event.preventDefault();
    setValue(optionToCommit);
    setInputValue(optionToCommit);
    setOpen(false);
  };

  return (
    <Box
      component="form"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitCount((count) => count + 1);
      }}
      sx={{ p: 4, width: 360 }}
    >
      <Stack spacing={2}>
        <Autocomplete<string, false, false, true>
          autoHighlight
          freeSolo
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          value={value}
          inputValue={inputValue}
          onChange={(_event, newValue) => {
            setValue(newValue);
          }}
          onHighlightChange={(_event, option) => {
            setHighlightedOption(option);
          }}
          onInputChange={(_event, newInputValue) => {
            setInputValue(newInputValue);
            setHighlightedOption(null);
          }}
          onKeyDown={handleKeyDown}
          options={options}
          renderInput={(params) => <TextField {...params} autoFocus label="City" />}
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
        <Typography variant="body2">Value: {value ?? '-'}</Typography>
        <Typography variant="body2">Submits: {submitCount}</Typography>
      </Stack>
    </Box>
  );
}
