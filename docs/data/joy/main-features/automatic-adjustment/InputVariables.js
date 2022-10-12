import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import ListDivider from '@mui/joy/ListDivider';
import Input from '@mui/joy/Input';
import TextField from '@mui/joy/TextField';

export default function InputIntegration() {
  const [radius, setRadius] = React.useState(16);
  const [childHeight, setChildHeight] = React.useState(32);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Input
        size="md"
        placeholder="email@mui.com"
        endDecorator={
          <Button variant="soft" size="sm">
            Subscribe
          </Button>
        }
        sx={{
          '--Input-radius': `${radius}px`,
          '--Input-decorator-childHeight': `${childHeight}px`,
        }}
      />
      <ListDivider component="hr" />
      <Box sx={{ mx: 'auto', display: 'flex', gap: 2 }}>
        <TextField
          label="--Input-radius"
          size="sm"
          type="number"
          value={radius}
          onChange={(event) => setRadius(event.target.valueAsNumber)}
        />
        <TextField
          label="--Input-childHeight"
          size="sm"
          type="number"
          value={childHeight}
          onChange={(event) => setChildHeight(event.target.valueAsNumber)}
        />
      </Box>
    </Box>
  );
}
