import { extendTheme, Palette } from '@mui/joy/styles';

const defaultTheme = extendTheme();

const augmentPalette = (colorSchemes: any, prop: keyof Palette) => {
  if (!colorSchemes) {
    return '';
  }
  const result: Array<string> = [];
  const palette = { ...colorSchemes.light?.palette?.[prop], ...colorSchemes.dark?.palette?.[prop] };
  Object.keys(palette).forEach((k) => {
    if (
      !Object.keys(defaultTheme.colorSchemes.light.palette[prop]).includes(k) &&
      !k.match(/^(plain|outlined|soft|solid)/)
    ) {
      result.push(`${k}: true;`);
    }
    if (
      Object.keys(defaultTheme.colorSchemes.light.palette[prop]).includes(k) &&
      palette[k] === undefined
    ) {
      result.push(`${k}: false;`);
    }
  });
  return result.join('\n');
};

const prependSpace = (text: string, space = 0) => {
  const lines = text.split('\n').map((line) => `${[...Array(space).fill(' ')].join('')}${line}`);
  return lines.join('\n');
};

const renderInterface = (name: string, text: string) => {
  if (!text || !text.trim()) {
    return '';
  }
  return `interface ${name} {
${text}
  }`;
};

export default function generateThemeAugmentation(data: any) {
  const result = [
    renderInterface(
      'PalettePrimaryOverrides',
      prependSpace(augmentPalette(data?.colorSchemes, 'primary'), 4),
    ),
    renderInterface(
      `PaletteNeutralOverrides`,
      prependSpace(augmentPalette(data?.colorSchemes, 'neutral'), 4),
    ),
    renderInterface(
      'PaletteDangerOverrides',
      prependSpace(augmentPalette(data?.colorSchemes, 'danger'), 4),
    ),
    renderInterface(
      'PaletteSuccessOverrides',
      prependSpace(augmentPalette(data?.colorSchemes, 'success'), 4),
    ),
    renderInterface(
      'PaletteWarningOverrides',
      prependSpace(augmentPalette(data?.colorSchemes, 'warning'), 4),
    ),
    renderInterface(
      'PaletteBackgroundOverrides',
      prependSpace(augmentPalette(data?.colorSchemes, 'background'), 4),
    ),
    renderInterface(
      'PaletteCommonOverrides',
      prependSpace(augmentPalette(data?.colorSchemes, 'common'), 4),
    ),
    renderInterface(
      'PaletteTextOverrides',
      prependSpace(augmentPalette(data?.colorSchemes, 'text'), 4),
    ),
  ]
    .filter((text) => !!text)
    .join('\n  ');
  return `
declare module '@mui/joy/styles' {
  ${result === '' ? '// No custom tokens found, you can skip the theme augmentation.' : result}
}
`;
}
