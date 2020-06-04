import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { expectType } from '@material-ui/types';

{
  // https://github.com/mui-org/material-ui/issues/12999
  const defaulted = (
    <TextField InputProps={{ classes: { inputTypeSearch: 'search-input', input: 'input' } }} />
  );
  const standard = (
    <TextField variant="standard" InputProps={{ classes: { inputTypeSearch: 'search-input' } }} />
  );
  const standardOutlinedClassname = (
    <TextField
      variant="standard"
      InputProps={
        {
          // notchedOutline is only used with variant "outlined"
          // FIXME this no longer generates an error in TS 3.2, see https://github.com/Microsoft/TypeScript/issues/28926
          // classes: { inputTypeSearch: 'search-input', notchedOutline: 'notched-outline' }, // @ts-expect-error
        }
      }
    />
  );

  const filled = (
    <TextField
      variant="filled"
      InputProps={{ classes: { inputAdornedStart: 'adorned-start' } }}
      onChange={(event) => {
        // type inference for event still works?
        const value = event.target.value;
        expectType<string, typeof value>(value);
      }}
    />
  );

  const outlined = (
    <TextField variant="outlined" InputProps={{ classes: { notchedOutline: 'notched-outline' } }} />
  );
}

// https://github.com/mui-org/material-ui/issues/17369#issuecomment-529622304
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
