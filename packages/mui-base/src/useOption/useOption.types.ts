import { ListAction, UseListItemRootSlotProps } from '../useList';

export interface SelectOption<Value> {
  value: Value;
  label: React.ReactNode;
  disabled?: boolean;
  ref: React.RefObject<Element>;
  id?: string;
}

export interface UseOptionParameters<Value> {
  disabled: boolean;
  dispatch: React.Dispatch<ListAction<Value>>;
  highlighted: boolean;
  id?: string;
  label: string | React.ReactNode;
  rootRef?: React.Ref<Element>;
  selected: boolean;
  value: Value;
}

export interface UseOptionReturnValue {
  index: number;
  /**
   * Resolver for the root slot's props.
   * @param externalProps props for the root slot
   * @returns props that should be spread on the root slot
   */
  getRootProps: <ExternalProps extends Record<string, unknown>>(
    externalProps?: ExternalProps,
  ) => UseOptionRootSlotProps<ExternalProps>;
  /**
   * Ref to the root slot DOM node.
   */
  rootRef: React.RefCallback<Element> | null;
}

export type UseOptionRootSlotProps<ExternalProps extends Record<string, unknown> = {}> =
  UseListItemRootSlotProps<ExternalProps> & {
    ref?: React.RefCallback<Element> | null;
  } & ExternalProps;
