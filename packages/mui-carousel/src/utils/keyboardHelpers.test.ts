import { expect } from 'chai';
import * as React from 'react';
import {
  isNavigationKey,
  getSlideIndexFromKey,
  getActionForKey,
  hasModifierKey,
  KeyboardAction,
} from './keyboardHelpers';

describe('keyboardHelpers', () => {
  describe('isNavigationKey', () => {
    it('should return true for arrow keys', () => {
      expect(isNavigationKey('ArrowLeft')).to.equal(true);
      expect(isNavigationKey('ArrowRight')).to.equal(true);
    });

    it('should return true for Home and End keys', () => {
      expect(isNavigationKey('Home')).to.equal(true);
      expect(isNavigationKey('End')).to.equal(true);
    });

    it('should return true for Escape key', () => {
      expect(isNavigationKey('Escape')).to.equal(true);
    });

    it('should return true for number keys 1-9', () => {
      for (let i = 1; i <= 9; i++) {
        expect(isNavigationKey(String(i))).to.equal(true);
      }
    });

    it('should return false for non-navigation keys', () => {
      expect(isNavigationKey('a')).to.equal(false);
      expect(isNavigationKey('Enter')).to.equal(false);
      expect(isNavigationKey('Tab')).to.equal(false);
      expect(isNavigationKey('0')).to.equal(false);
      expect(isNavigationKey('ArrowUp')).to.equal(false);
      expect(isNavigationKey('ArrowDown')).to.equal(false);
    });
  });

  describe('getSlideIndexFromKey', () => {
    it('should convert number keys to 0-based indices', () => {
      expect(getSlideIndexFromKey('1', 10)).to.equal(0);
      expect(getSlideIndexFromKey('5', 10)).to.equal(4);
      expect(getSlideIndexFromKey('9', 10)).to.equal(8);
    });

    it('should return null for keys beyond slide count', () => {
      expect(getSlideIndexFromKey('5', 3)).to.equal(null);
      expect(getSlideIndexFromKey('9', 5)).to.equal(null);
    });

    it('should return null for non-number keys', () => {
      expect(getSlideIndexFromKey('a', 10)).to.equal(null);
      expect(getSlideIndexFromKey('Enter', 10)).to.equal(null);
    });

    it('should return null for 0', () => {
      expect(getSlideIndexFromKey('0', 10)).to.equal(null);
    });

    it('should handle edge case at exact slide count', () => {
      // Key '3' = index 2, valid for slideCount 3 (indices 0, 1, 2)
      expect(getSlideIndexFromKey('3', 3)).to.equal(2);
      // Key '4' = index 3, invalid for slideCount 3
      expect(getSlideIndexFromKey('4', 3)).to.equal(null);
    });
  });

  describe('getActionForKey', () => {
    describe('LTR mode', () => {
      it('should return "previous" for ArrowLeft', () => {
        expect(getActionForKey('ArrowLeft', false, 5)).to.equal('previous');
      });

      it('should return "next" for ArrowRight', () => {
        expect(getActionForKey('ArrowRight', false, 5)).to.equal('next');
      });
    });

    describe('RTL mode', () => {
      it('should return "next" for ArrowLeft in RTL', () => {
        expect(getActionForKey('ArrowLeft', true, 5)).to.equal('next');
      });

      it('should return "previous" for ArrowRight in RTL', () => {
        expect(getActionForKey('ArrowRight', true, 5)).to.equal('previous');
      });
    });

    it('should return "first" for Home key', () => {
      expect(getActionForKey('Home', false, 5)).to.equal('first');
      expect(getActionForKey('Home', true, 5)).to.equal('first');
    });

    it('should return "last" for End key', () => {
      expect(getActionForKey('End', false, 5)).to.equal('last');
      expect(getActionForKey('End', true, 5)).to.equal('last');
    });

    it('should return "pause" for Escape key', () => {
      expect(getActionForKey('Escape', false, 5)).to.equal('pause');
      expect(getActionForKey('Escape', true, 5)).to.equal('pause');
    });

    it('should return goToSlide action for valid number keys', () => {
      const action = getActionForKey('3', false, 5) as { type: string; index: number };
      expect(action).to.deep.equal({ type: 'goToSlide', index: 2 });
    });

    it('should return null for number keys beyond slide count', () => {
      expect(getActionForKey('9', false, 3)).to.equal(null);
    });

    it('should return null for unhandled keys', () => {
      expect(getActionForKey('Enter', false, 5)).to.equal(null);
      expect(getActionForKey('Tab', false, 5)).to.equal(null);
      expect(getActionForKey('a', false, 5)).to.equal(null);
    });
  });

  describe('hasModifierKey', () => {
    const createKeyboardEvent = (modifiers: Partial<{
      ctrlKey: boolean;
      altKey: boolean;
      metaKey: boolean;
      shiftKey: boolean;
    }> = {}): React.KeyboardEvent => {
      return {
        ctrlKey: modifiers.ctrlKey ?? false,
        altKey: modifiers.altKey ?? false,
        metaKey: modifiers.metaKey ?? false,
        shiftKey: modifiers.shiftKey ?? false,
      } as React.KeyboardEvent;
    };

    it('should return false when no modifiers are pressed', () => {
      expect(hasModifierKey(createKeyboardEvent())).to.equal(false);
    });

    it('should return true when Ctrl is pressed', () => {
      expect(hasModifierKey(createKeyboardEvent({ ctrlKey: true }))).to.equal(true);
    });

    it('should return true when Alt is pressed', () => {
      expect(hasModifierKey(createKeyboardEvent({ altKey: true }))).to.equal(true);
    });

    it('should return true when Meta is pressed', () => {
      expect(hasModifierKey(createKeyboardEvent({ metaKey: true }))).to.equal(true);
    });

    it('should return true when Shift is pressed', () => {
      expect(hasModifierKey(createKeyboardEvent({ shiftKey: true }))).to.equal(true);
    });

    it('should return true when multiple modifiers are pressed', () => {
      expect(hasModifierKey(createKeyboardEvent({ ctrlKey: true, shiftKey: true }))).to.equal(true);
    });
  });
});
