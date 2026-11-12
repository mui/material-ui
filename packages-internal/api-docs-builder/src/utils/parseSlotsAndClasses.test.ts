import { describe, it, expect } from 'vitest';
import { getSlotDefaultError } from './parseSlotsAndClasses';

const location = 'the `ThingSlots` interface';

describe('getSlotDefaultError', () => {
  it('accepts a component', () => {
    expect(getSlotDefaultError('Paper', location)).to.equal(null);
  });

  it('accepts a quoted HTML tag', () => {
    expect(getSlotDefaultError("'div'", location)).to.equal(null);
  });

  it('fails without a default', () => {
    expect(getSlotDefaultError(undefined, location)).to.match(/has no `@default`/);
    expect(getSlotDefaultError(' ', location)).to.match(/has no `@default`/);
  });

  it('fails on an unquoted HTML tag', () => {
    expect(getSlotDefaultError('span', location)).to.contain("`@default 'span'`");
  });

  it('fails on a double-quoted HTML tag', () => {
    expect(getSlotDefaultError('"span"', location)).to.contain("`@default 'span'`");
  });

  it('accepts null', () => {
    expect(getSlotDefaultError('null', location)).to.equal(null);
  });
});
