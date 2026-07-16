import postcss, { type Plugin } from 'postcss';
import { prepareCustomMedia, type PrepareCustomMediaOptions } from './utils/prepareCustomMedia';

export interface MuiCustomMediaPostcssOptions extends PrepareCustomMediaOptions {}

/** Injects MUI breakpoint aliases before postcss-custom-media resolves them. */
export default function muiCustomMedia(options: MuiCustomMediaPostcssOptions): Plugin {
  return {
    postcssPlugin: 'mui-custom-media',
    Once(root) {
      const declarations = prepareCustomMedia(root.toString(), options);

      if (declarations) {
        root.prepend(postcss.parse(declarations).nodes);
      }
    },
  };
}
