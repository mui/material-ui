import cssesc from 'cssesc';

export type Atomics = {
  conditions: Record<string, string>;
  defaultCondition: string;
  properties: {
    [key: string]: string[];
  };
  shorthands: Record<string, string[]>;
};

export type RuntimeConfig = {
  conditions: string[];
  styles: Record<string, Record<string, Record<string, string>>>;
  shorthands: Atomics['shorthands'];
};

function getClassName(...items: string[]) {
  return cssesc(items.filter(Boolean).join('_'));
}

export function convertAtomicsToCss(
  { conditions = {}, defaultCondition, properties, shorthands = {} }: Atomics,
  mainClassName: string,
  isGlobal = false,
  debug = false,
  prefix = 'Mui',
) {
  const runtimeConfig: RuntimeConfig = {
    styles: {},
    shorthands,
    conditions: Object.keys(conditions),
  };
  let count = 1;
  function getCount() {
    const val = count;
    count += 1;
    return val;
  }

  const classes: {
    className: string;
    css: object;
  }[] = [];

  Object.entries(conditions).forEach(([conditionName, mediaQueryStr]) => {
    Object.entries(properties).forEach(([cssPropertyName, propertyValues]) => {
      propertyValues.forEach((propertyValue) => {
        const className =
          isGlobal || debug
            ? getClassName(
                prefix,
                cssPropertyName,
                conditionName ?? 'default',
                propertyValue,
                !isGlobal ? mainClassName : '',
              )
            : `${mainClassName}${getCount()}`;
        if (defaultCondition === conditionName || !mediaQueryStr) {
          classes.push({
            className,
            css: {
              [cssPropertyName]: propertyValue,
            },
          });
        } else {
          classes.push({
            className,
            css: {
              [mediaQueryStr]: {
                [cssPropertyName]: propertyValue,
              },
            },
          });
        }
        const classMap = runtimeConfig.styles[cssPropertyName] ?? {};
        const conditionClassMap = classMap[propertyValue] ?? {};
        conditionClassMap[conditionName] = className;
        if (conditionName === defaultCondition) {
          conditionClassMap.$$default = className;
        }
        classMap[propertyValue] = conditionClassMap;
        runtimeConfig.styles[cssPropertyName] = classMap;
      });
    });
  });

  return {
    classes,
    runtimeConfig,
  };
}
