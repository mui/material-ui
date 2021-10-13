type NestedRecord<V = any> = {
  [k: string | number]: NestedRecord<V> | V;
};

/**
 * This function create an object from keys, value and then assign to target
 *
 * @param {Object} obj : the target object to be assigned
 * @param {string[]} keys
 * @param {string | number} value
 *
 * @example
 * const source = {}
 * assignNestedKeys(source, ['palette', 'primary'], 'var(--palette-primary)')
 * console.log(source) // { palette: { primary: 'var(--palette-primary)' } }
 *
 * @example
 * const source = { palette: { primary: 'var(--palette-primary)' } }
 * assignNestedKeys(source, ['palette', 'secondary'], 'var(--palette-secondary)')
 * console.log(source) // { palette: { primary: 'var(--palette-primary)', secondary: 'var(--palette-secondary)' } }
 */
export const assignNestedKeys = <Object = NestedRecord, Value = any>(
  obj: Object,
  keys: Array<string>,
  value: Value,
) => {
  let temp: Record<string, any> = obj;
  keys.forEach((k, index) => {
    if (index === keys.length - 1) {
      if (temp && typeof temp === 'object') {
        temp[k] = value;
      }
    } else if (temp && typeof temp === 'object') {
      if (!temp[k]) {
        temp[k] = {};
      }
      temp = temp[k];
    }
  });
};

/**
 *
 * @param {Object} obj : source object
 * @param {Function} callback : a function that will be called when
 *                   - the deepest key in source object is reached
 *                   - the value of the deepest key is NOT `undefined` | `null`
 *
 * @example
 * walkObjectDeep({ palette: { primary: { main: '#000000' } } }, console.log)
 * // ['palette', 'primary', 'main'] '#000000'
 */
export const walkObjectDeep = <Value, T = Record<string, any>>(
  obj: T,
  callback: (keys: Array<string>, value: Value) => void,
) => {
  function recurse(object: any, parentKeys: Array<string> = []) {
    Object.entries(object).forEach(([key, value]: [string, any]) => {
      if (value !== undefined && value !== null) {
        if (typeof value === 'object' && Object.keys(value).length > 0) {
          recurse(value, [...parentKeys, key]);
        } else {
          callback([...parentKeys, key], value);
        }
      }
    });
  }
  recurse(obj);
};

interface CreateCssVarsParserOptions {
  getCssVar?: (keys: Array<string>, value: string | number) => string;
  getCssValue?: (keys: Array<string>, value: string | number) => string | number;
}

const defaultOptions: Required<CreateCssVarsParserOptions> = {
  getCssVar: (keys) => `--${keys.join('-')}`,
  getCssValue: (_, value) => value,
};

/**
 * a utility for creating a custom parser by providing options.
 *
 * @param {Object} options
 * @returns {Function} parser
 *
 * @example
 * const parser = createCssVarsParser({
 *   getCssVar: keys => `--mui-${keys.join('-')}`,
 *   getCssValue: (keys, value) => typeof value === 'number' ? `${value}px` : value,
 * })
 *
 * const { css, vars } = parser({
 *   fontSize: 12,
 *   lineHeight: 1.2,
 *   palette: { primary: { 500: '#000000' } }
 * })
 *
 * console.log(css) // { '--fontSize': '12px', '--lineHeight': 1.2, '--palette-primary-500': '#000000' }
 * console.log(vars) // { fontSize: '--fontSize', lineHeight: '--lineHeight', palette: { primary: { 500: 'var(--palette-primary-500)' } } }
 */
export const createCssVarsParser = <Css = NestedRecord<string>, Vars = NestedRecord<string>>(
  options: CreateCssVarsParserOptions = {},
) => {
  const { getCssVar = defaultOptions.getCssVar, getCssValue = defaultOptions.getCssValue } =
    options;
  return (obj: Record<string, any>) => {
    const css = {} as Css;
    const vars = {} as Vars;

    walkObjectDeep(obj, (keys, value) => {
      if (typeof value === 'string' || typeof value === 'number') {
        const cssVar = getCssVar(keys, value);
        Object.assign(css, { [cssVar]: getCssValue(keys, value) });

        assignNestedKeys(vars, keys, `var(${cssVar})`);
      }
    });

    return { css, vars };
  };
};

export default createCssVarsParser();
