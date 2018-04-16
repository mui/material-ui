import { assert } from 'chai';
import getScrollbarSize from 'dom-helpers/util/scrollbarSize';
import ModalManager from './ModalManager';

describe('ModalManager', () => {
  let modalManager;
  let container1;

  before(() => {
    modalManager = new ModalManager();
    container1 = document.createElement('div');
    document.body.appendChild(container1);
  });

  after(() => {
    document.body.removeChild(container1);
  });

  it('should add a modal only once', () => {
    const modal = {};
    const modalManager2 = new ModalManager();
    const idx = modalManager2.add(modal, container1);
    assert.strictEqual(modalManager2.add(modal, container1), idx);
    modalManager2.remove(modal);
  });

  describe('managing modals', () => {
    let modal1;
    let modal2;
    let modal3;

    before(() => {
      modal1 = {};
      modal2 = {};
      modal3 = {};
    });

    it('should add modal1', () => {
      const idx = modalManager.add(modal1, container1);
      assert.strictEqual(idx, 0, 'should be the first modal');
      assert.strictEqual(modalManager.isTopModal(modal1), true, 'should be the top modal');
    });

    it('should add modal2', () => {
      const idx = modalManager.add(modal2, container1);
      assert.strictEqual(idx, 1, 'should be the second modal');
      assert.strictEqual(modalManager.isTopModal(modal2), true, 'should be the top modal');
    });

    it('should add modal3', () => {
      const idx = modalManager.add(modal3, container1);
      assert.strictEqual(idx, 2, 'should be the third modal');
      assert.strictEqual(modalManager.isTopModal(modal3), true, 'should be the top modal');
    });

    it('should remove modal2', () => {
      const idx = modalManager.remove(modal2);
      assert.strictEqual(idx, 1, 'should be the second modal');
    });

    it('should add modal2', () => {
      const idx = modalManager.add(modal2, container1);
      assert.strictEqual(idx, 2, 'should be the "third" modal');
      assert.strictEqual(modalManager.isTopModal(modal2), true, 'modal2 should be the top modal');
      assert.strictEqual(
        modalManager.isTopModal(modal3),
        false,
        'modal3 should not be the top modal',
      );
    });

    it('should remove modal3', () => {
      const idx = modalManager.remove(modal3);
      assert.strictEqual(idx, 1, 'should be the "second" modal');
    });

    it('should remove modal2', () => {
      const idx = modalManager.remove(modal2);
      assert.strictEqual(idx, 1, 'should be the "second" modal');
      assert.strictEqual(modalManager.isTopModal(modal1), true, 'modal1 should be the top modal');
    });

    it('should remove modal1', () => {
      const idx = modalManager.remove(modal1);
      assert.strictEqual(idx, 0, 'should be the "first" modal');
    });

    it('should not do anything', () => {
      const idx = modalManager.remove({ nonExisting: true });
      assert.strictEqual(idx, -1, 'should not find the non existing modal');
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
      modalManager.add(modal, container1);
      assert.strictEqual(container1.style.overflow, 'hidden');
      assert.strictEqual(container1.style.paddingRight, `${getScrollbarSize()}px`);
      assert.strictEqual(fixedNode.style.paddingRight, `${14 + getScrollbarSize()}px`);
      modalManager.remove(modal);
      assert.strictEqual(container1.style.overflow, '');
      assert.strictEqual(container1.style.paddingRight, paddingRightBefore);
      assert.strictEqual(fixedNode.style.paddingRight, '14px');
    });
  });

  describe('container aria-hidden', () => {
    let mountNode1;
    let container2;

    beforeEach(() => {
      container2 = document.createElement('div');
      document.body.appendChild(container2);

      mountNode1 = document.createElement('div');
      container2.appendChild(mountNode1);

      modalManager = new ModalManager();
    });

    afterEach(() => {
      document.body.removeChild(container2);
    });

    it('should add aria-hidden to container siblings', () => {
      modalManager.add({}, container2);
      assert.strictEqual(mountNode1.getAttribute('aria-hidden'), 'true');
    });

    it('should add aria-hidden to previous modals', () => {
      const modal2 = {};
      const modal3 = {};
      const mountNode2 = document.createElement('div');

      modal2.mountNode = mountNode2;
      container2.appendChild(mountNode2);
      modalManager.add(modal2, container2);
      modalManager.add(modal3, container2);
      assert.strictEqual(mountNode1.getAttribute('aria-hidden'), 'true');
      assert.strictEqual(mountNode2.getAttribute('aria-hidden'), 'true');
    });

    it('should remove aria-hidden on americas next top modal', () => {
      const modal2 = {};
      const modal3 = {};
      const mountNode2 = document.createElement('div');

      modal2.mountNode = mountNode2;
      container2.appendChild(mountNode2);
      modalManager.add({}, container1);
      modalManager.add(modal2, container2);
      modalManager.add(modal3, container2);
      assert.strictEqual(mountNode2.getAttribute('aria-hidden'), 'true');
      modalManager.remove(modal3, container2);
      assert.strictEqual(mountNode2.getAttribute('aria-hidden'), null);
    });

    it('should remove aria-hidden on siblings', () => {
      const modal = {};

      modalManager.add(modal, container2);
      assert.strictEqual(mountNode1.getAttribute('aria-hidden'), 'true');
      modalManager.remove(modal, container2);
      assert.strictEqual(mountNode1.getAttribute('aria-hidden'), null);
    });
  });
});
