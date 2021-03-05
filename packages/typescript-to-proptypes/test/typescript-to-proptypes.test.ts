import path from 'path';
import fs from 'fs';
import { expect } from 'chai';
import glob from 'fast-glob';
import prettier from 'prettier';
import * as ttp from '../src';
import { TestOptions } from './types';

const testCases = glob.sync('**/input.{d.ts,ts,tsx}', { absolute: true, cwd: __dirname });

describe('typescript-to-proptypes', () => {
  let cachedProgram: ttp.ts.Program;
  function getProgram() {
    return cachedProgram;
  }

  before(() => {
    // Create program for all files to speed up tests
    cachedProgram = ttp.createTSProgram(
      testCases,
      ttp.loadConfig(path.resolve(__dirname, '../tsconfig.json')),
    );
  });

  // eslint-disable-next-line no-restricted-syntax
  for (const testCase of testCases) {
    const dirname = path.dirname(testCase);
    const testName = path.basename(dirname);
    const outputPath = path.join(dirname, 'output.js');
    const optionsPath = path.join(dirname, 'options.ts');
    const inputJS = path.join(dirname, 'input.js');

    it(testName, () => {
      const program = getProgram();
      // eslint-disable-next-line import/no-dynamic-require, global-require -- TODO
      const options: TestOptions = fs.existsSync(optionsPath) ? require(optionsPath).default : {};

      const ast = ttp.parseFromProgram(testCase, program, options.parser);

      let inputSource = null;
      if (testCase.endsWith('.d.ts')) {
        try {
          inputSource = fs.readFileSync(inputJS, 'utf8');
        } catch (error) {
          // ignore
        }
      } else {
        inputSource = ttp.ts.transpileModule(fs.readFileSync(testCase, 'utf8'), {
          compilerOptions: {
            target: ttp.ts.ScriptTarget.ESNext,
            jsx: ttp.ts.JsxEmit.Preserve,
          },
        }).outputText;
      }

      let result = '';
      // For d.ts files we just generate the AST
      if (!inputSource) {
        result = ast.body
          .map((component) => {
            return ttp.generate(component, options.generator);
          })
          .join('\n');
      } else {
        // For .tsx? files we transpile them and inject the proptypes
        const injected = ttp.inject(ast, inputSource, options.injector);
        if (!injected) {
          throw new Error('Injection failed');
        }

        result = injected;
      }

      const prettierConfig = prettier.resolveConfig.sync(outputPath);
      const propTypes = prettier.format(result, {
        ...prettierConfig,
        filepath: outputPath,
      });

      if (fs.existsSync(outputPath)) {
        expect(propTypes.replace(/\r?\n/g, '\n')).to.include(
          fs.readFileSync(outputPath, 'utf8').replace(/\r?\n/g, '\n'),
        );
      } else {
        fs.writeFileSync(outputPath, propTypes);
      }
    });
  }
});
