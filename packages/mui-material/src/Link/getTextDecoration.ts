import { getPath } from '@mui/system/style';
import { alpha, hexToRgb } from '@mui/system/colorManipulator';
import type { Theme } from '../styles';

// TODO v7: remove this transformation
export const colorTransformations: Record<string, string | null | undefined> = {
  textPrimary: 'text.primary',
  textSecondary: 'text.secondary',
  // For main palette, the color will be applied by the styles above.
  primary: null,
  secondary: null,
  error: null,
  info: null,
  success: null,
  warning: null,
};

const getTextDecoration = <T extends Theme>({
  theme,
  ownerState,
}: {
  theme: T;
  ownerState: { color: string };
}) => {
  let transformedColor = colorTransformations[ownerState.color];
  if (transformedColor === null) {
    return null;
  }
  if (transformedColor === undefined) {
    transformedColor = ownerState.color;
  }
  const color = (getPath(theme, `palette.${transformedColor}`, false) ||
    ownerState.color) as string;
  const channelColor = getPath(theme, `palette.${transformedColor}Channel`) as string | null;
  if ('vars' in theme && channelColor) {
    return `rgba(${channelColor} / 0.4)`;
  }
  return hexToRgb(alpha(color, 0.4));
};

export default getTextDecoration;
