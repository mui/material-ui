import * as React from 'react';
import { StandardProps } from '../';

export type NamedMuiComponent = React.ComponentType & { muiName: string };

export interface NamedMuiElement {
  type: NamedMuiComponent;
  props: StandardProps<{}, never>;
  key: string | number | null;
}

export function isMuiElement(element: any, muiNames: string[]): element is NamedMuiElement;

/**
 * passes {value} to {ref}
 *
 * WARNING: Be sure to only call this inside a callback that is passed as a ref.
 * Otherwise make sure to cleanup previous {ref} if it changes. See
 * https://github.com/mui-org/material-ui/issues/13539
 *
 * useful if you want to expose the ref of an inner component to the public api
 * while still using it inside the component
 *
 * @param ref a ref callback or ref object if anything falsy this is a no-op
 */
export function setRef<T>(
  ref: React.RefObject<T> | ((instance: T | null) => void) | null | undefined,
  value: T | null,
): void;

export function useForkRef<T>(refA: React.Ref<T>, refB: React.Ref<T>): React.Ref<T>;
