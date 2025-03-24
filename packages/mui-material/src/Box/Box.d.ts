import { BoxTypeMap } from '@mui/system';
import { OverridableComponent } from '@mui/types';
import { OverrideProps } from '../OverridableComponent';
import { Theme as MaterialTheme } from '../styles';

/**
 *
 * Demos:
 *
 * - [Box](https://v6.mui.com/material-ui/react-box/)
 *
 * API:
 *
 * - [Box API](https://v6.mui.com/material-ui/api/box/)
 */
declare const Box: OverridableComponent<BoxTypeMap<{}, 'div', MaterialTheme>>;

export type BoxProps<
  RootComponent extends React.ElementType = BoxTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<BoxTypeMap<AdditionalProps, RootComponent, MaterialTheme>, RootComponent> & {
  component?: React.ElementType;
};

export default Box;
