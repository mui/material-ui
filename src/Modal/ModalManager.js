import css from 'dom-helpers/style';
import getScrollbarSize from 'dom-helpers/util/scrollbarSize';
import isOverflowing from './isOverflowing';
import { ariaHidden, hideSiblings, showSiblings } from './manageAriaHidden';

function findIndexOf(data, callback) {
  let idx = -1;
  data.some((item, index) => {
    if (callback(item)) {
      idx = index;
      return true;
    }
    return false;
  });
  return idx;
}

function findContainer(data, modal) {
  return findIndexOf(data, item => item.modals.indexOf(modal) !== -1);
}

function getPaddingRight(node) {
  return parseInt(css(node, 'paddingRight') || 0, 10);
}

function setContainerStyle(data, container) {
  const style = { overflow: 'hidden' };

  // We are only interested in the actual `style` here because we will override it.
  data.style = {
    overflow: container.style.overflow,
    paddingRight: container.style.paddingRight,
  };

  if (data.overflowing) {
    const scrollbarSize = getScrollbarSize();

    // Use computed style, here to get the real padding to add our scrollbar width.
    style.paddingRight = `${getPaddingRight(container) + scrollbarSize}px`;

    // .mui-fixed is a global helper.
    const fixedNodes = document.querySelectorAll('.mui-fixed');
    for (let i = 0; i < fixedNodes.length; i += 1) {
      const paddingRight = getPaddingRight(fixedNodes[i]);
      data.prevPaddings.push(paddingRight);
      fixedNodes[i].style.paddingRight = `${paddingRight + scrollbarSize}px`;
    }
  }

  Object.keys(style).forEach(key => {
    container.style[key] = style[key];
  });
}

function removeContainerStyle(data, container) {
  Object.keys(data.style).forEach(key => {
    container.style[key] = data.style[key];
  });

  const fixedNodes = document.querySelectorAll('.mui-fixed');
  for (let i = 0; i < fixedNodes.length; i += 1) {
    fixedNodes[i].style.paddingRight = `${data.prevPaddings[i]}px`;
  }
}
/**
 * @ignore - do not document.
 *
 * Proper state managment for containers and the modals in those containers.
 * Simplified, but inspired by react-overlay's ModalManager class
 * Used by the Modal to ensure proper styling of containers.
 */
class ModalManager {
  constructor({ hideSiblingNodes = true, handleContainerOverflow = true } = {}) {
    this.hideSiblingNodes = hideSiblingNodes;
    this.handleContainerOverflow = handleContainerOverflow;
    // this.modals[modalIdx] = modal
    this.modals = [];
    // this.containers[containerIdx] = container
    this.containers = [];
    // this.data[containerIdx] = {
    //   modals: [],
    // }
    this.data = [];
  }

  add = (modal, container) => {
    let modalIdx = this.modals.indexOf(modal);
    const containerIdx = this.containers.indexOf(container);

    if (modalIdx !== -1) {
      return modalIdx;
    }

    modalIdx = this.modals.length;
    this.modals.push(modal);

    if (this.hideSiblingNodes) {
      hideSiblings(container, modal.mountNode);
    }

    if (containerIdx !== -1) {
      this.data[containerIdx].modals.push(modal);
      return modalIdx;
    }

    const data = {
      modals: [modal],
      overflowing: isOverflowing(container),
      prevPaddings: [],
    };

    if (this.handleContainerOverflow) {
      setContainerStyle(data, container);
    }

    this.containers.push(container);
    this.data.push(data);

    return modalIdx;
  };

  remove = modal => {
    const modalIdx = this.modals.indexOf(modal);

    if (modalIdx === -1) {
      return modalIdx;
    }

    const containerIdx = findContainer(this.data, modal);
    const data = this.data[containerIdx];
    const container = this.containers[containerIdx];

    data.modals.splice(data.modals.indexOf(modal), 1);
    this.modals.splice(modalIdx, 1);

    // If that was the last modal in a container, clean up the container.
    if (data.modals.length === 0) {
      if (this.handleContainerOverflow) {
        removeContainerStyle(data, container);
      }

      if (this.hideSiblingNodes) {
        showSiblings(container, modal.mountNode);
      }
      this.containers.splice(containerIdx, 1);
      this.data.splice(containerIdx, 1);
    } else if (this.hideSiblingNodes) {
      // Otherwise make sure the next top modal is visible to a SR.
      ariaHidden(false, data.modals[data.modals.length - 1].mountNode);
    }

    return modalIdx;
  };

  isTopModal = modal => {
    return !!this.modals.length && this.modals[this.modals.length - 1] === modal;
  };
}

export default ModalManager;
