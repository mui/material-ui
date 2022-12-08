import * as React from 'react';

const ListItemButtonOrientationContext = React.createContext<'horizontal' | 'vertical'>(
  'horizontal',
);

export default ListItemButtonOrientationContext;
