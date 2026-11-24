'use client';
import * as React from 'react';
import clsx from 'clsx';
import useForkRef from '@mui/utils/useForkRef';
import getReactElementRef from '@mui/utils/getReactElementRef';

export interface ThemeProviderRenderProps {
  /**
   * The class that sets the CSS theme variables of the provider, when they differ from the outer ones.
   */
  className?: string | undefined;
  /**
   * The attributes that mark the color scheme of a provider that has its own.
   */
  [attribute: `data-${string}`]: string | undefined;
  ref: React.Ref<any>;
  children?: React.ReactNode;
  suppressHydrationWarning?: boolean | undefined;
}

export interface ThemeProviderState {
  /**
   * The mode that applies to the children. It's `undefined` on the server and during hydration.
   */
  mode: 'light' | 'dark' | 'system' | undefined;
  /**
   * The color scheme that applies to the children. It's `undefined` on the server and during hydration.
   */
  colorScheme: string | undefined;
}

export type ThemeProviderRender =
  | React.ReactElement<any>
  | ((props: ThemeProviderRenderProps, state: ThemeProviderState) => React.ReactElement<any>);

/**
 * The children of the element of a `ThemeProvider`: the provider's ones, or the ones of the `render` element
 * when the provider has none, e.g. `<ThemeProvider render={<Button>Text</Button>} />`.
 */
export function getElementChildren(
  render: ThemeProviderRender | undefined,
  children: React.ReactNode,
): React.ReactNode {
  return children === undefined && React.isValidElement<{ children?: React.ReactNode }>(render)
    ? render.props.children
    : children;
}

/**
 * Renders the element of a `ThemeProvider`: a `div` by default, the `render` element with the props merged in,
 * or the result of the `render` function called with the props and the state.
 */
export default function useRenderElement(
  render: ThemeProviderRender | undefined,
  props: Omit<ThemeProviderRenderProps, 'ref'>,
  ref: React.Ref<any> | undefined,
  state: ThemeProviderState,
): React.ReactElement<any> {
  const element = React.isValidElement(render) ? render : null;
  const handleRef = useForkRef(ref, element ? getReactElementRef(element) : null);
  if (typeof render === 'function') {
    return render({ ...props, ref: handleRef }, state);
  }
  if (element) {
    const elementProps = element.props as { className?: string | undefined };
    return React.cloneElement(element, {
      ...props,
      children: getElementChildren(element, props.children),
      className: clsx(elementProps.className, props.className) || undefined,
      ref: handleRef,
    } as any);
  }
  return <div {...props} ref={handleRef} />;
}
