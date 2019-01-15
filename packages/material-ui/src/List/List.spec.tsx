import * as React from 'react';
import List from '@material-ui/core/List';

// use other components
// https://github.com/mui-org/material-ui/issues/13746
{
  // HTMLDivElement is not assignable to HTMLUlElement #v4-typings
  <List component="div" />; // $ExpectError
  <List
    component={'div' as 'ul'}
    onChange={e => {
      e.currentTarget; // $ExpectType EventTarget & HTMLUListElement
    }}
  />;
}
