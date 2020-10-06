import * as React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

function genericValueTest() {
  function handleChangeWithSameTypeAsSelect(
    event: React.ChangeEvent<{ name?: string; value: number }>,
  ) {}
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
}
