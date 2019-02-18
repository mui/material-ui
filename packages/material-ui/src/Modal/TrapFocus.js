/* eslint-disable consistent-return, jsx-a11y/no-noninteractive-tabindex */

import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import RootRef from '../RootRef';
import ownerDocument from '../utils/ownerDocument';

function TrapFocus(props) {
  const { disableEnforceFocus, disableAutoFocus, disableRestoreFocus, isEnabled, open } = props;
  const rootRef = React.useRef();
  const ignoreNextEnforceFocus = React.useRef();
  const sentinelStart = React.useRef();
  const sentinelEnd = React.useRef();
  const lastFocus = React.useRef();

  React.useEffect(() => {
    if (!open) {
      return;
    }

    const doc = ownerDocument(rootRef.current);
    const currentActiveElement = doc.activeElement;
    lastFocus.current = currentActiveElement;

    // We might render an empty child.
    if (!disableAutoFocus && rootRef.current && !rootRef.current.contains(currentActiveElement)) {
      if (!rootRef.current.hasAttribute('tabIndex')) {
        warning(
          false,
          [
            'Material-UI: the modal content node does not accept focus.',
            'For the benefit of assistive technologies, ' +
              'the tabIndex of the node is being set to "-1".',
          ].join('\n'),
        );
        rootRef.current.setAttribute('tabIndex', -1);
      }

      rootRef.current.focus();
    }

    const enforceFocus = () => {
      if (disableEnforceFocus || !isEnabled() || ignoreNextEnforceFocus.current) {
        ignoreNextEnforceFocus.current = false;
        return;
      }

      if (!rootRef.current.contains(doc.activeElement)) {
        rootRef.current.focus();
      }
    };

    const loopFocus = event => {
      // 9 = Tab
      if (disableEnforceFocus || !isEnabled() || event.keyCode !== 9) {
        return;
      }

      // Make sure the next tab starts from the right place.
      if (doc.activeElement === rootRef.current) {
        // We need to ignore the next enforceFocus as
        // it will try to move the focus back to the rootRef element.
        ignoreNextEnforceFocus.current = true;
        if (event.shiftKey) {
          sentinelEnd.current.focus();
        } else {
          sentinelStart.current.focus();
        }
      }
    };

    doc.addEventListener('focus', enforceFocus, true);
    doc.addEventListener('keydown', loopFocus, true);

    return () => {
      doc.removeEventListener('focus', enforceFocus, true);
      doc.removeEventListener('keydown', loopFocus, true);

      // restoreLastFocus()
      if (!disableRestoreFocus) {
        // Not all elements in IE 11 have a focus method.
        // Because IE 11 market share is low, we accept the restore focus being broken
        // and we silent the issue.
        if (lastFocus.current.focus) {
          lastFocus.current.focus();
        }

        lastFocus.current = null;
      }
    };
  }, [open]);

  return (
    <React.Fragment>
      <div tabIndex={0} ref={sentinelStart} data-test="sentinelStart" />
      <RootRef rootRef={rootRef}>{props.children}</RootRef>
      <div tabIndex={0} ref={sentinelEnd} data-test="sentinelEnd" />
    </React.Fragment>
  );
}

/**
 * @ignore - internal component.
 */
TrapFocus.propTypes = {
  /**
   * A single child content element.
   */
  children: PropTypes.element.isRequired,
  /**
   * If `true`, the modal will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any modal children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   */
  disableAutoFocus: PropTypes.bool,
  /**
   * If `true`, the modal will not prevent focus from leaving the modal while open.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   */
  disableEnforceFocus: PropTypes.bool,
  /**
   * If `true`, the modal will not restore focus to previously focused element once
   * modal is hidden.
   */
  disableRestoreFocus: PropTypes.bool,
  /**
   * Do we still want to enforce the focus?
   * This property helps nesting TrapFocus elements.
   */
  isEnabled: PropTypes.func.isRequired,
  /**
   * If `true`, the modal is open.
   */
  open: PropTypes.bool.isRequired,
};

TrapFocus.defaultProps = {
  disableAutoFocus: false,
  disableEnforceFocus: false,
  disableRestoreFocus: false,
};

export default TrapFocus;
