
import React from 'react';
import { styleFunction } from '@material-ui/core/Box';

const App = () => {
  const result = styleFunction({
    theme: materialSystemTheme,
    color: 'primary.main',
    bgcolor: 'background.paper',
    fontFamily: 'h6.fontFamily',
    fontSize: ['h6.fontSize', 'h4.fontSize', 'h3.fontSize'],
    p: [2, 3, 4],
  });

  return null;
}

export default App;
