import { SxProps, BoxTypeMap } from '@material-ui/system';
import { OverridableComponent } from '../OverridableComponent';

export { BoxTypeMap } from '@material-ui/system';

declare const Box: OverridableComponent<BoxTypeMap<{sx?: SxProps<Theme> }>>;

export default Box;