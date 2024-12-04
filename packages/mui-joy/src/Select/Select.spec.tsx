import * as React from 'react';
import { expectType } from '@mui/types';
import Select, { SelectOwnerState } from '@mui/joy/Select';

<Select defaultListboxOpen />;
<Select
  value=""
  onChange={(event, val) => {
    expectType<React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null, typeof event>(
      event,
    );
    expectType<string | null, typeof val>(val);
  }}
/>;
<Select
  value={2}
  onChange={(event, val) => {
    expectType<React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null, typeof event>(
      event,
    );
    expectType<number | null, typeof val>(val);
  }}
/>;
// any object
<Select
  value={{ name: '' }}
  onChange={(event, val) => {
    expectType<React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null, typeof event>(
      event,
    );
    expectType<{ name: string } | null, typeof val>(val);
  }}
/>;

interface Value {
  key: string;
  name: { id: string };
}
<Select<Value>
  // @ts-expect-error the provided value type does not match the Value
  value={{ name: '' }}
  onChange={(event, val) => {
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
      expectType<SelectOwnerState<any, false>, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    button: (ownerState) => {
      expectType<SelectOwnerState<any, false>, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    startDecorator: (ownerState) => {
      expectType<SelectOwnerState<any, false>, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    endDecorator: (ownerState) => {
      expectType<SelectOwnerState<any, false>, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    indicator: (ownerState) => {
      expectType<SelectOwnerState<any, false>, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    listbox: (ownerState) => {
      expectType<SelectOwnerState<any, false>, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
  }}
/>;

const handleChange = (
  event: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null,
  val: number | null,
) => {};

const handleMultiChange = (
  event: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null,
  val: number[] | null,
) => {};

<Select value={10} onChange={handleChange} />;
<Select<number, true> value={[10]} onChange={handleMultiChange} />;
<Select<number, 'a', true> value={[10]} component="a" />;
<Select multiple value={[10]} component="button" />;
<Select multiple defaultValue={[10]} />;
<Select multiple value={[10]} />;

<Select multiple value={[10]} onChange={handleMultiChange} />;
<Select value={10} onChange={handleChange} />;

<Select
  multiple
  value={[10]}
  // @ts-expect-error
  onChange={handleChange}
/>;

<Select
  value={10}
  // @ts-expect-error
  onChange={handleMultiChange}
/>;

<Select
  value={10}
  // @ts-expect-error
  onChange={handleMultiChange}
/>;

<Select<number, true>
  value={[10]}
  // @ts-expect-error
  onChange={handleChange}
/>;

<Select
  defaultValue={10}
  // @ts-expect-error
  onChange={handleMultiChange}
/>;

<Select<number, true>
  defaultValue={[10]}
  // @ts-expect-error
  onChange={handleChange}
/>;
<Select value={10} onChange={handleChange} />;

<Select<number, true> onChange={handleMultiChange} value={[10]} />;

<Select defaultValue={10} onChange={handleChange} />;

<Select<number, true> defaultValue={[10]} onChange={handleMultiChange} />;

// @ts-expect-error
<Select<number, false> value={[10]} />;
// @ts-expect-error
<Select<number, false> defaultValue={[10]} />;
// @ts-expect-error
<Select multiple defaultValue={10} />;
// @ts-expect-error
<Select multiple value={10} />;
// @ts-expect-error
<Select multiple value={10} component="button" />;
// @ts-expect-error
<Select value={[10]} component="button" />;
// @ts-expect-error
<Select value={[10]} />;
