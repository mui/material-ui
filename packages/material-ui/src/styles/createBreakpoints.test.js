import { expect } from 'chai';
import createBreakpoints from './createBreakpoints';

describe('createBreakpoints', () => {
  const breakpoints = createBreakpoints({});

  describe('up', () => {
    it('should work for xs', () => {
      expect(breakpoints.up('xs')).to.equal('@media (min-width:0px)');
    });

    it('should work for md', () => {
      expect(breakpoints.up('md')).to.equal('@media (min-width:960px)');
    });
  });

  describe('down', () => {
    it('should work', () => {
      expect(breakpoints.down('sm')).to.equal('@media (max-width:959.95px)');
    });

    it('should work for md', () => {
      expect(breakpoints.down('md')).to.equal('@media (max-width:1279.95px)');
    });

    it('should accept a number', () => {
      expect(breakpoints.down(600)).to.equal('@media (max-width:599.95px)');
    });

    it('should apply to all sizes for xl', () => {
      expect(breakpoints.down('xl')).to.equal('@media (min-width:0px)');
    });
  });

  describe('between', () => {
    it('should work', () => {
      expect(breakpoints.between('sm', 'md')).to.equal(
        '@media (min-width:600px) and (max-width:1279.95px)',
      );
    });

    it('should accept numbers', () => {
      expect(breakpoints.between(600, 800)).to.equal(
        '@media (min-width:600px) and (max-width:799.95px)',
      );
    });

    it('on xl should call up', () => {
      expect(breakpoints.between('lg', 'xl')).to.equal('@media (min-width:1280px)');
    });
  });

  describe('only', () => {
    it('should work', () => {
      expect(breakpoints.only('md')).to.equal('@media (min-width:960px) and (max-width:1279.95px)');
    });

    it('on xl should call up', () => {
      expect(breakpoints.only('xl')).to.equal('@media (min-width:1920px)');
    });
  });

  describe('width', () => {
    it('should work', () => {
      expect(breakpoints.width('md')).to.equal(960);
    });
  });
});
