import { defineConfig, splitVendorChunkPlugin, type PluginOption } from 'vite';
import reactPlugin from '@vitejs/plugin-react';
import linaria from '@linaria/vite';
import { createTheme } from '@mui/material/styles';
import { generateCss } from '@mui/zero-tag-processor/generateCss';
import { transformAsync } from '@babel/core';

const theme = createTheme();
// @TODO - Make this part of the main package
// @ts-ignore
theme.applyDarkStyles = function applyDarkStyles(obj) {
  return {
    // @TODO - Use custom stylis plugin as in docs/src/createEmotionCache.ts
    // so that we don't need to use *
    '* :where([data-mui-color-scheme="dark"]) &': obj,
  };
};

const varPrefix = 'app';

function muiZeroVitePlugin(): PluginOption {
  function injectMUITokensPlugin(): PluginOption {
    return {
      name: 'vite-mui-theme-injection-plugin',
      load(id) {
        if (id.endsWith('@mui/zero-runtime/styles.css')) {
          return {
            code: generateCss(
              {
                cssVariablesPrefix: varPrefix,
                themeArgs: {
                  theme,
                },
              },
              {},
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
      name: 'vite-intermediate-plugin',
      async transform(code, id) {
        const [filename] = id.split('?');
        if (
          !filename.includes('zero-runtime-vite-app/src') ||
          !extensions.some((ext) => filename.endsWith(ext))
        ) {
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

  // @TODO - Expect most of these from users of the plugin.
  const linariaPlugin = linaria({
    displayName: false,
    sourceMap: true,
    // @ts-ignore
    cssVariablesPrefix: varPrefix,
    themeArgs: {
      theme,
    },
    babelOptions: {
      plugins: ['@babel/plugin-syntax-jsx'],
    },
  });

  return [injectMUITokensPlugin(), intermediateBabelPlugin(), linariaPlugin];
}

export default defineConfig({
  plugins: [muiZeroVitePlugin(), reactPlugin(), splitVendorChunkPlugin()],
});
