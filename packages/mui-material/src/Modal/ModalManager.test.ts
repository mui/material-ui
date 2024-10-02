import { expect } from 'chai';
import { unstable_getScrollbarSize as getScrollbarSize } from '@mui/utils';
import { ModalManager } from './ModalManager';

interface Modal {
  mount: Element | null;
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

  before(() => {
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

  after(() => {
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

    before(() => {
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
    let originalBody: HTMLElement;

    beforeEach(() => {
      // backup old body so we can restore it at the end
      originalBody = document.body;
      // we add a new body so scrollHeight and clientHeight can be
      // modified conveniently
      document.body = document.createElement('body');
      document.body.style.paddingRight = '20px';

      fixedNode = document.createElement('div');
      fixedNode.classList.add('mui-fixed');
      document.body.appendChild(fixedNode);
      window.innerWidth += 1; // simulate a scrollbar
    });

    afterEach(() => {
      document.body.removeChild(fixedNode);
      window.innerWidth -= 1;
      document.body.style.paddingRight = '';
      document.body.style.overflow = '';
      document.body = originalBody;
    });

    it('should handle the scroll', () => {
      fixedNode.style.paddingRight = '14px';

      const modal = getDummyModal();
      const body = document.body;
      modalManager.add(modal, container1);
      modalManager.mount(modal, {});
      expect(body.style.overflow).to.equal('hidden');
      expect(body.style.paddingRight).to.equal(`${20 + getScrollbarSize(window)}px`);
      expect(fixedNode.style.paddingRight).to.equal(`${14 + getScrollbarSize(window)}px`);
      modalManager.remove(modal);
      expect(body.style.overflow).to.equal('');
      expect(body.style.paddingRight).to.equal('20px');
      expect(fixedNode.style.paddingRight).to.equal('14px');
    });

    it('should disable the scroll even when not overflowing', () => {
      // simulate non-overflowing container
      const container2 = document.createElement('div');
      const body = document.body;
      Object.defineProperty(body, 'scrollHeight', {
        value: 100,
        writable: false,
      });
      Object.defineProperty(body, 'clientHeight', {
        value: 100,
        writable: false,
      });
      document.body.appendChild(container2);

      const modal = getDummyModal();
      modalManager.add(modal, container2);
      modalManager.mount(modal, {});
      expect(body.style.overflow).to.equal('hidden');
      modalManager.remove(modal);
      expect(body.style.overflow).to.equal('');

      document.body.removeChild(container2);
    });

    it('should restore styles correctly if none existed before', () => {
      const modal = getDummyModal();
      modalManager.add(modal, container1);
      modalManager.mount(modal, {});

      const body = document.body;
      expect(body.style.overflow).to.equal('hidden');
      expect(body.style.paddingRight).to.equal(`${20 + getScrollbarSize(window)}px`);
      expect(fixedNode.style.paddingRight).to.equal(`${getScrollbarSize(window)}px`);
      modalManager.remove(modal);
      expect(body.style.overflow).to.equal('');
      expect(body.style.paddingRight).to.equal('20px');
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

      it('should scroll body when parent is shadow root', () => {
        const modal = getDummyModal();

        container2.style.overflow = 'scroll';

        document.body.appendChild(shadowContainer);
        modalManager.add(modal, container2);
        modalManager.mount(modal, {});

        expect(container2.style.overflow).to.equal('scroll');
        expect(document.body.style.overflow).to.equal('hidden');
        modalManager.remove(modal);

        expect(container2.style.overflow).to.equal('scroll');
        expect(document.body.style.overflow).to.equal('');
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

        const body = document.body;
        body.style.overflow = 'scroll';

        Object.defineProperty(body, 'scrollHeight', {
          value: 100,
          writable: false,
        });
        Object.defineProperty(body, 'clientHeight', {
          value: 90,
          writable: false,
        });

        document.body.appendChild(container2);
        modalManager.add(modal, container2);
        modalManager.mount(modal, {});

        expect(body.style.overflow).to.equal('hidden');
        modalManager.remove(modal);

        expect(body.style.overflow).to.equal('scroll');
        expect(fixedNode.style.paddingRight).to.equal('');
      });

      it('should restore styles correctly if overflow-x existed before', () => {
        const modal = getDummyModal();

        const body = document.body;
        body.style.overflowX = 'hidden';

        Object.defineProperty(body, 'scrollHeight', {
          value: 100,
          writable: false,
        });
        Object.defineProperty(body, 'clientHeight', {
          value: 90,
          writable: false,
        });

        document.body.appendChild(container2);

        modalManager.add(modal, container2);
        modalManager.mount(modal, {});

        expect(body.style.overflow).to.equal('hidden');

        modalManager.remove(modal);

        expect(body.style.overflow).to.equal('');
        expect(body.style.overflowX).to.equal('hidden');
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

    it('should work with multiple containers', () => {
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
      // Mount can be null on the first render
      const modal2: Modal = { mount: null, modalRef: document.createElement('div') };
      // Mount can be the container itself
      const modal3: Modal = { mount: container2, modalRef: document.createElement('div') };
      // Mount can be the modalRef itself
      const modal4Ref = document.createElement('div');
      const modal4: Modal = { mount: modal4Ref, modalRef: modal4Ref };

      container2.appendChild(modal2.modalRef);
      container2.appendChild(modal3.modalRef);
      container2.appendChild(modal4.modalRef);

      modalManager.add(modal2, container2);
      // Simulate the main React DOM true.
      expect(modalRef1).toBeInaccessible();
      expect(modal2.modalRef).not.toBeInaccessible();
      expect(modal3.modalRef).toBeInaccessible();
      expect(modal4.modalRef).toBeInaccessible();

      modalManager.add(modal3, container2);
      expect(modalRef1).toBeInaccessible();
      expect(modal2.modalRef).toBeInaccessible();
      expect(modal3.modalRef).not.toBeInaccessible();
      expect(modal4.modalRef).toBeInaccessible();

      modalManager.add(modal4, container2);
      expect(modalRef1).toBeInaccessible();
      expect(modal2.modalRef).toBeInaccessible();
      expect(modal3.modalRef).toBeInaccessible();
      expect(modal4.modalRef).not.toBeInaccessible();
    });

    it('should remove aria-hidden on siblings', () => {
      const modal = { mount: container2, modalRef: modalRef1 };
      const sibling1 = document.createElement('div');
      const sibling2 = document.createElement('div');

      container2.appendChild(sibling1);
      container2.appendChild(sibling2);

      modalManager.add(modal, container2);
      modalManager.mount(modal, {});
      expect(modalRef1).not.toBeInaccessible();
      expect(sibling1).toBeInaccessible();
      expect(sibling2).toBeInaccessible();
      modalManager.remove(modal);
      expect(modalRef1).toBeInaccessible();
      expect(sibling1).not.toBeInaccessible();
      expect(sibling2).not.toBeInaccessible();
    });

    it('should keep previous aria-hidden siblings hidden', () => {
      const modal = { mount: container2, modalRef: modalRef1 };
      const sibling1 = document.createElement('div');
      const sibling2 = document.createElement('div');

      sibling1.setAttribute('aria-hidden', 'true');

      container2.appendChild(sibling1);
      container2.appendChild(sibling2);

      modalManager.add(modal, container2);
      modalManager.mount(modal, {});
      expect(sibling1).toBeInaccessible();
      expect(sibling2).toBeInaccessible();
      expect(modalRef1).not.toBeInaccessible();
      modalManager.remove(modal);
      expect(sibling1).toBeInaccessible();
      expect(sibling2).not.toBeInaccessible();
    });

    it('top modal should always be accessible from sublevels', () => {
      // simulates modal shown in body
      const modal1 = { mount: container2, modalRef: modalRef1 };
      const mainContentSibling = document.createElement('div');
      container2.appendChild(mainContentSibling);

      // simulates modal shown in main content with disablePortal
      const modal2 = document.createElement('div');
      mainContentSibling.appendChild(modal2);

      modalManager.add(modal1, container2);

      expect(modal1.modalRef).not.toBeInaccessible();
      expect(mainContentSibling).toBeInaccessible();

      modalManager.add({ mount: mainContentSibling, modalRef: modal2 }, mainContentSibling);
      expect(modal1.modalRef).toBeInaccessible();
      // main content sibling should not be hidden
      expect(mainContentSibling).not.toBeInaccessible();
      expect(modal2).not.toBeInaccessible();
    });

    it('top modal should always be accessible even if inside other modal', () => {
      // simulates modal shown in another modal
      const modal1 = { mount: container2, modalRef: modalRef1 };
      // top modal
      const innerModal = { mount: modalRef1, modalRef: document.createElement('div') };

      const innerModalSibling = document.createElement('div');
      modal1.modalRef.appendChild(innerModalSibling);

      const modal1Sibling = document.createElement('div');
      container2.appendChild(modal1Sibling);

      modalManager.add(modal1, container2);

      expect(modal1.modalRef).not.toBeInaccessible();
      expect(innerModalSibling).not.toBeInaccessible();
      expect(modal1Sibling).toBeInaccessible();

      modal1.modalRef.appendChild(innerModal.modalRef);

      // add inner modal
      modalManager.add(innerModal, modal1.modalRef);

      // modal1
      expect(modal1.modalRef).not.toBeInaccessible();
      // modal1 sibling
      expect(modal1Sibling).toBeInaccessible();
      // inner modal sibling
      expect(innerModalSibling).toBeInaccessible();
      // inner modal (top modal is accessible)
      expect(innerModal.modalRef).not.toBeInaccessible();
    });
  });
});
