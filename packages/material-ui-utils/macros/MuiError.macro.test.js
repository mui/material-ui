import pluginTester from 'babel-plugin-tester';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import plugin from 'babel-plugin-macros';
import { expect } from 'chai';

const errorCodesPath = path.join(os.tmpdir(), 'error-codes.json');

pluginTester({
  plugin,
  filename: __filename,
  tests: [
    {
      title: 'literal',
      code: `
        import MuiError from '@material-ui/utils/macros/MuiError.macro';

        throw new MuiError('Material-UI: Expected valid input target.\\n' + 'Did you use \`inputComponent\`');
      `,
      pluginOptions: { muiError: { errorCodesPath } },
      output: `
        import { formatMuiErrorMessage as _formatMuiErrorMessage } from '@material-ui/utils';
        throw new Error(
          process.env.NODE_ENV !== 'production'
            ? \`Material-UI: Expected valid input target.
        Did you use \\\`inputComponent\\\`\`
            : _formatMuiErrorMessage(1),
        );
      `,
      setup() {
        fs.writeFileSync(
          errorCodesPath,
          JSON.stringify({
            '1': 'Material-UI: Expected valid input target.\nDid you use `inputComponent`',
          }),
        );

        return function teardown() {
          fs.unlinkSync(errorCodesPath);
        };
      },
    },
    {
      title: 'no-error-code',
      code: `
        import MuiError from '@material-ui/utils/macros/MuiError.macro';

        throw new MuiError('Material-UI: Expected valid input target.\\n' + 'Did you use inputComponent');
      `,
      output: `
        throw (
          /* FIXME (minify-errors-in-prod): Unminified error message in production build! */
          new Error(\`Material-UI: Expected valid input target.
        Did you use inputComponent\`)
        );
      `,
      pluginOptions: { muiError: { errorCodesPath } },
      setup() {
        fs.writeFileSync(errorCodesPath, JSON.stringify({}));

        return function teardown() {
          fs.unlinkSync(errorCodesPath);
        };
      },
    },
    {
      title: 'can throw on missing error codes',
      error: /unknown: Missing error code for message 'missing'. Did you forget to run `yarn extract-errors` first?/,
      code: `
        import MuiError from '@material-ui/utils/macros/MuiError.macro';

        throw new MuiError('missing');`,
      pluginOptions: {
        muiError: {
          errorCodesPath,
          missingError: 'throw',
        },
      },
      setup() {
        fs.writeFileSync(errorCodesPath, JSON.stringify({}));

        return function teardown() {
          fs.unlinkSync(errorCodesPath);
        };
      },
    },
    {
      title: 'can extract errors',
      code: `
        import MuiError from '@material-ui/utils/macros/MuiError.macro';

        throw new MuiError('exists');
        throw new MuiError('will be created');`,
      pluginOptions: {
        muiError: {
          errorCodesPath,
          missingError: 'write',
        },
      },
      output: `
      import { formatMuiErrorMessage as _formatMuiErrorMessage2 } from '@material-ui/utils';
      import { formatMuiErrorMessage as _formatMuiErrorMessage } from '@material-ui/utils';
      throw new Error(process.env.NODE_ENV !== 'production' ? \`exists\` : _formatMuiErrorMessage(1));
      throw new Error(
        process.env.NODE_ENV !== 'production' ? \`will be created\` : _formatMuiErrorMessage2(2),
      );
      `,
      setup() {
        const initialErrorCodes = {
          '1': 'exists',
        };
        fs.writeFileSync(errorCodesPath, JSON.stringify(initialErrorCodes));

        return function teardown() {
          const extractedErrorCodes = JSON.parse(
            fs.readFileSync(errorCodesPath, { encoding: 'utf8' }),
          );

          expect(extractedErrorCodes).to.deep.equal({
            '1': 'exists',
            '2': 'will be created',
          });

          fs.unlinkSync(errorCodesPath);
        };
      },
    },
  ],
});
