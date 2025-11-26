import { expect } from 'chai';
import * as React from 'react';
import {
  clampIndex,
  wrapIndex,
  normalizeSpacing,
  getValidChildren,
  isInteractiveElement,
  calculateSlideWidth,
  calculateTransformOffset,
} from './carouselHelpers';

describe('carouselHelpers', () => {
  describe('clampIndex', () => {
    it('should return the index if within bounds', () => {
      expect(clampIndex(2, 0, 5)).to.equal(2);
    });

    it('should return min if index is below min', () => {
      expect(clampIndex(-1, 0, 5)).to.equal(0);
    });

    it('should return max if index is above max', () => {
      expect(clampIndex(10, 0, 5)).to.equal(5);
    });

    it('should handle edge case when min equals max', () => {
      expect(clampIndex(5, 3, 3)).to.equal(3);
    });

    it('should handle zero bounds', () => {
      expect(clampIndex(0, 0, 0)).to.equal(0);
    });
  });

  describe('wrapIndex', () => {
    it('should return index if within bounds', () => {
      expect(wrapIndex(2, 5)).to.equal(2);
    });

    it('should wrap positive overflow', () => {
      expect(wrapIndex(5, 5)).to.equal(0);
      expect(wrapIndex(6, 5)).to.equal(1);
      expect(wrapIndex(10, 5)).to.equal(0);
    });

    it('should wrap negative index', () => {
      expect(wrapIndex(-1, 5)).to.equal(4);
      expect(wrapIndex(-2, 5)).to.equal(3);
      expect(wrapIndex(-5, 5)).to.equal(0);
    });

    it('should return 0 for count <= 0', () => {
      expect(wrapIndex(3, 0)).to.equal(0);
      expect(wrapIndex(3, -1)).to.equal(0);
    });

    it('should handle large indices', () => {
      expect(wrapIndex(100, 7)).to.equal(2);
    });
  });

  describe('normalizeSpacing', () => {
    it('should return "0px" for undefined', () => {
      expect(normalizeSpacing(undefined)).to.equal('0px');
    });

    it('should return "0px" for 0', () => {
      expect(normalizeSpacing(0)).to.equal('0px');
    });

    it('should convert number to px string', () => {
      expect(normalizeSpacing(10)).to.equal('10px');
      expect(normalizeSpacing(24)).to.equal('24px');
    });

    it('should pass through string values', () => {
      expect(normalizeSpacing('1rem')).to.equal('1rem');
      expect(normalizeSpacing('10%')).to.equal('10%');
      expect(normalizeSpacing('calc(10px + 1rem)')).to.equal('calc(10px + 1rem)');
    });
  });

  describe('getValidChildren', () => {
    it('should filter out null and undefined', () => {
      const children = [
        React.createElement('div', { key: '1' }),
        null,
        React.createElement('span', { key: '2' }),
        undefined,
      ];
      const result = getValidChildren(children);
      expect(result).to.have.length(2);
    });

    it('should filter out strings and numbers', () => {
      const children = [
        React.createElement('div', { key: '1' }),
        'text',
        123,
        React.createElement('span', { key: '2' }),
      ];
      const result = getValidChildren(children);
      expect(result).to.have.length(2);
    });

    it('should return empty array for no valid children', () => {
      const result = getValidChildren([null, undefined, 'text']);
      expect(result).to.have.length(0);
    });

    it('should handle single child', () => {
      const child = React.createElement('div', { key: '1' });
      const result = getValidChildren(child);
      expect(result).to.have.length(1);
    });
  });

  describe('isInteractiveElement', () => {
    let container: HTMLDivElement;

    beforeEach(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
    });

    afterEach(() => {
      document.body.removeChild(container);
    });

    it('should return false for null', () => {
      expect(isInteractiveElement(null)).to.equal(false);
    });

    it('should return true for button', () => {
      const button = document.createElement('button');
      container.appendChild(button);
      expect(isInteractiveElement(button)).to.equal(true);
    });

    it('should return true for input', () => {
      const input = document.createElement('input');
      container.appendChild(input);
      expect(isInteractiveElement(input)).to.equal(true);
    });

    it('should return true for select', () => {
      const select = document.createElement('select');
      container.appendChild(select);
      expect(isInteractiveElement(select)).to.equal(true);
    });

    it('should return true for textarea', () => {
      const textarea = document.createElement('textarea');
      container.appendChild(textarea);
      expect(isInteractiveElement(textarea)).to.equal(true);
    });

    it('should return true for anchor', () => {
      const anchor = document.createElement('a');
      container.appendChild(anchor);
      expect(isInteractiveElement(anchor)).to.equal(true);
    });

    it('should return true for video', () => {
      const video = document.createElement('video');
      container.appendChild(video);
      expect(isInteractiveElement(video)).to.equal(true);
    });

    it('should return true for audio', () => {
      const audio = document.createElement('audio');
      container.appendChild(audio);
      expect(isInteractiveElement(audio)).to.equal(true);
    });

    it('should return true for elements with interactive roles', () => {
      const div = document.createElement('div');
      div.setAttribute('role', 'button');
      container.appendChild(div);
      expect(isInteractiveElement(div)).to.equal(true);
    });

    it('should return true for contenteditable', () => {
      const div = document.createElement('div');
      div.setAttribute('contenteditable', 'true');
      container.appendChild(div);
      expect(isInteractiveElement(div)).to.equal(true);
    });

    it('should return false for non-interactive div', () => {
      const div = document.createElement('div');
      container.appendChild(div);
      expect(isInteractiveElement(div)).to.equal(false);
    });
  });

  describe('calculateSlideWidth', () => {
    it('should return 100% for slidesPerView 1 without spacing', () => {
      expect(calculateSlideWidth(1, undefined)).to.equal('100%');
      expect(calculateSlideWidth(1, 0)).to.equal('100%');
    });

    it('should return percentage for multiple slides without spacing', () => {
      expect(calculateSlideWidth(2, 0)).to.equal('50%');
      expect(calculateSlideWidth(3, 0)).to.equal(`${100 / 3}%`);
      expect(calculateSlideWidth(4, 0)).to.equal('25%');
    });

    it('should return calc expression with spacing', () => {
      const result = calculateSlideWidth(2, 16);
      expect(result).to.include('calc');
      expect(result).to.include('16px');
    });

    it('should handle string spacing', () => {
      const result = calculateSlideWidth(3, '1rem');
      expect(result).to.include('calc');
      expect(result).to.include('1rem');
    });
  });

  describe('calculateTransformOffset', () => {
    it('should return translateX(0%) for index 0 without spacing', () => {
      expect(calculateTransformOffset(0, 1, undefined)).to.equal('translateX(0%)');
    });

    it('should return correct translateX for index with single slide view', () => {
      expect(calculateTransformOffset(1, 1, 0)).to.equal('translateX(-100%)');
      expect(calculateTransformOffset(2, 1, 0)).to.equal('translateX(-200%)');
    });

    it('should return calc expression for multiple slides per view', () => {
      const result = calculateTransformOffset(1, 2, 0);
      expect(result).to.include('translateX');
      expect(result).to.include('calc');
    });

    it('should include spacing in calculation', () => {
      const result = calculateTransformOffset(1, 2, 16);
      expect(result).to.include('translateX');
      expect(result).to.include('calc');
      expect(result).to.include('16px');
    });
  });
});
