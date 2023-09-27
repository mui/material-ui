import type { Plugin, PluginOption } from 'vite';
import { generateCss } from '@mui/zero-tag-processor/generateCss';
import { transformAsync } from '@babel/core';
import baseLinaria from '@linaria/vite';

type LinariaOptions = Exclude<Parameters<typeof baseLinaria>[0], undefined>;

export interface ZeroVitePluginOptions extends LinariaOptions {
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

type LinariaWrapperOptions = Exclude<ZeroVitePluginOptions, 'theme'> & {
  themeArgs: Record<string, unknown>;
};

const linaria = (options: LinariaWrapperOptions): Plugin => {
  return baseLinaria(options);
};

export function zeroVitePlugin(options: ZeroVitePluginOptions): PluginOption {
  const { cssVariablesPrefix = 'mui', injectDefaultThemeInRoot = true, theme } = options ?? {};

  function injectMUITokensPlugin(): PluginOption {
    return {
      name: 'vite-mui-theme-injection-plugin',
      load(id) {
        if (id.endsWith('@mui/zero-runtime/styles.css')) {
          return {
            code: generateCss(
              {
                cssVariablesPrefix,
                themeArgs: {
                  theme,
                },
              },
              {
                defaultThemeKey: 'theme',
                injectInRoot: injectDefaultThemeInRoot,
              },
            ),
            map: null,
          };
        }
        return null;
      },
    };
  }
  const extensions = ['.ts', '.tsx', '.js', '.jsx', '.mts', '.mjs', '.cts', '.cjs', '.mtsx'];

  function intermediateBabelPlugin(): PluginOption {
    return {
      name: 'vite-mui-zero-intermediate-plugin',
      async transform(code, id) {
        const [filename] = id.split('?');
        if (!extensions.some((ext) => filename.endsWith(ext))) {
          return null;
        }
        const result = await transformAsync(code, {
          filename,
          babelrc: false,
          configFile: false,
          plugins: [['@mui/zero-tag-processor/pre-linaria-plugin']],
        });
        return {
          code: result?.code ?? code,
          map: result?.map,
        };
      },
    };
  }

  const linariaPlugin = linaria({
    cssVariablesPrefix,
    themeArgs: {
      theme,
    },
    ...options,
    babelOptions: {
      ...options?.babelOptions,
      plugins: ['@babel/plugin-syntax-jsx'],
    },
  });

  return [injectMUITokensPlugin(), intermediateBabelPlugin(), linariaPlugin];
}
