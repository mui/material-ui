import capitalize from '@mui/utils/capitalize';
import type { CSSObject } from '@mui/styled-engine';
import responsivePropType from '../responsivePropType';
import { handleBreakpoints } from '../breakpoints';
import type { StyleFunction } from '../Box';

export type TransformFunction = (
  cssValue: unknown,
  userValue: unknown,
  transform: object | ((arg: any) => any) | undefined | null,
) => number | string | React.CSSProperties | CSSObject;

export interface StyleOptions<PropKey> {
  cssProperty?: PropKey | keyof React.CSSProperties | false;
  prop: PropKey;
  /**
   * dot access in `Theme`
   */
  themeKey?: string;
  transform?: TransformFunction;
}

export function getPath<T extends Record<string, any> | undefined | null>(
  obj: T,
  pathInput: string | undefined,
  checkVars: boolean = true,
): null | unknown {
  if (!obj || !pathInput) {
    return null;
  }

  const path = pathInput.split('.');

  // Check if CSS variables are used
  if (obj.vars && checkVars) {
    const val = getPathImpl(obj.vars, path);
    if (val != null) {
      return val;
    }
  }

  return getPathImpl(obj, path);
}

function getPathImpl(object: any, path: string[]) {
  let result = object;
  let index = 0;

  while (index < path.length) {
    if (result === null || result === undefined) {
      return result;
    }

    result = result[path[index]];
    index += 1;
  }

  return result;
}

export function getStyleValue(
  themeMapping: object | ((arg: any) => any) | null | undefined,
  transform: TransformFunction | null | undefined,
  propValueFinal: unknown,
  userValue: unknown = propValueFinal,
): any {
  let value;

  if (typeof themeMapping === 'function') {
    value = themeMapping(propValueFinal);
  } else if (Array.isArray(themeMapping)) {
    value = themeMapping[propValueFinal as any] || userValue;
  } else if (typeof propValueFinal === 'string') {
    value = getPath(themeMapping, propValueFinal) || userValue;
  } else {
    value = userValue;
  }

  if (transform) {
    value = transform(value, userValue, themeMapping);
  }

  return value;
}

type StyleResult<PropKey extends string | number | symbol, Theme> = StyleFunction<
  { [K in PropKey]?: unknown } & { theme?: Theme }
> & { filterProps: string[]; propTypes: any };

function style<PropKey extends string, Theme extends object>(
  options: StyleOptions<PropKey>,
): StyleResult<PropKey, Theme> {
  const { prop, cssProperty = options.prop, themeKey, transform } = options;

  // eslint-disable-next-line react/function-component-definition
  const fn: StyleResult<PropKey, Theme> = (props) => {
    if (props[prop] == null) {
      return null;
    }

    const propValue = props[prop];
    const theme = props.theme;
    const themeMapping = getPath(theme, themeKey) || {};
    const styleFromPropValue = (propValueFinal: any) => {
      let value = getStyleValue(themeMapping, transform, propValueFinal);

      if (propValueFinal === value && typeof propValueFinal === 'string') {
        // Haven't found value
        value = getStyleValue(
          themeMapping,
          transform,
          `${prop}${propValueFinal === 'default' ? '' : capitalize(propValueFinal)}`,
          propValueFinal,
        );
      }

      if (cssProperty === false) {
        return value;
      }

      return {
        [cssProperty]: value,
      };
    };

    return handleBreakpoints(props, propValue, styleFromPropValue);
  };

  fn.propTypes =
    process.env.NODE_ENV !== 'production'
      ? {
          [prop]: responsivePropType,
        }
      : {};

  fn.filterProps = [prop];

  return fn;
}

export default style;
