// @flow

export type SyntheticUIEventHandler = (event?: SyntheticUIEvent) => void;

/**
 * return type of ReactDOM.findDOMNode()
 *
 * NOTE: `Element` is NOT the same as `type { Element } from 'react'` a.k.a React$Element
 *
 * To use it as a typical node, check with `if (node instanceof HTMLElement) { ... }`
 */
export type DOMNode = Element | Text | null;
