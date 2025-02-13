import type { ExtendTheme } from '@mui/material-pigment-css';

interface ThemeTokens {
  'max-width': string;
  'border-radius': string;
  'font-mono': string;
  'foreground-rgb': string;
  'background-start-rgb': string;
  'background-end-rgb': string;
  'primary-glow': string;
  'secondary-glow': string;
  title: {
    'start-rgb': string;
    'end-rgb': string;
    border: string;
  };
  callout: {
    rgb: string;
    'border-rgb': string;
  };
  card: {
    rgb: string;
    'border-rgb': string;
  };
}

type CustomTheme = ExtendTheme<{
  colorScheme: 'light' | 'dark';
  tokens: ThemeTokens;
}>;

declare module '@mui/material-pigment-css/theme' {
  interface ThemeArgs {
    theme: CustomTheme;
  }
}

declare global {
  namespace React {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface HTMLAttributes<T> {
      sx?:
        | React.CSSProperties
        | ((theme: CustomTheme) => React.CSSProperties)
        | ReadonlyArray<React.CSSProperties | ((theme: CustomTheme) => React.CSSProperties)>;
    }
  }
}
