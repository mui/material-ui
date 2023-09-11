import { expect } from 'chai';
import { clamp, isNumber } from './utils';

describe('utils', () => {
  it('clamp: clamps a value based on min and max', () => {
    expect(clamp(1, 2, 4)).to.equal(2);
    expect(clamp(5, 2, 4)).to.equal(4);
    expect(clamp(-5, -1, 5)).to.equal(-1);
  });

  it('clamp: clamps a value between min and max and on a valid step', () => {
    expect(clamp(2, -15, 15, 3)).to.equal(3);
    expect(clamp(-1, -15, 15, 3)).to.equal(0);
    expect(clamp(5, -15, 15, 3)).to.equal(6);
    expect(clamp(-5, -15, 15, 3)).to.equal(-6);
    expect(clamp(-55, -15, 15, 3)).to.equal(-15);
    expect(clamp(57, -15, 15, 3)).to.equal(15);
    expect(clamp(3, -20, 20, 5)).to.equal(5);
    expect(clamp(2, -20, 20, 5)).to.equal(0);
    expect(clamp(8, -20, 20, 5)).to.equal(10);
    expect(clamp(-7, -20, 20, 5)).to.equal(-5);
  });

  it('isNumber: rejects NaN', () => {
    expect(isNumber(NaN)).to.equal(false);
  });

  it('isNumber: rejects Infinity', () => {
    expect(isNumber(Infinity)).to.equal(false);
    expect(isNumber(-Infinity)).to.equal(false);
  });

  it('isNumber: rejects falsy values', () => {
    expect(isNumber('')).to.equal(false);
    expect(isNumber(undefined)).to.equal(false);
    expect(isNumber(null)).to.equal(false);
  });

  it('isNumber: accepts positive and negative integers', () => {
    expect(isNumber(10)).to.equal(true);
    expect(isNumber(7)).to.equal(true);
    expect(isNumber(-20)).to.equal(true);
    expect(isNumber(-333)).to.equal(true);
  });

  it('isNumber: accepts 0', () => {
    expect(isNumber(0)).to.equal(true);
    expect(isNumber(-0)).to.equal(true);
  });
});
