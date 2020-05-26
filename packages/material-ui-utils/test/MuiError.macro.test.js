import pluginTester from 'babel-plugin-tester';
import * as path from 'path';
import plugin from 'babel-plugin-macros';

pluginTester({
  plugin,
  filename: __filename,
  fixtures: path.resolve(__dirname, './__fixtures__'),
  tests: [
    {
      title: 'can throw on missing error codes',
      error: /unknown: Missing error code for message 'missing'. Did you forget to run `yarn extract-errors` first?/,
      code: `
        import MuiError from '@material-ui/utils/macros/MuiError.macro';

        throw new MuiError('missing');`,
      pluginOptions: {
        muiError: {
          missingError: 'throw',
        },
      },
    },
  ],
});
