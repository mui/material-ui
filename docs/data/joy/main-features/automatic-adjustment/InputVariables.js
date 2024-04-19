import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import ListDivider from '@mui/joy/ListDivider';
import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';

export default function InputVariables() {
  const [radius, setRadius] = React.useState(16);
  const [childHeight, setChildHeight] = React.useState(28);
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
          '--Input-decoratorChildHeight': `${childHeight}px`,
        }}
      />
      <ListDivider component="hr" />
      <Box sx={{ mx: 'auto', display: 'flex', gap: 2 }}>
        <FormControl>
          <FormLabel>--Input-radius</FormLabel>
          <Input
            size="sm"
            type="number"
            value={radius}
            onChange={(event) => setRadius(event.target.valueAsNumber)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>--Input-decoratorChildHeight</FormLabel>
          <Input
            size="sm"
            type="number"
            value={childHeight}
            onChange={(event) => setChildHeight(event.target.valueAsNumber)}
          />
        </FormControl>
      </Box>
    </Box>
  );
}
