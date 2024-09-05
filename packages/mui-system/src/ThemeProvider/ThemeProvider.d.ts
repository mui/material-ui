import { DefaultTheme } from '@mui/private-theming';

export interface ThemeProviderProps<Theme = DefaultTheme> {
  /**
   * Your component tree.
   */
  children?: React.ReactNode;
  /**
   * The design system's unique id for getting the corresponded theme when there are multiple design systems.
   */
  themeId?: string;
  /**
   * A theme object. You can provide a function to extend the outer theme.
   */
  theme: Partial<Theme> | ((outerTheme: Theme) => Theme);
}

/**
 * This component makes the `theme` available down the React tree.
 * It should preferably be used at **the root of your component tree**.
 * API:
 *
 * - [ThemeProvider API](https://mui.com/material-ui/customization/theming/#themeprovider)
 */
export default function ThemeProvider<T = DefaultTheme>(
  props: ThemeProviderProps<T>,
): React.ReactElement<ThemeProviderProps<T>>;
