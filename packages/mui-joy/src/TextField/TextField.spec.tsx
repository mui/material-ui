import * as React from 'react';
import TextField from '@mui/joy/TextField';
import { expectType } from '@mui/types';

<TextField
  id="test"
  name="password"
  type="password"
  placeholder="Placeholder"
  label="Label"
  helperText="Helper text"
  defaultValue=""
  startDecorator={<div />}
  endDecorator={<div />}
/>;
<TextField
  value="test"
  onChange={(event) => {
    expectType<React.ChangeEvent<HTMLInputElement>, typeof event>(event);
  }}
/>;
