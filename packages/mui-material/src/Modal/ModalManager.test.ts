import { describe, beforeAll, afterAll, it, expect, beforeEach, afterEach } from 'vitest';
import getScrollbarSize from '@mui/utils/getScrollbarSize';
import { waitFor } from '@mui/internal-test-utils';
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

  describe('existing scroll locks', () => {
    let container: HTMLDivElement;
    let manager: ModalManager;
    let modals: Modal[];

    function mountModal(disableScrollLock = false) {
      const modal = getDummyModal();
      modals.push(modal);
      manager.add(modal, container);
      manager.mount(modal, { disableScrollLock });
      return modal;
    }

    beforeEach(() => {
      container = document.createElement('div');
      container.style.overflow = 'hidden';
      document.body.appendChild(container);
      manager = new ModalManager();
      modals = [];
    });

    afterEach(() => {
      modals.forEach((modal) => manager.remove(modal));
      container.remove();
    });

    it('takes over a released lock and restores the styles from before its own lock', async () => {
      container.style.paddingRight = '12px';
      const modal = mountModal();
      expect(container.style.paddingRight).to.equal('12px');

      container.style.overflow = 'scroll';
      container.style.paddingRight = '20px';
      await waitFor(() => expect(container.style.overflow).to.equal('hidden'));

      manager.remove(modal);
      expect(container.style.overflow).to.equal('scroll');
      expect(container.style.paddingRight).to.equal('20px');
    });

    ['hidden', 'clip'].forEach((overflow) => {
      it(`preserves an existing overflow=${overflow} lock`, () => {
        container.style.overflow = overflow;
        const originalStyle = container.style.cssText;
        const modal = mountModal();
        expect(container.style.cssText).to.equal(originalStyle);

        manager.remove(modal);
        expect(container.style.cssText).to.equal(originalStyle);
      });
    });

    it('does not take over after the modal closes', async () => {
      const modal = mountModal();
      manager.remove(modal);
      container.style.overflow = '';
      await Promise.resolve();

      expect(container.style.overflow).to.equal('');
    });

    it('keeps a deferred lock until the last modal closes', async () => {
      const first = mountModal();
      const second = mountModal();
      manager.remove(first);
      container.style.overflow = '';
      await waitFor(() => expect(container.style.overflow).to.equal('hidden'));

      manager.remove(second);
      expect(container.style.overflow).to.equal('');
    });

    it('does not take over when scroll locking is disabled', async () => {
      mountModal(true);
      container.style.overflow = '';
      await Promise.resolve();

      expect(container.style.overflow).to.equal('');
    });

    it('locks both axes when only vertical scrolling is hidden', () => {
      container.style.overflow = 'scroll hidden';
      const modal = mountModal();
      expect(container.style.overflow).to.equal('hidden');

      manager.remove(modal);
      expect(container.style.overflow).to.equal('scroll hidden');
    });

    // Base UI's inset-scrollbar fallback locks body and gives html `overflow-y: scroll`.
    it('waits for a lock on body while html only scrolls', async () => {
      const html = document.documentElement;
      const body = document.body;
      const initialStyles = { html: html.style.cssText, body: body.style.cssText };
      html.style.overflowY = 'scroll';
      body.style.overflow = 'hidden';
      const bodyModal = getDummyModal();
      modals.push(bodyModal);

      try {
        manager.add(bodyModal, body);
        manager.mount(bodyModal, {});
        expect(html.style.overflowY).to.equal('scroll');
        expect(body.style.overflow).to.equal('hidden');

        html.style.cssText = initialStyles.html;
        body.style.cssText = initialStyles.body;
        await waitFor(() => expect(body.style.overflow).to.equal('hidden'));
        expect(html.style.overflowY).to.equal('');

        manager.remove(bodyModal);
        expect(body.style.overflow).to.equal('');
        expect(html.style.overflowY).to.equal('');
      } finally {
        html.style.cssText = initialStyles.html;
        body.style.cssText = initialStyles.body;
      }
    });

    it('keeps its own lock when a stylesheet lock is removed from an ancestor', () => {
      const parent = document.createElement('div');
      const stylesheet = document.createElement('style');
      stylesheet.textContent = '.modal-manager-lock > div { overflow: hidden; }';
      parent.className = 'modal-manager-lock';
      container.style.overflow = '';
      document.head.appendChild(stylesheet);
      document.body.appendChild(parent);
      parent.appendChild(container);

      try {
        expect(window.getComputedStyle(container).overflow).to.equal('hidden');
        const modal = mountModal();
        parent.className = '';
        expect(window.getComputedStyle(container).overflow).to.equal('hidden');

        manager.remove(modal);
        expect(container.style.overflow).to.equal('');
      } finally {
        stylesheet.remove();
        parent.remove();
      }
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

  describe('container aria-hidden', () => {
    let modalRef1;
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
  });
});
