'use client';
import PropTypes from 'prop-types';
import {
  GlobalStyles as MuiGlobalStyles,
  Interpolation,
  internal_serializeStyles as serializeStyles,
} from '@mui/styled-engine';
import { isPlainObject } from '@mui/utils/deepmerge';
import useTheme from '../useTheme';
import { Theme as SystemTheme } from '../createTheme';
import { getCssLayer, wrapInCssLayer } from '../cssLayers';

export interface GlobalStylesProps<Theme = SystemTheme> {
  styles: Interpolation<Theme>;
  defaultTheme?: object | undefined;
  themeId?: string | undefined;
}

// Keys of a style object that stay at the top level, see `wrapInCssLayer`.
const TOP_LEVEL_KEY = /^@(layer|import|charset|namespace)\b/i;

function wrapGlobalLayer(styles: any, layerName: string) {
  const serialized = serializeStyles(styles) as { styles?: string | undefined };
  if (styles !== serialized && serialized.styles) {
    // `serializeStyles` returned a new object, so it can be changed.
    serialized.styles = wrapInCssLayer(serialized.styles, layerName);
    return serialized;
  }
  // styled-components doesn't serialize the styles, so wrap them as they are.
  if (typeof styles === 'string') {
    return wrapInCssLayer(styles, layerName);
  }
  if (isPlainObject(styles) && typeof styles.styles === 'string') {
    // Emotion returns styles it already serialized, such as `css` results, as they are. They can
    // be shared, so wrap a copy, with its own name and the keyframes it references (`next`).
    return {
      ...styles,
      name: `${styles.name}-${layerName.replace('.', '-')}`,
      styles: wrapInCssLayer(styles.styles, layerName),
    };
  }
  if (isPlainObject(styles)) {
    // Keep the app's own layers and the at-rules that can't be in a layer at the top level, in order.
    const result: object[] = [];
    let run: Record<string, any> | null = null;
    Object.keys(styles).forEach((key) => {
      if (TOP_LEVEL_KEY.test(key)) {
        run = null;
        result.push({ [key]: styles[key] });
      } else {
        if (!run) {
          run = {};
          result.push({ [`@layer ${layerName}`]: run });
        }
        run[key] = styles[key];
      }
    });
    return result.length === 1 ? result[0] : result;
  }
  return styles;
}

function GlobalStyles<Theme = SystemTheme>({
  styles,
  themeId,
  defaultTheme = {},
}: GlobalStylesProps<Theme>) {
  const upperTheme = useTheme(defaultTheme);
  const resolvedTheme = themeId ? (upperTheme as any)[themeId] || upperTheme : upperTheme;

  let globalStyles = typeof styles === 'function' ? styles(resolvedTheme) : styles;
  const layerName = getCssLayer(resolvedTheme, 'global');
  if (layerName) {
    if (Array.isArray(globalStyles)) {
      globalStyles = globalStyles.map((styleArg) => {
        if (typeof styleArg === 'function') {
          return wrapGlobalLayer(styleArg(resolvedTheme), layerName);
        }
        return wrapGlobalLayer(styleArg, layerName);
      });
    } else {
      globalStyles = wrapGlobalLayer(globalStyles, layerName);
    }
  }

  return <MuiGlobalStyles styles={globalStyles as any} />;
}

GlobalStyles.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  defaultTheme: PropTypes.object,
  /**
   * @ignore
   */
  styles: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.array,
    PropTypes.func,
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
    PropTypes.bool,
  ]),
  /**
   * @ignore
   */
  themeId: PropTypes.string,
} as any;

export default GlobalStyles;
