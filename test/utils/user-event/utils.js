import { getConfig } from '@testing-library/dom';

function isMousePressEvent(event) {
  return event === 'mousedown' || event === 'mouseup' || event === 'click' || event === 'dblclick';
}

function invert(map) {
  const res = {};
  Object.keys(map).forEach((key) => {
    res[map[key]] = key;
  });
  return res;
}

// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons
const BUTTONS_TO_NAMES = {
  0: 'none',
  1: 'primary',
  2: 'secondary',
  4: 'auxiliary',
};
const NAMES_TO_BUTTONS = invert(BUTTONS_TO_NAMES);

// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
const BUTTON_TO_NAMES = {
  0: 'primary',
  1: 'auxiliary',
  2: 'secondary',
};

const NAMES_TO_BUTTON = invert(BUTTON_TO_NAMES);

function convertMouseButtons(event, init, property, mapping) {
  if (!isMousePressEvent(event)) {
    return 0;
  }

  if (init[property] != null) {
    return init[property];
  }

  if (init.buttons != null) {
    // not sure how to test this. Feel free to try and add a test if you want.
    // istanbul ignore next
    return mapping[BUTTONS_TO_NAMES[init.buttons]] || 0;
  }

  if (init.button != null) {
    // not sure how to test this. Feel free to try and add a test if you want.
    // istanbul ignore next
    return mapping[BUTTON_TO_NAMES[init.button]] || 0;
  }

  return property != 'button' && isMousePressEvent(event) ? 1 : 0;
}

function getMouseEventOptions(event, init, clickCount = 0) {
  init = init || {};
  return {
    ...init,
    // https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail
    detail:
      event === 'mousedown' || event === 'mouseup' || event === 'click'
        ? 1 + clickCount
        : clickCount,
    buttons: convertMouseButtons(event, init, 'buttons', NAMES_TO_BUTTONS),
    button: convertMouseButtons(event, init, 'button', NAMES_TO_BUTTON),
  };
}

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

function supportsMaxLength(element) {
  if (element.tagName === 'TEXTAREA') return true;

  if (element.tagName === 'INPUT') {
    const type = element.getAttribute('type');

    // Missing value default is "text"
    if (!type) return true;

    // https://html.spec.whatwg.org/multipage/input.html#concept-input-apply
    if (type.match(/email|password|search|telephone|text|url/)) return true;
  }

  return false;
}

// jsdom is not supporting isContentEditable
function isContentEditable(element) {
  return (
    element.hasAttribute('contenteditable') &&
    (element.getAttribute('contenteditable') === 'true' ||
      element.getAttribute('contenteditable') === '')
  );
}

function getSelectionRange(element) {
  if (isContentEditable(element)) {
    const range = document.getSelection().getRangeAt(0);

    return { selectionStart: range.startOffset, selectionEnd: range.endOffset };
  }

  return {
    selectionStart: element.selectionStart,
    selectionEnd: element.selectionEnd,
  };
}

function getValue(element) {
  if (isContentEditable(element)) {
    return element.textContent;
  }
  return element.value;
}

function isValidDateValue(element, value) {
  if (element.type !== 'date') return false;

  const clone = element.cloneNode();
  clone.value = value;
  return clone.value === value;
}

function calculateNewValue(newEntry, element) {
  const { selectionStart, selectionEnd } = getSelectionRange(element);
  const value = getValue(element);

  // can't use .maxLength property because of a jsdom bug:
  // https://github.com/jsdom/jsdom/issues/2927
  const maxLength = Number(element.getAttribute('maxlength') ?? -1);
  let newValue;
  let newSelectionStart;

  if (selectionStart === null) {
    // at the end of an input type that does not support selection ranges
    // https://github.com/testing-library/user-event/issues/316#issuecomment-639744793
    newValue = value + newEntry;
  } else if (selectionStart === selectionEnd) {
    if (selectionStart === 0) {
      // at the beginning of the input
      newValue = newEntry + value;
    } else if (selectionStart === value.length) {
      // at the end of the input
      newValue = value + newEntry;
    } else {
      // in the middle of the input
      newValue = value.slice(0, selectionStart) + newEntry + value.slice(selectionEnd);
    }
    newSelectionStart = selectionStart + newEntry.length;
  } else {
    // we have something selected
    const firstPart = value.slice(0, selectionStart) + newEntry;
    newValue = firstPart + value.slice(selectionEnd);
    newSelectionStart = firstPart.length;
  }

  if (element.type === 'date' && !isValidDateValue(element, newValue)) {
    newValue = value;
  }

  if (!supportsMaxLength(element) || maxLength < 0) {
    return { newValue, newSelectionStart };
  }
  return {
    newValue: newValue.slice(0, maxLength),
    newSelectionStart: newSelectionStart > maxLength ? maxLength : newSelectionStart,
  };
}

function setSelectionRangeIfNecessary(element, newSelectionStart, newSelectionEnd) {
  const { selectionStart, selectionEnd } = getSelectionRange(element);

  if (!isContentEditable(element) && (!element.setSelectionRange || selectionStart === null)) {
    // cannot set selection
    return;
  }
  if (selectionStart !== newSelectionStart || selectionEnd !== newSelectionStart) {
    if (isContentEditable(element)) {
      const range = document.createRange();
      range.selectNodeContents(element);
      range.setStart(element.firstChild, newSelectionStart);
      range.setEnd(element.firstChild, newSelectionEnd);
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(range);
    } else {
      element.setSelectionRange(newSelectionStart, newSelectionEnd);
    }
  }
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

const CLICKABLE_INPUT_TYPES = ['button', 'color', 'file', 'image', 'reset', 'submit'];

function isClickable(element) {
  return (
    element.tagName === 'BUTTON' ||
    (element instanceof HTMLInputElement && CLICKABLE_INPUT_TYPES.includes(element.type))
  );
}

function eventWrapper(cb) {
  let result;
  getConfig().eventWrapper(() => {
    result = cb();
  });
  return result;
}

export {
  FOCUSABLE_SELECTOR,
  isFocusable,
  isClickable,
  getMouseEventOptions,
  isLabelWithInternallyDisabledControl,
  getActiveElement,
  calculateNewValue,
  setSelectionRangeIfNecessary,
  eventWrapper,
  isValidDateValue,
  getValue,
  getSelectionRange,
  isContentEditable,
};
