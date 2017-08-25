// @flow
// Taken from https://github.com/react-bootstrap/react-overlays/blob/master/src/ModalManager.js

import warning from 'warning';
import isWindow from 'dom-helpers/query/isWindow';
import ownerDocument from 'dom-helpers/ownerDocument';
import canUseDom from 'dom-helpers/util/inDOM';
import getScrollbarSize from 'dom-helpers/util/scrollbarSize';
import { hideSiblings, showSiblings, ariaHidden } from '../utils/manageAriaHidden';

function getPaddingRight(node) {
  return parseInt(node.style.paddingRight || 0, 10);
}

// Do we have a scroll bar?
function bodyIsOverflowing(node) {
  const doc = ownerDocument(node);
  const win = isWindow(doc);

  // Takes in account potential non zero margin on the body.
  const style = window.getComputedStyle(doc.body);
  const marginLeft = parseInt(style.getPropertyValue('margin-left'), 10);
  const marginRight = parseInt(style.getPropertyValue('margin-right'), 10);

  return marginLeft + doc.body.clientWidth + marginRight < win.innerWidth;
}

// The container shouldn't be used on the server.
const defaultContainer = canUseDom ? window.document.body : {};

/**
 * State management helper for modals/layers.
 * Simplified, but inspired by react-overlay's ModalManager class
 *
 * @internal Used by the Modal to ensure proper focus management.
 */
function createModalManager(
  { container = defaultContainer, hideSiblingNodes = true }: Object = {},
) {
  warning(
    container !== null,
    `
Material-UI: you are most likely evaluating the code before the
browser has a chance to reach the <body>.
Please move the import at the end of the <body>.
  `,
  );

  const modals = [];

  let prevOverflow;
  let prevPaddings = [];

  function add(modal: Object) {
    let modalIdx = modals.indexOf(modal);

    if (modalIdx !== -1) {
      return modalIdx;
    }

    modalIdx = modals.length;
    modals.push(modal);

    if (hideSiblingNodes) {
      hideSiblings(container, modal.mountNode);
    }

    if (modals.length === 1) {
      // Save our current overflow so we can revert
      // back to it when all modals are closed!
      prevOverflow = container.style.overflow;

      if (bodyIsOverflowing(container)) {
        prevPaddings = [getPaddingRight(container)];
        const scrollbarSize = getScrollbarSize();
        container.style.paddingRight = `${prevPaddings[0] + scrollbarSize}px`;

        const fixedNodes = document.querySelectorAll('.mui-fixed');
        for (let i = 0; i < fixedNodes.length; i += 1) {
          const paddingRight = getPaddingRight(fixedNodes[i]);
          prevPaddings.push(paddingRight);
          fixedNodes[i].style.paddingRight = `${paddingRight + scrollbarSize}px`;
        }
      }

      container.style.overflow = 'hidden';
    }

    return modalIdx;
  }

  function remove(modal: Object) {
    const modalIdx = modals.indexOf(modal);

    if (modalIdx === -1) {
      return modalIdx;
    }

    modals.splice(modalIdx, 1);

    if (modals.length === 0) {
      container.style.overflow = prevOverflow;
      container.style.paddingRight = prevPaddings[0];

      const fixedNodes = document.querySelectorAll('.mui-fixed');
      for (let i = 0; i < fixedNodes.length; i += 1) {
        fixedNodes[i].style.paddingRight = `${prevPaddings[i + 1]}px`;
      }

      prevOverflow = undefined;
      prevPaddings = [];
      if (hideSiblingNodes) {
        showSiblings(container, modal.mountNode);
      }
    } else if (hideSiblingNodes) {
      // otherwise make sure the next top modal is visible to a SR
      ariaHidden(false, modals[modals.length - 1].mountNode);
    }

    return modalIdx;
  }

  function isTopModal(modal: Object) {
    return !!modals.length && modals[modals.length - 1] === modal;
  }

  const modalManager = { add, remove, isTopModal };

  return modalManager;
}

export default createModalManager;
