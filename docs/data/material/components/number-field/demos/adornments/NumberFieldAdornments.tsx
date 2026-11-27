import * as React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import NumberField from '@mui/material/NumberField';

export default function NumberFieldAdornments() {
  const [value, setValue] = React.useState<number | null>(5);
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
      {/* @focus-start */}
      <NumberField
        label="Hourly rate (USD)"
        defaultValue={25}
        min={0}
        startAdornment="$"
        endAdornment="/hr"
        controlsPosition="split"
      />
      <NumberField
        label="Quantity"
        inputRef={inputRef}
        value={value}
        onValueChange={setValue}
        min={0}
        controlsPosition="stacked"
        endAdornment={
          <IconButton
            aria-label="Clear quantity"
            size="small"
            disabled={value === null}
            onClick={() => {
              setValue(null);
              inputRef.current?.focus();
            }}
          >
            <ClearIcon fontSize="small" />
          </IconButton>
        }
      />
      {/* @focus-end */}
    </Box>
  );
}
