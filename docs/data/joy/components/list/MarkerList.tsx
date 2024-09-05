import * as React from 'react';
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';
import Button from '@mui/joy/Button';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Stack from '@mui/joy/Stack';

export default function MarkerList() {
  const [type, setType] = React.useState<string | undefined>('disc');
  return (
    <Stack spacing={2}>
      <ToggleButtonGroup
        value={type}
        onChange={(event, newValue) => setType(newValue || undefined)}
      >
        <Button value="disc">disc</Button>
        <Button value="circle">circle</Button>
        <Button value="decimal">decimal</Button>
        <Button value="upper-roman">upper-roman</Button>
      </ToggleButtonGroup>
      <List marker={type}>
        <ListItem>The Shawshank Redemption</ListItem>
        <ListItem nested>
          <ListItem>Star Wars</ListItem>
          <List marker="circle">
            <ListItem>Episode I – The Phantom Menace</ListItem>
            <ListItem>Episode II – Attack of the Clones</ListItem>
            <ListItem>Episode III – Revenge of the Sith</ListItem>
          </List>
        </ListItem>
        <ListItem>The Lord of the Rings: The Two Towers</ListItem>
      </List>
    </Stack>
  );
}
