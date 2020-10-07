
import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { styleFunction } from '@material-ui/core/Box';

const materialSystemTheme = createMuiTheme();

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
