import path from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
// eslint-disable-next-line import/extensions, import/no-relative-packages -- PoC-only build integration.
import buildCss from '../../packages/mui-material/scripts/buildCss.mjs';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const materialCssSourceDirectories = [
  path.resolve(dirname, '../../packages/mui-material/src/Button/css'),
  path.resolve(dirname, '../../packages/mui-material/src/Slider/css'),
  path.resolve(dirname, '../../packages/mui-material/src/tokens'),
];

function isMaterialCssSource(file: string) {
  return materialCssSourceDirectories.some((directory) => {
    const relativePath = path.relative(directory, file);
    return !relativePath.startsWith('..') && !path.isAbsolute(relativePath);
  });
}

export default defineConfig(({ command, mode }) => ({
  build: {
    rollupOptions: {
      input: {
        polished: path.resolve(dirname, 'index.html'),
        brutalist: path.resolve(dirname, 'brutalist.html'),
        consumer: path.resolve(dirname, 'consumer.html'),
      },
    },
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode === 'production' ? 'production' : 'development'),
  },
  plugins: [
    {
      name: 'mui-material-css-generator',
      async buildStart() {
        if (command === 'serve') {
          await buildCss();
        }
      },
      configureServer(server) {
        let pendingBuild = Promise.resolve();
        server.watcher.add(materialCssSourceDirectories);
        server.watcher.on('change', (file) => {
          if (!isMaterialCssSource(file)) {
            return;
          }

          pendingBuild = pendingBuild
            .then(async () => {
              await buildCss();
              server.ws.send({ type: 'full-reload' });
            })
            .catch((error) => {
              server.config.logger.error(String(error));
            });
        });
      },
    },
    react(),
  ],
  resolve: {
    alias: [
      {
        // Keep MUI's markup and behavior, but replace all runtime component style generation.
        find: /^@mui\/styled-engine$/,
        replacement: path.resolve(dirname, 'src/noopStyledEngine.tsx'),
      },
    ],
  },
}));
