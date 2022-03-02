import { createTheme } from '../other-path';

import { adaptV4Theme } from '@material-ui/core/styles';

export const muiTheme = createMuiTheme();
export const muiTheme2 = createTheme(adaptV4Theme(options));
