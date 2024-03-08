import * as React from 'react';
import Select, { SelectChangeEvent, SelectProps } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { createTheme } from '@mui/material/styles';

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

  // @ts-expect-error
  <Select<number, 'filled'> />;
  // @ts-expect-error
  <Select<number, 'standard'> />;
  // @ts-expect-error
  <Select<number, 'standard'> variant="filled" />;
  // @ts-expect-error
  <Select<number, 'filled'> variant="standard" />;

  <Select<number, 'outlined'> />;

  <Select<number, 'filled'> variant="filled" />;
  <Select<number, 'outlined'> variant="outlined" />;
  <Select<number, 'standard'> variant="standard" />;

  <Select variant="filled" />;
  <Select variant="standard" />;
  <Select variant="outlined" />;
  <Select />;

  const defaultProps: SelectProps<number> = {};
  const outlinedProps: SelectProps<number> = {
    variant: 'outlined',
  };
  const filledProps: SelectProps<number> = {
    variant: 'filled',
  };
  const standardProps: SelectProps<number> = {
    variant: 'standard',
  };

  <Select {...defaultProps} />;
  <Select {...outlinedProps} />;
  <Select {...filledProps} />;
  <Select {...standardProps} />;
  <Select<number> {...outlinedProps} />;
  <Select<number> {...defaultProps} />;
  <Select<number, 'standard'> {...standardProps} />;
  // @ts-expect-error variant type mismatch
  <Select<number> {...filledProps} />;
  // @ts-expect-error variant type mismatch
  <Select<number, 'outlined'> {...filledProps} />;
  // @ts-expect-error variant type mismatch
  <Select<number, 'standard'> {...filledProps} />;

  const rawDefaultProps: SelectProps = {};
  const rawOutlinedProps: SelectProps = {
    variant: 'outlined',
  };
  const rawFilledProps: SelectProps = {
    variant: 'filled',
  };

  <Select {...rawDefaultProps} />;
  <Select {...rawOutlinedProps} />;
  <Select {...rawFilledProps} />;

  // @ts-expect-error hiddenLabel is not present in outlined variant
  <Select {...defaultProps} hiddenLabel />;
  // @ts-expect-error hiddenLabel is not present in outlined variant
  <Select {...outlinedProps} hiddenLabel />;
  <Select {...filledProps} hiddenLabel />;
  // @ts-expect-error hiddenLabel is not present in standard variant
  <Select {...standardProps} hiddenLabel />;
}
