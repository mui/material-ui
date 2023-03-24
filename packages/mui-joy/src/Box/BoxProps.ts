import { OverrideProps } from '@mui/types';
import { BoxTypeMap } from '@mui/system';
import { Theme } from '../styles/types';
import { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';

export type BoxSlot = 'root';

export interface BoxSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root: React.ElementType;
}

export type BoxSlotsAndSlotProps = CreateSlotsAndSlotProps<
  BoxSlots,
  {
    root: SlotProps<'div', {}, BoxOwnerState>;
  }
>;

export type BoxProps<
  D extends React.ElementType = BoxTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<BoxTypeMap<P & BoxSlotsAndSlotProps, D, Theme>, D>;

export interface BoxOwnerState extends BoxProps {}
