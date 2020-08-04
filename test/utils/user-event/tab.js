import { fireEvent } from '@testing-library/dom';
import { getActiveElement, FOCUSABLE_SELECTOR } from './utils';
import focus from './focus';
import blur from './blur';

function getNextElement(currentIndex, shift, elements, focusTrap) {
  if (focusTrap === document && currentIndex === 0 && shift) {
    return document.body;
  }
  if (focusTrap === document && currentIndex === elements.length - 1 && !shift) {
    return document.body;
  }
  const nextIndex = shift ? currentIndex - 1 : currentIndex + 1;
  const defaultIndex = shift ? elements.length - 1 : 0;
  return elements[nextIndex] || elements[defaultIndex];
}

function tab({ shift = false, focusTrap } = {}) {
  const previousElement = getActiveElement(focusTrap?.ownerDocument ?? document);

  if (!focusTrap) {
    focusTrap = document;
  }

  const focusableElements = focusTrap.querySelectorAll(FOCUSABLE_SELECTOR);

  const enabledElements = [...focusableElements].filter(
    (el) => el.getAttribute('tabindex') !== '-1' && !el.disabled,
  );

  if (enabledElements.length === 0) return;

  const orderedElements = enabledElements
    .map((el, idx) => ({ el, idx }))
    .sort((a, b) => {
      const tabIndexA = a.el.getAttribute('tabindex');
      const tabIndexB = b.el.getAttribute('tabindex');

      const diff = tabIndexA - tabIndexB;

      return diff === 0 ? a.idx - b.idx : diff;
    })
    .map(({ el }) => el);

  if (shift) orderedElements.reverse();

  // keep only the checked or first element in each radio group
  const prunedElements = [];
  orderedElements.forEach((el) => {
    if (el.type === 'radio' && el.name) {
      const replacedIndex = prunedElements.findIndex(({ name }) => name === el.name);

      if (replacedIndex === -1) {
        prunedElements.push(el);
      } else if (el.checked) {
        prunedElements.splice(replacedIndex, 1);
        prunedElements.push(el);
      }
    } else {
      prunedElements.push(el);
    }
  });

  if (shift) prunedElements.reverse();

  const index = prunedElements.findIndex((el) => el === el.ownerDocument.activeElement);

  const nextElement = getNextElement(index, shift, prunedElements, focusTrap);

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
  // istanbul ignore else
  if (previousElement) {
    // preventDefault on the shift key makes no difference
    if (shift) fireEvent.keyDown(previousElement, { ...shiftKeyInit });
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

export default tab;

/*
eslint
  complexity: "off",
  max-statements: "off",
*/
