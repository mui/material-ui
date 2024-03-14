import * as React from 'react';
import Select from '@mui/joy/Select';
import Stack from '@mui/joy/Stack';
import Option from '@mui/joy/Option';

export default function SelectVariants() {
  return (
    <Stack spacing={2}>
      <Select defaultValue="dog">
        <Option value="dog">Dog</Option>
        <Option value="cat">Cat</Option>
        <Option value="fish">Fish</Option>
        <Option value="bird">Bird</Option>
      </Select>
      <Select defaultValue="dog" variant="plain">
        <Option value="dog">Dog</Option>
        <Option value="cat">Cat</Option>
        <Option value="fish">Fish</Option>
        <Option value="bird">Bird</Option>
      </Select>
      <Select defaultValue="dog" variant="soft">
        <Option value="dog">Dog</Option>
        <Option value="cat">Cat</Option>
        <Option value="fish">Fish</Option>
        <Option value="bird">Bird</Option>
      </Select>
      <Select defaultValue="dog" variant="solid">
        <Option value="dog">Dog</Option>
        <Option value="cat">Cat</Option>
        <Option value="fish">Fish</Option>
        <Option value="bird">Bird</Option>
      </Select>
    </Stack>
  );
}
