import * as React from 'react';
import { EventHandlers } from '../utils';

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
  isRtl: boolean;
  orientation: 'horizontal' | 'vertical';
  value: string | number | false;
  processChildren: () =>
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>[]
    | null
    | undefined;
  getRootProps: <TOther extends EventHandlers = {}>(
    otherHandlers?: TOther,
  ) => UseTabsListRootSlotProps<TOther>;
}
