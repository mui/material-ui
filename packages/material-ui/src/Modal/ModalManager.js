import getScrollbarSize from '../utils/getScrollbarSize';
import ownerDocument from '../utils/ownerDocument';
import isOverflowing from './isOverflowing';
import { ariaHidden, ariaHiddenSiblings } from './manageAriaHidden';

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

function getPaddingRight(node) {
  return parseInt(window.getComputedStyle(node)['padding-right'], 10) || 0;
}

function setContainerStyle(data) {
  // We are only interested in the actual `style` here because we will override it.
  data.style = {
    overflow: data.container.style.overflow,
    paddingRight: data.container.style.paddingRight,
  };

  const style = {
    overflow: 'hidden',
  };

  if (data.overflowing) {
    const scrollbarSize = getScrollbarSize();

    // Use computed style, here to get the real padding to add our scrollbar width.
    style.paddingRight = `${getPaddingRight(data.container) + scrollbarSize}px`;

    // .mui-fixed is a global helper.
    const fixedNodes = ownerDocument(data.container).querySelectorAll('.mui-fixed');
    for (let i = 0; i < fixedNodes.length; i += 1) {
      const paddingRight = getPaddingRight(fixedNodes[i]);
      data.prevPaddings.push(paddingRight);
      fixedNodes[i].style.paddingRight = `${paddingRight + scrollbarSize}px`;
    }
  }

  Object.keys(style).forEach(key => {
    data.container.style[key] = style[key];
  });
}

function removeContainerStyle(data) {
  // The modal might be closed before it had the chance to be mounted in the DOM.
  if (data.style) {
    Object.keys(data.style).forEach(key => {
      data.container.style[key] = data.style[key];
    });
  }

  const fixedNodes = ownerDocument(data.container).querySelectorAll('.mui-fixed');
  for (let i = 0; i < fixedNodes.length; i += 1) {
    fixedNodes[i].style.paddingRight = `${data.prevPaddings[i]}px`;
  }
}

/**
 * @ignore - do not document.
 *
 * Proper state management for containers and the modals in those containers.
 * Simplified, but inspired by react-overlay's ModalManager class.
 * Used by the Modal to ensure proper styling of containers.
 */
class ModalManager {
  constructor(options = {}) {
    const { hideSiblingNodes = true, handleContainerOverflow = true } = options;

    this.hideSiblingNodes = hideSiblingNodes;
    this.handleContainerOverflow = handleContainerOverflow;

    // this.modals[modalIdx] = modal
    this.modals = [];
    // this.data[containerIdx] = {
    //   modals: [],
    //   container,
    //   overflowing,
    //   prevPaddings,
    // }
    this.data = [];
  }

  add(modal, container) {
    let modalIdx = this.modals.indexOf(modal);
    if (modalIdx !== -1) {
      return modalIdx;
    }

    modalIdx = this.modals.length;
    this.modals.push(modal);

    // If the modal we are adding is already in the DOM.
    if (modal.modalRef) {
      ariaHidden(modal.modalRef, false);
    }
    if (this.hideSiblingNodes) {
      ariaHiddenSiblings(container, modal.mountNode, modal.modalRef, true);
    }

    const containerIdx = findIndexOf(this.data, item => item.container === container);
    if (containerIdx !== -1) {
      this.data[containerIdx].modals.push(modal);
      return modalIdx;
    }

    const data = {
      modals: [modal],
      container,
      overflowing: isOverflowing(container),
      prevPaddings: [],
    };

    this.data.push(data);

    return modalIdx;
  }

  mount(modal) {
    const containerIdx = findIndexOf(this.data, item => item.modals.indexOf(modal) !== -1);
    const data = this.data[containerIdx];

    if (!data.style && this.handleContainerOverflow) {
      setContainerStyle(data);
    }
  }

  remove(modal) {
    const modalIdx = this.modals.indexOf(modal);

    if (modalIdx === -1) {
      return modalIdx;
    }

    const containerIdx = findIndexOf(this.data, item => item.modals.indexOf(modal) !== -1);
    const data = this.data[containerIdx];

    data.modals.splice(data.modals.indexOf(modal), 1);
    this.modals.splice(modalIdx, 1);

    // If that was the last modal in a container, clean up the container.
    if (data.modals.length === 0) {
      if (this.handleContainerOverflow) {
        removeContainerStyle(data);
      }

      // In case the modal wasn't in the DOM yet.
      if (modal.modalRef) {
        ariaHidden(modal.modalRef, true);
      }
      if (this.hideSiblingNodes) {
        ariaHiddenSiblings(data.container, modal.mountNode, modal.modalRef, false);
      }
      this.data.splice(containerIdx, 1);
    } else if (this.hideSiblingNodes) {
      // Otherwise make sure the next top modal is visible to a screen reader.
      const nextTop = data.modals[data.modals.length - 1];
      // as soon as a modal is adding its modalRef is undefined. it can't set
      // aria-hidden because the dom element doesn't exist either
      // when modal was unmounted before modalRef gets null
      if (nextTop.modalRef) {
        ariaHidden(nextTop.modalRef, false);
      }
    }

    return modalIdx;
  }

  isTopModal(modal) {
    return !!this.modals.length && this.modals[this.modals.length - 1] === modal;
  }
}

export default ModalManager;
