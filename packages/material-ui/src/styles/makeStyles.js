import MuiError from '@material-ui/utils/macros/MuiError.macro';

export default function makeStyles(stylesCreator, options) {
  throw new MuiError(
    'Material-UI: makeStyles is not longer exported from @material-ui/core/styles.\n' +
      'You have to import it from @material-ui/styles.\n' +
      'See https://material-ui.com/r/migration-v4/#material-ui-core-styles for more details.',
  );
}
