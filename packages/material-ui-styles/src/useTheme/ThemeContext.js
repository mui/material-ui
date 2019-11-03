import React from 'react';
import { ponyfillGlobal } from '@material-ui/utils';

// Share the theme context object with a global so theme propagation can work
// in case of style package duplication.
if (!ponyfillGlobal['__@material-ui/theme-context__']) {
  ponyfillGlobal['__@material-ui/theme-context__'] = React.createContext(null);
}

export default ponyfillGlobal['__@material-ui/theme-context__'];
