import * as React from 'react';
import { expectType } from '@mui/types';
import TextField from '@mui/material/TextField';
import type { TextFieldProps } from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { FormHelperTextProps } from '@mui/material/FormHelperText';
import type { SelectChangeEvent } from '@mui/material/Select';

{
  // https://github.com/mui/material-ui/issues/33742
  const handleNativeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {};

  <TextField select slotProps={{ select: { native: true } }} onChange={handleNativeChange} />;

  <TextField
    select
    slotProps={{ select: { native: true } }}
    onChange={(event) => {
      expectType<React.ChangeEvent<HTMLSelectElement>, typeof event>(event);
    }}
  />;

  <TextField
    select
    value="one"
    onChange={(event, child) => {
      expectType<SelectChangeEvent<string>, typeof event>(event);
      expectType<React.ReactNode, typeof child>(child);
    }}
  />;

  <TextField
    select
    onChange={(event) => {
      expectType<SelectChangeEvent<string>, typeof event>(event);
    }}
  />;

  <TextField
    select
    defaultValue={1}
    slotProps={{ select: { native: false } }}
    onChange={(event) => {
      expectType<SelectChangeEvent<number>, typeof event>(event);
    }}
  />;

  <TextField
    select
    value={['one']}
    slotProps={{ select: { multiple: true } }}
    onChange={(event) => {
      expectType<SelectChangeEvent<string[]>, typeof event>(event);
    }}
  />;

  <TextField
    select
    slotProps={{
      select: (ownerState) => {
        expectType<boolean | undefined, typeof ownerState.select>(ownerState.select);
        return { native: true };
      },
    }}
    onChange={(event) => {
      expectType<React.ChangeEvent<HTMLSelectElement>, typeof event>(event);
    }}
  />;

  <TextField
    select
    defaultValue="one"
    slotProps={{ select: () => ({ native: false }) }}
    onChange={(event) => {
      expectType<SelectChangeEvent<string>, typeof event>(event);
    }}
  />;

  (['standard', 'filled', 'outlined'] as const).forEach((variant) => {
    <TextField
      variant={variant}
      select
      slotProps={{ select: { native: true } }}
      onChange={(event) => {
        expectType<React.ChangeEvent<HTMLSelectElement>, typeof event>(event);
      }}
    />;

    <TextField
      variant={variant}
      select
      value="one"
      onChange={(event, child) => {
        expectType<SelectChangeEvent<string>, typeof event>(event);
        expectType<React.ReactNode, typeof child>(child);
      }}
    />;
  });

  // @ts-expect-error A native select change handler requires a native select.
  <TextField select onChange={handleNativeChange} />;

  // @ts-expect-error A text input does not emit a native select change event.
  <TextField onChange={handleNativeChange} />;

  <TextField
    select
    slotProps={{ select: { native: true } }}
    // @ts-expect-error A select change handler does not receive mouse events.
    onChange={(event: React.MouseEvent<HTMLSelectElement>) => {}}
  />;

  <TextField
    onChange={(event) => {
      expectType<React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, typeof event>(event);
    }}
  />;

  <TextField
    multiline
    onChange={(event) => {
      expectType<React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, typeof event>(event);
    }}
  />;
}

function TextFieldWrapper(props: TextFieldProps) {
  return <TextField {...props} />;
}

function TextFieldComponentPropsWrapper(props: React.ComponentProps<typeof TextField>) {
  return <TextField {...props} />;
}

function DynamicSelectTextField({ select, native }: { select: boolean; native: boolean }) {
  return (
    <TextField
      select={select}
      slotProps={{ select: { native } }}
      onChange={(event) => {
        expectType<React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, typeof event>(event);
      }}
    />
  );
}

{
  // https://github.com/mui/material-ui/issues/12999
  const defaulted = (
    <TextField
      slotProps={{ input: { classes: { inputTypeSearch: 'search-input', input: 'input' } } }}
    />
  );
  const standard = (
    <TextField
      variant="standard"
      slotProps={{ input: { classes: { inputTypeSearch: 'search-input' } } }}
    />
  );

  const StandardInputAdorned = (
    <TextField
      variant="standard"
      slotProps={{
        input: { classes: { adornedStart: 'search-input', adornedEnd: 'search-input' } },
      }}
    />
  );
  const DefaultInputAdorned = (
    <TextField
      slotProps={{
        input: { classes: { adornedStart: 'search-input', adornedEnd: 'search-input' } },
      }}
    />
  );

  const outlinedInputTypeSearch = (
    <TextField
      variant="outlined"
      slotProps={{ input: { classes: { inputTypeSearch: 'search-input' } } }}
    />
  );
  const filledInputTypeSearch = (
    <TextField
      variant="filled"
      slotProps={{ input: { classes: { inputTypeSearch: 'search-input' } } }}
    />
  );
  const standardOutlinedClassname = (
    <TextField
      variant="standard"
      slotProps={{
        input: {
          // notchedOutline is only used with variant "outlined"
          // FIXME this no longer generates an error in TS 3.2, see https://github.com/Microsoft/TypeScript/issues/28926
          // classes: { inputTypeSearch: 'search-input', notchedOutline: 'notched-outline' }, // @ts-expect-error
        },
      }}
    />
  );

  const filled = (
    <TextField
      variant="filled"
      slotProps={{ input: { classes: { adornedStart: 'adorned-start' } } }}
      onChange={(event) => {
        // type inference for event still works?
        const value = event.target.value;
        expectType<string, typeof value>(value);
      }}
    />
  );

  const outlined = (
    <TextField
      variant="outlined"
      slotProps={{ input: { classes: { notchedOutline: 'notched-outline' } } }}
    />
  );
}

// https://github.com/mui/material-ui/issues/17369#issuecomment-529622304
function FocusHandlerTest() {
  const inputHandler = React.useCallback((event: React.FocusEvent<HTMLInputElement>) => {}, []);
  // Probably a decent tradeoff. React.EventHandler being bivariant does allow unsound
  // types in this case. I should probably be consistent with the strictness stance
  // but there are increasing issue reports demanding these unsound types to "write cleaner code"
  // so lets see how these are received
  const input = <TextField onFocus={inputHandler} />;

  // this or a generic `HTMLElement` is probably closer to what we actually use.
  const valueHandler = React.useCallback((event: React.FocusEvent<{ value: string }>) => {}, []);
  const textfield = <TextField onFocus={valueHandler} />;

  // sound narrowing with runtime overhead
  const genericHandler = React.useCallback((event: React.FocusEvent<HTMLElement>) => {
    if (event.currentTarget instanceof HTMLInputElement) {
      console.assert(event.currentTarget.value === 'foo');
    }
  }, []);
  const element = <TextField onFocus={genericHandler} />;

  const fieldHandler = React.useCallback(
    (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {},
    [],
  );
  const field = <TextField onFocus={fieldHandler} />;

  return null;
}

{
  const HelperText = ({ children }: FormHelperTextProps) => (
    <Typography component="h6">{children}</Typography>
  );

  <TextField
    sx={{ mt: 4 }}
    label="Enter some stuff"
    defaultValue="Hello"
    helperText="Hello, world!"
    slotProps={{ formHelperText: { component: HelperText } }}
  />;
}
