import { assert } from 'chai';
import createBreakpoints from './createBreakpoints';

describe('createBreakpoints', () => {
  const breakpoints = createBreakpoints({});

  describe('up', () => {
    it('should work for xs', () => {
      assert.strictEqual(breakpoints.up('xs'), '@media (min-width:0px)');
    });

    it('should work for md', () => {
      assert.strictEqual(breakpoints.up('md'), '@media (min-width:960px)');
    });
  });

  describe('down', () => {
    it('should work', () => {
      assert.strictEqual(breakpoints.down('sm'), '@media (max-width:959.95px)');
    });

    it('should work for md', () => {
      assert.strictEqual(breakpoints.down('md'), '@media (max-width:1279.95px)');
    });

    it('should use the specified key if it is not a recognized breakpoint', () => {
      assert.strictEqual(breakpoints.down(600), '@media (max-width:599.95px)');
    });

    it('should apply to all sizes for xl', () => {
      assert.strictEqual(breakpoints.down('xl'), '@media (min-width:0px)');
    });
  });

  describe('between', () => {
    it('should work', () => {
      assert.strictEqual(
        breakpoints.between('sm', 'md'),
        '@media (min-width:600px) and (max-width:1279.95px)',
      );
    });

    it('on xl should call up', () => {
      assert.strictEqual(breakpoints.between('lg', 'xl'), '@media (min-width:1280px)');
    });
  });

  describe('only', () => {
    it('should work', () => {
      assert.strictEqual(
        breakpoints.only('md'),
        '@media (min-width:960px) and (max-width:1279.95px)',
      );
    });

    it('on xl should call up', () => {
      assert.strictEqual(breakpoints.only('xl'), '@media (min-width:1920px)');
    });
  });

  describe('width', () => {
    it('should work', () => {
      assert.strictEqual(breakpoints.width('md'), 960);
    });
  });
});
