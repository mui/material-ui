import { assert } from 'chai';
import getScrollbarSize from '../utils/getScrollbarSize';
import ModalManager from './ModalManager';

describe('ModalManager', () => {
  let modalManager;
  let container1;

  before(() => {
    modalManager = new ModalManager();
    container1 = document.createElement('div');
    container1.style.padding = '20px';
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
    const modal = {};
    const modalManager2 = new ModalManager();
    const idx = modalManager2.add(modal, container1);
    modalManager2.mount(modal);
    assert.strictEqual(modalManager2.add(modal, container1), idx);
    modalManager2.remove(modal);
  });

  describe('managing modals', () => {
    let modal1;
    let modal2;
    let modal3;

    before(() => {
      modal1 = { modalRef: document.createElement('div') };
      modal2 = { modalRef: document.createElement('div') };
      modal3 = { modalRef: document.createElement('div') };
    });

    it('should add modal1', () => {
      const idx = modalManager.add(modal1, container1);
      modalManager.mount(modal1);
      assert.strictEqual(idx, 0, 'should be the first modal');
      assert.strictEqual(modalManager.isTopModal(modal1), true);
    });

    it('should add modal2', () => {
      const idx = modalManager.add(modal2, container1);
      assert.strictEqual(idx, 1, 'should be the second modal');
      assert.strictEqual(modalManager.isTopModal(modal2), true);
    });

    it('should add modal3', () => {
      const idx = modalManager.add(modal3, container1);
      assert.strictEqual(idx, 2, 'should be the third modal');
      assert.strictEqual(modalManager.isTopModal(modal3), true);
    });

    it('should remove modal2', () => {
      const idx = modalManager.remove(modal2);
      assert.strictEqual(idx, 1, 'should be the second modal');
    });

    it('should add modal2 2', () => {
      const idx = modalManager.add(modal2, container1);
      modalManager.mount(modal2);
      assert.strictEqual(idx, 2, 'should be the "third" modal');
      assert.strictEqual(modalManager.isTopModal(modal2), true);
      assert.strictEqual(
        modalManager.isTopModal(modal3),
        false,
        'modal3 should not be the top modal',
      );
    });

    it('should remove modal3', () => {
      const idx = modalManager.remove(modal3);
      assert.strictEqual(idx, 1);
    });

    it('should remove modal2 2', () => {
      const idx = modalManager.remove(modal2);
      assert.strictEqual(idx, 1);
      assert.strictEqual(modalManager.isTopModal(modal1), true);
    });

    it('should remove modal1', () => {
      const idx = modalManager.remove(modal1);
      assert.strictEqual(idx, 0);
    });

    it('should not do anything', () => {
      const idx = modalManager.remove({ nonExisting: true });
      assert.strictEqual(idx, -1);
    });
  });

  describe('overflow', () => {
    let fixedNode;

    beforeEach(() => {
      fixedNode = document.createElement('div');
      fixedNode.classList.add('mui-fixed');
      fixedNode.style.padding = '14px';
      document.body.appendChild(fixedNode);
      window.innerWidth += 1; // simulate a scrollbar
    });

    afterEach(() => {
      document.body.removeChild(fixedNode);
      window.innerWidth -= 1;
    });

    it('should handle the scroll', () => {
      const modal = {};
      const paddingRightBefore = container1.style.paddingRight;
      const paddingFixedRightBefore = fixedNode.style.paddingRight;
      modalManager.add(modal, container1);
      modalManager.mount(modal);
      assert.strictEqual(container1.style.overflow, 'hidden');
      assert.strictEqual(
        container1.style.paddingRight,
        `${parseInt(paddingRightBefore, 10) + getScrollbarSize()}px`,
      );
      assert.strictEqual(
        fixedNode.style.paddingRight,
        `${parseInt(paddingFixedRightBefore, 10) + getScrollbarSize()}px`,
      );
      modalManager.remove(modal);
      assert.strictEqual(container1.style.overflow, '');
      assert.strictEqual(container1.style.paddingRight, paddingRightBefore);
      assert.strictEqual(fixedNode.style.paddingRight, paddingFixedRightBefore);
    });
  });

  describe('multi container', () => {
    let container3;
    let container4;

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
      const modal1 = {};
      const modal2 = {};
      modalManager.add(modal1, container3);
      modalManager.mount(modal1);
      assert.strictEqual(container3.children[0].getAttribute('aria-hidden'), 'true');

      modalManager.add(modal2, container4);
      modalManager.mount(modal2);
      assert.strictEqual(container4.children[0].getAttribute('aria-hidden'), 'true');

      modalManager.remove(modal2);
      assert.strictEqual(container4.children[0].getAttribute('aria-hidden'), null);

      modalManager.remove(modal1);
      assert.strictEqual(container3.children[0].getAttribute('aria-hidden'), null);
    });

    afterEach(() => {
      document.body.removeChild(container3);
      document.body.removeChild(container4);
    });
  });

  describe('container aria-hidden', () => {
    let modalRef1;
    let container2;

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

      assert.strictEqual(modal2.getAttribute('aria-hidden'), 'true');
      modalManager.add({ modalRef: modal2 }, container2);
      assert.strictEqual(modal2.getAttribute('aria-hidden'), null);
    });

    it('should add aria-hidden to container siblings', () => {
      modalManager.add({}, container2);
      assert.strictEqual(container2.children[0].getAttribute('aria-hidden'), 'true');
    });

    it('should add aria-hidden to previous modals', () => {
      const modal2 = document.createElement('div');
      const modal3 = document.createElement('div');

      container2.appendChild(modal2);
      container2.appendChild(modal3);

      modalManager.add({ modalRef: modal2 }, container2);
      // Simulate the main React DOM true.
      assert.strictEqual(container2.children[0].getAttribute('aria-hidden'), 'true');
      assert.strictEqual(container2.children[1].getAttribute('aria-hidden'), null);

      modalManager.add({ modalRef: modal3 }, container2);
      assert.strictEqual(container2.children[0].getAttribute('aria-hidden'), 'true');
      assert.strictEqual(container2.children[1].getAttribute('aria-hidden'), 'true');
      assert.strictEqual(container2.children[2].getAttribute('aria-hidden'), null);
    });

    it('should remove aria-hidden on siblings', () => {
      const modal = { modalRef: container2.children[0] };

      modalManager.add(modal, container2);
      modalManager.mount(modal);
      assert.strictEqual(container2.children[0].getAttribute('aria-hidden'), null);
      modalManager.remove(modal, container2);
      assert.strictEqual(container2.children[0].getAttribute('aria-hidden'), 'true');
    });
  });
});
