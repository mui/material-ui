import { UseListItemRootSlotProps } from '../useList';

export interface SelectOption<Value> {
  value: Value;
  label: React.ReactNode;
  disabled?: boolean;
  ref: React.RefObject<Element>;
  id?: string;
}

export interface UseOptionParameters<Value> {
  disabled: boolean;
  label: string | React.ReactNode;
  value: Value;
  rootRef?: React.Ref<Element>;
  id?: string;
}

export interface UseOptionReturnValue {
  /**
   * If `true`, the option is selected.
   */
  selected: boolean;
  /**
   * If `true`, the option is highlighted.
   */
  highlighted: boolean;
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
