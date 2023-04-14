import * as React from 'react';
import SelectUnstyled from '@mui/base/SelectUnstyled';
import OptionUnstyled from '@mui/base/OptionUnstyled';

export default function OrderedListSelect() {
  return (
    <SelectUnstyled slots={{ listbox: 'ol' }} defaultValue="First option">
      <OptionUnstyled value="First option">First option</OptionUnstyled>
      <OptionUnstyled value="Second option">Second option</OptionUnstyled>
    </SelectUnstyled>
  );
}
