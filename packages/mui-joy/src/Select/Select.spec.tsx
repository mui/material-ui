import * as React from 'react';
import { expectType } from '@mui/types';
import Select from '@mui/joy/Select';

<Select defaultListboxOpen />;
<Select
  value=""
  onChange={(val) => {
    expectType<string | null, typeof val>(val);
  }}
/>;
<Select
  value={2}
  onChange={(val) => {
    expectType<number | null, typeof val>(val);
  }}
/>;
// any object
<Select
  value={{ name: '' }}
  onChange={(val) => {
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
  onChange={(val) => {
    expectType<Value | null, typeof val>(val);
  }}
/>;
<Select sx={{ bgcolor: (theme) => theme.vars.palette.background.body }} />;
<Select
  componentsProps={{
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
