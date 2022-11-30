import * as React from 'react';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

export default function OrderedListSelect() {
  return (
    <Select slots={{ listbox: 'ol' }} defaultValue="First option">
      <Option value="First option">First option</Option>
      <Option value="Second option">Second option</Option>
    </Select>
  );
}
