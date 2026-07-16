import MagicString from 'magic-string';
import type { Plugin } from 'vite';
import { prepareCustomMedia, type PrepareCustomMediaOptions } from './utils/prepareCustomMedia';

const materialPackage = '@mui/material';

/** Selects the parallel Material UI build whose components import their CSS Modules. */
export function muiMaterialCssModules(): Plugin {
  return {
    name: 'mui-material-css-modules',
    enforce: 'pre',
    config() {
      // Vite applies config aliases to both normal resolution and dependency optimization.
      return {
        resolve: {
          alias: [
            {
              find: /^@mui\/material$/,
              replacement: `${materialPackage}/css-modules`,
            },
            {
              find: /^@mui\/material\/(?!css-modules(?:\/|$)|styles\.css$|package\.json$)(.+)$/,
              replacement: `${materialPackage}/css-modules/$1`,
            },
          ],
        },
      };
    },
    moduleParsed(moduleInfo) {
      const id = moduleInfo.id.replace(/\\/g, '/');
      if (
        id.endsWith('.module.css') &&
        id.includes('/css-modules/') &&
        (id.includes('/@mui/material/') || id.includes('/mui-material/'))
      ) {
        // MUI modules expose only :global selectors, so Vite sees no class export to retain.
        moduleInfo.moduleSideEffects = 'no-treeshake';
      }
    },
  };
}

export interface MuiCustomMediaViteOptions extends PrepareCustomMediaOptions {}

/** Injects theme breakpoint aliases before Vite's Lightning CSS transform. */
export function muiCustomMedia(options: MuiCustomMediaViteOptions): Plugin {
  return {
    name: 'mui-custom-media',
    enforce: 'pre',
    transform(code, id) {
      if (!id.split('?')[0].endsWith('.css')) {
        return null;
      }

      const declarations = prepareCustomMedia(code, options);
      if (!declarations) {
        return null;
      }

      const result = new MagicString(code);
      result.prepend(`${declarations}\n`);

      return {
        code: result.toString(),
        map: result.generateMap({ hires: true }),
      };
    },
  };
}
