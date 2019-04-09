import * as React from 'react';
import FormControl from '@material-ui/core/FormControl';

// custom intrinsic
// https://github.com/mui-org/material-ui/issues/13744
{
  <FormControl component="fieldset" className="hello-world" />;
  // Defeat device
  <FormControl component={'fieldset' as 'div'} className="hello-world" />;
}
