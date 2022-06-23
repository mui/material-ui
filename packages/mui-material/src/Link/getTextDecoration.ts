import { alpha, getPath } from '@mui/system';
import type { Theme } from '../styles';

export const colorTransformations = {
  primary: 'primary.main',
  textPrimary: 'text.primary',
  secondary: 'secondary.main',
  textSecondary: 'text.secondary',
  error: 'error.main',
};

const transformDeprecatedColors = (color: string) => {
  return colorTransformations[color as keyof typeof colorTransformations] || color;
};

const getTextDecoration = <T extends Theme>({
  theme,
  ownerState,
}: {
  theme: T;
  ownerState: { color: string };
}) => {
  const transformedColor = transformDeprecatedColors(ownerState.color);
  const color = (getPath(theme, `palette.${transformedColor}`, false) ||
    ownerState.color) as string;
  const channelColor = getPath(theme, `palette.${transformedColor}Channel`) as string | null;
  if ('vars' in theme && channelColor) {
    return `rgba(${channelColor} / 0.4)`;
  }
  return alpha(color, 0.4);
};

export default getTextDecoration;
