import path from 'path';
import fs from 'fs';
import { expect } from 'chai';
import glob from 'fast-glob';
import prettier from 'prettier';
import * as ttp from '../src';
import { TestOptions } from './types';

const testCases = glob
  .sync('**/input.{d.ts,ts,tsx}', { absolute: true, cwd: __dirname })
  .map((testPath) => {
    const dirname = path.dirname(testPath);
    const name = path.dirname(path.relative(__dirname, testPath));
    const outputPath = path.join(dirname, 'output.js');
    const inputJS = path.join(dirname, 'input.js');

    return {
      inputJS,
      name,
      outputPath,
      inputPath: testPath,
    };
  });

describe('typescript-to-proptypes', () => {
  let cachedProgram: ttp.ts.Program;
  function getProgram() {
    return cachedProgram;
  }

  before(function beforeHook() {
    // Creating a TS program might take a while.
    this.timeout(20000);
    // Create program for all files to speed up tests
    cachedProgram = ttp.createTSProgram(
      testCases.map((testCase) => testCase.inputPath),
      ttp.loadConfig(path.resolve(__dirname, '../tsconfig.json')),
    );
  });

  testCases.forEach((testCase) => {
    const { name: testName, inputPath, inputJS, outputPath } = testCase;

    it(testName, async () => {
      const program = getProgram();
      let options: TestOptions = {};
      try {
        const optionsModule = await import(`./${testName}/options`);
        options = optionsModule.default;
      } catch (error) {
        // Assume "Cannot find module" which means "no options".
      }

      const ast = ttp.parseFromProgram(inputPath, program, options.parser);

      let inputSource = null;
      if (inputPath.endsWith('.d.ts')) {
        try {
          inputSource = fs.readFileSync(inputJS, 'utf8');
        } catch (error) {
          // ignore
        }
      } else {
        inputSource = ttp.ts.transpileModule(fs.readFileSync(inputPath, 'utf8'), {
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
        expect(propTypes.replace(/\r?\n/g, '\n')).to.equal(
          fs.readFileSync(outputPath, 'utf8').replace(/\r?\n/g, '\n'),
        );
      } else {
        fs.writeFileSync(outputPath, propTypes);
      }
    });
  });
});
