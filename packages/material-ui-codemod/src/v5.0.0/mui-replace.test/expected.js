// material-design
import { createTheme, alpha } from '@mui/material/styles';
import { Button, Tooltip } from '@mui/material';
import Alert from '@mui/material/Alert';
import useAutoComplete from '@mui/material/useAutocomplete';

// styles
import { makeStyles } from '@mui/styles';
import createStyles from '@mui/styles/createStyles';

// unstyled
import { SliderUnstyled } from '@mui/core';
import SwitchUnstyled from '@mui/core/SwitchUnstyled';

// system
import { SxProps } from '@mui/system';
import ThemeProvider from '@mui/system/ThemeProvider';

// utils
import { deepmerge } from '@mui/utils';

// icons
import Edit from '@mui/icons-material/Edit';

// lab
import Mansory from '@mui/lab-material/Mansory';
import { DatePicker } from '@mui/lab-material';

// styled engine
module.exports = override(
  addWebpackAlias({
    '@mui/styled-engine': '@mui/styled-engine-sc',
  }),
);
// json
const dependencies = {
  '@mui/material': 'next',
  '@mui/lab-material': 'next',
  '@mui/styled-engine-sc': 'next',
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
