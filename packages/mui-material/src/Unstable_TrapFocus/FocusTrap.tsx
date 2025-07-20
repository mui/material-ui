'use client';
/* eslint-disable consistent-return, jsx-a11y/no-noninteractive-tabindex */
import * as React from 'react';
import PropTypes from 'prop-types';
import useForkRef from '@mui/utils/useForkRef';
import ownerDocument from '@mui/utils/ownerDocument';
import getReactElementRef from '@mui/utils/getReactElementRef';
import exactProp from '@mui/utils/exactProp';
import elementAcceptingRef from '@mui/utils/elementAcceptingRef';
import { FocusTrapProps } from './FocusTrap.types';

// Inspired by https://github.com/focus-trap/tabbable
const candidatesSelector = [
  'input',
  'select',
  'textarea',
  'a[href]',
  'button',
  '[tabindex]',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])',
].join(',');

interface OrderedTabNode {
  documentOrder: number;
  tabIndex: number;
  node: HTMLElement;
}

function getTabIndex(node: HTMLElement): number {
  const tabindexAttr = parseInt(node.getAttribute('tabindex') || '', 10);

  if (!Number.isNaN(tabindexAttr)) {
    return tabindexAttr;
  }

  // Browsers do not return `tabIndex` correctly for contentEditable nodes;
  // https://issues.chromium.org/issues/41283952
  // so if they don't have a tabindex attribute specifically set, assume it's 0.
  // in Chrome, <details/>, <audio controls/> and <video controls/> elements get a default
  //  `tabIndex` of -1 when the 'tabindex' attribute isn't specified in the DOM,
  //  yet they are still part of the regular tab order; in FF, they get a default
  //  `tabIndex` of 0; since Chrome still puts those elements in the regular tab
  //  order, consider their tab index to be 0.
  if (
    node.contentEditable === 'true' ||
    ((node.nodeName === 'AUDIO' || node.nodeName === 'VIDEO' || node.nodeName === 'DETAILS') &&
      node.getAttribute('tabindex') === null)
  ) {
    return 0;
  }

  return node.tabIndex;
}

function isNonTabbableRadio(node: HTMLInputElement): boolean {
  if (node.tagName !== 'INPUT' || node.type !== 'radio') {
    return false;
  }

  if (!node.name) {
    return false;
  }

  const getRadio = (selector: string) =>
    node.ownerDocument.querySelector(`input[type="radio"]${selector}`);

  let roving = getRadio(`[name="${node.name}"]:checked`);

  if (!roving) {
    roving = getRadio(`[name="${node.name}"]`);
  }

  return roving !== node;
}

function isNodeMatchingSelectorFocusable(node: HTMLInputElement): boolean {
  if (
    node.disabled ||
    (node.tagName === 'INPUT' && node.type === 'hidden') ||
    isNonTabbableRadio(node)
  ) {
    return false;
  }
  return true;
}

function defaultGetTabbable(root: HTMLElement): HTMLElement[] {
  const regularTabNodes: HTMLElement[] = [];
  const orderedTabNodes: OrderedTabNode[] = [];

  Array.from(root.querySelectorAll(candidatesSelector)).forEach((node, i) => {
    const nodeTabIndex = getTabIndex(node as HTMLElement);

    if (nodeTabIndex === -1 || !isNodeMatchingSelectorFocusable(node as HTMLInputElement)) {
      return;
    }

    if (nodeTabIndex === 0) {
      regularTabNodes.push(node as HTMLElement);
    } else {
      orderedTabNodes.push({
        documentOrder: i,
        tabIndex: nodeTabIndex,
        node: node as HTMLElement,
      });
    }
  });

  return orderedTabNodes
    .sort((a, b) =>
      a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex,
    )
    .map((a) => a.node)
    .concat(regularTabNodes);
}

function defaultIsEnabled(): boolean {
  return true;
}

/**
 * @ignore - internal component.
 */
function FocusTrap(props: FocusTrapProps): React.JSX.Element {
  const {
    children,
    disableAutoFocus = false,
    disableEnforceFocus = false,
    disableRestoreFocus = false,
    getTabbable = defaultGetTabbable,
    isEnabled = defaultIsEnabled,
    open,
  } = props;
  const ignoreNextEnforceFocus = React.useRef(false);
  const sentinelStart = React.useRef<HTMLDivElement>(null);
  const sentinelEnd = React.useRef<HTMLDivElement>(null);
  const nodeToRestore = React.useRef<EventTarget>(null);
  const reactFocusEventTarget = React.useRef<EventTarget>(null);
  // This variable is useful when disableAutoFocus is true.
  // It waits for the active element to move into the component to activate.
  const activated = React.useRef(false);

  const rootRef = React.useRef<HTMLElement>(null);
  const handleRef = useForkRef(getReactElementRef(children), rootRef);
  const lastKeydown = React.useRef<KeyboardEvent>(null);

  React.useEffect(() => {
    // We might render an empty child.
    if (!open || !rootRef.current) {
      return;
    }

    activated.current = !disableAutoFocus;
  }, [disableAutoFocus, open]);

  React.useEffect(() => {
    // We might render an empty child.
    if (!open || !rootRef.current) {
      return;
    }

    const doc = ownerDocument(rootRef.current);

    if (!rootRef.current.contains(doc.activeElement)) {
      if (!rootRef.current.hasAttribute('tabIndex')) {
        if (process.env.NODE_ENV !== 'production') {
          console.error(
            [
              'MUI: The modal content node does not accept focus.',
              'For the benefit of assistive technologies, ' +
                'the tabIndex of the node is being set to "-1".',
            ].join('\n'),
          );
        }
        rootRef.current.setAttribute('tabIndex', '-1');
      }

      if (activated.current) {
        rootRef.current.focus();
      }
    }

    return () => {
      // restoreLastFocus()
      if (!disableRestoreFocus) {
        // In IE11 it is possible for document.activeElement to be null resulting
        // in nodeToRestore.current being null.
        // Not all elements in IE11 have a focus method.
        // Once IE11 support is dropped the focus() call can be unconditional.
        if (nodeToRestore.current && (nodeToRestore.current as HTMLElement).focus) {
          ignoreNextEnforceFocus.current = true;
          (nodeToRestore.current as HTMLElement).focus();
        }

        nodeToRestore.current = null;
      }
    };
    // Missing `disableRestoreFocus` which is fine.
    // We don't support changing that prop on an open FocusTrap
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  React.useEffect(() => {
    // We might render an empty child.
    if (!open || !rootRef.current) {
      return;
    }

    const doc = ownerDocument(rootRef.current);

    const loopFocus = (nativeEvent: KeyboardEvent) => {
      lastKeydown.current = nativeEvent;

      if (disableEnforceFocus || !isEnabled() || nativeEvent.key !== 'Tab') {
        return;
      }

      // Make sure the next tab starts from the right place.
      // doc.activeElement refers to the origin.
      if (doc.activeElement === rootRef.current && nativeEvent.shiftKey) {
        // We need to ignore the next contain as
        // it will try to move the focus back to the rootRef element.
        ignoreNextEnforceFocus.current = true;
        if (sentinelEnd.current) {
          sentinelEnd.current.focus();
        }
      }
    };

    const contain = () => {
      const rootElement = rootRef.current;

      // Cleanup functions are executed lazily in React 17.
      // Contain can be called between the component being unmounted and its cleanup function being run.
      if (rootElement === null) {
        return;
      }

      if (!doc.hasFocus() || !isEnabled() || ignoreNextEnforceFocus.current) {
        ignoreNextEnforceFocus.current = false;
        return;
      }

      // The focus is already inside
      if (rootElement.contains(doc.activeElement)) {
        return;
      }

      // The disableEnforceFocus is set and the focus is outside of the focus trap (and sentinel nodes)
      if (
        disableEnforceFocus &&
        doc.activeElement !== sentinelStart.current &&
        doc.activeElement !== sentinelEnd.current
      ) {
        return;
      }

      // if the focus event is not coming from inside the children's react tree, reset the refs
      if (doc.activeElement !== reactFocusEventTarget.current) {
        reactFocusEventTarget.current = null;
      } else if (reactFocusEventTarget.current !== null) {
        return;
      }

      if (!activated.current) {
        return;
      }

      let tabbable: ReadonlyArray<HTMLElement> = [];
      if (
        doc.activeElement === sentinelStart.current ||
        doc.activeElement === sentinelEnd.current
      ) {
        tabbable = getTabbable(rootRef.current!);
      }

      // one of the sentinel nodes was focused, so move the focus
      // to the first/last tabbable element inside the focus trap
      if (tabbable.length > 0) {
        const isShiftTab = Boolean(
          lastKeydown.current?.shiftKey && lastKeydown.current?.key === 'Tab',
        );

        const focusNext = tabbable[0];
        const focusPrevious = tabbable[tabbable.length - 1];

        if (typeof focusNext !== 'string' && typeof focusPrevious !== 'string') {
          if (isShiftTab) {
            focusPrevious.focus();
          } else {
            focusNext.focus();
          }
        }
        // no tabbable elements in the trap focus or the focus was outside of the focus trap
      } else {
        rootElement.focus();
      }
    };

    doc.addEventListener('focusin', contain);
    doc.addEventListener('keydown', loopFocus, true);

    // With Edge, Safari and Firefox, no focus related events are fired when the focused area stops being a focused area.
    // for example https://bugzilla.mozilla.org/show_bug.cgi?id=559561.
    // Instead, we can look if the active element was restored on the BODY element.
    //
    // The whatwg spec defines how the browser should behave but does not explicitly mention any events:
    // https://html.spec.whatwg.org/multipage/interaction.html#focus-fixup-rule.
    const interval = setInterval(() => {
      if (doc.activeElement && doc.activeElement.tagName === 'BODY') {
        contain();
      }
    }, 50);

    return () => {
      clearInterval(interval);

      doc.removeEventListener('focusin', contain);
      doc.removeEventListener('keydown', loopFocus, true);
    };
  }, [disableAutoFocus, disableEnforceFocus, disableRestoreFocus, isEnabled, open, getTabbable]);

  const onFocus = (event: React.FocusEvent<Element, Element>) => {
    if (nodeToRestore.current === null) {
      nodeToRestore.current = event.relatedTarget;
    }
    activated.current = true;
    reactFocusEventTarget.current = event.target;

    const childrenPropsHandler = children.props.onFocus;
    if (childrenPropsHandler) {
      childrenPropsHandler(event);
    }
  };

  const handleFocusSentinel = (event: React.FocusEvent<HTMLDivElement>) => {
    if (nodeToRestore.current === null) {
      nodeToRestore.current = event.relatedTarget;
    }
    activated.current = true;
  };

  return (
    <React.Fragment>
      <div
        tabIndex={open ? 0 : -1}
        onFocus={handleFocusSentinel}
        ref={sentinelStart}
        data-testid="sentinelStart"
      />
      {React.cloneElement(children, { ref: handleRef, onFocus })}
      <div
        tabIndex={open ? 0 : -1}
        onFocus={handleFocusSentinel}
        ref={sentinelEnd}
        data-testid="sentinelEnd"
      />
    </React.Fragment>
  );
}

FocusTrap.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A single child content element.
   */
  children: elementAcceptingRef,
  /**
   * If `true`, the focus trap will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any focus trap children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the focus trap less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus: PropTypes.bool,
  /**
   * If `true`, the focus trap will not prevent focus from leaving the focus trap while open.
   *
   * Generally this should never be set to `true` as it makes the focus trap less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableEnforceFocus: PropTypes.bool,
  /**
   * If `true`, the focus trap will not restore focus to previously focused element once
   * focus trap is hidden or unmounted.
   * @default false
   */
  disableRestoreFocus: PropTypes.bool,
  /**
   * Returns an array of ordered tabbable nodes (i.e. in tab order) within the root.
   * For instance, you can provide the "tabbable" npm dependency.
   * @param {HTMLElement} root
   */
  getTabbable: PropTypes.func,
  /**
   * This prop extends the `open` prop.
   * It allows to toggle the open state without having to wait for a rerender when changing the `open` prop.
   * This prop should be memoized.
   * It can be used to support multiple focus trap mounted at the same time.
   * @default function defaultIsEnabled(): boolean {
   *   return true;
   * }
   */
  isEnabled: PropTypes.func,
  /**
   * If `true`, focus is locked.
   */
  open: PropTypes.bool.isRequired,
} as any;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line
  (FocusTrap as any)['propTypes' + ''] = exactProp(FocusTrap.propTypes);
}

export default FocusTrap;
