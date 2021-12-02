import { GlobalStylesProps as StyledGlobalStylesProps } from '@mui/system';

export interface GlobalStylesProps {
  /**
   * The styles you want to apply globally.
   */
  styles: StyledGlobalStylesProps['styles'];
}

/**
 *
 * Demos:
 *
 * - [How To Customize](https://mui.com/customization/how-to-customize/)
 *
 * API:
 *
 * - [GlobalStyles API](https://mui.com/api/global-styles/)
 */
export default function GlobalStyles(props: GlobalStylesProps): React.ReactElement;
