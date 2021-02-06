import { GlobalStylesProps } from '@material-ui/styled-engine';
import { DistributiveOmit } from '@material-ui/types';
/**
 *
 * API:
 *
 * - [Global API](https://material-ui.com/api/global/)
 */
export default function GlobalStyles(
  props: DistributiveOmit<GlobalStylesProps, 'defaultTheme'>
): React.ReactElement;
