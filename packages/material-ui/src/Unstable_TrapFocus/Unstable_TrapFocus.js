/* eslint-disable consistent-return, jsx-a11y/no-noninteractive-tabindex, camelcase */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ownerDocument from '../utils/ownerDocument';
import useForkRef from '../utils/useForkRef';
import { exactProp } from '@material-ui/utils';

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
  const ignoreNextEnforceFocus = React.useRef();
  const sentinelStart = React.useRef(null);
  const sentinelEnd = React.useRef(null);
  const nodeToRestore = React.useRef();

  const rootRef = React.useRef(null);
  // can be removed once we drop support for non ref forwarding class components
  const handleOwnRef = React.useCallback((instance) => {
    // #StrictMode ready
    rootRef.current = ReactDOM.findDOMNode(instance);
  }, []);
  const handleRef = useForkRef(children.ref, handleOwnRef);

  const prevOpenRef = React.useRef();
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
    if (!open) {
      return;
    }

    const doc = ownerDocument(rootRef.current);

    // We might render an empty child.
    if (!disableAutoFocus && rootRef.current && !rootRef.current.contains(doc.activeElement)) {
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

      rootRef.current.focus();
    }

    const contain = () => {
      if (
        !doc.hasFocus() ||
        disableEnforceFocus ||
        !isEnabled() ||
        ignoreNextEnforceFocus.current
      ) {
        ignoreNextEnforceFocus.current = false;
        return;
      }

      if (rootRef.current && !rootRef.current.contains(doc.activeElement)) {
        rootRef.current.focus();
      }
    };

    const loopFocus = (event) => {
      // 9 = Tab
      if (disableEnforceFocus || !isEnabled() || event.keyCode !== 9) {
        return;
      }

      // Make sure the next tab starts from the right place.
      if (doc.activeElement === rootRef.current) {
        // We need to ignore the next contain as
        // it will try to move the focus back to the rootRef element.
        ignoreNextEnforceFocus.current = true;
        if (event.shiftKey) {
          sentinelEnd.current.focus();
        } else {
          sentinelStart.current.focus();
        }
      }
    };

    doc.addEventListener('focus', contain, true);
    doc.addEventListener('keydown', loopFocus, true);

    // With Edge, Safari and Firefox, no focus related events are fired when the focused area stops being a focused area
    // e.g. https://bugzilla.mozilla.org/show_bug.cgi?id=559561.
    //
    // The whatwg spec defines how the browser should behave but does not explicitly mention any events:
    // https://html.spec.whatwg.org/multipage/interaction.html#focus-fixup-rule.
    const interval = setInterval(() => {
      contain();
    }, 50);

    return () => {
      clearInterval(interval);

      doc.removeEventListener('focus', contain, true);
      doc.removeEventListener('keydown', loopFocus, true);

      // restoreLastFocus()
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
      <div tabIndex={0} ref={sentinelStart} data-test="sentinelStart" />
      {React.cloneElement(children, { ref: handleRef })}
      <div tabIndex={0} ref={sentinelEnd} data-test="sentinelEnd" />
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
  children: PropTypes.node,
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
