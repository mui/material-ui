import * as React from 'react';
import FormControl from '@material-ui/core/FormControl';

// custom intrinsic
// https://github.com/mui-org/material-ui/issues/13744
{
  // we only accept DivAttributes since we don't have generic props
  // however once v4 typings are available this should be accepted #v4-typings
  <FormControl component="fieldset" className="hello-world" />; // $ExpectError
  // Deafeat device
  <FormControl component={'fieldset' as 'div'} className="hello-world" />;
}
