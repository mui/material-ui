import { assert } from 'chai';
import animate from './animate';

describe('animate', () => {
  let container;

  before(() => {
    container = document.createElement('div');
    container.style.cssText = [
      'height: 100px',
      'width: 100px',
      'overflow: scroll',
      'border: 1px solid #000',
    ].join(';');
    const box = document.createElement('div');
    box.style.cssText = ['height: 100px', 'width: 1000px'].join(';');
    container.appendChild(box);
    document.body.appendChild(container);
  });

  after(() => {
    document.body.removeChild(container);
  });

  it('should work', done => {
    container.scrollLeft = 200;
    animate('scrollLeft', container, 300, {}, () => {
      assert.strictEqual(container.scrollLeft, 300);
      done();
    });
  });

  it('should work when asking for the current value', done => {
    container.scrollLeft = 200;
    animate('scrollLeft', container, 200, {}, () => {
      assert.strictEqual(container.scrollLeft, 200);
      done();
    });
  });

  it('should be able to cancel the animatation', done => {
    container.scrollLeft = 200;
    const cancel = animate('scrollLeft', container, 300, {}, () => {
      assert.strictEqual(container.scrollLeft, 200);
      done();
    });
    cancel();
  });
});
