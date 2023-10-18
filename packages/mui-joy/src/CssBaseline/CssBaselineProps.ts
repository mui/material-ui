export interface CssBaselineProps {
  /**
   * You can wrap a node.
   */
  children?: React.ReactNode;
  /**
   * Disable `color-scheme` CSS property.
   *
   * For more details, check out https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme
   * For browser support, check out https://caniuse.com/?search=color-scheme
   * @default false
   */
  disableColorScheme?: boolean;
}
