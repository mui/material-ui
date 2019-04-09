import * as React from 'react';
import List from '@material-ui/core/List';

{
  <List component="div" />;
  <List
    component="div"
    onChange={e => {
      e.currentTarget; // $ExpectType EventTarget & HTMLUListElement
    }}
  />;
}
