import { fireEvent, getConfig } from '@testing-library/dom';
// eslint-disable-next-line no-restricted-imports
import { defaultGetTabbable as getTabbable } from '@material-ui/core/Unstable_TrapFocus/Unstable_TrapFocus';

// Absolutely NO events fire on label elements that contain their control
// if that control is disabled. NUTS!
// no joke. There are NO events for: <label><input disabled /><label>
function isLabelWithInternallyDisabledControl(element) {
  return (
    element.tagName === 'LABEL' && element.control?.disabled && element.contains(element.control)
  );
}

function getActiveElement(document) {
  const activeElement = document.activeElement;
  if (activeElement?.shadowRoot) {
    return getActiveElement(activeElement.shadowRoot);
  }
  return activeElement;
}

const FOCUSABLE_SELECTOR = [
  'input:not([disabled])',
  'button:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[contenteditable=""]',
  '[contenteditable="true"]',
  'a[href]',
  '[tabindex]:not([disabled])',
].join(', ');

function isFocusable(element) {
  return !isLabelWithInternallyDisabledControl(element) && element?.matches(FOCUSABLE_SELECTOR);
}

function eventWrapper(cb) {
  let result;
  getConfig().eventWrapper(() => {
    result = cb();
  });
  return result;
}

function focus(element) {
  if (!isFocusable(element)) return;

  const isAlreadyActive = getActiveElement(element.ownerDocument) === element;
  if (isAlreadyActive) return;

  eventWrapper(() => {
    element.focus();
  });
}

function blur(element) {
  if (!isFocusable(element)) return;

  const wasActive = getActiveElement(element.ownerDocument) === element;
  if (!wasActive) return;

  eventWrapper(() => {
    element.blur();
  });
}

function getNextElement({ tabbable, shift, focusTrap, previousElement }) {
  if (previousElement.getAttribute('tabindex') === '-1') {
    let found;

    if (shift) {
      for (let i = tabbable.length; i >= 0; i -= 1) {
        if (
          // eslint-disable-next-line no-bitwise
          tabbable[i].compareDocumentPosition(previousElement) & Node.DOCUMENT_POSITION_FOLLOWING
        ) {
          found = tabbable[i];
          break;
        }
      }
    } else {
      for (let i = 0; i < tabbable.length; i += 1) {
        if (
          // eslint-disable-next-line no-bitwise
          tabbable[i].compareDocumentPosition(previousElement) & Node.DOCUMENT_POSITION_PRECEDING
        ) {
          found = tabbable[i];
          break;
        }
      }
    }
    return found;
  }

  const currentIndex = tabbable.findIndex((el) => el === focusTrap.activeElement);

  if (focusTrap === document && currentIndex === 0 && shift) {
    return document.body;
  }

  if (focusTrap === document && currentIndex === tabbable.length - 1 && !shift) {
    return document.body;
  }

  const nextIndex = shift ? currentIndex - 1 : currentIndex + 1;
  const defaultIndex = shift ? tabbable.length - 1 : 0;

  return tabbable[nextIndex] || tabbable[defaultIndex];
}

function tab({ shift = false, focusTrap } = {}) {
  if (!focusTrap) {
    focusTrap = document;
  }

  const tabbable = getTabbable(focusTrap);

  if (tabbable.length === 0) {
    return;
  }

  const previousElement = getActiveElement(focusTrap?.ownerDocument ?? document);
  const nextElement = getNextElement({ shift, tabbable, focusTrap, previousElement });

  const shiftKeyInit = {
    key: 'Shift',
    keyCode: 16,
    shiftKey: true,
  };
  const tabKeyInit = {
    key: 'Tab',
    keyCode: 9,
    shiftKey: shift,
  };

  let continueToTab = true;

  // not sure how to make it so there's no previous element...
  if (previousElement) {
    // preventDefault on the shift key makes no difference
    if (shift) {
      fireEvent.keyDown(previousElement, { ...shiftKeyInit });
    }
    continueToTab = fireEvent.keyDown(previousElement, { ...tabKeyInit });
    if (continueToTab) {
      blur(previousElement);
    }
  }

  const keyUpTarget = !continueToTab && previousElement ? previousElement : nextElement;

  if (continueToTab) {
    focus(nextElement);
  }

  fireEvent.keyUp(keyUpTarget, { ...tabKeyInit });
  if (shift) {
    fireEvent.keyUp(keyUpTarget, { ...shiftKeyInit, shiftKey: false });
  }
}

const userEvent = {
  tab,
};

export default userEvent;
