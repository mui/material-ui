import { getPath } from '@mui/system/style';
import type { Theme } from '../styles';

const getTextDecoration = <T extends Theme>({
  theme,
  ownerState,
}: {
  theme: T;
  ownerState: { color: string };
}) => {
  const transformedColor = ownerState.color;
  // check the `main` color first for a custom palette, then fallback to the color itself
  const color = (getPath(theme, `palette.${transformedColor}.main`, false) ||
    getPath(theme, `palette.${transformedColor}`, false) ||
    ownerState.color) as string;

  return theme.alpha(color, 0.4);
};

export default getTextDecoration;
