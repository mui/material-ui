import * as React from 'react';
import Stack from '@mui/joy/Stack';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Button from '@mui/joy/Button';

export default function ControlledOpenSelect() {
  const [age, setAge] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const skipRef = React.useRef(false);

  const handleChange = (
    event: React.SyntheticEvent | null,
    newValue: string | null,
  ) => {
    setAge(newValue!);
  };

  return (
    <Stack spacing={2} useFlexGap>
      <Button
        variant="solid"
        onMouseDown={() => {
          skipRef.current = true;
        }}
        onClick={() => {
          skipRef.current = false;
          setOpen((bool) => !bool);
        }}
      >
        Toggle the select
      </Button>
      <div>
        <Select
          listboxOpen={open}
          onListboxOpenChange={(isOpen) => {
            if (!skipRef.current) {
              setOpen(isOpen);
            }
          }}
          value={age}
          onChange={handleChange}
        >
          <Option value="">
            <em>None</em>
          </Option>
          <Option value={10}>Ten</Option>
          <Option value={20}>Twenty</Option>
          <Option value={30}>Thirty</Option>
        </Select>
      </div>
    </Stack>
  );
}
