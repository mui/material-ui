import * as React from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function genericValueTest() {
  function handleChangeWithSameTypeAsSelect(event: SelectChangeEvent<number>) {}
  <Select<number> onChange={handleChangeWithSameTypeAsSelect} />;

  function handleChangeWithDifferentTypeFromSelect(
    event: React.ChangeEvent<{ name?: string; value: string }>,
  ) {}
  <Select<number>
    // @ts-expect-error
    onChange={handleChangeWithDifferentTypeFromSelect}
  />;

  <Select<string>
    // @ts-expect-error defaultValue should be a string
    defaultValue={1}
    // @ts-expect-error Value should be a string
    value={10}
  />;

  <Select
    onChange={(event) => {
      function testString(value: string) {}
      function testNumber(value: number) {}

      testString(event.target.value);
      // @ts-expect-error
      testNumber(event.target.value);
    }}
    value="1"
  />;

  <Select onChange={(event) => console.log(event.target.value)} value="1">
    <MenuItem value="1" />
    {/* Whoops. The value in onChange won't be a string */}
    <MenuItem value={2} />
  </Select>;

  // notched prop should be available (inherited from OutlinedInputProps) and NOT throw typescript error
  <Select notched />;

  // disabledUnderline prop should be available (inherited from InputProps) and NOT throw typescript error
  <Select disableUnderline />;
}
