import type { Plugin } from 'vite';
import {
  preprocessor as basePreprocessor,
  generateTokenCss,
  generateThemeTokens,
  type Theme,
  extendTheme,
} from '@pigment-css/react/utils';
import { transformAsync } from '@babel/core';
import baseWywPluginPlugin, { type VitePluginOptions } from './vite-plugin';

export interface PigmentOptions extends VitePluginOptions {
  /**
   * The theme object that you want to be passed to the `styled` function
   */
  theme: Theme;
  /**
   * Whether the css variables for the default theme should target the :root selector or not.
   * @default true
   */
  injectDefaultThemeInRoot?: boolean;
}

const VIRTUAL_CSS_FILE = `\0zero-runtime-styles.css`;
const VIRTUAL_THEME_FILE = `\0zero-runtime-theme.js`;

const extensions = ['.js', '.jsx', '.mjs', '.cjs', '.ts', '.tsx', '.mts', '.cts'];

function hasCorectExtension(fileName: string) {
  return extensions.some((ext) => fileName.endsWith(ext));
}

function isZeroRuntimeProcessableFile(fileName: string, transformLibraries: string[]) {
  const isNodeModule = fileName.includes('node_modules');
  const isTransformableFile =
    isNodeModule && transformLibraries.some((libName) => fileName.includes(libName));
  return (
    hasCorectExtension(fileName) &&
    (isTransformableFile || !isNodeModule) &&
    !fileName.includes('runtime/dist')
  );
}

export function pigment(options: PigmentOptions) {
  const {
    theme,
    babelOptions = {},
    preprocessor = basePreprocessor,
    transformLibraries = [],
    transformSx = true,
    ...rest
  } = options ?? {};

  function injectMUITokensPlugin(): Plugin {
    return {
      name: 'vite-mui-theme-injection-plugin',
      enforce: 'pre',
      resolveId(source) {
        if (source === `${process.env.RUNTIME_PACKAGE_NAME}/styles.css`) {
          return VIRTUAL_CSS_FILE;
        }
        if (source === `${process.env.RUNTIME_PACKAGE_NAME}/theme`) {
          return VIRTUAL_THEME_FILE;
        }
        return null;
      },
      load(id) {
        if (id === VIRTUAL_CSS_FILE) {
          return generateTokenCss(theme);
        }
        if (id === VIRTUAL_THEME_FILE) {
          return `export default ${JSON.stringify(generateThemeTokens(theme))};`;
        }
        return null;
      },
    };
  }

  function intermediateBabelPlugin(): Plugin {
    return {
      name: 'vite-mui-zero-intermediate-plugin',
      enforce: 'post',
      async transform(code, id) {
        const [filename] = id.split('?');
        if (!isZeroRuntimeProcessableFile(id, transformLibraries)) {
          return null;
        }
        try {
          const result = await transformAsync(code, {
            filename,
            babelrc: false,
            configFile: false,
            plugins: [[`${process.env.RUNTIME_PACKAGE_NAME}/exports/sx-plugin`]],
          });
          return {
            code: result?.code ?? code,
            map: result?.map,
          };
        } catch (ex) {
          console.error(ex);
          return null;
        }
      },
    };
  }

  const zeroPlugin = baseWywPluginPlugin({
    themeArgs: {
      theme,
    },
    preprocessor,
    babelOptions: {
      ...babelOptions,
      plugins: ['@babel/plugin-syntax-typescript', ...(babelOptions.plugins ?? [])],
    },
    ...rest,
  });

  return [injectMUITokensPlugin(), transformSx ? intermediateBabelPlugin() : null, zeroPlugin];
}

export { extendTheme };
