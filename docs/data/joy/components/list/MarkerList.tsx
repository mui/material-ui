import * as React from 'react';
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';
import Button from '@mui/joy/Button';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';

export default function MarkerList() {
  const [type, setType] = React.useState<string | null>('disc');
  return (
    <div>
      <ToggleButtonGroup
        value={type}
        onChange={(event, newValue) => setType(newValue)}
      >
        <Button value="disc">disc</Button>
        <Button value="circle">circle</Button>
        <Button value="decimal">decimal</Button>
        <Button value="upper-roman">upper-roman</Button>
      </ToggleButtonGroup>
      <List
        sx={{
          '& li': {
            display: 'list-item',
            listStyleType: type,
            listStylePosition: 'inside',
            minHeight: 'auto', // Set to `auto` because list-item will not align the text vertically.
          },
        }}
      >
        <ListItem>The Shawshank Redemption</ListItem>
        <ListItem>The Lord of the Rings: The Two Towers</ListItem>
        <ListItem>Star Wars: Episode IV - A New Hope</ListItem>
      </List>
    </div>
  );
}
