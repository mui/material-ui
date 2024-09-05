// material-design
import { createTheme, alpha } from '@material-ui/core/styles';
import { Button, Tooltip } from '@material-ui/core';
import Alert from '@material-ui/core/Alert';
import useAutocomplete from '@material-ui/core/useAutocomplete';

// styles
import { makeStyles } from '@material-ui/styles';
import createStyles from '@material-ui/styles/createStyles';

// unstyled
import { SliderUnstyled } from '@material-ui/unstyled';
import SwitchUnstyled from '@material-ui/unstyled/SwitchUnstyled';

// system
import { SxProps } from '@material-ui/system';
import ThemeProvider from '@material-ui/system/ThemeProvider';

// utils
import { deepmerge } from '@material-ui/utils';

// icons
import Edit from '@material-ui/icons/Edit';

// lab
import Mansory from '@material-ui/lab/Mansory';
import { DateRangePicker } from '@material-ui/lab';

// styled engine
module.exports = override(
  addWebpackAlias({
    '@material-ui/styled-engine': '@material-ui/styled-engine-sc',
  }),
);
// json
const dependencies = {
  '@material-ui/core': 'next',
  '@material-ui/lab': 'next',
  '@material-ui/styled-engine-sc': 'next',
  // whitelist packages below
  '@material-ui/data-grid': '^4.0.0-alpha.36',
  '@material-ui/x-grid': '^4.0.0-alpha.36',
  '@material-ui/x-grid-data-generator': '^4.0.0-alpha.36',
};
const tsconfig = {
  paths: {
    '@material-ui/styled-engine': ['./node_modules/@material-ui/styled-engine-sc'],
  },
};

// types
import { DistributiveOmit } from '@material-ui/types';

// private-theming
import { ThemeProvider as PrivateThemeProvider } from '@material-ui/private-theming';

// Pickers does not change
import { DatePicker } from '@material-ui/pickers';

// DataGrid does not change
import { DataGrid } from '@material-ui/data-grid';
import { XGrid } from '@material-ui/x-grid';
import { useDemoData } from '@material-ui/x-grid-data-generator';
