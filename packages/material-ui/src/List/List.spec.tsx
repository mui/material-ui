import * as React from 'react';
import List from '@material-ui/core/List';

// custom host
// https://github.com/mui-org/material-ui/issues/13746
{
  <List component="div" />;
  <List
    component="div"
    onChange={(e: React.FormEvent<HTMLDivElement>) => {
      e.currentTarget;
    }}
  />;
}
