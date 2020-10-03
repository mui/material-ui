import * as React from 'react';
import Select from '@material-ui/core/Select';

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
}
