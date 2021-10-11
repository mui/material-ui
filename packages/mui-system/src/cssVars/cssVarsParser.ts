type NestedRecord<V = any> = {
  [k: string | number]: NestedRecord<V> | V;
};

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

interface CreateCssVarsParserOptions<Vars = NestedRecord<string>> {
  getCssVar?: (keys: Array<string>, value: string | number) => string;
  getCssValue?: (keys: Array<string>, value: string | number) => string | number;
  appendVars?: (vars: Vars, keys: Array<string>, cssVar: string) => void;
}

const defaultOptions: Required<CreateCssVarsParserOptions> = {
  getCssVar: (keys) => `--${keys.join('-')}`,
  getCssValue: (_, value) => value,
  appendVars: (vars, keys, cssVar) => {
    assignNestedKeys(vars, keys, `var(${cssVar})`);
  },
};

export const createCssVarsParser = <Css = NestedRecord<string>, Vars = NestedRecord<string>>(
  options: CreateCssVarsParserOptions<Vars> = {},
) => {
  const {
    getCssVar = defaultOptions.getCssVar,
    getCssValue = defaultOptions.getCssValue,
    appendVars = defaultOptions.appendVars,
  } = options;
  return (obj: Record<string, any>) => {
    const css = {} as Css;
    const vars = {} as Vars;

    walkObjectDeep(obj, (keys, value) => {
      if (typeof value === 'string' || typeof value === 'number') {
        const cssVar = getCssVar(keys, value);
        Object.assign(css, { [cssVar]: getCssValue(keys, value) });

        (appendVars as Required<CreateCssVarsParserOptions<Vars>>['appendVars'])(
          vars,
          keys,
          cssVar,
        );
      }
    });

    return { css, vars };
  };
};

export default createCssVarsParser();
