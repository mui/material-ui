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

  it('accepts null', () => {
    expect(getSlotDefaultError('null', location)).to.equal(null);
  });

  it('accepts free text', () => {
    expect(
      getSlotDefaultError('DateField or TimeField, depending on the Picker.', location),
    ).to.equal(null);
  });

  it('fails without a default', () => {
    expect(getSlotDefaultError(undefined, location)).to.match(/has no `@default`/);
    expect(getSlotDefaultError(' ', location)).to.match(/has no `@default`/);
  });

  it('fails on undefined', () => {
    expect(getSlotDefaultError('undefined', location)).to.contain('`@default null`');
  });

  it('fails on an HTML tag that is not in single quotes', () => {
    ['span', '"span"', '`span`', '<span>', '<span />'].forEach((value) => {
      expect(getSlotDefaultError(value, location)).to.contain("`@default 'span'`");
    });
  });

  it('fails on a wrapped null', () => {
    expect(getSlotDefaultError('`null`', location)).to.contain('`@default null`');
  });
});
