import getScrollbarSize from '../utils/getScrollbarSize';
import ownerDocument from '../utils/ownerDocument';
import ownerWindow from '../utils/ownerWindow';

// Do we have a vertical scrollbar?
function isOverflowing(container) {
  const doc = ownerDocument(container);

  if (doc.body === container) {
    const win = ownerWindow(doc);
    return win.innerWidth > doc.documentElement.clientWidth;
  }

  return container.scrollHeight > container.clientHeight;
}

export function ariaHidden(node, show) {
  if (show) {
    node.setAttribute('aria-hidden', 'true');
  } else {
    node.removeAttribute('aria-hidden');
  }
}

function getPaddingRight(node) {
  return parseInt(window.getComputedStyle(node)['padding-right'], 10) || 0;
}

const BLACKLIST = ['template', 'script', 'style'];

function isHideable(node) {
  return node.nodeType === 1 && BLACKLIST.indexOf(node.tagName.toLowerCase()) === -1;
}

function siblings(container, mount, currentNode, nodesToExclude, callback) {
  const blacklist = [mount, currentNode, ...nodesToExclude];

  [].forEach.call(container.children, node => {
    if (blacklist.indexOf(node) === -1 && isHideable(node)) {
      callback(node);
    }
  });
}

function ariaHiddenSiblings(container, mountNode, currentNode, nodesToExclude = [], show) {
  siblings(container, mountNode, currentNode, nodesToExclude, node => ariaHidden(node, show));
}

function findIndexOf(containerInfo, callback) {
  let idx = -1;
  containerInfo.some((item, index) => {
    if (callback(item)) {
      idx = index;
      return true;
    }
    return false;
  });
  return idx;
}

function handleNewContainer(containerInfo) {
  // We are only interested in the actual `style` here because we will override it.
  const restoreStyle = {
    overflow: containerInfo.container.style.overflow,
    'padding-right': containerInfo.container.style.paddingRight,
  };

  const style = {
    overflow: 'hidden',
  };

  const restorePaddings = [];
  let fixedNodes;

  if (containerInfo.overflowing) {
    const scrollbarSize = getScrollbarSize();

    // Use computed style, here to get the real padding to add our scrollbar width.
    style['padding-right'] = `${getPaddingRight(containerInfo.container) + scrollbarSize}px`;

    // .mui-fixed is a global helper.
    fixedNodes = ownerDocument(containerInfo.container).querySelectorAll('.mui-fixed');
    [].forEach.call(fixedNodes, node => {
      restorePaddings.push(node.style.paddingRight);
      node.style.paddingRight = `${getPaddingRight(node) + scrollbarSize}px`;
    });
  }

  Object.keys(style).forEach(key => {
    containerInfo.container.style[key] = style[key];
  });

  const restore = () => {
    if (fixedNodes) {
      [].forEach.call(fixedNodes, (node, i) => {
        if (restorePaddings[i]) {
          node.style.paddingRight = restorePaddings[i];
        } else {
          node.style.removeProperty('padding-right');
        }
      });
    }

    Object.keys(restoreStyle).forEach(key => {
      if (restoreStyle[key]) {
        containerInfo.container.style.setProperty(key, restoreStyle[key]);
      } else {
        containerInfo.container.style.removeProperty(key);
      }
    });
  };

  return restore;
}

function getHiddenSiblings(container) {
  const hiddenSiblings = [];
  [].forEach.call(container.children, node => {
    if (node.getAttribute && node.getAttribute('aria-hidden') === 'true') {
      hiddenSiblings.push(node);
    }
  });
  return hiddenSiblings;
}

/**
 * @ignore - do not document.
 *
 * Proper state management for containers and the modals in those containers.
 * Simplified, but inspired by react-overlay's ModalManager class.
 * Used by the Modal to ensure proper styling of containers.
 */
export default class ModalManager {
  constructor() {
    // this.modals[modalIndex] = modal
    this.modals = [];
    // this.contaniners[containerIndex] = {
    //   modals: [],
    //   container,
    //   overflowing,
    //   restore: null,
    // }
    this.contaniners = [];
  }

  add(modal, container) {
    let modalIndex = this.modals.indexOf(modal);
    if (modalIndex !== -1) {
      return modalIndex;
    }

    modalIndex = this.modals.length;
    this.modals.push(modal);

    // If the modal we are adding is already in the DOM.
    if (modal.modalRef) {
      ariaHidden(modal.modalRef, false);
    }

    const hiddenSiblingNodes = getHiddenSiblings(container);
    ariaHiddenSiblings(container, modal.mountNode, modal.modalRef, hiddenSiblingNodes, true);

    const containerIndex = findIndexOf(this.contaniners, item => item.container === container);
    if (containerIndex !== -1) {
      this.contaniners[containerIndex].modals.push(modal);
      return modalIndex;
    }

    this.contaniners.push({
      modals: [modal],
      container,
      overflowing: isOverflowing(container),
      restore: null,
      hiddenSiblingNodes,
    });

    return modalIndex;
  }

  mount(modal) {
    const containerIndex = findIndexOf(this.contaniners, item => item.modals.indexOf(modal) !== -1);
    const containerInfo = this.contaniners[containerIndex];

    if (!containerInfo.restore) {
      containerInfo.restore = handleNewContainer(containerInfo);
    }
  }

  remove(modal) {
    const modalIndex = this.modals.indexOf(modal);

    if (modalIndex === -1) {
      return modalIndex;
    }

    const containerIndex = findIndexOf(this.contaniners, item => item.modals.indexOf(modal) !== -1);
    const containerInfo = this.contaniners[containerIndex];

    containerInfo.modals.splice(containerInfo.modals.indexOf(modal), 1);
    this.modals.splice(modalIndex, 1);

    // If that was the last modal in a container, clean up the container.
    if (containerInfo.modals.length === 0) {
      // The modal might be closed before it had the chance to be mounted in the DOM.
      if (containerInfo.restore) {
        containerInfo.restore();
      }

      if (modal.modalRef) {
        // In case the modal wasn't in the DOM yet.
        ariaHidden(modal.modalRef, true);
      }

      ariaHiddenSiblings(
        containerInfo.container,
        modal.mountNode,
        modal.modalRef,
        containerInfo.hiddenSiblingNodes,
        false,
      );
      this.contaniners.splice(containerIndex, 1);
    } else {
      // Otherwise make sure the next top modal is visible to a screen reader.
      const nextTop = containerInfo.modals[containerInfo.modals.length - 1];
      // as soon as a modal is adding its modalRef is undefined. it can't set
      // aria-hidden because the dom element doesn't exist either
      // when modal was unmounted before modalRef gets null
      if (nextTop.modalRef) {
        ariaHidden(nextTop.modalRef, false);
      }
    }

    return modalIndex;
  }

  isTopModal(modal) {
    return !!this.modals.length && this.modals[this.modals.length - 1] === modal;
  }
}
