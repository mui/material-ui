import type { OverrideProps } from '@mui/types';
import type { BoxTypeMap } from '@mui/system';
import type { Theme } from '../styles/types';

export type BoxSlot = 'root';

export type BoxProps<
  D extends React.ElementType = BoxTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<BoxTypeMap<P, D, Theme>, D>;

export interface BoxOwnerState extends BoxProps {}
