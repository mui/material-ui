const snackbars = new Set<Element>();
const listeners = new Set<() => void>();
const modalContainers = new WeakMap<Document, HTMLElement>();
const modalListeners = new Map<Document, Set<() => void>>();

function notify() {
  listeners.forEach((listener) => listener());
}

export function registerSnackbar(element: Element): () => void {
  snackbars.add(element);
  notify();

  return () => {
    snackbars.delete(element);
    notify();
  };
}

export function getSnackbars(): ReadonlySet<Element> {
  return snackbars;
}

export function subscribeToSnackbars(listener: () => void): () => void {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export function getSnackbarModal(document: Document): HTMLElement | null {
  return modalContainers.get(document) ?? null;
}

export function setSnackbarModal(document: Document, container: HTMLElement | null): void {
  if (getSnackbarModal(document) === container) {
    return;
  }

  if (container) {
    modalContainers.set(document, container);
  } else {
    modalContainers.delete(document);
  }
  modalListeners.get(document)?.forEach((listener) => listener());
}

export function subscribeToSnackbarModal(document: Document, listener: () => void): () => void {
  let documentListeners = modalListeners.get(document);
  if (!documentListeners) {
    documentListeners = new Set();
    modalListeners.set(document, documentListeners);
  }
  documentListeners.add(listener);

  return () => {
    documentListeners.delete(listener);
    if (documentListeners.size === 0) {
      modalListeners.delete(document);
    }
  };
}
