export interface ThemeProviderProps<Theme> {
  children: React.ReactNode;
  theme: Theme | ((outerTheme: Theme) => Theme);
}
export default function ThemeProvider<T>(
  props: ThemeProviderProps<T>,
): React.ReactElement<ThemeProviderProps<T>>;
