import React from 'react';
import Select from '@material-ui/core/Select';

{
  // Value is a string so the value in onChange should also be a string
  <Select
    value={'foo'}
    onChange={e => {
      // $ExpectType string
      const value = e.target.value;
    }}
  />;
}

{
  // Value isn't specified so type should be unknown
  <Select
    onChange={e => {
      // $ExpectType unknown
      const value = e.target.value;
    }}
  />;
}

{
  // Type is set to a number -> value can't be set to a string
  <Select<number>
    // $ExpectError
    value={'foo'}
    onChange={e => {
      // $ExpectType number
      const value = e.target.value;
    }}
  />;
}
