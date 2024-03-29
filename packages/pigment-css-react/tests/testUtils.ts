import * as fs from 'node:fs';
import * as path from 'node:path';
import { expect as chaiExpect } from 'chai';
import { transformAsync } from '@babel/core';
import { asyncResolveFallback } from '@wyw-in-js/shared';
import {
  TransformCacheCollection,
  transform as wywTransform,
  createFileReporter,
} from '@wyw-in-js/transform';
import { PluginCustomOptions, preprocessor } from '@pigment-css/react/utils';
import * as prettier from 'prettier';

import sxTransformPlugin from '../exports/sx-plugin';

const shouldUpdateOutput = process.env.UPDATE_FIXTURES === 'true';

function runSxTransform(code: string, filename: string) {
  return transformAsync(code, {
    babelrc: false,
    configFile: false,
    filename,
    plugins: ['@babel/plugin-syntax-jsx', [sxTransformPlugin]],
  });
}

export async function runTransformation(
  absolutePath: string,
  options?: { themeArgs?: { theme?: any }; css?: PluginCustomOptions['css'] },
) {
  const cache = new TransformCacheCollection();
  const { emitter: eventEmitter } = createFileReporter(false);
  const inputFilePath = absolutePath;
  const outputFilePath = absolutePath.replace('.input.', '.output.');
  const outputCssFilePath = absolutePath.replace('.input.js', '.output.css');

  const inputContent = fs.readFileSync(inputFilePath, 'utf8');
  let outputContent = fs.existsSync(outputFilePath) ? fs.readFileSync(outputFilePath, 'utf8') : '';
  let outputCssContent = fs.existsSync(outputCssFilePath)
    ? fs.readFileSync(outputCssFilePath, 'utf8')
    : '';

  const babelResult = await runSxTransform(inputContent, inputFilePath);

  const pluginOptions = {
    themeArgs: {
      theme: options?.themeArgs?.theme,
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

  const result = await wywTransform(
    {
      options: {
        filename: inputFilePath,
        preprocessor: (selector, css) => preprocessor(selector, css, options?.css),
        pluginOptions,
      },
      cache,
      eventEmitter,
    },
    babelResult?.code ?? inputContent,
    asyncResolveFallback,
  );

  const prettierConfig = await prettier.resolveConfig(
    path.join(process.cwd(), 'prettier.config.js'),
  );
  const formattedJs = await prettier.format(result.code, {
    ...prettierConfig,
    parser: 'babel',
  });
  const formattedCss = await prettier.format(result.cssText ?? '', {
    ...prettierConfig,
    parser: 'css',
  });

  if (!outputContent || shouldUpdateOutput) {
    fs.writeFileSync(outputFilePath, formattedJs, 'utf-8');
    outputContent = formattedJs;
  }

  if (!outputCssContent || shouldUpdateOutput) {
    fs.writeFileSync(outputCssFilePath, formattedCss, 'utf-8');
    outputCssContent = formattedCss;
  }

  return {
    output: {
      js: formattedJs,
      css: formattedCss,
    },
    fixture: {
      js: outputContent,
      css: outputCssContent,
    },
  };
}

export function expect(val: any): ReturnType<typeof chaiExpect> {
  const CUSTOM_ERROR =
    'The file contents have changed. Run "test:update" command to update the file if this is expected.';
  return chaiExpect(val, CUSTOM_ERROR);
}
