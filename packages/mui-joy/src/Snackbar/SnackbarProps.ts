import { OverrideProps } from '@mui/types';
import { ClickAwayListenerProps } from '@mui/base/ClickAwayListener';
import { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';

export interface SnackbarSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
  /**
   * The component that renders the start decorator.
   * @default 'span'
   */
  startDecorator?: React.ElementType;
  /**
   * The component that renders the end decorator.
   * @default 'span'
   */
  endDecorator?: React.ElementType;
}

export type SnackbarSlotsAndSlotProps = CreateSlotsAndSlotProps<
  SnackbarSlots,
  {
    root: SlotProps<'div', {}, SnackbarOwnerState>;
    startDecorator: SlotProps<'span', {}, SnackbarOwnerState>;
    endDecorator: SlotProps<'span', {}, SnackbarOwnerState>;
  }
>;

export interface SnackbarTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * Props applied to the `ClickAwayListener` element.
     */
    ClickAwayListenerProps?: Partial<ClickAwayListenerProps>;
    /**
     * If `true`, the component is shown.
     */
    open?: boolean;
  } & SnackbarSlotsAndSlotProps;
  defaultComponent: D;
}

export type SnackbarProps<
  D extends React.ElementType = SnackbarTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<SnackbarTypeMap<P, D>, D>;

export interface SnackbarOwnerState extends SnackbarProps {}
