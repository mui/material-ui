import { expect } from 'chai';
import sinon from 'sinon';
import { renderHook } from '@testing-library/react';
import useSelect from './useSelect';

describe('useSelect', () => {
  describe('param: options', () => {
    it('lets define options explicitly', () => {
      const options = [
        { value: 'a', label: 'A' },
        { value: 'b', label: 'B' },
        { value: 'c', label: 'C', disabled: true },
      ];

      const { result } = renderHook(() => useSelect({ options }));

      expect(result.current.options).to.deep.equal(['a', 'b', 'c']);
      expect(result.current.getOptionMetadata('a')?.label).to.equal('A');
      expect(result.current.getOptionMetadata('b')?.label).to.equal('B');
      expect(result.current.getOptionMetadata('c')?.label).to.equal('C');
      expect(result.current.getOptionMetadata('c')?.disabled).to.equal(true);
    });
  });

  describe('getHiddenInputProps', () => {
    it('returns props for hidden input', () => {
      const options = [
        { value: 'a', label: 'A' },
        { value: 'b', label: 'B' },
        { value: 'c', label: 'C', disabled: true },
      ];

      const { result } = renderHook(() =>
        useSelect({ options, defaultValue: 'b', name: 'foo', required: true }),
      );

      sinon.assert.match(result.current.getHiddenInputProps(), {
        name: 'foo',
        tabIndex: -1,
        'aria-hidden': true,
        required: true,
        value: 'b',
        style: {
          clip: 'rect(1px, 1px, 1px, 1px)',
          clipPath: 'inset(50%)',
          height: '1px',
          width: '1px',
          margin: '-1px',
          overflow: 'hidden',
          padding: 0,
          position: 'absolute',
          left: '50%',
          bottom: 0,
        },
      });
    });

    it('[multiple] returns correct value for the hidden input', () => {
      const options = [
        { value: 'a', label: 'A' },
        { value: 'b', label: 'B' },
        { value: 'c', label: 'C', disabled: true },
      ];

      const { result } = renderHook(() =>
        useSelect({
          multiple: true,
          options,
          defaultValue: ['a', 'b'],
          name: 'foo',
          required: true,
        }),
      );

      sinon.assert.match(result.current.getHiddenInputProps(), {
        name: 'foo',
        tabIndex: -1,
        'aria-hidden': true,
        required: true,
        value: JSON.stringify(['a', 'b']),
      });
    });

    it('[multiple with object value] returns correct value for the hidden input', () => {
      const options = [
        { value: { name: 'a' }, label: 'A' },
        { value: { name: 'b' }, label: 'B' },
        { value: { name: 'c' }, label: 'C', disabled: true },
      ];

      const { result } = renderHook(() =>
        useSelect<{ name: string }, true>({
          multiple: true,
          options,
          areOptionsEqual: (a, b) => a.name === b.name,
          defaultValue: [{ name: 'a' }, { name: 'b' }],
          name: 'foo',
          required: true,
        }),
      );

      sinon.assert.match(result.current.getHiddenInputProps(), {
        name: 'foo',
        tabIndex: -1,
        'aria-hidden': true,
        required: true,
        value: JSON.stringify([{ name: 'a' }, { name: 'b' }]),
      });
    });
  });
});
