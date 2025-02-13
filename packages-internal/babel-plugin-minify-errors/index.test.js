import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { pluginTester } from 'babel-plugin-tester';
import { expect } from 'chai';
import plugin from './index';

const temporaryErrorCodesPath = path.join(os.tmpdir(), 'error-codes.json');
const fixturePath = path.resolve(__dirname, './__fixtures__');

function readOutputFixtureSync(fixture, file) {
  // babel hardcodes the linefeed to \n
  return fs
    .readFileSync(path.join(fixturePath, fixture, file), { encoding: 'utf8' })
    .replace(/\r?\n/g, '\n');
}

pluginTester({
  plugin,
  filepath: __filename,
  tests: [
    {
      title: 'literal',
      pluginOptions: {
        errorCodesPath: path.join(fixturePath, 'literal', 'error-codes.json'),
        runtimeModule: '@mui/utils/formatMuiErrorMessage',
      },
      fixture: path.join(fixturePath, 'literal', 'input.js'),
      output: readOutputFixtureSync('literal', 'output.js'),
    },
    {
      title: 'interpolation',
      pluginOptions: {
        errorCodesPath: path.join(fixturePath, 'interpolation', 'error-codes.json'),
        runtimeModule: '@mui/utils/formatMuiErrorMessage',
      },
      fixture: path.join(fixturePath, 'interpolation', 'input.js'),
      output: readOutputFixtureSync('interpolation', 'output.js'),
    },
    {
      title: 'annotates missing error codes',
      pluginOptions: {
        errorCodesPath: path.join(fixturePath, 'no-error-code-annotation', 'error-codes.json'),
        runtimeModule: '@mui/utils/formatMuiErrorMessage',
      },
      fixture: path.join(fixturePath, 'no-error-code-annotation', 'input.js'),
      output: readOutputFixtureSync('no-error-code-annotation', 'output.js'),
    },
    {
      title: 'can throw on missing error codes',
      // babel prefixes with filename.
      // We're only interested in the message.
      error:
        /: Missing error code for message 'missing'. Did you forget to run `pnpm extract-error-codes` first?/,
      fixture: path.join(fixturePath, 'no-error-code-throw', 'input.js'),
      pluginOptions: {
        errorCodesPath: path.join(fixturePath, 'no-error-code-throw', 'error-codes.json'),
        missingError: 'throw',
        runtimeModule: '@mui/utils/formatMuiErrorMessage',
      },
    },
    {
      title: 'annotates unminifyable errors',
      pluginOptions: {
        errorCodesPath: path.join(fixturePath, 'unminifyable-annotation', 'error-codes.json'),
        runtimeModule: '@mui/utils/formatMuiErrorMessage',
      },
      fixture: path.join(fixturePath, 'unminifyable-annotation', 'input.js'),
      output: readOutputFixtureSync('unminifyable-annotation', 'output.js'),
    },
    {
      title: 'can throw on unminifyable errors',
      // babel prefixes with filename.
      // We're only interested in the message.
      error:
        /: Unminifyable error. You can only use literal strings and template strings as error messages.?/,
      fixture: path.join(fixturePath, 'unminifyable-throw', 'input.js'),
      pluginOptions: {
        errorCodesPath: path.join(fixturePath, 'unminifyable-throw', 'error-codes.json'),
        missingError: 'throw',
        runtimeModule: '@mui/utils/formatMuiErrorMessage',
      },
    },
    {
      title: 'can extract errors',
      fixture: path.join(fixturePath, 'error-code-extraction', 'input.js'),
      pluginOptions: {
        errorCodesPath: temporaryErrorCodesPath,
        missingError: 'write',
        runtimeModule: '@mui/utils/formatMuiErrorMessage',
      },
      output: readOutputFixtureSync('error-code-extraction', 'output.js'),
      setup() {
        fs.copyFileSync(
          path.join(fixturePath, 'error-code-extraction', 'error-codes.before.json'),
          temporaryErrorCodesPath,
        );

        return function teardown() {
          try {
            const actualErrorCodes = JSON.parse(
              fs.readFileSync(temporaryErrorCodesPath, { encoding: 'utf8' }),
            );
            const expectedErrorCodes = JSON.parse(
              fs.readFileSync(
                path.join(fixturePath, 'error-code-extraction', 'error-codes.after.json'),
              ),
            );

            expect(actualErrorCodes).to.deep.equal(expectedErrorCodes);
          } finally {
            fs.unlinkSync(temporaryErrorCodesPath);
          }
        };
      },
    },
    {
      title: 'uses custom runtime module',
      pluginOptions: {
        errorCodesPath: path.join(fixturePath, 'custom-runtime', 'error-codes.json'),
        runtimeModule: '@custom/error-formatter',
      },
      fixture: path.join(fixturePath, 'custom-runtime', 'input.js'),
      output: readOutputFixtureSync('custom-runtime', 'output.js'),
    },
    {
      title: 'throws when runtimeModule is not provided',
      error: /runtimeModule is required/,
      pluginOptions: {
        errorCodesPath: path.join(fixturePath, 'literal', 'error-codes.json'),
      },
      fixture: path.join(fixturePath, 'literal', 'input.js'),
    },
    {
      title: 'literal-tag',
      pluginOptions: {
        errorCodesPath: path.join(fixturePath, 'literal-tag', 'error-codes.json'),
        runtimeModule: '@mui/utils/formatMuiErrorMessage',
      },
      fixture: path.join(fixturePath, 'literal-tag', 'input.js'),
      output: readOutputFixtureSync('literal-tag', 'output.js'),
    },
    {
      title: 'interpolation-tag',
      pluginOptions: {
        errorCodesPath: path.join(fixturePath, 'interpolation-tag', 'error-codes.json'),
        runtimeModule: '@mui/utils/formatMuiErrorMessage',
      },
      fixture: path.join(fixturePath, 'interpolation-tag', 'input.js'),
      output: readOutputFixtureSync('interpolation-tag', 'output.js'),
    },
    {
      title: 'annotates missing error codes with tag',
      pluginOptions: {
        errorCodesPath: path.join(fixturePath, 'no-error-code-annotation-tag', 'error-codes.json'),
        runtimeModule: '@mui/utils/formatMuiErrorMessage',
      },
      fixture: path.join(fixturePath, 'no-error-code-annotation-tag', 'input.js'),
      output: readOutputFixtureSync('no-error-code-annotation-tag', 'output.js'),
    },
    {
      title: 'can throw on missing error codes with tag',
      error:
        /: Missing error code for message 'missing'. Did you forget to run `pnpm extract-error-codes` first?/,
      fixture: path.join(fixturePath, 'no-error-code-throw-tag', 'input.js'),
      pluginOptions: {
        errorCodesPath: path.join(fixturePath, 'no-error-code-throw-tag', 'error-codes.json'),
        missingError: 'throw',
        runtimeModule: '@mui/utils/formatMuiErrorMessage',
      },
    },
    {
      title: 'can extract errors with tag',
      fixture: path.join(fixturePath, 'error-code-extraction-tag', 'input.js'),
      pluginOptions: {
        errorCodesPath: temporaryErrorCodesPath,
        missingError: 'write',
        runtimeModule: '@mui/utils/formatMuiErrorMessage',
      },
      output: readOutputFixtureSync('error-code-extraction-tag', 'output.js'),
      setup() {
        fs.copyFileSync(
          path.join(fixturePath, 'error-code-extraction-tag', 'error-codes.before.json'),
          temporaryErrorCodesPath,
        );

        return function teardown() {
          try {
            const actualErrorCodes = JSON.parse(
              fs.readFileSync(temporaryErrorCodesPath, { encoding: 'utf8' }),
            );
            const expectedErrorCodes = JSON.parse(
              fs.readFileSync(
                path.join(fixturePath, 'error-code-extraction-tag', 'error-codes.after.json'),
              ),
            );

            expect(actualErrorCodes).to.deep.equal(expectedErrorCodes);
          } finally {
            fs.unlinkSync(temporaryErrorCodesPath);
          }
        };
      },
    },
    {
      title: 'uses custom runtime module with tag',
      pluginOptions: {
        errorCodesPath: path.join(fixturePath, 'custom-runtime-tag', 'error-codes.json'),
        runtimeModule: '@custom/error-formatter',
      },
      fixture: path.join(fixturePath, 'custom-runtime-tag', 'input.js'),
      output: readOutputFixtureSync('custom-runtime-tag', 'output.js'),
    },
    {
      title: 'throws when runtimeModule is not provided with tag',
      error: /runtimeModule is required/,
      pluginOptions: {
        errorCodesPath: path.join(fixturePath, 'literal-tag', 'error-codes.json'),
      },
      fixture: path.join(fixturePath, 'literal-tag', 'input.js'),
    },
  ],
});
