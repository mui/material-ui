import { DefaultTheme } from '@mui/system';

export interface ThemeProviderProps<Theme = DefaultTheme> {
  children?: React.ReactNode;
  theme: Partial<Theme> | ((outerTheme: Theme) => Theme);
}

/**
 * This component makes the `theme` available down the React tree.
 * It should preferably be used at **the root of your component tree**.
 * API:
 *
 * - [ThemeProvider API](/customization/theming/#themeprovider)
 */
export default function ThemeProvider<T = DefaultTheme>(
  props: ThemeProviderProps<T>,
): React.ReactElement<ThemeProviderProps<T>>;
