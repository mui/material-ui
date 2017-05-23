// @flow

import { assert } from 'chai';
import createBreakpoints from './breakpoints';

describe('createBreakpoints', () => {
  let breakpoints;

  before(() => {
    breakpoints = createBreakpoints();
  });

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
      assert.strictEqual(breakpoints.down('md'), '@media (max-width:959.99px)');
    });
  });

  describe('between', () => {
    it('should work', () => {
      assert.strictEqual(
        breakpoints.between('sm', 'md'),
        '@media (min-width:600px) and (max-width:1279.99px)',
      );
    });
  });

  describe('only', () => {
    it('should work', () => {
      assert.strictEqual(
        breakpoints.only('md'),
        '@media (min-width:960px) and (max-width:1279.99px)',
      );
    });

    it('on xl should call up', () => {
      assert.strictEqual(breakpoints.only('xl'), '@media (min-width:1920px)');
    });
  });
});
