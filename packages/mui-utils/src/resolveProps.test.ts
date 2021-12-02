import { expect } from 'chai';
import resolveProps from './resolveProps';

describe('resolveProps', () => {
  it('use default props if no props', () => {
    expect(resolveProps({ foo: 'foo' }, {})).to.deep.equal({
      foo: 'foo',
    });
  });

  it('use props if defined', () => {
    expect(resolveProps({ foo: 'foo' }, { foo: 'bar' })).to.deep.equal({
      foo: 'bar',
    });
  });

  it('merge extra props', () => {
    expect(resolveProps({ foo: 'foo' }, { foo: 'bar', bar: 'bar' })).to.deep.equal({
      foo: 'bar',
      bar: 'bar',
    });
  });

  it('use default props if prop value is undefined', () => {
    expect(resolveProps({ foo: 'foo' }, { foo: undefined })).to.deep.equal({
      foo: 'foo',
    });
  });

  it('use props if default value is undefined', () => {
    expect(resolveProps({ foo: undefined }, { foo: 'bar' })).to.deep.equal({
      foo: 'bar',
    });
  });

  it('null is a considered a valid value', () => {
    expect(resolveProps({ foo: 'foo' }, { foo: null })).to.deep.equal({
      foo: null,
    });
  });

  it('"" is a considered a valid value', () => {
    expect(resolveProps({ foo: 'foo' }, { foo: '' })).to.deep.equal({
      foo: '',
    });
  });
});
