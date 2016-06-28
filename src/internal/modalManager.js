import css from 'dom-helpers/style';
import isWindow from 'dom-helpers/query/isWindow';
import ownerDocument from 'dom-helpers/ownerDocument';
import getScrollbarSize from 'dom-helpers/util/scrollbarSize';

/**
 * State managment helper for modals/layers.
 * Simplified, but inspired by react-overlay's ModalManager class
 *
 * @internal Used by the Modal to ensure proper focus management.
 */
export function createModalManager({
  container = window.document.body,
} = {}) {
  const modals = [];
  const modalManager = {add, remove, isTopModal};

  let prevOverflow;

  function add(modal) {
    let modalIdx = modals.indexOf(modal);

    if (modalIdx !== -1) {
      return modalIdx;
    }

    modalIdx = modals.length;
    modals.push(modal);

    const containerStyle = {overflow: 'hidden'};

    // Save our current overflow so we can revert
    // back to it when all modals are closed!
    prevOverflow = container.style.overflow;

    if (bodyIsOverflowing((container))) {
      containerStyle.paddingRight = `${getScrollbarSize()}px`;
    }

    css(container, containerStyle);

    return modalIdx;
  }

  function remove(modal) {
    const modalIdx = modals.indexOf(modal);

    if (modalIdx === -1) {
      return modalIdx;
    }

    modals.splice(modalIdx, 1);

    if (modals.length === 0) {
      container.style.overflow = prevOverflow;
      prevOverflow = undefined;
    }

    return modalIdx;
  }

  function isTopModal(modal) {
    return !!modals.length && modals[modals.length - 1] === modal;
  }

  return modalManager;
}

/**
 * Do we have a scroll bar?
 * @private
 */
function bodyIsOverflowing(node) {
  const doc = ownerDocument(node);
  const win = isWindow(doc);
  return doc.body.clientWidth < win.innerWidth;
}
