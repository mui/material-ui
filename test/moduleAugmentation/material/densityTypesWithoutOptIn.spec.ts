import { createTheme, Theme } from '@mui/material/styles';
import type { SpacingKey } from '@mui/system';

declare module '@mui/material/styles' {
  interface Theme {
    iconSize: number;
  }
}

declare const theme: Theme;

const iconSize: number = theme.iconSize;

// @ts-expect-error Spacing keys are registered only by the opt-in density types
const key: SpacingKey = 'small';

const raw: string = createTheme().spacing('small');

export { iconSize, key, raw };
