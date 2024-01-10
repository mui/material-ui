import babelJest from 'babel-jest';
import type { Transformer, TransformedSource, SyncTransformer } from '@jest/transform';
import type { PluginItem } from '@babel/core';
import { preprocessor as basePreprocessor } from '@mui/zero-runtime/utils';
import { asyncResolveFallback } from '@wyw-in-js/shared';
import {
  transform as linariaTransform,
  TransformCacheCollection,
  createFileReporter,
} from '@wyw-in-js/transform';
import type { Result } from '@wyw-in-js/transform';

type TransformerConfig = {
  theme: unknown;
  injectCss?: boolean;
  cssVariablesPrefix?: string;
  plugins?: PluginItem[];
};

function innerNoop() {
  return null;
}

function outerNoop() {
  return innerNoop;
}

const cache = new TransformCacheCollection();

function getLinariaConfig(filename: string, options: TransformerConfig) {
  const { theme = {}, cssVariablesPrefix = 'mui' } = options ?? {};
  return {
    filename,
    pluginOptions: {
      themeArgs: {
        theme,
      },
      cssVariablesPrefix,
    },
  };
}

function getReturnValue(result: Result, injectCss = true): TransformedSource {
  const { code: transformedCode, cssText, sourceMap: resultMap } = result;
  const finalCode =
    injectCss && cssText
      ? `const styleInject = require('style-inject');
styleInject(${JSON.stringify(cssText)});
${transformedCode}
`
      : transformedCode;
  return {
    code: finalCode,
    map: resultMap,
  };
}

/**
 * @param {TransformerConfig} userOptions
 * @returns
 */
function createZeroTransformer(userOptions: TransformerConfig) {
  const { theme, cssVariablesPrefix = 'mui', injectCss = true, ...rest } = userOptions;
  const { emitter } = createFileReporter(false);
  const babelTransformer = babelJest.createTransformer({
    ...rest,
    plugins: (rest?.plugins ?? []).concat('@mui/zero-runtime/utils/pre-linaria-plugin'),
  }) as SyncTransformer<TransformerConfig>;

  const zeroTransformer: Transformer<TransformerConfig> = {
    ...babelTransformer,
    async processAsync(sourceText, sourcePath, options) {
      const { code } =
        (await babelTransformer.processAsync?.(sourceText, sourcePath, options)) ?? {};
      if (!code) {
        return {
          code: sourceText,
        };
      }
      const config = getLinariaConfig(sourcePath, {
        theme,
        cssVariablesPrefix,
      });
      const result = await linariaTransform(
        {
          options: {
            ...config,
            root: process.cwd(),
            preprocessor: basePreprocessor,
            pluginOptions: {
              ...rest,
              ...config.pluginOptions,
              overrideContext(context: Record<string, unknown>) {
                if (!context.$RefreshSig$) {
                  context.$RefreshSig$ = outerNoop;
                }
                return context;
              },
            },
          },
          cache,
          eventEmitter: emitter,
        },
        code,
        asyncResolveFallback,
      );
      return getReturnValue(result, injectCss);
    },
  };

  return zeroTransformer;
}

const transformerFactory = { createTransformer: createZeroTransformer };

export default transformerFactory;
