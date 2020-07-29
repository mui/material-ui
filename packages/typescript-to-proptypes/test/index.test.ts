import path from 'path';
import fs from 'fs';
import { expect } from 'chai';
import glob from 'glob';
import prettier from 'prettier';
import * as ttp from '../src';
import { TestOptions } from './types';

const prettierConfig = prettier.resolveConfig.sync(path.join(__dirname, '../.prettierrc'));

const testCases = glob.sync('**/input.{d.ts,ts,tsx}', { absolute: true, cwd: __dirname });

// Create program for all files to speed up tests
const program = ttp.createTSProgram(
  testCases,
  ttp.loadConfig(path.resolve(__dirname, '../tsconfig.json')),
);

// eslint-disable-next-line no-restricted-syntax
for (const testCase of testCases) {
  const dirname = path.dirname(testCase);
  const testName = dirname.substr(__dirname.length + 1);
  const outputPath = path.join(dirname, 'output.js');
  const optionsPath = path.join(dirname, 'options.ts');
  const inputJS = path.join(dirname, 'input.js');

  it(testName, () => {
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
      // For .tsx? files we transpile them and inject the proptypesu
      const injected = ttp.inject(ast, inputSource, options.injector);
      if (!injected) {
        throw new Error('Injection failed');
      }

      result = injected;
    }

    const propTypes = prettier.format(result, {
      ...prettierConfig,
      filepath: outputPath,
    });

    if (fs.existsSync(outputPath)) {
      expect(propTypes.replace(/\r?\n/, '\n')).to.include(
        fs.readFileSync(outputPath, 'utf8').replace(/\r?\n/, '\n'),
      );
    } else {
      fs.writeFileSync(outputPath, propTypes);
    }
  });
}
