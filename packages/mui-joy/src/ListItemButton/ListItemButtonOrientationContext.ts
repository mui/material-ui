import * as React from 'react';

const ListItemButtonOrientationContext = React.createContext<'horizontal' | 'vertical'>(
  'horizontal',
);

if (process.env.NODE_ENV !== 'production') {
  ListItemButtonOrientationContext.displayName = 'ListItemButtonOrientationContext';
}

export default ListItemButtonOrientationContext;
