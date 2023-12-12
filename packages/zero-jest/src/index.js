import { TransformCacheCollection, transform as linariaTransform } from '@linaria/babel-preset';
import { syncResolve, asyncResolveFallback } from '@linaria/utils';
import babelJest from 'babel-jest';

const transformCache = new TransformCacheCollection();

function getLinariaConfig(filename, options) {
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

/**
 * @param {import('@linaria/babel-preset/types/types').Result} result
 * @returns {import('@jest/transform').TransformedSource}
 */
function getReturnValue(result, injectCss = true) {
  const { code: transformedCode, cssText, map: resultMap } = result;
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
 * @typedef {Object} TransformerConfig
 * @property {unknown} theme
 * @property {boolean} [injectCss]
 */

/**
 * @param {TransformerConfig} userOptions
 * @returns
 */
function createZeroTransformer(userOptions) {
  const { theme, cssVariablesPrefix = 'mui', injectCss = true, ...rest } = userOptions;
  const babelTransformer = babelJest.createTransformer({
    ...rest,
    plugins: (rest?.plugins ?? []).concat('@mui/zero-tag-processor/pre-linaria-plugin'),
  });
  // eslint-disable-next-line global-require
  const { transformSync: linariaTransformSync } = require('@linaria/babel-preset/lib/transform');

  /** @type {import("@jest/transform").Transformer<TransformerConfig>} */
  const zeroTransformer = {
    ...babelTransformer,
    process(sourceText, sourcePath, options) {
      const { code } = babelTransformer.process(sourceText, sourcePath, options);
      const linariaResult = linariaTransformSync(
        code ?? sourceText,
        getLinariaConfig(sourcePath, {
          theme,
          cssVariablesPrefix,
        }),
        syncResolve,
        {},
        transformCache,
      );
      return getReturnValue(linariaResult, injectCss);
    },
    async processAsync(sourceText, sourcePath, options) {
      const { code } = babelTransformer.processAsync(sourceText, sourcePath, options);
      const result = await linariaTransform(
        code ?? sourceText,
        getLinariaConfig(sourcePath, {
          theme,
          cssVariablesPrefix,
        }),
        asyncResolveFallback,
        {},
        transformCache,
      );
      return getReturnValue(result, injectCss);
    },
  };

  return zeroTransformer;
}

const transformerFactory = { createTransformer: createZeroTransformer };

export default transformerFactory;
