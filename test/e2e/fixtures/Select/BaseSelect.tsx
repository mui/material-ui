import * as React from 'react';
import { Option, Select } from '@mui/base';

function BaseSelect() {
  return (
    <Select multiple>
      <Option value={10}>10</Option>
      <Option value={20}>20</Option>
      <Option value={30}>30</Option>
      <Option value={40}>40</Option>
    </Select>
  );
}

export default BaseSelect;
