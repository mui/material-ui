import * as React from 'react';
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

export default function SelectIndicator() {
  return (
    <Select
      placeholder="Select a pet…"
      indicator={<KeyboardArrowDown />}
      sx={{
        width: 240,
        [`& .${selectClasses.indicator}`]: {
          transition: '0.2s',
          [`&.${selectClasses.expanded}`]: {
            transform: 'rotate(-180deg)',
          },
        },
      }}
    >
      <Option value="dog">Dog</Option>
      <Option value="cat">Cat</Option>
      <Option value="fish">Fish</Option>
      <Option value="bird">Bird</Option>
    </Select>
  );
}
