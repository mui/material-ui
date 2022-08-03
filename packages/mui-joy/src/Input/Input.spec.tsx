import * as React from 'react';
import { expectType } from '@mui/types';
import Input from '@mui/joy/Input';

<Input
  placeholder="test"
  id="test"
  name="test"
  defaultValue="hey"
  autoFocus
  autoComplete="on"
  startDecorator="test"
  endDecorator={<span>hello</span>}
/>;
<Input
  ref={(current) => {
    expectType<HTMLInputElement | null, typeof current>(current);
  }}
  placeholder="test"
  value="test"
  onChange={(event) => {
    expectType<React.ChangeEvent<HTMLInputElement>, typeof event>(event);
  }}
/>;
<Input sx={(theme) => ({ bgcolor: theme.vars.palette.background.surface })} />;

// @ts-expect-error: `rows` is a property of HTMLTextarea
<Input rows={2} />;

<Input component="textarea" rows={2} cols={3} />; // `rows` and `cols` works!
