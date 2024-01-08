import type { Plugin } from 'vite';
import {
  generateCss,
  preprocessor as basePreprocessor,
  generateThemeTokens,
} from '@mui/zero-runtime/utils';
import { transformAsync } from '@babel/core';
import baseZeroVitePlugin, { type VitePluginOptions } from './zero-vite-plugin';

export interface ZeroVitePluginOptions extends VitePluginOptions {
  /**
   * The theme object that you want to be passed to the `styled` function
   */
  theme: unknown;
  /**
   * Prefix string to use in the generated css variables.
   */
  cssVariablesPrefix?: string;
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

export function zeroVitePlugin(options: ZeroVitePluginOptions) {
  const {
    cssVariablesPrefix = 'mui',
    injectDefaultThemeInRoot = true,
    theme,
    babelOptions = {},
    preprocessor = basePreprocessor,
    transformLibraries = [],
    ...rest
  } = options ?? {};
  const isExtendTheme = !!(theme && typeof theme === 'object' && 'vars' in theme && theme.vars);
  const varPrefix: string =
    isExtendTheme && 'cssVarPrefix' in theme
      ? (theme.cssVarPrefix as string) ?? cssVariablesPrefix
      : cssVariablesPrefix;

  function injectMUITokensPlugin(): Plugin {
    return {
      name: 'vite-mui-theme-injection-plugin',
      enforce: 'pre',
      resolveId(source) {
        if (source === '@mui/zero-runtime/styles.css') {
          return VIRTUAL_CSS_FILE;
        }
        if (source === '@mui/zero-runtime/theme') {
          return VIRTUAL_THEME_FILE;
        }
        return null;
      },
      load(id) {
        if (id === VIRTUAL_CSS_FILE) {
          return generateCss(
            {
              cssVariablesPrefix: varPrefix,
              themeArgs: {
                theme,
              },
            },
            {
              defaultThemeKey: 'theme',
              injectInRoot: injectDefaultThemeInRoot,
            },
          );
        }
        if (id === VIRTUAL_THEME_FILE) {
          const tokens = generateThemeTokens(theme, varPrefix);
          return `export default ${JSON.stringify(tokens)};`;
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
            plugins: [['@mui/zero-runtime/exports/sx-plugin']],
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

  const zeroPlugin = baseZeroVitePlugin({
    cssVariablesPrefix: varPrefix,
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

  return [injectMUITokensPlugin(), intermediateBabelPlugin(), zeroPlugin];
}
