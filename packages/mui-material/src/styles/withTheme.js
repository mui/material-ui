import MuiError from '@mui/internal-babel-macros/MuiError.macro';

export default function withTheme() {
  throw new MuiError(
    'MUI: withTheme is no longer exported from @mui/material/styles.\n' +
      'You have to import it from @mui/styles.\n' +
      'See https://mui.com/r/migration-v4/#mui-material-styles for more details.',
  );
}
