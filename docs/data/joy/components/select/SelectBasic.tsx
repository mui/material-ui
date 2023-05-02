import * as React from 'react';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

export default function SelectBasic() {
  const handleChange = (
    event: React.SyntheticEvent | null,
    newValue: string | null,
  ) => {
    alert(`You chose "${newValue}"`);
  };
  return (
    <Select defaultValue="dog" onChange={handleChange}>
      <Option value="dog">Dog</Option>
      <Option value="cat">Cat</Option>
      <Option value="fish">Fish</Option>
      <Option value="bird">Bird</Option>
    </Select>
  );
}
