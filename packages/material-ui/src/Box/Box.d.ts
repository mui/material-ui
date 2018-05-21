import { PropTypes, StandardProps } from '..';

export interface BoxProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, BoxClassKey> {}

export type BoxClassKey =
  | 'root';

declare const Box: React.ComponentType<BoxProps>;

export default Box;
