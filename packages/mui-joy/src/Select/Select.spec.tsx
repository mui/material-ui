import * as React from 'react';
import { expectType } from '@mui/types';
import Select, { SelectOwnerState } from '@mui/joy/Select';
import { SelectOnChangeEvent } from '@mui/base';

<Select defaultListboxOpen />;
<Select
  value=""
  onChange={(e, val) => {
    expectType<SelectOnChangeEvent<string, false>, typeof e>(e);
    expectType<string | null, typeof val>(val);
    if (e) {
      expectType<string | null, typeof e.target.value>(e.target.value);
    }
  }}
/>;
<Select
  value={2}
  onChange={(e, val) => {
    expectType<SelectOnChangeEvent<number, false>, typeof e>(e);
    expectType<number | null, typeof val>(val);
    if (e) {
      expectType<number | null, typeof e.target.value>(e.target.value);
    }
  }}
/>;
// any object
<Select
  value={{ name: '' }}
  onChange={(e, val) => {
    expectType<SelectOnChangeEvent<{ name: string }, false>, typeof e>(e);
    expectType<{ name: string } | null, typeof val>(val);
    if (e) {
      expectType<{ name: string } | null, typeof e.target.value>(e.target.value);
    }
  }}
/>;

interface Value {
  key: string;
  name: { id: string };
}
<Select<Value>
  // @ts-expect-error the provided value type does not match the Value
  value={{ name: '' }}
  onChange={(e, val) => {
    expectType<Value | null, typeof val>(val);
  }}
/>;
<Select sx={{ bgcolor: (theme) => theme.vars.palette.background.body }} />;
<Select
  slotProps={{
    button: {
      'aria-labelledby': 'some-id',
      'aria-describedby': 'some-id',
      onClick: () => {},
      sx: {
        bgcolor: (theme) => theme.vars.palette.background.body,
      },
    },
    listbox: {
      component: 'div',
      sx: {
        '--List-padding': '8px',
      },
    },
  }}
/>;

// @ts-expect-error
<Select invalidProp={0} />;

<Select component="a" href="#" />;

<Select
  slots={{
    root: 'div',
    button: 'div',
    startDecorator: 'div',
    endDecorator: 'div',
    indicator: 'div',
    listbox: 'div',
  }}
/>;

<Select
  slotProps={{
    root: {
      component: 'div',
      'data-testid': 'test',
    },
    button: {
      component: 'div',
      'data-testid': 'test',
    },
    startDecorator: {
      component: 'div',
      'data-testid': 'test',
    },
    endDecorator: {
      component: 'div',
      'data-testid': 'test',
    },
    indicator: {
      component: 'div',
      'data-testid': 'test',
    },
    listbox: {
      component: 'div',
      'data-testid': 'test',
    },
  }}
/>;

<Select
  slotProps={{
    root: (ownerState) => {
      expectType<SelectOwnerState<any>, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    button: (ownerState) => {
      expectType<SelectOwnerState<any>, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    startDecorator: (ownerState) => {
      expectType<SelectOwnerState<any>, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    endDecorator: (ownerState) => {
      expectType<SelectOwnerState<any>, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    indicator: (ownerState) => {
      expectType<SelectOwnerState<any>, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    listbox: (ownerState) => {
      expectType<SelectOwnerState<any>, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
  }}
/>;
