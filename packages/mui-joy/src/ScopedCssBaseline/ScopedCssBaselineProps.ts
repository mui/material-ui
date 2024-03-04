import { OverrideProps } from '@mui/types';
import { SxProps } from '../styles/types';
import { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';

export type ScopedCssBaselineSlot = 'root';

export interface ScopedCssBaselineSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
}

export type ScopedCssBaselineSlotsAndSlotProps = CreateSlotsAndSlotProps<
  ScopedCssBaselineSlots,
  {
    root: SlotProps<'div', {}, ScopedCssBaselineOwnerState>;
  }
>;

export interface ScopedCssBaselineTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * You can wrap a node.
     */
    children?: React.ReactNode;
    /**
     * Disable `color-scheme` CSS property.
     * For more details, check out https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme
     * For browser support, check out https://caniuse.com/?search=color-scheme
     * @default false
     */
    disableColorScheme?: boolean;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
  } & ScopedCssBaselineSlotsAndSlotProps;
  defaultComponent: D;
}

export type ScopedCssBaselineProps<
  D extends React.ElementType = ScopedCssBaselineTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<ScopedCssBaselineTypeMap<P, D>, D>;

export interface ScopedCssBaselineOwnerState extends ScopedCssBaselineProps {}
