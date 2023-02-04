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
   * The direction of the text.
   * @default 'false'
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
