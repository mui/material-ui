import * as React from 'react';
import { Select } from '@mui/base/Select';
import { Option } from '@mui/base/Option';

export default function OverridingInternalSlot() {
  return (
    <Select
      slots={{ listbox: 'ol' }}
      slotProps={{
        listbox: {
          style: {
            backgroundColor: 'white',
          },
        },
      }}
      defaultValue="First option"
    >
      <Option value="First option">First option</Option>
      <Option value="Second option">Second option</Option>
    </Select>
  );
}
