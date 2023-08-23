import {
  unstable_ownerWindow as ownerWindow,
  unstable_ownerDocument as ownerDocument,
  unstable_getScrollbarSize as getScrollbarSize,
} from '@mui/utils';

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

export function ariaHidden(element: Element, show: boolean): void {
  if (show) {
    element.setAttribute('aria-hidden', 'true');
  } else {
    element.removeAttribute('aria-hidden');
  }
}

function getPaddingRight(element: Element): number {
  return parseInt(ownerWindow(element).getComputedStyle(element).paddingRight, 10) || 0;
}

function isAriaHiddenForbiddenOnElement(element: Element): boolean {
  // The forbidden HTML tags are the ones from ARIA specification that
  // can be children of body and can't have aria-hidden attribute.
  // cf. https://www.w3.org/TR/html-aria/#docconformance
  const forbiddenTagNames = [
    'TEMPLATE',
    'SCRIPT',
    'STYLE',
    'LINK',
    'MAP',
    'META',
    'NOSCRIPT',
    'PICTURE',
    'COL',
    'COLGROUP',
    'PARAM',
    'SLOT',
    'SOURCE',
    'TRACK',
  ];
  const isForbiddenTagName = forbiddenTagNames.indexOf(element.tagName) !== -1;
  const isInputHidden = element.tagName === 'INPUT' && element.getAttribute('type') === 'hidden';
  return isForbiddenTagName || isInputHidden;
}

function ariaHiddenSiblings(
  container: Element,
  mountElement: Element,
  currentElement: Element,
  elementsToExclude: readonly Element[],
  show: boolean,
): void {
  const blacklist = [mountElement, currentElement, ...elementsToExclude];

  [].forEach.call(container.children, (element: Element) => {
    const isNotExcludedElement = blacklist.indexOf(element) === -1;
    const isNotForbiddenElement = !isAriaHiddenForbiddenOnElement(element);
    if (isNotExcludedElement && isNotForbiddenElement) {
      ariaHidden(element, show);
    }
  });
}

function findIndexOf<T>(items: readonly T[], callback: (item: T) => boolean): number {
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
  const restoreStyle: Array<{
    /**
     * CSS property name (HYPHEN CASE) to be modified.
     */
    property: string;
    el: HTMLElement | SVGElement;
    value: string;
  }> = [];
  const container = containerInfo.container;

  if (!props.disableScrollLock) {
    if (isOverflowing(container)) {
      // Compute the size before applying overflow hidden to avoid any scroll jumps.
      const scrollbarSize = getScrollbarSize(ownerDocument(container));

      restoreStyle.push({
        value: container.style.paddingRight,
        property: 'padding-right',
        el: container,
      });
      // Use computed style, here to get the real padding to add our scrollbar width.
      container.style.paddingRight = `${getPaddingRight(container) + scrollbarSize}px`;

      // .mui-fixed is a global helper.
      const fixedElements = ownerDocument(container).querySelectorAll('.mui-fixed');
      [].forEach.call(fixedElements, (element: HTMLElement | SVGElement) => {
        restoreStyle.push({
          value: element.style.paddingRight,
          property: 'padding-right',
          el: element,
        });
        element.style.paddingRight = `${getPaddingRight(element) + scrollbarSize}px`;
      });
    }

    let scrollContainer: HTMLElement;

    if (container.parentNode instanceof DocumentFragment) {
      scrollContainer = ownerDocument(container).body;
    } else {
      // Support html overflow-y: auto for scroll stability between pages
      // https://css-tricks.com/snippets/css/force-vertical-scrollbar/
      const parent = container.parentElement;
      const containerWindow = ownerWindow(container);
      scrollContainer =
        parent?.nodeName === 'HTML' &&
        containerWindow.getComputedStyle(parent).overflowY === 'scroll'
          ? parent
          : container;
    }

    // Block the scroll even if no scrollbar is visible to account for mobile keyboard
    // screensize shrink.
    restoreStyle.push(
      {
        value: scrollContainer.style.overflow,
        property: 'overflow',
        el: scrollContainer,
      },
      {
        value: scrollContainer.style.overflowX,
        property: 'overflow-x',
        el: scrollContainer,
      },
      {
        value: scrollContainer.style.overflowY,
        property: 'overflow-y',
        el: scrollContainer,
      },
    );

    scrollContainer.style.overflow = 'hidden';
  }

  const restore = () => {
    restoreStyle.forEach(({ value, el, property }) => {
      if (value) {
        el.style.setProperty(property, value);
      } else {
        el.style.removeProperty(property);
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
  mount: Element;
  modalRef: Element;
}

interface Container {
  container: HTMLElement;
  hiddenSiblings: Element[];
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
export class ModalManager {
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

    const hiddenSiblings = getHiddenSiblings(container);
    ariaHiddenSiblings(container, modal.mount, modal.modalRef, hiddenSiblings, true);

    const containerIndex = findIndexOf(this.containers, (item) => item.container === container);
    if (containerIndex !== -1) {
      this.containers[containerIndex].modals.push(modal);
      return modalIndex;
    }

    this.containers.push({
      modals: [modal],
      container,
      restore: null,
      hiddenSiblings,
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

  remove(modal: Modal, ariaHiddenState = true): number {
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
        ariaHidden(modal.modalRef, ariaHiddenState);
      }

      ariaHiddenSiblings(
        containerInfo.container,
        modal.mount,
        modal.modalRef,
        containerInfo.hiddenSiblings,
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
