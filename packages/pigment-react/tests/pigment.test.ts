import * as fs from 'node:fs';
import * as path from 'node:path';
import { expect } from 'chai';
import { asyncResolveFallback } from '@wyw-in-js/shared';
import { transformAsync } from '@babel/core';
import { TransformCacheCollection, transform, createFileReporter } from '@wyw-in-js/transform';
import { preprocessor } from '@pigment-css/react/utils';
import sxTransformPlugin from '../exports/sx-plugin';

const files = fs
  .readdirSync(path.join(__dirname, 'fixtures'))
  .filter((file) => file.endsWith('.input.js'));

const theme = {
  palette: {
    primary: {
      main: 'red',
    },
  },
  size: {
    font: {
      h1: '3rem',
    },
  },
  components: {
    MuiSlider: {
      styleOverrides: {
        rail: {
          fontSize: '3rem',
        },
      },
    },
  },
};

async function transformWithSx(code: string, filename: string) {
  const babelResult = await transformAsync(code, {
    babelrc: false,
    configFile: false,
    filename,
    plugins: ['@babel/plugin-syntax-jsx', [sxTransformPlugin]],
  });
  const pluginOptions = {
    themeArgs: {
      theme,
    },
    babelOptions: {
      configFile: false,
      babelrc: false,
      plugins: ['@babel/plugin-syntax-jsx'],
    },
    tagResolver(source: string, tag: string) {
      if (source !== '@pigment-css/react') {
        return null;
      }
      return require.resolve(`../exports/${tag}`);
    },
  };
  const cache = new TransformCacheCollection();
  const { emitter: eventEmitter } = createFileReporter(false);
  return transform(
    {
      options: {
        filename,
        preprocessor,
        pluginOptions,
      },
      cache,
      eventEmitter,
    },
    babelResult?.code ?? code,
    asyncResolveFallback,
  );
}

describe('zero-runtime', () => {
  files.forEach((file) => {
    it(`test input file ${file}`, async () => {
      const inputFilePath = path.join(__dirname, 'fixtures', file);
      const outputFilePath = path.join(__dirname, 'fixtures', file.replace('.input.', '.output.'));
      const outputCssFilePath = path.join(
        __dirname,
        'fixtures',
        file.replace('.input.js', '.output.css'),
      );
      const inputContent = fs.readFileSync(inputFilePath, 'utf8');
      const outputContent = fs.readFileSync(outputFilePath, 'utf8');
      const outputCssContent = fs.readFileSync(outputCssFilePath, 'utf8');
      const result = await transformWithSx(inputContent, inputFilePath);
      expect(result.cssText).to.equal(outputCssContent);
      expect(result.code.trim()).to.equal(outputContent.trim());
    });
  });
});
