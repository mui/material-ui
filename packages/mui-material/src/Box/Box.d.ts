import { createBox, BoxTypeMap } from '@mui/system';
import { OverrideProps } from '../OverridableComponent';
import { Theme } from '../styles';

/**
 *
 * Demos:
 *
 * - [Box](https://mui.com/material-ui/react-box/)
 *
 * API:
 *
 * - [Box API](https://mui.com/material-ui/api/box/)
 */
declare const Box: ReturnType<typeof createBox<Theme>>;

export type BoxProps<
  D extends React.ElementType = BoxTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<BoxTypeMap<P, D, Theme>, D>;

export default Box;
