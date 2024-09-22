import { expect } from 'chai';
import { unstable_getScrollbarSize as getScrollbarSize } from '@mui/utils';
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
      fixedNode.style.paddingRight = '14px';

      const modal = getDummyModal();
      modalManager.add(modal, container1);
      modalManager.mount(modal, {});
      expect(container1.style.overflow).to.equal('hidden');
      expect(container1.style.paddingRight).to.equal(`${20 + getScrollbarSize(document)}px`);
      expect(fixedNode.style.paddingRight).to.equal(`${14 + getScrollbarSize(document)}px`);
      modalManager.remove(modal);
      expect(container1.style.overflow).to.equal('');
      expect(container1.style.paddingRight).to.equal('20px');
      expect(fixedNode.style.paddingRight).to.equal('14px');
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
      expect(container1.style.paddingRight).to.equal(`${20 + getScrollbarSize(document)}px`);
      expect(fixedNode.style.paddingRight).to.equal(`${getScrollbarSize(document)}px`);
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
      expect(container3.children[0]).toBeAriaHidden();

      modalManager.add(modal2, container4);
      modalManager.mount(modal2, {});
      expect(container4.children[0]).toBeAriaHidden();

      modalManager.remove(modal2);
      expect(container4.children[0]).not.toBeAriaHidden();

      modalManager.remove(modal1);
      expect(container3.children[0]).not.toBeAriaHidden();
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
      container2.id = 'container2';
      document.body.appendChild(container2);

      modalRef1 = document.createElement('div');
      modalRef1.id = 'modal1';
      container2.appendChild(modalRef1);

      modalManager = new ModalManager();
    });

    afterEach(() => {
      document.body.removeChild(container2);
    });

    it('should not contain aria-hidden on modal', () => {
      const modal2 = document.createElement('div');
      modal2.setAttribute('aria-hidden', 'true');

      expect(modal2).toBeAriaHidden();
      modalManager.add({ ...getDummyModal(), modalRef: modal2 }, container2);
      expect(modal2).not.toBeAriaHidden();
    });

    it('should add aria-hidden to container siblings', () => {
      const secondSibling = document.createElement('input');
      container2.appendChild(secondSibling);
      modalManager.add(getDummyModal(), container2);
      expect(container2.children[0]).toBeAriaHidden();
      expect(container2.children[1]).toBeAriaHidden();
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
      expect(container2.children[0]).toBeAriaHidden();
      for (let i = 1; i < numberOfChildren; i += 1) {
        expect(container2.children[i]).not.toBeAriaHidden();
      }
    });

    it('should add aria-hidden to previous modals', () => {
      const modal2: Modal = { mount: container2, modalRef: document.createElement('div') };
      modal2.modalRef.id = 'modal2Ref';
      const modal3: Modal = { mount: container2, modalRef: document.createElement('div') };
      modal3.modalRef.id = 'modal3Ref';

      container2.appendChild(modal2.modalRef);
      container2.appendChild(modal3.modalRef);

      // ideally mount must be a child of container, and modalRef must be a child of mount.
      // usually mount is worked out out by Portal:
      // * if disablePortal is true, mount is modalRef or null (even though types don't allow that).
      //   it could be the container2 because it is technically the mount (although it doesn't happen in real scenarios).
      // * if disablePortal is false, mount is the container if set, or document.body.

      // We directly mounted the modalRef to the container2, so
      // mount is modalRef or the container too (or null, but typing doesn't allow it).
      modalManager.add(modal2, container2);
      modalManager.mount(modal2, {});
      // Simulate the main React DOM true.
      expect(container2.children[0]).toBeAriaHidden();
      expect(container2.children[1]).not.toBeAriaHidden();
      expect(container2.children[2]).toBeAriaHidden();

      // Mount can be container2 itself too because it's technically the mount.
      modalManager.add(modal3, container2);
      modalManager.mount(modal3, {});
      expect(container2.children[0]).toBeAriaHidden();
      expect(container2.children[1]).toBeAriaHidden();
      expect(container2.children[2]).not.toBeAriaHidden();
    });

    it('should remove aria-hidden on siblings', () => {
      const modal = { mount: container2, modalRef: modalRef1 };
      const sibling1 = document.createElement('div');
      const sibling2 = document.createElement('div');

      container2.appendChild(sibling1);
      container2.appendChild(sibling2);

      modalManager.add(modal, container2);
      modalManager.mount(modal, {});
      expect(container2.children[0]).not.toBeAriaHidden();
      expect(container2.children[1]).toBeAriaHidden();
      expect(container2.children[2]).toBeAriaHidden();
      modalManager.remove(modal);
      expect(container2.children[0]).toBeAriaHidden();
      expect(container2.children[1]).not.toBeAriaHidden();
      expect(container2.children[2]).not.toBeAriaHidden();
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
      expect(sibling1).toBeAriaHidden();
      expect(sibling2).toBeAriaHidden();
      expect(modalRef1).not.toBeAriaHidden();
      modalManager.remove(modal);
      expect(sibling1).toBeAriaHidden();
      expect(sibling2).not.toBeAriaHidden();
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

      expect(container2.children[0]).not.toBeAriaHidden();
      expect(container2.children[1]).toBeAriaHidden();

      modalManager.add({ mount: mainContentSibling, modalRef: modal2 }, mainContentSibling);
      expect(container2.children[0]).toBeAriaHidden();
      // main content sibling should not be hidden
      expect(container2.children[1]).not.toBeAriaHidden();
      expect(mainContentSibling.children[0]).not.toBeAriaHidden();
    });

    it('top modal should always be accessible even if inside other dialog', () => {
      // simulates modal shown in another modal
      const modal1 = { mount: container2, modalRef: modalRef1 };
      const modal2 = { mount: modalRef1, modalRef: document.createElement('div') };
      modal2.modalRef.id = 'modal2';

      const modal2Sibling = document.createElement('div');
      modal1.modalRef.appendChild(modal2Sibling);

      const modal1Sibling = document.createElement('div');
      container2.appendChild(modal1Sibling);

      modalManager.add(modal1, container2);

      expect(container2.children[0]).not.toBeAriaHidden();
      expect(container2.children[0].children[0]).not.toBeAriaHidden();
      expect(container2.children[1]).toBeAriaHidden();

      modal1.modalRef.appendChild(modal2.modalRef);
      modalManager.add(modal2, modal1.modalRef);

      // modal1
      expect(container2.children[0]).not.toBeAriaHidden();
      // modal1 sibling
      expect(container2.children[1]).toBeAriaHidden();
      // modal2 sibling
      expect(container2.children[0].children[0]).toBeAriaHidden();
      // modal2
      expect(container2.children[0].children[1]).not.toBeAriaHidden();
    });
  });
});
