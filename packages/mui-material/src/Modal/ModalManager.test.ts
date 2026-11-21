import { describe, beforeAll, afterAll, it, expect, beforeEach, afterEach } from 'vitest';
import getScrollbarSize from '@mui/utils/getScrollbarSize';
import { registerSnackbar } from '../utils/snackbarRegistry';
import { ModalManager } from './ModalManager';

interface Modal {
  mount: Element;
  modalRef: Element;
}

function getDummyModal(): Modal {
  return {
    mount: document.createElement('div'),
    modalRef: document.createElement('div'),
  };
}

describe('ModalManager', () => {
  let modalManager: ModalManager;
  let container1: HTMLDivElement;

  beforeAll(() => {
    modalManager = new ModalManager();
    container1 = document.createElement('div');
    container1.style.paddingRight = '20px';
    Object.defineProperty(container1, 'scrollHeight', {
      value: 100,
      writable: false,
    });
    Object.defineProperty(container1, 'clientHeight', {
      value: 90,
      writable: false,
    });
    document.body.appendChild(container1);
  });

  afterAll(() => {
    document.body.removeChild(container1);
  });

  it('should add a modal only once', () => {
    const modal = getDummyModal();
    const modalManager2 = new ModalManager();
    const idx = modalManager2.add(modal, container1);
    modalManager2.mount(modal, {});
    expect(modalManager2.add(modal, container1)).to.equal(idx);
    modalManager2.remove(modal);
  });

  it('finds the top modal within each document independently', () => {
    const manager = new ModalManager();
    const otherDocument = document.implementation.createHTMLDocument();
    const first = getDummyModal();
    const second = {
      mount: otherDocument.createElement('div'),
      modalRef: otherDocument.createElement('div'),
    };

    manager.add(first, container1);
    manager.add(second, otherDocument.body);
    expect(manager.getTopModal(document)).to.equal(first);
    expect(manager.getTopModal(otherDocument)).to.equal(second);

    manager.remove(second);
    expect(manager.getTopModal(otherDocument)).to.equal(undefined);
    expect(manager.getTopModal(document)).to.equal(first);
    manager.remove(first);
    expect(manager.getTopModal(document)).to.equal(undefined);
  });

  describe('managing modals', () => {
    let modal1: Modal;
    let modal2: Modal;
    let modal3: Modal;

    beforeAll(() => {
      modal1 = getDummyModal();
      modal2 = getDummyModal();
      modal3 = getDummyModal();
    });

    it('should add modal1', () => {
      const idx = modalManager.add(modal1, container1);
      modalManager.mount(modal1, {});
      expect(idx).to.equal(0);
      expect(modalManager.isTopModal(modal1)).to.equal(true);
    });

    it('should add modal2', () => {
      const idx = modalManager.add(modal2, container1);
      expect(idx).to.equal(1);
      expect(modalManager.isTopModal(modal2)).to.equal(true);
    });

    it('should add modal3', () => {
      const idx = modalManager.add(modal3, container1);
      expect(idx).to.equal(2);
      expect(modalManager.isTopModal(modal3)).to.equal(true);
    });

    it('should remove modal2', () => {
      const idx = modalManager.remove(modal2);
      expect(idx).to.equal(1);
    });

    it('should add modal2 2', () => {
      const idx = modalManager.add(modal2, container1);
      modalManager.mount(modal2, {});
      expect(idx).to.equal(2);
      expect(modalManager.isTopModal(modal2)).to.equal(true);
      expect(modalManager.isTopModal(modal3)).to.equal(false);
    });

    it('should remove modal3', () => {
      const idx = modalManager.remove(modal3);
      expect(idx).to.equal(1);
    });

    it('should remove modal2 2', () => {
      const idx = modalManager.remove(modal2);
      expect(idx).to.equal(1);
      expect(modalManager.isTopModal(modal1)).to.equal(true);
    });

    it('should remove modal1', () => {
      const idx = modalManager.remove(modal1);
      expect(idx).to.equal(0);
    });

    it('should not do anything', () => {
      const idx = modalManager.remove(getDummyModal());
      expect(idx).to.equal(-1);
    });
  });

  describe('overflow', () => {
    let fixedNode: HTMLDivElement;

    beforeEach(() => {
      container1.style.paddingRight = '20px';

      fixedNode = document.createElement('div');
      fixedNode.classList.add('mui-fixed');
      document.body.appendChild(fixedNode);
      window.innerWidth += 1; // simulate a scrollbar
    });

    afterEach(() => {
      document.body.removeChild(fixedNode);
      window.innerWidth -= 1;
    });

    it('should handle the scroll', () => {
      fixedNode.style.paddingRight = '14.4px';

      const modal = getDummyModal();
      modalManager.add(modal, container1);
      modalManager.mount(modal, {});
      expect(container1.style.overflow).to.equal('hidden');
      expect(container1.style.paddingRight).to.equal(`${20 + getScrollbarSize(window)}px`);
      expect(fixedNode.style.paddingRight).to.equal(`${14.4 + getScrollbarSize(window)}px`);
      modalManager.remove(modal);
      expect(container1.style.overflow).to.equal('');
      expect(container1.style.paddingRight).to.equal('20px');
      expect(fixedNode.style.paddingRight).to.equal('14.4px');
    });

    it('should disable the scroll even when not overflowing', () => {
      // simulate non-overflowing container
      const container2 = document.createElement('div');
      Object.defineProperty(container2, 'scrollHeight', {
        value: 100,
        writable: false,
      });
      Object.defineProperty(container2, 'clientHeight', {
        value: 100,
        writable: false,
      });
      document.body.appendChild(container2);

      const modal = getDummyModal();
      modalManager.add(modal, container2);
      modalManager.mount(modal, {});
      expect(container2.style.overflow).to.equal('hidden');
      modalManager.remove(modal);
      expect(container2.style.overflow).to.equal('');

      document.body.removeChild(container2);
    });

    it('should restore styles correctly if none existed before', () => {
      const modal = getDummyModal();
      modalManager.add(modal, container1);
      modalManager.mount(modal, {});
      expect(container1.style.overflow).to.equal('hidden');
      expect(container1.style.paddingRight).to.equal(`${20 + getScrollbarSize(window)}px`);
      expect(fixedNode.style.paddingRight).to.equal(`${getScrollbarSize(window)}px`);
      modalManager.remove(modal);
      expect(container1.style.overflow).to.equal('');
      expect(container1.style.paddingRight).to.equal('20px');
      expect(fixedNode.style.paddingRight).to.equal('');
    });

    describe('shadow dom', () => {
      let shadowContainer: HTMLDivElement;
      let container2: HTMLDivElement;

      beforeEach(() => {
        shadowContainer = document.createElement('div');
        const shadowRoot = shadowContainer.attachShadow({ mode: 'open' });
        container2 = document.createElement('div');
        shadowRoot.appendChild(container2);
      });

      afterEach(() => {
        document.body.removeChild(shadowContainer);
      });

      it('should lock body scrolling and compensate for its scrollbar when the container is in a shadow root', () => {
        const modal = getDummyModal();
        const initialBodyPaddingRight = document.body.style.paddingRight;

        container2.style.overflow = 'scroll';
        document.body.style.paddingRight = '20px';

        document.body.appendChild(shadowContainer);
        modalManager.add(modal, container2);
        modalManager.mount(modal, {});

        expect(container2.style.overflow).to.equal('scroll');
        expect(container2.style.paddingRight).to.equal('');
        expect(document.body.style.overflow).to.equal('hidden');
        expect(document.body.style.paddingRight).to.equal(`${20 + getScrollbarSize(window)}px`);
        modalManager.remove(modal);

        expect(container2.style.overflow).to.equal('scroll');
        expect(document.body.style.overflow).to.equal('');
        expect(document.body.style.paddingRight).to.equal('20px');

        document.body.style.paddingRight = initialBodyPaddingRight;
      });
    });

    describe('restore styles', () => {
      let container2: HTMLDivElement;

      beforeEach(() => {
        container2 = document.createElement('div');
      });

      afterEach(() => {
        document.body.removeChild(container2);
      });

      it('should restore styles correctly if overflow existed before', () => {
        const modal = getDummyModal();

        container2.style.overflow = 'scroll';

        Object.defineProperty(container2, 'scrollHeight', {
          value: 100,
          writable: false,
        });
        Object.defineProperty(container2, 'clientHeight', {
          value: 90,
          writable: false,
        });

        document.body.appendChild(container2);
        modalManager.add(modal, container2);
        modalManager.mount(modal, {});

        expect(container2.style.overflow).to.equal('hidden');
        modalManager.remove(modal);

        expect(container2.style.overflow).to.equal('scroll');
        expect(fixedNode.style.paddingRight).to.equal('');
      });

      it('should restore styles correctly if overflow-x existed before', () => {
        const modal = getDummyModal();

        container2.style.overflowX = 'hidden';

        Object.defineProperty(container2, 'scrollHeight', {
          value: 100,
          writable: false,
        });
        Object.defineProperty(container2, 'clientHeight', {
          value: 90,
          writable: false,
        });

        document.body.appendChild(container2);

        modalManager.add(modal, container2);
        modalManager.mount(modal, {});

        expect(container2.style.overflow).to.equal('hidden');

        modalManager.remove(modal);

        expect(container2.style.overflow).to.equal('');
        expect(container2.style.overflowX).to.equal('hidden');
      });
    });
  });

  describe('multi container', () => {
    let container3: HTMLDivElement;
    let container4: HTMLDivElement;

    beforeEach(() => {
      container3 = document.createElement('div');
      document.body.appendChild(container3);
      container3.appendChild(document.createElement('div'));

      container4 = document.createElement('div');
      document.body.appendChild(container4);
      container4.appendChild(document.createElement('div'));
    });

    it('should work will multiple containers', () => {
      modalManager = new ModalManager();
      const modal1 = getDummyModal();
      const modal2 = getDummyModal();
      modalManager.add(modal1, container3);
      modalManager.mount(modal1, {});
      expect(container3.children[0]).toBeInaccessible();

      modalManager.add(modal2, container4);
      modalManager.mount(modal2, {});
      expect(container4.children[0]).toBeInaccessible();

      modalManager.remove(modal2);
      expect(container4.children[0]).not.toBeInaccessible();

      modalManager.remove(modal1);
      expect(container3.children[0]).not.toBeInaccessible();
    });

    afterEach(() => {
      document.body.removeChild(container3);
      document.body.removeChild(container4);
    });
  });

  describe('registered snackbars', () => {
    let container: HTMLDivElement;
    let lower: Modal;
    let upper: Modal;
    let unregisterSnackbars: Array<() => void>;

    beforeEach(() => {
      modalManager = new ModalManager();
      container = document.createElement('div');
      document.body.appendChild(container);
      lower = getDummyModal();
      upper = getDummyModal();
      container.appendChild(lower.modalRef);
      unregisterSnackbars = [];
    });

    afterEach(() => {
      unregisterSnackbars.forEach((unregister) => unregister());
      modalManager.remove(upper);
      modalManager.remove(lower);
      container.remove();
    });

    it('keeps a portaled snackbar readable while hiding the application', () => {
      const application = document.createElement('div');
      const background = document.createElement('button');
      const snackbar = document.createElement('div');
      snackbar.setAttribute('role', 'alert');
      application.appendChild(background);
      container.append(application, snackbar);

      modalManager.add(lower, container);
      expect(application).toBeInaccessible();

      unregisterSnackbars.push(registerSnackbar(snackbar));

      expect(application).toBeInaccessible();
      expect(snackbar).not.toBeInaccessible();
      expect(lower.modalRef).not.toBeInaccessible();
      expect(background).toBeInaccessible();
      expect(snackbar.parentElement).to.equal(container);
    });

    it('does not expose raw application text beside a nested snackbar', () => {
      const application = document.createElement('div');
      const privateText = document.createTextNode('Private account balance');
      const background = document.createElement('button');
      const snackbar = document.createElement('div');
      snackbar.setAttribute('role', 'alert');
      application.append(privateText, background, snackbar);
      container.appendChild(application);
      modalManager.add(lower, container);

      unregisterSnackbars.push(registerSnackbar(snackbar));

      expect(application.getAttribute('aria-hidden')).to.equal('true');
      expect(application).toBeInaccessible();
      expect(background).toBeInaccessible();
      expect(snackbar).toBeInaccessible();
      expect(privateText.parentElement).to.equal(application);
      expect(lower.modalRef).not.toBeInaccessible();
    });

    it('preserves an author-hidden portaled snackbar', () => {
      const snackbar = document.createElement('div');
      snackbar.setAttribute('role', 'alert');
      snackbar.setAttribute('aria-hidden', 'true');
      container.appendChild(snackbar);
      unregisterSnackbars.push(registerSnackbar(snackbar));

      modalManager.add(lower, container);

      expect(snackbar.getAttribute('aria-hidden')).to.equal('true');
      expect(snackbar).toBeInaccessible();

      modalManager.remove(lower);

      expect(snackbar.getAttribute('aria-hidden')).to.equal('true');
      expect(snackbar).toBeInaccessible();
    });

    it('preserves an author-hidden ancestor of a registered snackbar', () => {
      const hiddenSection = document.createElement('div');
      hiddenSection.setAttribute('aria-hidden', 'true');
      const snackbar = document.createElement('div');
      snackbar.setAttribute('role', 'alert');
      hiddenSection.appendChild(snackbar);
      container.appendChild(hiddenSection);
      unregisterSnackbars.push(registerSnackbar(snackbar));

      modalManager.add(lower, container);

      expect(hiddenSection.getAttribute('aria-hidden')).to.equal('true');
      expect(snackbar).toBeInaccessible();
      expect(lower.modalRef).not.toBeInaccessible();

      modalManager.remove(lower);

      expect(hiddenSection.getAttribute('aria-hidden')).to.equal('true');
      expect(snackbar).toBeInaccessible();
    });

    it('keeps a registered snackbar in the lower modal hidden until the upper modal closes', () => {
      const lowerSnackbar = document.createElement('div');
      lowerSnackbar.setAttribute('role', 'alert');
      lower.modalRef.appendChild(lowerSnackbar);
      modalManager.add(lower, container);
      unregisterSnackbars.push(registerSnackbar(lowerSnackbar));
      expect(lowerSnackbar).not.toBeInaccessible();

      const upperSnackbar = document.createElement('div');
      upperSnackbar.setAttribute('role', 'alert');
      upper.modalRef.appendChild(upperSnackbar);
      container.appendChild(upper.modalRef);
      modalManager.add(upper, container);
      unregisterSnackbars.push(registerSnackbar(upperSnackbar));

      expect(lower.modalRef).toBeInaccessible();
      expect(lowerSnackbar).toBeInaccessible();
      expect(upper.modalRef).not.toBeInaccessible();
      expect(upperSnackbar).not.toBeInaccessible();
      expect(upperSnackbar.parentElement).to.equal(upper.modalRef);

      modalManager.remove(upper);

      expect(lower.modalRef).not.toBeInaccessible();
      expect(lowerSnackbar).not.toBeInaccessible();
      expect(upperSnackbar).toBeInaccessible();
    });

    it('hides an unregistered portal while the modal stays open', () => {
      const application = document.createElement('div');
      const background = document.createElement('button');
      const snackbar = document.createElement('div');
      snackbar.setAttribute('role', 'alert');
      application.appendChild(background);
      container.append(application, snackbar);
      modalManager.add(lower, container);
      const unregister = registerSnackbar(snackbar);
      unregisterSnackbars.push(unregister);

      expect(snackbar).not.toBeInaccessible();
      expect(background).toBeInaccessible();

      unregister();

      expect(application).toBeInaccessible();
      expect(snackbar).toBeInaccessible();
      expect(snackbar.getAttribute('aria-hidden')).to.equal('true');
      expect(lower.modalRef).not.toBeInaccessible();

      modalManager.remove(lower);

      expect(application).not.toBeInaccessible();
      expect(background).not.toBeInaccessible();
      expect(snackbar).not.toBeInaccessible();
    });

    it('does not reveal background content in another modal container', () => {
      const otherContainer = document.createElement('div');
      const otherBackground = document.createElement('button');
      otherContainer.append(otherBackground, upper.modalRef);
      document.body.appendChild(otherContainer);
      const application = document.createElement('div');
      const snackbar = document.createElement('div');
      snackbar.setAttribute('role', 'alert');
      container.append(application, snackbar);

      try {
        modalManager.add(lower, container);
        modalManager.add(upper, otherContainer);
        unregisterSnackbars.push(registerSnackbar(snackbar));

        expect(snackbar).not.toBeInaccessible();
        expect(otherBackground).toBeInaccessible();
        expect(otherBackground.getAttribute('aria-hidden')).to.equal('true');

        modalManager.remove(lower);

        expect(otherBackground).toBeInaccessible();
        expect(upper.modalRef).not.toBeInaccessible();
      } finally {
        modalManager.remove(upper);
        otherContainer.remove();
      }
    });
  });

  describe('container aria-hidden', () => {
    let modalRef1: HTMLDivElement;
    let container2: HTMLDivElement;

    beforeEach(() => {
      container2 = document.createElement('div');
      document.body.appendChild(container2);

      modalRef1 = document.createElement('div');
      container2.appendChild(modalRef1);

      modalManager = new ModalManager();
    });

    afterEach(() => {
      document.body.removeChild(container2);
    });

    it('should not contain aria-hidden on modal', () => {
      const modal2 = document.createElement('div');
      modal2.setAttribute('aria-hidden', 'true');

      expect(modal2).toBeInaccessible();
      modalManager.add({ ...getDummyModal(), modalRef: modal2 }, container2);
      expect(modal2).not.toBeInaccessible();
    });

    it('should add aria-hidden to container siblings', () => {
      const secondSibling = document.createElement('input');
      container2.appendChild(secondSibling);
      modalManager.add(getDummyModal(), container2);
      expect(container2.children[0]).toBeInaccessible();
      expect(container2.children[1]).toBeInaccessible();
    });

    it('should not add aria-hidden to forbidden container siblings', () => {
      [
        'template',
        'script',
        'style',
        'link',
        'map',
        'meta',
        'noscript',
        'picture',
        'col',
        'colgroup',
        'param',
        'slot',
        'source',
        'track',
      ].forEach(function createBlacklistSiblings(name) {
        const sibling = document.createElement(name);
        container2.appendChild(sibling);
      });
      const inputHiddenSibling = document.createElement('input');
      inputHiddenSibling.setAttribute('type', 'hidden');
      container2.appendChild(inputHiddenSibling);

      const numberOfChildren = 16;
      expect(container2.children.length).equal(numberOfChildren);

      modalManager.add(getDummyModal(), container2);
      expect(container2.children[0]).toBeInaccessible();
      for (let i = 1; i < numberOfChildren; i += 1) {
        expect(container2.children[i].getAttribute('aria-hidden')).to.equal(null);
      }
    });

    it('should add aria-hidden to previous modals', () => {
      const modal2 = document.createElement('div');
      const modal3 = document.createElement('div');

      container2.appendChild(modal2);
      container2.appendChild(modal3);

      modalManager.add({ ...getDummyModal(), modalRef: modal2 }, container2);
      // Simulate the main React DOM true.
      expect(container2.children[0]).toBeInaccessible();
      expect(container2.children[1]).not.toBeInaccessible();

      modalManager.add({ ...getDummyModal(), modalRef: modal3 }, container2);
      expect(container2.children[0]).toBeInaccessible();
      expect(container2.children[1]).toBeInaccessible();
      expect(container2.children[2]).not.toBeInaccessible();
    });

    it('should remove aria-hidden on siblings', () => {
      const modal = { ...getDummyModal(), modalRef: container2.children[0] };

      modalManager.add(modal, container2);
      modalManager.mount(modal, {});
      expect(container2.children[0]).not.toBeInaccessible();
      modalManager.remove(modal);
      expect(container2.children[0]).toBeInaccessible();
    });

    it('should keep previous aria-hidden siblings hidden', () => {
      const modal = { ...getDummyModal(), modalRef: container2.children[0] };
      const sibling1 = document.createElement('div');
      const sibling2 = document.createElement('div');

      sibling1.setAttribute('aria-hidden', 'true');

      container2.appendChild(sibling1);
      container2.appendChild(sibling2);

      modalManager.add(modal, container2);
      modalManager.mount(modal, {});
      expect(container2.children[0]).not.toBeInaccessible();
      modalManager.remove(modal);
      expect(container2.children[0]).toBeInaccessible();
      expect(container2.children[1]).toBeInaccessible();
      expect(container2.children[2]).not.toBeInaccessible();
    });

    it('should hide the siblings of a non-portaled modal at every level', () => {
      // container2 > nestedParent > [appContent, modalRef]
      const nestedParent = document.createElement('div');
      const appContent = document.createElement('div');
      const modalRef = document.createElement('div');
      nestedParent.appendChild(appContent);
      nestedParent.appendChild(modalRef);
      container2.appendChild(nestedParent);

      modalManager.add({ ...getDummyModal(), modalRef }, container2);

      // The modal and its ancestor stay readable.
      expect(nestedParent).not.toBeInaccessible();
      expect(modalRef).not.toBeInaccessible();
      // Everything beside the modal is hidden - inside the ancestor and above it.
      expect(appContent).toBeInaccessible();
      expect(modalRef1).toBeInaccessible();
    });

    it('should restore aria-hidden at every level when the modal is removed', () => {
      const nestedParent = document.createElement('div');
      const appContent = document.createElement('div');
      const modalRef = document.createElement('div');
      nestedParent.appendChild(appContent);
      nestedParent.appendChild(modalRef);
      container2.appendChild(nestedParent);

      const modal = { ...getDummyModal(), modalRef };
      modalManager.add(modal, container2);
      modalManager.mount(modal, {});
      expect(appContent).toBeInaccessible();

      modalManager.remove(modal);
      expect(appContent).not.toBeInaccessible();
      expect(modalRef1).not.toBeInaccessible();
      expect(nestedParent).not.toBeInaccessible();
    });

    it('should not restore aria-hidden that the app set itself, at any depth', () => {
      const nestedParent = document.createElement('div');
      const appHidden = document.createElement('div');
      appHidden.setAttribute('aria-hidden', 'true');
      const modalRef = document.createElement('div');
      nestedParent.appendChild(appHidden);
      nestedParent.appendChild(modalRef);
      container2.appendChild(nestedParent);

      const modal = { ...getDummyModal(), modalRef };
      modalManager.add(modal, container2);
      modalManager.mount(modal, {});
      modalManager.remove(modal);

      // The manager never owned this attribute, so it must survive.
      expect(appHidden).toBeInaccessible();
    });

    // Two modals
    it('should unhide the modal below when the top modal is removed', () => {
      const lowerRef = document.createElement('div');
      const upperRef = document.createElement('div');
      container2.appendChild(lowerRef);
      container2.appendChild(upperRef);

      const lower = { ...getDummyModal(), modalRef: lowerRef };
      const upper = { ...getDummyModal(), modalRef: upperRef };

      modalManager.add(lower, container2);
      expect(lowerRef).not.toBeInaccessible();

      modalManager.add(upper, container2);
      expect(lowerRef).toBeInaccessible();
      expect(upperRef).not.toBeInaccessible();

      modalManager.remove(upper);
      expect(lowerRef).not.toBeInaccessible();
      expect(modalRef1).toBeInaccessible();
    });

    // Three modals
    it('should keep only the new top modal readable when one of three is removed', () => {
      const first = document.createElement('div');
      const second = document.createElement('div');
      const third = document.createElement('div');
      container2.appendChild(first);
      container2.appendChild(second);
      container2.appendChild(third);

      modalManager.add({ ...getDummyModal(), modalRef: first }, container2);
      modalManager.add({ ...getDummyModal(), modalRef: second }, container2);
      const top = { ...getDummyModal(), modalRef: third };
      modalManager.add(top, container2);
      expect(third).not.toBeInaccessible();

      modalManager.remove(top);
      expect(second).not.toBeInaccessible();
      expect(first).toBeInaccessible();
      expect(third).toBeInaccessible();
    });

    it('should release deep aria-hidden when a shallower modal takes the top', () => {
      const wrapper = document.createElement('div');
      const appContent = document.createElement('div');
      const inlineRef = document.createElement('div');
      wrapper.appendChild(appContent);
      wrapper.appendChild(inlineRef);
      container2.appendChild(wrapper);

      const portalRef = document.createElement('div');
      container2.appendChild(portalRef);

      modalManager.add({ ...getDummyModal(), modalRef: inlineRef }, container2);
      expect(appContent).toBeInaccessible();
      expect(wrapper).not.toBeInaccessible();

      modalManager.add({ ...getDummyModal(), modalRef: portalRef }, container2);
      // `wrapper` is hidden as a whole now, so the deep attribute inside it is
      // redundant and must be released. Assert the attribute directly. The
      // accessibility check would report it inaccessible via its hidden ancestor.
      expect(wrapper).toBeInaccessible();
      expect(appContent.getAttribute('aria-hidden')).to.equal(null);
      expect(portalRef).not.toBeInaccessible();
    });
  });
});
