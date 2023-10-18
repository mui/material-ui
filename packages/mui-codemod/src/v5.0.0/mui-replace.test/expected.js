// material-design
import { createTheme, alpha } from '@mui/material/styles';
import { Button, Tooltip } from '@mui/material';
import Alert from '@mui/material/Alert';
import useAutocomplete from '@mui/material/useAutocomplete';

// styles
import { makeStyles } from '@mui/styles';
import createStyles from '@mui/styles/createStyles';

// unstyled
import { SliderUnstyled } from '@mui/base';
import SwitchUnstyled from '@mui/base/SwitchUnstyled';

// system
import { SxProps } from '@mui/system';
import ThemeProvider from '@mui/system/ThemeProvider';

// utils
import { deepmerge } from '@mui/utils';

// icons
import Edit from '@mui/icons-material/Edit';

// lab
import Mansory from '@mui/lab/Mansory';
import { DateRangePicker } from '@mui/lab';

// styled engine
module.exports = override(
  addWebpackAlias({
    '@mui/styled-engine': '@mui/styled-engine-sc',
  }),
);
// json
const dependencies = {
  '@mui/material': 'next',
  '@mui/lab': 'next',
  '@mui/styled-engine-sc': 'next',
  // whitelist packages below
  '@material-ui/data-grid': '^4.0.0-alpha.36',
  '@material-ui/x-grid': '^4.0.0-alpha.36',
  '@material-ui/x-grid-data-generator': '^4.0.0-alpha.36',
};
const tsconfig = {
  paths: {
    '@mui/styled-engine': ['./node_modules/@mui/styled-engine-sc'],
  },
};

// types
import { DistributiveOmit } from '@mui/types';

// private-theming
import { ThemeProvider as PrivateThemeProvider } from '@mui/private-theming';

// Pickers does not change
import { DatePicker } from '@material-ui/pickers';

// DataGrid does not change
import { DataGrid } from '@material-ui/data-grid';
import { XGrid } from '@material-ui/x-grid';
import { useDemoData } from '@material-ui/x-grid-data-generator';
