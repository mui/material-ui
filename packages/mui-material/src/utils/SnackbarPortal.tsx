'use client';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ownerDocument from '@mui/utils/ownerDocument';
import useEnhancedEffect from '@mui/utils/useEnhancedEffect';
import type { PortalProps } from '../Portal';
import { getSnackbarModal, registerSnackbar, subscribeToSnackbarModal } from './snackbarRegistry';

interface SnackbarHost {
  element: HTMLElement;
  unregister: () => void;
  unsubscribe: (() => void) | undefined;
}

function removeHost(host: SnackbarHost | null) {
  host?.unsubscribe?.();
  host?.unregister();
  host?.element.remove();
}

export default function SnackbarPortal(props: PortalProps) {
  const { children, container, disablePortal = false } = props;
  const [mountNode, setMountNode] = React.useState<HTMLElement | null>(null);
  const hostRef = React.useRef<SnackbarHost | null>(null);

  useEnhancedEffect(() => {
    if (disablePortal) {
      if (hostRef.current) {
        removeHost(hostRef.current);
        hostRef.current = null;
        setMountNode(null);
      }
      return;
    }

    const resolvedContainer = typeof container === 'function' ? container() : container;
    const doc = ownerDocument(resolvedContainer);
    let host = hostRef.current;

    // Moving to another document requires a new host and remounts the portal content.
    if (!host || host.element.ownerDocument !== doc) {
      removeHost(host);
      const element = doc.createElement('div');
      element.style.display = 'contents';
      host = {
        element,
        unregister: registerSnackbar(element),
        unsubscribe: undefined,
      };
      hostRef.current = host;
      setMountNode(element);
    }

    const element = host.element;
    const updateContainer = () => {
      const target =
        resolvedContainer || (container == null ? getSnackbarModal(doc) : null) || doc.body;
      if (element.parentElement !== target) {
        target.appendChild(element);
      }
    };

    updateContainer();
    host.unsubscribe?.();
    host.unsubscribe =
      container == null ? subscribeToSnackbarModal(doc, updateContainer) : undefined;
  }, [container, disablePortal]);

  useEnhancedEffect(() => {
    return () => {
      removeHost(hostRef.current);
      hostRef.current = null;
    };
  }, []);

  if (disablePortal) {
    return children;
  }

  return mountNode ? ReactDOM.createPortal(children, mountNode) : null;
}
