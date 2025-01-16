import type { BoxTypeMap } from '@mui/system';
import type { OverridableComponent } from '@mui/types';
import type { OverrideProps } from '../OverridableComponent';
import type { Theme as MaterialTheme } from '../styles';

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
declare const Box: OverridableComponent<BoxTypeMap<{}, 'div', MaterialTheme>>;

export type BoxProps<
  RootComponent extends React.ElementType = BoxTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<BoxTypeMap<AdditionalProps, RootComponent, MaterialTheme>, RootComponent> & {
  component?: React.ElementType;
};

export default Box;
