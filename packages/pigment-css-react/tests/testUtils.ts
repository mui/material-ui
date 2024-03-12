import * as fs from 'node:fs';
import * as path from 'node:path';
import { expect as chaiExpect } from 'chai';
import { transformAsync } from '@babel/core';
import { asyncResolveFallback } from '@wyw-in-js/shared';
import {
  TransformCacheCollection,
  createFileReporter,
  transform as wywTransform,
  type PluginOptions,
} from '@wyw-in-js/transform';
import { preprocessor } from '@pigment-css/react/utils';
import * as prettier from 'prettier';

import sxTransformPlugin from '../exports/sx-plugin';

const shouldUpdateOutput = process.env.UPDATE_FIXTURES === 'true';

function resolveAliasPath(relativeToBabelConf: string) {
  const resolvedPath = path.relative(process.cwd(), path.resolve(__dirname, relativeToBabelConf));
  return `./${resolvedPath.replace('\\', '/')}`;
}
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
  options?: {
    themeArgs?: { theme?: any };
    /**
     * If true, the transformation output will be written to that location.
     * Otherwise, the output will be in the same fixture location.
     */
    outputDir?: string;
    /**
     * If true, there will be no JS output file.
     */
    disableJs?: boolean;
    /**
     * If true, there will be no CSS output file.
     */
    disableCss?: boolean;
  },
) {
  const { themeArgs, outputDir, disableJs, disableCss } = options ?? {};
  const cache = new TransformCacheCollection();
  const { emitter: eventEmitter } = createFileReporter(false);
  const inputFilePath = absolutePath;
  const outputFilePath = outputDir
    ? `${outputDir}/${path.parse(absolutePath).name}.output.js`
    : absolutePath.replace('.input.', '.output.');
  const outputCssFilePath = outputDir
    ? `${outputDir}/${path.parse(absolutePath).name}.output.css`
    : absolutePath.replace('.input.js', '.output.css');

  const inputContent = fs.readFileSync(inputFilePath, 'utf8');
  let outputContent = fs.existsSync(outputFilePath) ? fs.readFileSync(outputFilePath, 'utf8') : '';
  let outputCssContent = fs.existsSync(outputCssFilePath)
    ? fs.readFileSync(outputCssFilePath, 'utf8')
    : '';

  const babelResult = await runSxTransform(inputContent, inputFilePath);

  const pluginOptions: Partial<PluginOptions> & { themeArgs: { theme?: unknown } } = {
    themeArgs: {
      theme: themeArgs?.theme,
    },
    babelOptions: {
      configFile: false,
      babelrc: false,
      presets: [
        [
          '@babel/preset-react',
          {
            runtime: 'automatic',
          },
        ],
        '@babel/preset-typescript',
      ],
      plugins: [
        '@babel/plugin-syntax-jsx',
        [
          'babel-plugin-module-resolver',
          {
            alias: {
              '@mui/material': resolveAliasPath('../../mui-material/src'),
            },
          },
        ],
      ],
    },
    tagResolver(source: string, tag: string) {
      if (source === '@pigment-css/react' || source.endsWith('/zero-styled')) {
        return require.resolve(`../exports/${tag}`);
      }
      return null;
    },
  };

  const result = await wywTransform(
    {
      options: {
        filename: inputFilePath,
        preprocessor,
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

  // ensure the output directory exists
  if (outputDir) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  if (!outputContent || shouldUpdateOutput) {
    if (!disableJs) {
      fs.writeFileSync(outputFilePath, formattedJs, 'utf-8');
    }
    outputContent = formattedJs;
  }

  if (!outputCssContent || shouldUpdateOutput) {
    if (!disableCss) {
      fs.writeFileSync(outputCssFilePath, formattedCss, 'utf-8');
    }
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
