import ownerWindow from '@mui/utils/ownerWindow';
import ownerDocument from '@mui/utils/ownerDocument';
import getScrollbarSize from '@mui/utils/getScrollbarSize';
import { PortalProps } from '../Portal';

export interface ManagedModalProps {
  disableScrollLock?: boolean;
  container?: PortalProps['container'];
}

// Is a vertical scrollbar displayed?
function isOverflowing(container: Element): boolean {
  const doc = ownerDocument(container);

  if (doc.body === container) {
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
  const isForbiddenTagName = forbiddenTagNames.includes(element.tagName);
  const isInputHidden = element.tagName === 'INPUT' && element.getAttribute('type') === 'hidden';
  return isForbiddenTagName || isInputHidden;
}

function ariaHiddenElements(
  container: Element,
  mountElement: Element | null,
  currentElement: Element,
  elementsToExclude: readonly Element[],
  hide: boolean,
): void {
  let current: Element | null = container;
  let previousElement: Element =
    container === mountElement ? currentElement : (mountElement ?? currentElement);
  const html = ownerDocument(container).body.parentElement;
  const blacklist = [mountElement, ...elementsToExclude];

  while (current != null && html !== current) {
    for (let i = 0; i < current.children.length; i += 1) {
      const element = current.children[i];
      const isNotExcludedElement = blacklist.indexOf(element) === -1;
      const isNotForbiddenElement = !isAriaHiddenForbiddenOnElement(element);
      const isPreviousElement = element === previousElement;

      // We came from here
      if (isPreviousElement) {
        if (!isNotExcludedElement) {
          // If any ancestor has aria-hidden applied (e.g. by another modal), the current modal could become inaccessible.
          // We remove aria-hidden from ancestors to ensure the current modal is accessible, even though this might not be ideal if aria-hidden wasn't added by another modal (For example, if a developer manually applied aria-hidden to hide certain content, removing it could lead to unintended accessibility issues.).
          if (hide) {
            ariaHidden(element, !hide);
          }
          // we restore it if it was originally hidden
          else {
            ariaHidden(element, hide);
          }
        }
      } else if (isNotExcludedElement && isNotForbiddenElement) {
        ariaHidden(element, hide);
      }
    }

    previousElement = current;
    current = current.parentElement;
  }
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
  // Implement workaround according to
  // https://github.com/mui/material-ui/pull/43318#issuecomment-2553509176
  // Technically applying scrollLock to the container does nothing, but
  // we preserve the original buggy behavior because fixing it would be
  // a breaking change.
  // Original behavior: Apply scroll lock to container if it's set,
  // otherwise apply to the body element. Because disablePortal
  // passes in the correct `containerInfo.container`, the easiest way to
  // make it apply to the correct element is to do this.
  const container = props.container ? containerInfo.container : document.body;

  if (!props.disableScrollLock) {
    if (isOverflowing(container)) {
      // Compute the size before applying overflow hidden to avoid any scroll jumps.
      const scrollbarSize = getScrollbarSize(ownerWindow(container));

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

function getHiddenElements(container: Element) {
  const hiddenElements: Element[] = [];
  const html = ownerDocument(container).body.parentElement;
  let current: Element | null = container;

  while (current != null && html !== current) {
    [].forEach.call(current.children, (element: Element) => {
      if (element.getAttribute('aria-hidden') === 'true') {
        hiddenElements.push(element);
      }
    });
    current = current.parentElement;
  }
  return hiddenElements;
}

interface Modal {
  /**
   * The immediate child of the container argument {@link ModalManager.add}.
   *
   * If you pass in {@link modalRef} or the container itself it's also handled
   */
  mount: Element | null;
  /**
   * The modal element itself.
   */
  modalRef: Element;
}

interface Container {
  container: HTMLElement;
  hiddenElements: Element[];
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

  /**
   *
   * @param modal
   * @param container {@link Modal["mount"]}
   * @returns
   */
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

    const hiddenElements = getHiddenElements(container);
    ariaHiddenElements(container, modal.mount, modal.modalRef, hiddenElements, true);

    const containerIndex = findIndexOf(this.containers, (item) => item.container === container);
    if (containerIndex !== -1) {
      this.containers[containerIndex].modals.push(modal);
      return modalIndex;
    }

    this.containers.push({
      modals: [modal],
      container,
      restore: null,
      hiddenElements,
    });

    return modalIndex;
  }

  mount(modal: Modal, props: ManagedModalProps): void {
    const containerIndex = findIndexOf(this.containers, (item) => item.modals.includes(modal));
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

    const containerIndex = findIndexOf(this.containers, (item) => item.modals.includes(modal));
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

      ariaHiddenElements(
        containerInfo.container,
        modal.mount,
        modal.modalRef,
        containerInfo.hiddenElements,
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
