import * as React from 'react';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

function SelectPosition() {
  return (
    <Select
      placeholder="Select address"
      sx={{ width: 240 }}
      slotProps={{
        listbox: {
          placement: 'bottom-start',
        },
      }}
    >
      <Option value="1">
        Flat 5, 24 Bhlenheiman Avenue, South Kensington, EW13 9SD
      </Option>
      <Option value="2">
        Flat 6, 24 Bhlenheiman Avenue, South Kensington, EW13 9SD
      </Option>
      <Option value="3">
        Flat 6b, 24 Bhlenheiman Avenue, South Kensington, EW13 9SD
      </Option>
    </Select>
  );
}

export default SelectPosition;
