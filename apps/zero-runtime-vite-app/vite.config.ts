import { defineConfig, splitVendorChunkPlugin, type Plugin } from 'vite';
import reactPlugin from '@vitejs/plugin-react';
import linaria from '@linaria/vite';
import { createTheme } from '@mui/material/styles';
import { generateCss } from '@mui/zero-tag-processor/generateCss';

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

function injectMUITokensPlugin(): Plugin {
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

export default defineConfig({
  plugins: [
    // @TODO Wrap and expose both the plugins in a single package `@mui/zero-vite`
    injectMUITokensPlugin(),
    linaria({
      displayName: true,
      sourceMap: true,
      // @ts-ignore
      cssVariablesPrefix: varPrefix,
      themeArgs: {
        theme,
      },
      babelOptions: {
        plugins: ['@babel/plugin-syntax-jsx'],
      },
    }),
    reactPlugin(),
    splitVendorChunkPlugin(),
  ],
});
