import getScrollbarSize from '../utils/getScrollbarSize';
import ownerDocument from '../utils/ownerDocument';
import ownerWindow from '../utils/ownerWindow';

export interface ManagedModalProps {
  disableScrollLock?: boolean;
}

// Is a vertical scrollbar displayed?
function isOverflowing(container: Element): boolean {
  const doc = ownerDocument(container);

  if (doc.body === container) {
    return ownerWindow(container).innerWidth > doc.documentElement.clientWidth;
  }

  return container.scrollHeight > container.clientHeight;
}

export function ariaHidden(node: Element, show: boolean): void {
  if (show) {
    node.setAttribute('aria-hidden', 'true');
  } else {
    node.removeAttribute('aria-hidden');
  }
}

function getPaddingRight(node: Element): number {
  return (
    parseInt(ownerWindow(node).getComputedStyle(node)['padding-right' as 'paddingRight'], 10) || 0
  );
}

function ariaHiddenSiblings(
  container: Element,
  mountNode: Element,
  currentNode: Element,
  nodesToExclude: Element[] = [],
  show: boolean,
): void {
  const blacklist = [mountNode, currentNode, ...nodesToExclude];
  const blacklistTagNames = ['TEMPLATE', 'SCRIPT', 'STYLE'];

  [].forEach.call(container.children, (element: Element) => {
    if (blacklist.indexOf(element) === -1 && blacklistTagNames.indexOf(element.tagName) === -1) {
      ariaHidden(element, show);
    }
  });
}

function findIndexOf<T>(items: T[], callback: (item: T) => boolean): number {
  let idx = -1;
  items.some((item, index) => {
    if (callback(item)) {
      idx = index;
      return true;
    }
    return false;
  });
  return idx;
}

function handleContainer(containerInfo: Container, props: ManagedModalProps) {
  const restoreStyle: Array<{ key: string; el: HTMLElement; value: string }> = [];
  const restorePaddings: string[] = [];
  const container = containerInfo.container;
  let fixedNodes: NodeListOf<HTMLElement | SVGElement>;

  if (!props.disableScrollLock) {
    if (isOverflowing(container)) {
      // Compute the size before applying overflow hidden to avoid any scroll jumps.
      const scrollbarSize = getScrollbarSize(ownerDocument(container));

      restoreStyle.push({
        value: container.style.paddingRight,
        key: 'padding-right',
        el: container,
      });
      // Use computed style, here to get the real padding to add our scrollbar width.
      // TODO: Is there a difference between `padding-right` and `paddingRight`?
      container.style['padding-right' as 'paddingRight'] = `${
        getPaddingRight(container) + scrollbarSize
      }px`;

      // .mui-fixed is a global helper.
      fixedNodes = ownerDocument(container).querySelectorAll('.mui-fixed');
      [].forEach.call(fixedNodes, (element: HTMLElement | SVGElement) => {
        restorePaddings.push(element.style.paddingRight);
        element.style.paddingRight = `${getPaddingRight(element) + scrollbarSize}px`;
      });
    }

    // Improve Gatsby support
    // https://css-tricks.com/snippets/css/force-vertical-scrollbar/
    const parent = container.parentElement;
    const containerWindow = ownerWindow(container);
    const scrollContainer =
      parent?.nodeName === 'HTML' &&
      // TODO: Is there a difference between `overflow-y` and `overflowY`?
      containerWindow.getComputedStyle(parent)['overflow-y' as 'overflowY'] === 'scroll'
        ? parent
        : container;

    // Block the scroll even if no scrollbar is visible to account for mobile keyboard
    // screensize shrink.
    restoreStyle.push({
      value: scrollContainer.style.overflow,
      key: 'overflow',
      el: scrollContainer,
    });
    scrollContainer.style.overflow = 'hidden';
  }

  const restore = () => {
    if (fixedNodes) {
      [].forEach.call(fixedNodes, (node: HTMLElement | SVGElement, i: number) => {
        if (restorePaddings[i]) {
          node.style.paddingRight = restorePaddings[i];
        } else {
          node.style.removeProperty('padding-right');
        }
      });
    }

    restoreStyle.forEach(({ value, el, key }) => {
      if (value) {
        el.style.setProperty(key, value);
      } else {
        el.style.removeProperty(key);
      }
    });
  };

  return restore;
}

function getHiddenSiblings(container: Element) {
  const hiddenSiblings: Element[] = [];
  [].forEach.call(container.children, (element: Element) => {
    if (element.getAttribute('aria-hidden') === 'true') {
      hiddenSiblings.push(element);
    }
  });
  return hiddenSiblings;
}

interface Modal {
  mountNode: Element;
  modalRef: Element;
}

interface Container {
  container: HTMLElement;
  hiddenSiblingNodes: Element[];
  modals: Modal[];
  restore: null | (() => void);
}

/**
 * @ignore - do not document.
 *
 * Proper state management for containers and the modals in those containers.
 * Simplified, but inspired by react-overlay's ModalManager class.
 * Used by the Modal to ensure proper styling of containers.
 */
export default class ModalManager {
  private containers: Container[];

  private modals: Modal[];

  constructor() {
    this.modals = [];
    this.containers = [];
  }

  add(modal: Modal, container: HTMLElement): number {
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

    const containerIndex = findIndexOf(this.containers, (item) => item.container === container);
    if (containerIndex !== -1) {
      this.containers[containerIndex].modals.push(modal);
      return modalIndex;
    }

    this.containers.push({
      modals: [modal],
      container,
      restore: null,
      hiddenSiblingNodes,
    });

    return modalIndex;
  }

  mount(modal: Modal, props: ManagedModalProps): void {
    const containerIndex = findIndexOf(
      this.containers,
      (item) => item.modals.indexOf(modal) !== -1,
    );
    const containerInfo = this.containers[containerIndex];

    if (!containerInfo.restore) {
      containerInfo.restore = handleContainer(containerInfo, props);
    }
  }

  remove(modal: Modal): number {
    const modalIndex = this.modals.indexOf(modal);

    if (modalIndex === -1) {
      return modalIndex;
    }

    const containerIndex = findIndexOf(
      this.containers,
      (item) => item.modals.indexOf(modal) !== -1,
    );
    const containerInfo = this.containers[containerIndex];

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
      this.containers.splice(containerIndex, 1);
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

  isTopModal(modal: Modal): boolean {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === modal;
  }
}
