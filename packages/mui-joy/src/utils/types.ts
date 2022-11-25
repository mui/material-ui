import { SxProps } from '../styles/types';

type SlotComponentCommonProps = {
  component?: React.ElementType;
  sx?: SxProps;
};

export type SlotComponentProps<TSlotComponent extends React.ElementType, TOverrides, TOwnerState> =
  | (Partial<React.ComponentPropsWithRef<TSlotComponent>> & TOverrides & SlotComponentCommonProps)
  | ((
      ownerState: TOwnerState,
    ) => Partial<React.ComponentPropsWithRef<TSlotComponent>> &
      TOverrides &
      SlotComponentCommonProps);
