import {withShallow} from 'src/utils/recompose';
import {assert} from 'chai';

describe('utils/recompose - withShallow()', () => {
  it('creates a function', () => {
    assert.strictEqual(typeof withShallow(), 'function', 'should be a function');
  });

  it('returns false if props pass a shallow comparison test', () => {
    const props = {title: 'hello', hint: 'world'};
    const nextProps = {title: 'hello', hint: 'world'};
    assert.strictEqual(withShallow()(props, nextProps), false);
  });

  it('returns true if props fail a shallow comparison test', () => {
    const props = {title: 'hello', hint: 'world'};
    const nextProps = {title: 'goodbye', hint: 'world'};
    assert.strictEqual(withShallow()(props, nextProps), true);
  });

  it('allows the user to specify props that should be individually shallow compared', () => {
    const styleA = {foo: 'bar'};
    const styleB = {woof: 'meow'};
    const props = {title: 'hello', style: Object.assign({}, styleA, styleB)};
    const nextProps = {title: 'hello', style: {foo: 'bar', woof: 'meow'}};
    const nextPropsAlt = {title: 'hello', style: {foo: 'bar', woof: 'ROAR'}};
    const nextPropsAlt2 = {title: 'goodbye', style: {foo: 'bar', woof: 'meow'}};

    assert.strictEqual(withShallow()(props, nextProps), true, 'should return true');
    assert.strictEqual(withShallow('style')(props, nextProps), false, 'should return false');
    assert.strictEqual(withShallow('style')(props, nextPropsAlt), true, 'should return true');
    assert.strictEqual(withShallow('style')(props, nextPropsAlt2), true, 'should return true');
  });
});
