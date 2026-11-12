import * as React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import NumberField from '@mui/material/NumberField';

export default function NumberFieldAdornments() {
  // @focus-start @padding 1
  const [value, setValue] = React.useState<number | null>(5);
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <NumberField
      label="Quantity"
      inputRef={inputRef}
      value={value}
      onValueChange={setValue}
      min={0}
      controlsPosition="stacked"
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
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
            </InputAdornment>
          ),
        },
      }}
    />
  );
  // @focus-end
}
