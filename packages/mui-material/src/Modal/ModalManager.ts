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

// The chain of elements from `node` up to (but not including) `container`
// that should not be aria-hidden.
function getKeepChain(node: Element, container: Element): Set<Element> {
  const chain = new Set<Element>();
  let current: Element | null = node;

  while (current && current !== container) {
    chain.add(current);
    current = current.parentElement;
  }

  return current === container ? chain : new Set<Element>();
}

// Walk down from `parent` collecting everything that should be aria-hidden.
// An element on the keep chain is stepped through rather than hidden, so the
// modal's own ancestors stay readable while their other children get hidden.
function collectHiddenTargets(
  parent: Element,
  keep: Element,
  keepChain: Set<Element>,
  out: Set<Element>,
): void {
  [].forEach.call(parent.children, (element: Element) => {
    if (element === keep || isAriaHiddenForbiddenOnElement(element)) {
      return;
    }

    if (keepChain.has(element)) {
      collectHiddenTargets(element, keep, keepChain, out);
      return;
    }

    out.add(element);
  });
}

/**
 * Hides every element of the container from assistive technology except the
 * topmost modal and the ancestors it sits inside, and unhides what no longer
 * needs hiding. Elements that were already `aria-hidden` before the manager
 * touched them are left untouched.
 */
function syncAriaHidden(containerInfo: Container): void {
  const { container, modals } = containerInfo;
  const top = modals[modals.length - 1];
  const keep = top.modalRef;

  const next = new Set<Element>();
  collectHiddenTargets(container, keep, getKeepChain(keep, container), next);

  next.forEach((element) => {
    if (!containerInfo.hiddenSet.has(element) && element.getAttribute('aria-hidden') === 'true') {
      next.delete(element);
    }
  });

  // Hands the accessibility tree back to a parent dialog when a nested one closes.
  containerInfo.hiddenSet.forEach((element) => {
    if (!next.has(element)) {
      ariaHidden(element, false);
    }
  });
  next.forEach((element) => ariaHidden(element, true));

  if (keep) {
    ariaHidden(keep, false);
  }

  containerInfo.hiddenSet = next;
}

type RestoreStyle = Array<{
  /**
   * CSS property name (HYPHEN CASE) to be modified.
   */
  property: string;
  el: HTMLElement | SVGElement;
  value: string;
}>;

function restoreStyles(restoreStyle: RestoreStyle) {
  restoreStyle.forEach(({ value, el, property }) => {
    if (value) {
      el.style.setProperty(property, value);
    } else {
      el.style.removeProperty(property);
    }
  });
}

function getScrollContainer(container: HTMLElement): HTMLElement {
  if (container.parentNode instanceof DocumentFragment) {
    return ownerDocument(container).body;
  }

  // Support html overflow-y: auto for scroll stability between pages
  // https://css-tricks.com/snippets/css/force-vertical-scrollbar/
  const parent = container.parentElement;
  const containerWindow = ownerWindow(container);
  return parent?.nodeName === 'HTML' &&
    containerWindow.getComputedStyle(parent).overflowY === 'scroll'
    ? parent
    : container;
}

function padFixedElements(doc: Document, scrollbarSize: number) {
  const restoreStyle: RestoreStyle = [];

  // .mui-fixed is a global helper.
  const fixedElements = doc.querySelectorAll('.mui-fixed');
  [].forEach.call(fixedElements, (element: HTMLElement | SVGElement) => {
    restoreStyle.push({
      value: element.style.paddingRight,
      property: 'padding-right',
      el: element,
    });
    element.style.paddingRight = `${getPaddingRight(element) + scrollbarSize}px`;
  });

  return () => restoreStyles(restoreStyle);
}

// Styles that several owners share. The first owner applies them, and the last owner restores them.
interface SharedStyles<Owner> {
  owners: Set<Owner>;
  restore: () => void;
}

function acquireStyles<Key, Owner>(
  map: Map<Key, SharedStyles<Owner>>,
  key: Key,
  owner: Owner,
  apply: () => () => void,
) {
  let styles = map.get(key);
  if (!styles) {
    styles = { owners: new Set(), restore: apply() };
    map.set(key, styles);
  }
  styles.owners.add(owner);
}

function releaseStyles<Key, Owner>(map: Map<Key, SharedStyles<Owner>>, key: Key, owner: Owner) {
  const styles = map.get(key);
  if (styles?.owners.delete(owner) && styles.owners.size === 0) {
    map.delete(key);
    styles.restore();
  }
}

interface Modal {
  mount: Element;
  modalRef: Element;
}

interface Container {
  container: HTMLElement;
  hiddenSet: Set<Element>;
  modals: Modal[];
  // Kept while the container holds the lock, because the lock changes what the resolution reads.
  scrollContainer?: HTMLElement | undefined;
}

/**
 * @ignore - do not document.
 *
 * Proper state management for containers and the modals in those containers.
 * Simplified, but inspired by react-overlay's ModalManager class.
 * Used by the Modal to ensure proper styling of containers.
 */
export class ModalManager {
  private containers: Container[] = [];

  private modals: Modal[] = [];

  // Modals in different containers can lock the same scroll container.
  private scrollLocks = new Map<HTMLElement, SharedStyles<Modal>>();

  // The scroll locks of a document share the padding of its `.mui-fixed` elements.
  private fixedPaddings = new Map<Document, SharedStyles<HTMLElement>>();

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

    const containerIndex = this.containers.findIndex((item) => item.container === container);

    if (containerIndex !== -1) {
      this.containers[containerIndex].modals.push(modal);
      syncAriaHidden(this.containers[containerIndex]);
      return modalIndex;
    }

    const containerInfo: Container = {
      modals: [modal],
      container,
      hiddenSet: new Set(),
    };
    this.containers.push(containerInfo);
    syncAriaHidden(containerInfo);

    return modalIndex;
  }

  mount(modal: Modal, props: ManagedModalProps): void {
    const containerIndex = this.containers.findIndex((item) => item.modals.includes(modal));
    const containerInfo = this.containers[containerIndex];

    // With `disablePortal`, the portal ref can run before `add()`.
    if (!containerInfo) {
      return;
    }

    if (props.disableScrollLock) {
      this.releaseScrollLock(containerInfo, modal);
      return;
    }

    containerInfo.scrollContainer ??= getScrollContainer(containerInfo.container);
    const { scrollContainer } = containerInfo;
    acquireStyles(this.scrollLocks, scrollContainer, modal, () => this.lockScroll(scrollContainer));
  }

  private lockScroll(scrollContainer: HTMLElement) {
    const restoreStyle: RestoreStyle = [];
    const doc = ownerDocument(scrollContainer);

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

      // Skip a zero size, so that a later lock that measures a scrollbar pads the fixed elements.
      if (scrollbarSize > 0) {
        acquireStyles(this.fixedPaddings, doc, scrollContainer, () =>
          padFixedElements(doc, scrollbarSize),
        );
      }
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

    return () => {
      restoreStyles(restoreStyle);
      releaseStyles(this.fixedPaddings, doc, scrollContainer);
    };
  }

  private releaseScrollLock(containerInfo: Container, modal: Modal) {
    const { scrollContainer } = containerInfo;
    if (!scrollContainer) {
      return;
    }

    releaseStyles(this.scrollLocks, scrollContainer, modal);

    // Resolve it again for the next lock, because the overflow of html can change in between.
    const owners = this.scrollLocks.get(scrollContainer)?.owners;
    if (!containerInfo.modals.some((item) => owners?.has(item))) {
      containerInfo.scrollContainer = undefined;
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

    // Restore the scroll even when modals without the lock stay open.
    this.releaseScrollLock(containerInfo, modal);

    // If that was the last modal in a container, clean up the container.
    if (containerInfo.modals.length === 0) {
      if (modal.modalRef) {
        // In case the modal wasn't in the DOM yet.
        ariaHidden(modal.modalRef, ariaHiddenState);
      }

      containerInfo.hiddenSet.forEach((element) => ariaHidden(element, false));
      containerInfo.hiddenSet.clear();
      this.containers.splice(containerIndex, 1);
    } else {
      syncAriaHidden(containerInfo);

      if (modal.modalRef) {
        ariaHidden(modal.modalRef, ariaHiddenState);
      }
    }

    return modalIndex;
  }

  isTopModal(modal: Modal): boolean {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === modal;
  }
}
