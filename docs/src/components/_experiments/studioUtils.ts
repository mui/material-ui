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
  key: string;
  parentInterface: string;
  nestedKey?: string;
}

export const getNewPalettes = (defaultPalette: any, customPalette: Palette) => {
  const result: TypingInfo[] = [];
  Object.entries(customPalette).forEach(([mainKey, nestedPalette]) => {
    if (typeof nestedPalette === 'string') {
      if (defaultPalette[mainKey] === undefined) {
        result.push({
          key: mainKey,
          parentInterface: 'Palette',
        });
      }
    } else if (
      mainKey.match(/(primary|neutral|danger|info|success|warning|common|text|background)/)
    ) {
      Object.keys(nestedPalette).forEach((nestedKey) => {
        if (defaultPalette[mainKey][nestedKey] === undefined) {
          result.push({
            key: nestedKey,
            parentInterface: `Palette${capitalize(mainKey)}`,
          });
        }
      });
    } else if (
      defaultPalette[mainKey] === undefined &&
      nestedPalette &&
      typeof nestedPalette === 'object'
    ) {
      Object.keys(nestedPalette).forEach((nestedKey) => {
        result.push({
          key: mainKey,
          nestedKey,
          parentInterface: 'Palette',
        });
      });
    }
  });
  return result;
};

export default {};
