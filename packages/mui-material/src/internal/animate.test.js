import { expect } from 'chai';
import animate from './animate';

describe('animate', () => {
  let container;

  before(function beforeHook() {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isJSDOM = /jsdom/.test(window.navigator.userAgent);
    if (isJSDOM || isSafari) {
      // The test fails on Safari with just:
      //
      // container.scrollLeft = 200;
      // expect(container.scrollLeft).to.equal(200); 💥

      // in JSDOM the test prevents mocha from exiting
      this.skip();
    }

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
    if (container !== undefined) {
      document.body.removeChild(container);
    }
  });

  it('should work', (done) => {
    container.scrollLeft = 200;
    expect(container.scrollLeft).to.equal(200);
    animate('scrollLeft', container, 300, {}, (err) => {
      expect(err).to.equal(null);
      expect(container.scrollLeft).to.equal(300);
      done();
    });
  });

  it('should work when asking for the current value', (done) => {
    container.scrollLeft = 200;
    expect(container.scrollLeft).to.equal(200);
    animate('scrollLeft', container, 200, {}, (err) => {
      expect(err.message).to.equal('Element already at target position');
      expect(container.scrollLeft).to.equal(200);
      done();
    });
  });

  it('should be able to cancel the animation', (done) => {
    container.scrollLeft = 200;
    expect(container.scrollLeft).to.equal(200);
    const cancel = animate('scrollLeft', container, 300, {}, (err) => {
      expect(err.message).to.equal('Animation cancelled');
      expect(container.scrollLeft).to.equal(200);
      done();
    });
    cancel();
  });
});
