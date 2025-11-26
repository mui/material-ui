import { expect } from 'chai';
import {
  calculateDistance,
  calculateVelocity,
  getSwipeDirection,
  shouldPreventScroll,
  isValidSwipe,
  MIN_SWIPE_DISTANCE,
  SWIPE_VELOCITY_THRESHOLD,
} from './gestureHelpers';

describe('gestureHelpers', () => {
  describe('calculateDistance', () => {
    it('should return positive distance for rightward movement', () => {
      expect(calculateDistance(0, 100)).to.equal(100);
    });

    it('should return negative distance for leftward movement', () => {
      expect(calculateDistance(100, 0)).to.equal(-100);
    });

    it('should return 0 for no movement', () => {
      expect(calculateDistance(50, 50)).to.equal(0);
    });

    it('should handle negative coordinates', () => {
      expect(calculateDistance(-50, 50)).to.equal(100);
      expect(calculateDistance(50, -50)).to.equal(-100);
    });
  });

  describe('calculateVelocity', () => {
    it('should return correct velocity in px/ms', () => {
      expect(calculateVelocity(100, 200)).to.equal(0.5);
      expect(calculateVelocity(200, 100)).to.equal(2);
    });

    it('should return absolute velocity for negative distance', () => {
      expect(calculateVelocity(-100, 200)).to.equal(0.5);
    });

    it('should return 0 for zero duration', () => {
      expect(calculateVelocity(100, 0)).to.equal(0);
    });

    it('should return 0 for negative duration', () => {
      expect(calculateVelocity(100, -50)).to.equal(0);
    });
  });

  describe('getSwipeDirection', () => {
    it('should return "none" for small movements', () => {
      expect(getSwipeDirection(5, 5)).to.equal('none');
      expect(getSwipeDirection(0, 0)).to.equal('none');
    });

    it('should return "horizontal" for horizontal movement', () => {
      expect(getSwipeDirection(50, 10)).to.equal('horizontal');
      expect(getSwipeDirection(-50, 10)).to.equal('horizontal');
    });

    it('should return "vertical" for vertical movement', () => {
      expect(getSwipeDirection(10, 50)).to.equal('vertical');
      expect(getSwipeDirection(10, -50)).to.equal('vertical');
    });

    it('should return "none" for equal diagonal movement', () => {
      expect(getSwipeDirection(30, 30)).to.equal('none');
    });

    it('should handle boundary case at minimum movement threshold', () => {
      // Minimum movement is 10px
      expect(getSwipeDirection(11, 5)).to.equal('horizontal');
      expect(getSwipeDirection(5, 11)).to.equal('vertical');
    });
  });

  describe('shouldPreventScroll', () => {
    it('should return true for horizontal gestures', () => {
      expect(shouldPreventScroll(50, 10)).to.equal(true);
      expect(shouldPreventScroll(-50, 10)).to.equal(true);
    });

    it('should return false for vertical gestures', () => {
      expect(shouldPreventScroll(10, 50)).to.equal(false);
    });

    it('should return false for small movements', () => {
      expect(shouldPreventScroll(5, 5)).to.equal(false);
    });
  });

  describe('isValidSwipe', () => {
    it('should return true when distance exceeds threshold', () => {
      expect(isValidSwipe(MIN_SWIPE_DISTANCE + 10, 0)).to.equal(true);
      expect(isValidSwipe(-(MIN_SWIPE_DISTANCE + 10), 0)).to.equal(true);
    });

    it('should return true when velocity exceeds threshold', () => {
      expect(isValidSwipe(20, SWIPE_VELOCITY_THRESHOLD + 0.1)).to.equal(true);
    });

    it('should return false when neither threshold is met', () => {
      expect(isValidSwipe(10, 0.1)).to.equal(false);
    });

    it('should use custom thresholds when provided', () => {
      // Custom distance threshold of 100
      expect(isValidSwipe(80, 0, 100, 1)).to.equal(false);
      expect(isValidSwipe(110, 0, 100, 1)).to.equal(true);

      // Custom velocity threshold of 1.0
      expect(isValidSwipe(10, 0.5, 100, 1)).to.equal(false);
      expect(isValidSwipe(10, 1.5, 100, 1)).to.equal(true);
    });

    it('should return true at exact threshold', () => {
      expect(isValidSwipe(MIN_SWIPE_DISTANCE, 0)).to.equal(true);
      expect(isValidSwipe(0, SWIPE_VELOCITY_THRESHOLD)).to.equal(true);
    });
  });

  describe('constants', () => {
    it('should export MIN_SWIPE_DISTANCE', () => {
      expect(MIN_SWIPE_DISTANCE).to.be.a('number');
      expect(MIN_SWIPE_DISTANCE).to.be.greaterThan(0);
    });

    it('should export SWIPE_VELOCITY_THRESHOLD', () => {
      expect(SWIPE_VELOCITY_THRESHOLD).to.be.a('number');
      expect(SWIPE_VELOCITY_THRESHOLD).to.be.greaterThan(0);
    });
  });
});
