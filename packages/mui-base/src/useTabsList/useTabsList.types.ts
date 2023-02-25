import * as React from 'react';

export interface UseTabsListParameters {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  ref: React.Ref<unknown>;
}

export type UseTabsListRootSlotProps<TOther = {}> = TOther & {
  'aria-label'?: React.AriaAttributes['aria-label'];
  'aria-labelledby'?: React.AriaAttributes['aria-labelledby'];
  'aria-orientation'?: React.AriaAttributes['aria-orientation'];
  role: React.AriaRole;
  ref: React.Ref<any>;
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
};

export interface UseTabsListReturnValue {
  /**
   * If `true`, it will indicate that the text's direction in right-to-left.
   * @default false
   */
  isRtl: boolean;
  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation: 'horizontal' | 'vertical';
  /**
   * The value of the currently selected `Tab`.
   */
  value: string | number | false;
  /**
   * Callback for processing the children of the tabs list. It adds the necessary attributes for correct a11y and navigation.
   */
  processChildren: () =>
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>[]
    | null
    | undefined;
  /**
   * Resolver for the root slot's props.
   * @param externalProps props for the root slot
   * @returns props that should be spread on the root slot
   */
  getRootProps: <TOther extends Record<string, any> = {}>(
    externalProps?: TOther,
  ) => UseTabsListRootSlotProps<TOther>;
}
