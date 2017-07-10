// @flow

export type SyntheticUIEventHandler = (event?: SyntheticUIEvent) => void;

/**
 * return type of ReactDOM.findDOMNode()
 *
 * NOTE: `Element` is NOT the same as `type { Element } from 'react'` a.k.a React$Element
 *
 * To use it as a typical node, check with `if (node instanceof HTMLElement) { ... }`
 */
// Actual flow type:
// export type DOMNode = Element | Text | null;

// Workaround type (results in `any`) due to https://github.com/brigand/babel-plugin-flow-react-proptypes/issues/115
export type DOMNode = typeof Element | typeof Text | null;
