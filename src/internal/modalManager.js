// @flow
import css from 'dom-helpers/style';
import isWindow from 'dom-helpers/query/isWindow';
import ownerDocument from 'dom-helpers/ownerDocument';
import getScrollbarSize from 'dom-helpers/util/scrollbarSize';
import {hideSiblings, showSiblings, ariaHidden} from '../utils/manageAriaHidden';

type ModalManagerArg = {
  container: HTMLElement,
  hideSiblingNodes: boolean,
};

export type ModalManager = {
  add(modal: Object): number,
  remove(modal: Object): number,
  isTopModal(modal: Object): boolean,
};

/**
 * State managment helper for modals/layers.
 * Simplified, but inspired by react-overlay's ModalManager class
 *
 * @internal Used by the Modal to ensure proper focus management.
 */
export function createModalManager({
  container = window.document.body,
  hideSiblingNodes = true,
}: ModalManagerArg = {}): ModalManager {
  const modals = [];
  const modalManager: ModalManager = {add, remove, isTopModal};

  let prevOverflow;
  let prevPadding;

  function add(modal: Object): number {
    let modalIdx = modals.indexOf(modal);

    if (modalIdx !== -1) {
      return modalIdx;
    }

    modalIdx = modals.length;
    modals.push(modal);

    if (hideSiblingNodes) {
      hideSiblings(container, modal.mountNode);
    }

    const containerStyle = {};

    containerStyle.overflow = 'hidden';

    // Save our current overflow so we can revert
    // back to it when all modals are closed!
    prevOverflow = container.style.overflow;

    if (bodyIsOverflowing((container))) {
      prevPadding = container.style.paddingRight;
      containerStyle.paddingRight = `${getScrollbarSize()}px`;
    }

    css(container, containerStyle);

    return modalIdx;
  }

  function remove(modal: Object): number {
    const modalIdx = modals.indexOf(modal);

    if (modalIdx === -1) {
      return modalIdx;
    }

    modals.splice(modalIdx, 1);

    if (modals.length === 0) {
      container.style.overflow = typeof prevOverflow === 'string' ? prevOverflow : '';
      container.style.paddingRight = typeof prevPadding === 'string' ? prevPadding : '';
      prevOverflow = undefined;
      prevPadding = undefined;
      if (hideSiblingNodes) {
        showSiblings(container, modal.mountNode);
      }
    } else if (hideSiblingNodes) {
      // otherwise make sure the next top modal is visible to a SR
      ariaHidden(false, modals[modals.length - 1].mountNode);
    }

    return modalIdx;
  }

  function isTopModal(modal: Object): boolean {
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
