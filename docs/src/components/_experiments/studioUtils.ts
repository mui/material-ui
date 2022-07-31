function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

interface Palette {
  [k: string]:
    | string
    | {
        [k: string]: string;
      };
}

interface TypingInfo {
  parentInterface: string;
  value: string;
}

export const getNewPalettes = (defaultPalette: any, customPalette: Palette) => {
  const result: TypingInfo[] = [];
  Object.entries(customPalette).forEach(([mainKey, nestedPalette]) => {
    if (typeof nestedPalette === 'string') {
      if (defaultPalette[mainKey] === undefined) {
        result.push({
          parentInterface: 'Palette',
          value: `${mainKey}:string;`,
        });
      }
    } else if (
      mainKey.match(/(primary|neutral|danger|info|success|warning|common|text|background)/)
    ) {
      Object.keys(nestedPalette).forEach((nestedKey) => {
        if (defaultPalette[mainKey][nestedKey] === undefined) {
          result.push({
            parentInterface: `Palette${capitalize(mainKey)}`,
            value: `${nestedKey}:string;`,
          });
        }
      });
    } else if (
      defaultPalette[mainKey] === undefined &&
      nestedPalette &&
      typeof nestedPalette === 'object'
    ) {
      result.push({
        parentInterface: 'Palette',
        value: `${mainKey}:{${Object.keys(nestedPalette)
          .map((k) => `${k}:string;`)
          .join('')}};`,
      });
    }
  });
  return result;
};

export default {};
