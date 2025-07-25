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

  it('merge components and componentsProps props', () => {
    expect(
      resolveProps(
        { components: { Input: 'Input' }, componentsProps: { input: { className: 'input' } } },
        {
          components: { Root: 'Root' },
          componentsProps: { root: { className: 'root' }, input: { style: { color: 'red' } } },
        },
      ),
    ).to.deep.equal({
      components: { Root: 'Root', Input: 'Input' },
      componentsProps: {
        root: { className: 'root' },
        input: { className: 'input', style: { color: 'red' } },
      },
    });
  });

  it('merge slots and slotProps props', () => {
    expect(
      resolveProps(
        { slots: { input: 'input' }, slotProps: { input: { className: 'input' } } },
        {
          slots: { root: 'root' },
          slotProps: { root: { className: 'root' }, input: { style: { color: 'red' } } },
        },
      ),
    ).to.deep.equal({
      slots: { root: 'root', input: 'input' },
      slotProps: {
        root: { className: 'root' },
        input: { className: 'input', style: { color: 'red' } },
      },
    });
  });

  it('should not merge props that are not intended', () => {
    expect(
      resolveProps(
        { notTheSlotProps: { style: { color: 'red' } } },
        { notTheSlotProps: { className: 'input' } },
      ),
    ).to.deep.equal({
      notTheSlotProps: { className: 'input' },
    });
  });

  describe('param: mergeClassNameAndStyle', () => {
    it('merge className and style props', () => {
      expect(
        resolveProps(
          { className: 'input1', style: { color: 'red' } },
          { className: 'input2', style: { backgroundColor: 'blue' } },
          true,
        ),
      ).to.deep.equal({
        className: 'input1 input2',
        style: { color: 'red', backgroundColor: 'blue' },
      });
    });

    it('merge className props', () => {
      expect(resolveProps({ className: 'input1' }, { className: 'input2' }, true)).to.deep.equal({
        className: 'input1 input2',
      });

      expect(resolveProps({ className: 'input1' }, {}, true)).to.deep.equal({
        className: 'input1',
      });

      expect(resolveProps({}, { className: 'input2' }, true)).to.deep.equal({
        className: 'input2',
      });
    });

    it('merge style props', () => {
      expect(
        resolveProps({ style: { color: 'red' } }, { style: { backgroundColor: 'blue' } }, true),
      ).to.deep.equal({
        style: { color: 'red', backgroundColor: 'blue' },
      });

      expect(resolveProps({ style: { color: 'red' } }, {}, true)).to.deep.equal({
        style: { color: 'red' },
      });

      expect(resolveProps({}, { style: { backgroundColor: 'blue' } }, true)).to.deep.equal({
        style: { backgroundColor: 'blue' },
      });
    });
  });
});
