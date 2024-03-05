import * as React from 'react';
// TODO v6: replace with material-next Menu when available https://github.com/mui/material-ui/pull/38934
import MenuItem from '@mui/material/MenuItem';
// TODO v6: replace with material-next's extendTheme when implementing Material Design 3
import { createTheme } from '@mui/material/styles';
import Select, { SelectChangeEvent } from '@mui/material-next/Select';

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

  // Tests presence of `root` class in SelectClasses
  const theme = createTheme({
    components: {
      MuiSelect: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
          },
        },
      },
    },
  });

  // tests deep slot prop forwarding up to the modal backdrop
  <Select
    MenuProps={{
      slotProps: {
        root: {
          slotProps: {
            backdrop: {
              style: {
                backgroundColor: 'transparent',
              },
            },
          },
        },
      },
    }}
  />;
}
