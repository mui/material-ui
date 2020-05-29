import pluginTester from 'babel-plugin-tester';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import plugin from 'babel-plugin-macros';
import { expect } from 'chai';

const temporaryErrorCodesPath = path.join(os.tmpdir(), 'error-codes.json');
const fixturePath = path.resolve(__dirname, './__fixtures__');

pluginTester({
  plugin,
  filename: __filename,
  tests: [
    {
      title: 'literal',
      pluginOptions: {
        muiError: { errorCodesPath: path.join(fixturePath, 'literal', 'error-codes.json') },
      },
      fixture: path.join(fixturePath, 'literal', 'input.js'),
      outputFixture: path.join(fixturePath, 'literal', 'output.js'),
    },
    {
      title: 'annotates missing error codes',
      pluginOptions: {
        muiError: {
          errorCodesPath: path.join(fixturePath, 'no-error-code-annotation', 'error-codes.json'),
        },
      },
      fixture: path.join(fixturePath, 'no-error-code-annotation', 'input.js'),
      outputFixture: path.join(fixturePath, 'no-error-code-annotation', 'output.js'),
    },
    {
      title: 'can throw on missing error codes',
      // babel prefixes with filename.
      // We're only interested in the message.
      error: /: Missing error code for message 'missing'. Did you forget to run `yarn extract-errors` first?/,
      fixture: path.join(fixturePath, 'no-error-code-throw', 'input.js'),
      pluginOptions: {
        muiError: {
          errorCodesPath: path.join(fixturePath, 'no-error-code-throw', 'error-codes.json'),
          missingError: 'throw',
        },
      },
    },
    {
      title: 'can extract errors',

      fixture: path.join(fixturePath, 'error-code-extraction', 'input.js'),
      pluginOptions: {
        muiError: {
          errorCodesPath: temporaryErrorCodesPath,
          missingError: 'write',
        },
      },
      outputFixture: path.join(fixturePath, 'error-code-extraction', 'output.js'),
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
      title: 'throws if not called as a constructor',
      error: /: Encountered `MuiError` outside of a "new expression" i\.e\. `new MuiError\(\)`\. Use `throw new MuiError\(message\)` over `throw MuiError\(message\)`\./,
      fixture: path.join(fixturePath, 'factory-call', 'input.js'),
      pluginOptions: {
        muiError: {
          errorCodesPath: path.join(fixturePath, 'factory-call', 'error-codes.json'),
        },
      },
    },
  ],
});
