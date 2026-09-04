import ownerWindow from '@mui/utils/ownerWindow';
import ownerDocument from '@mui/utils/ownerDocument';
import getScrollbarSize from '@mui/utils/getScrollbarSize';

export interface ManagedModalProps {
  disableScrollLock?: boolean | undefined;
}

// Is a vertical scrollbar displayed?
function isOverflowing(container: Element): boolean {
  const doc = ownerDocument(container);

  if (container === doc.body || container === doc.documentElement) {
    return ownerWindow(container).innerWidth > doc.documentElement.clientWidth;
  }

  return container.scrollHeight > container.clientHeight;
}

export function ariaHidden(element: Element, hide: boolean): void {
  if (hide) {
    element.setAttribute('aria-hidden', 'true');
  } else {
    element.removeAttribute('aria-hidden');
  }
}

function getPaddingRight(element: Element): number {
  return parseFloat(ownerWindow(element).getComputedStyle(element).paddingRight) || 0;
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
  const isForbiddenTagName = forbiddenTagNames.includes(element.tagName);
  const isInputHidden = element.tagName === 'INPUT' && element.getAttribute('type') === 'hidden';
  return isForbiddenTagName || isInputHidden;
}

function ariaHiddenSiblings(
  container: Element,
  mountElement: Element,
  currentElement: Element,
  elementsToExclude: readonly Element[],
  hide: boolean,
): void {
  const blacklist = [mountElement, currentElement, ...elementsToExclude];

  [].forEach.call(container.children, (element: Element) => {
    const isNotExcludedElement = !blacklist.includes(element);
    const isNotForbiddenElement = !isAriaHiddenForbiddenOnElement(element);
    // When hiding, never hide an element that contains the modal, otherwise the
    // modal itself becomes inaccessible. This happens when the modal is not
    // portaled into the container, for example when `disablePortal` is used.
    // Only apply this check when hiding; during restore we must not skip elements
    // because a stale ancestor check would leave stale aria-hidden behind.
    const isNotModalAncestor = hide && currentElement ? !element.contains(currentElement) : true;
    if (isNotExcludedElement && isNotForbiddenElement && isNotModalAncestor) {
      ariaHidden(element, hide);
    }
  });
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

    if (isOverflowing(scrollContainer)) {
      // Compute the size before applying overflow hidden to avoid any scroll jumps.
      const scrollbarSize = getScrollbarSize(ownerWindow(scrollContainer));

      restoreStyle.push({
        value: scrollContainer.style.paddingRight,
        property: 'padding-right',
        el: scrollContainer,
      });
      // Use computed style, here to get the real padding to add our scrollbar width.
      scrollContainer.style.paddingRight = `${getPaddingRight(scrollContainer) + scrollbarSize}px`;

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

  add(modal: Modal, container: HTMLElement, addToIndex?: number): number {
    let modalIndex = this.modals.indexOf(modal);
    if (modalIndex !== -1) {
      return modalIndex;
    }

    if (addToIndex !== undefined && addToIndex >= 0 && addToIndex <= this.modals.length) {
      modalIndex = addToIndex;
      this.modals.splice(addToIndex, 0, modal);
    } else {
      modalIndex = this.modals.length;
      this.modals.push(modal);
    }

    // If the modal we are adding is already in the DOM.
    if (modal.modalRef) {
      ariaHidden(modal.modalRef, false);
    }

    const hiddenSiblings = getHiddenSiblings(container);
    ariaHiddenSiblings(container, modal.mount, modal.modalRef, hiddenSiblings, true);

    const containerIndex = this.containers.findIndex((item) => item.container === container);
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
    const containerIndex = this.containers.findIndex((item) => item.modals.includes(modal));
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

    const containerIndex = this.containers.findIndex((item) => item.modals.includes(modal));
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
        containerInfo.container,
        modal.modalRef,
        containerInfo.hiddenSiblings,
        false,
      );
      this.containers.splice(containerIndex, 1);
    } else {
      // Other modals remain in this container. Re-hide siblings based on
      // what the remaining modals need hidden, instead of blindly restoring.
      if (modal.modalRef) {
        ariaHidden(modal.modalRef, ariaHiddenState);
      }
      [].forEach.call(containerInfo.container.children, (element: Element) => {
        if (isAriaHiddenForbiddenOnElement(element)) {
          return;
        }
        if (containerInfo.hiddenSiblings.includes(element)) {
          return;
        }
        const shouldHide = containerInfo.modals.some((remainingModal) => {
          return (
            remainingModal.modalRef &&
            remainingModal.modalRef !== element &&
            !remainingModal.modalRef.contains(element) &&
            !element.contains(remainingModal.modalRef)
          );
        });
        ariaHidden(element, shouldHide);
      });
    }

    return modalIndex;
  }

  isTopModal(modal: Modal): boolean {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === modal;
  }
}
