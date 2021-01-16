import { GlobalStylesProps } from '@material-ui/styled-engine';
import { Omit } from '@material-ui/types';
/**
 *
 * API:
 *
 * - [Global API](https://material-ui.com/api/global/)
 */
export default function GlobalStyles(
  props: Omit<GlobalStylesProps, 'defaultTheme'>
): React.ReactElement;
