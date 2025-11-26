import { expect } from 'chai';
import * as sinon from 'sinon';
import {
  debounce,
  throttle,
  preloadImage,
  preloadImages,
  prefersReducedMotion,
} from './performance';

describe('performance utilities', () => {
  let clock: sinon.SinonFakeTimers;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  describe('debounce', () => {
    it('should delay function execution', () => {
      const func = sinon.spy();
      const debouncedFunc = debounce(func, 100);

      debouncedFunc();
      expect(func.called).to.equal(false);

      clock.tick(50);
      expect(func.called).to.equal(false);

      clock.tick(50);
      expect(func.calledOnce).to.equal(true);
    });

    it('should reset delay on subsequent calls', () => {
      const func = sinon.spy();
      const debouncedFunc = debounce(func, 100);

      debouncedFunc();
      clock.tick(50);
      debouncedFunc();
      clock.tick(50);
      expect(func.called).to.equal(false);

      clock.tick(50);
      expect(func.calledOnce).to.equal(true);
    });

    it('should pass arguments to the function', () => {
      const func = sinon.spy();
      const debouncedFunc = debounce(func, 100);

      debouncedFunc('arg1', 'arg2');
      clock.tick(100);

      expect(func.calledWith('arg1', 'arg2')).to.equal(true);
    });

    it('should cancel pending invocation', () => {
      const func = sinon.spy();
      const debouncedFunc = debounce(func, 100);

      debouncedFunc();
      clock.tick(50);
      debouncedFunc.cancel();
      clock.tick(100);

      expect(func.called).to.equal(false);
    });

    it('should only call function once for rapid calls', () => {
      const func = sinon.spy();
      const debouncedFunc = debounce(func, 100);

      debouncedFunc();
      debouncedFunc();
      debouncedFunc();
      debouncedFunc();
      debouncedFunc();

      clock.tick(100);
      expect(func.calledOnce).to.equal(true);
    });
  });

  describe('throttle', () => {
    it('should call function immediately on first call', () => {
      const func = sinon.spy();
      const throttledFunc = throttle(func, 100);

      throttledFunc();
      expect(func.calledOnce).to.equal(true);
    });

    it('should throttle subsequent calls', () => {
      const func = sinon.spy();
      const throttledFunc = throttle(func, 100);

      throttledFunc();
      throttledFunc();
      throttledFunc();

      expect(func.calledOnce).to.equal(true);

      clock.tick(100);
      expect(func.calledTwice).to.equal(true);
    });

    it('should pass arguments to the function', () => {
      const func = sinon.spy();
      const throttledFunc = throttle(func, 100);

      throttledFunc('arg1', 'arg2');
      expect(func.calledWith('arg1', 'arg2')).to.equal(true);
    });

    it('should allow another call after wait period', () => {
      const func = sinon.spy();
      const throttledFunc = throttle(func, 100);

      throttledFunc();
      clock.tick(100);
      throttledFunc();

      expect(func.calledTwice).to.equal(true);
    });

    it('should cancel pending invocation', () => {
      const func = sinon.spy();
      const throttledFunc = throttle(func, 100);

      throttledFunc();
      throttledFunc(); // This should queue a trailing call
      expect(func.calledOnce).to.equal(true);

      throttledFunc.cancel();
      clock.tick(100);

      expect(func.calledOnce).to.equal(true); // Still just once, trailing was cancelled
    });
  });

  describe('preloadImage', () => {
    let originalImage: typeof Image;

    beforeEach(() => {
      originalImage = global.Image;
    });

    afterEach(() => {
      global.Image = originalImage;
    });

    it('should resolve when image loads successfully', async () => {
      let onloadCallback: (() => void) | null = null;

      // Mock Image constructor
      (global as any).Image = class MockImage {
        src = '';
        onload: (() => void) | null = null;
        onerror: ((error: any) => void) | null = null;

        constructor() {
          setTimeout(() => {
            onloadCallback = this.onload;
          }, 0);
        }
      };

      const promise = preloadImage('https://example.com/image.jpg');

      // Allow the constructor to run
      await clock.tickAsync(0);

      // Trigger onload
      if (onloadCallback) {
        onloadCallback();
      }

      const result = await promise;
      expect(result).to.be.instanceOf((global as any).Image);
    });

    it('should reject when image fails to load', async () => {
      let onerrorCallback: ((error: any) => void) | null = null;

      (global as any).Image = class MockImage {
        src = '';
        onload: (() => void) | null = null;
        onerror: ((error: any) => void) | null = null;

        constructor() {
          setTimeout(() => {
            onerrorCallback = this.onerror;
          }, 0);
        }
      };

      const promise = preloadImage('https://example.com/broken.jpg');

      await clock.tickAsync(0);

      if (onerrorCallback) {
        onerrorCallback(new Error('Load failed'));
      }

      try {
        await promise;
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect((error as Error).message).to.include('Failed to preload image');
      }
    });
  });

  describe('preloadImages', () => {
    let originalImage: typeof Image;
    let loadCallbacks: (() => void)[] = [];

    beforeEach(() => {
      originalImage = global.Image;
      loadCallbacks = [];

      (global as any).Image = class MockImage {
        src = '';
        onload: (() => void) | null = null;
        onerror: ((error: any) => void) | null = null;

        constructor() {
          const self = this;
          setTimeout(() => {
            if (self.onload) {
              loadCallbacks.push(self.onload);
            }
          }, 0);
        }
      };
    });

    afterEach(() => {
      global.Image = originalImage;
    });

    it('should preload multiple images in parallel', async () => {
      const sources = [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg',
        'https://example.com/image3.jpg',
      ];

      const promise = preloadImages(sources);

      await clock.tickAsync(0);

      // Trigger all onload callbacks
      loadCallbacks.forEach((callback) => callback());

      const results = await promise;
      expect(results).to.have.length(3);
    });
  });

  describe('prefersReducedMotion', () => {
    let originalMatchMedia: typeof window.matchMedia;

    beforeEach(() => {
      originalMatchMedia = window.matchMedia;
    });

    afterEach(() => {
      window.matchMedia = originalMatchMedia;
    });

    it('should return true when reduced motion is preferred', () => {
      window.matchMedia = sinon.stub().returns({
        matches: true,
        media: '(prefers-reduced-motion: reduce)',
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => true,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
      });

      expect(prefersReducedMotion()).to.equal(true);
    });

    it('should return false when reduced motion is not preferred', () => {
      window.matchMedia = sinon.stub().returns({
        matches: false,
        media: '(prefers-reduced-motion: reduce)',
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => true,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
      });

      expect(prefersReducedMotion()).to.equal(false);
    });
  });
});
