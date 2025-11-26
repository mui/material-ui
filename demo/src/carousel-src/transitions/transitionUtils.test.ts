import { expect } from 'chai';
import { reflow, shouldReduceMotion, getEffectiveDuration } from './transitionUtils';

describe('transitionUtils', () => {
  describe('reflow', () => {
    it('should access scrollTop to trigger reflow', () => {
      const node = document.createElement('div');
      document.body.appendChild(node);

      // This should not throw
      expect(() => reflow(node)).to.not.throw();

      document.body.removeChild(node);
    });
  });

  describe('shouldReduceMotion', () => {
    let originalMatchMedia: typeof window.matchMedia;

    beforeEach(() => {
      originalMatchMedia = window.matchMedia;
    });

    afterEach(() => {
      window.matchMedia = originalMatchMedia;
    });

    it('should return true when prefers-reduced-motion is reduce', () => {
      window.matchMedia = (query: string) =>
        ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: () => {},
          removeListener: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => false,
        }) as MediaQueryList;

      expect(shouldReduceMotion()).to.equal(true);
    });

    it('should return false when prefers-reduced-motion is not reduce', () => {
      window.matchMedia = (query: string) =>
        ({
          matches: false,
          media: query,
          onchange: null,
          addListener: () => {},
          removeListener: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => false,
        }) as MediaQueryList;

      expect(shouldReduceMotion()).to.equal(false);
    });
  });

  describe('getEffectiveDuration', () => {
    let originalMatchMedia: typeof window.matchMedia;

    beforeEach(() => {
      originalMatchMedia = window.matchMedia;
    });

    afterEach(() => {
      window.matchMedia = originalMatchMedia;
    });

    it('should return 0 when reduced motion is preferred', () => {
      window.matchMedia = (query: string) =>
        ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: () => {},
          removeListener: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => false,
        }) as MediaQueryList;

      expect(getEffectiveDuration(450)).to.equal(0);
      expect(getEffectiveDuration(1000)).to.equal(0);
    });

    it('should return original duration when reduced motion is not preferred', () => {
      window.matchMedia = (query: string) =>
        ({
          matches: false,
          media: query,
          onchange: null,
          addListener: () => {},
          removeListener: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => false,
        }) as MediaQueryList;

      expect(getEffectiveDuration(450)).to.equal(450);
      expect(getEffectiveDuration(1000)).to.equal(1000);
    });
  });
});
