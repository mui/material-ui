import { CSSObject } from '@mui/styled-engine';
import capitalize from '@mui/utils/capitalize';
import responsivePropType from '../responsivePropType';
import { handleBreakpoints } from '../breakpoints';

export type PropsFor<SomeStyleFunction> =
  SomeStyleFunction extends StyleFunction<infer Props> ? Props : never;

export type StyleFunction<Props> = (props: Props) => any;

export type SimpleStyleFunction<PropKey extends keyof any> = StyleFunction<
  Partial<Record<PropKey, any>>
> & { filterProps: string[] };

export type TransformFunction = (
  cssValue: unknown,
  userValue: unknown,
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

export function getPath(obj: any, path: string | undefined, checkVars = true): any {
  if (!path || typeof path !== 'string') {
    return null;
  }

  // Check if CSS variables are used
  if (obj && obj.vars && checkVars) {
    const val = `vars.${path}`
      .split('.')
      .reduce((acc, item) => (acc && acc[item] ? acc[item] : null), obj);
    if (val != null) {
      return val;
    }
  }
  return path.split('.').reduce((acc, item) => {
    if (acc && acc[item] != null) {
      return acc[item];
    }
    return null;
  }, obj);
}

export function getStyleValue(themeMapping: any, transform: any, propValueFinal: any, userValue = propValueFinal): any {
  let value;

  if (typeof themeMapping === 'function') {
    value = themeMapping(propValueFinal);
  } else if (Array.isArray(themeMapping)) {
    value = themeMapping[propValueFinal] || userValue;
  } else {
    value = getPath(themeMapping, propValueFinal) || userValue;
  }

  if (transform) {
    value = transform(value, userValue, themeMapping);
  }

  return value;
}

function style(options: any): any {
  const { prop, cssProperty = options.prop, themeKey, transform } = options;

  // false positive
  // eslint-disable-next-line react/function-component-definition
  const fn = (props: any) => {
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
