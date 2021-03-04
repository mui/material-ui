import { GlobalStylesProps as StyledGlobalStylesProps } from '@material-ui/styled-engine';

interface GlobalStylesProps {
  /**
   * The styles you want to apply globally.
   */
  styles: StyledGlobalStylesProps['styles'];
}

/**
 *
 * API:
 *
 * - [GlobalStyles API](https://material-ui.com/api/global-styles/)
 */
export default function GlobalStyles(props: GlobalStylesProps): React.ReactElement;
