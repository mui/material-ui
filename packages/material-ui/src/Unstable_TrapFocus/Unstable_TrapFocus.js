/* eslint-disable @typescript-eslint/naming-convention, consistent-return, jsx-a11y/no-noninteractive-tabindex */
import * as React from 'react';
import PropTypes from 'prop-types';
import { exactProp, elementAcceptingRef } from '@material-ui/utils';
import ownerDocument from '../utils/ownerDocument';
import useForkRef from '../utils/useForkRef';

const tabbableElements = [
  '[contenteditable=true]',
  '[role="button"]',
  'a',
  'button',
  'input',
  'select',
  'textarea',
];

/**
 * Utility component that locks focus inside the component.
 */
function Unstable_TrapFocus(props) {
  const {
    children,
    disableAutoFocus = false,
    disableEnforceFocus = false,
    disableRestoreFocus = false,
    getDoc,
    isEnabled,
    open,
  } = props;

  const lastEvent = React.useRef(null);
  const nodeToRestore = React.useRef();
  const prevOpenRef = React.useRef();
  const rootRef = React.useRef(null);
  const sentinelEnd = React.useRef(null);
  const sentinelStart = React.useRef(null);
  const handleRef = useForkRef(children.ref, rootRef);

  const onFocusStart = React.useCallback((e) => {
    const isShiftTab = Boolean(lastEvent.current?.shiftKey && lastEvent.current?.keyCode === 9);
    const radios = rootRef.current.querySelectorAll('input:checked');
    const tabbables = rootRef.current.querySelectorAll(tabbableElements.join(', '));
    const tabbableStart = tabbables[0].type === 'radio' ? radios[0] : tabbables[0];
    const tabbableEnd =
      tabbables[tabbables.length - 1].type === 'radio'
        ? radios[0]
        : tabbables[tabbables.length - 1];
    if (tabbables.length) {
      if (isShiftTab) {
        return tabbableEnd.focus();
      }
      return tabbableStart.focus();
    }
    return rootRef.focus();
  }, []);

  const onFocusEnd = React.useCallback((e) => {
    const isShiftTab = Boolean(lastEvent.current?.shiftKey && lastEvent.current?.keyCode === 9);
    const radios = rootRef.current.querySelectorAll('input:checked');
    const tabbables = rootRef.current.querySelectorAll(tabbableElements.join(', '));
    const tabbableStart = tabbables[0].type === 'radio' ? radios[0] : tabbables[0];
    const tabbableEnd =
      tabbables[tabbables.length - 1].type === 'radio'
        ? radios[0]
        : tabbables[tabbables.length - 1];
    if (tabbables.length) {
      if (isShiftTab) {
        return tabbableEnd.focus();
      }
      return tabbableStart.focus();
    }
    return rootRef.focus();
  }, []);

  const onKeydown = React.useCallback((e) => {
    lastEvent.current = e;
  }, []);

  React.useEffect(() => {
    document.addEventListener('keydown', onKeydown, true);
    return () => {
      document.removeEventListener('keyDown', onKeydown, true);
    };
  }, [onKeydown]);

  React.useEffect(() => {
    prevOpenRef.current = open;
  }, [open]);

  if (!prevOpenRef.current && open && typeof window !== 'undefined') {
    // WARNING: Potentially unsafe in concurrent mode.
    // The way the read on `nodeToRestore` is setup could make this actually safe.
    // Say we render `open={false}` -> `open={true}` but never commit.
    // We have now written a state that wasn't committed. But no committed effect
    // will read this wrong value. We only read from `nodeToRestore` in effects
    // that were committed on `open={true}`
    // WARNING: Prevents the instance from being garbage collected. Should only
    // hold a weak ref.
    nodeToRestore.current = getDoc().activeElement;
  }

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
              'Material-UI: The modal content node does not accept focus.',
              'For the benefit of assistive technologies, ' +
                'the tabIndex of the node is being set to "-1".',
            ].join('\n'),
          );
        }
        rootRef.current.setAttribute('tabIndex', -1);
      }
    }

    return () => {
      if (!disableRestoreFocus) {
        // In IE 11 it is possible for document.activeElement to be null resulting
        // in nodeToRestore.current being null.
        // Not all elements in IE 11 have a focus method.
        // Once IE 11 support is dropped the focus() call can be unconditional.
        if (nodeToRestore.current && nodeToRestore.current.focus) {
          nodeToRestore.current.focus();
        }

        nodeToRestore.current = null;
      }
    };
  }, [disableAutoFocus, disableEnforceFocus, disableRestoreFocus, isEnabled, open]);

  return (
    <React.Fragment>
      <div
        tabIndex={open && isEnabled ? 0 : -1}
        ref={sentinelStart}
        data-test="sentinelStart"
        onFocus={onFocusStart}
      />
      {React.cloneElement(children, { ref: handleRef })}
      <div
        tabIndex={open && isEnabled ? 0 : -1}
        ref={sentinelEnd}
        data-test="sentinelEnd"
        onFocus={onFocusEnd}
      />
    </React.Fragment>
  );
}

Unstable_TrapFocus.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * A single child content element.
   */
  children: elementAcceptingRef,
  /**
   * If `true`, the trap focus will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any trap focus children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the trap focus less
   * accessible to assistive technologies, like screen readers.
   */
  disableAutoFocus: PropTypes.bool,
  /**
   * If `true`, the trap focus will not prevent focus from leaving the trap focus while open.
   *
   * Generally this should never be set to `true` as it makes the trap focus less
   * accessible to assistive technologies, like screen readers.
   */
  disableEnforceFocus: PropTypes.bool,
  /**
   * If `true`, the trap focus will not restore focus to previously focused element once
   * trap focus is hidden.
   */
  disableRestoreFocus: PropTypes.bool,
  /**
   * Return the document to consider.
   * We use it to implement the restore focus between different browser documents.
   */
  getDoc: PropTypes.func.isRequired,
  /**
   * Do we still want to enforce the focus?
   * This prop helps nesting TrapFocus elements.
   */
  isEnabled: PropTypes.func.isRequired,
  /**
   * If `true`, focus will be locked.
   */
  open: PropTypes.bool.isRequired,
};

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line
  Unstable_TrapFocus['propTypes' + ''] = exactProp(Unstable_TrapFocus.propTypes);
}

export default Unstable_TrapFocus;
