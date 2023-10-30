import { expect } from 'chai';
import sinon from 'sinon';
import { act, renderHook } from '@testing-library/react';
import { useSelect } from './useSelect';
import { SelectActionTypes } from './useSelect.types';
import { FocusManagementType } from '../useList';

const focusManagementTypes: FocusManagementType[] = ['activeDescendant', 'DOM'];

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

  describe('param: focusManagement', () => {
    describe('activeDescendant', () => {
      it('sets correct props on the trigger element', () => {
        const options = [
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' },
        ];

        const { result } = renderHook(() =>
          useSelect({ options, value: 'a', focusManagement: 'activeDescendant' }),
        );

        const { dispatch } = result.current;

        act(() => {
          // @ts-ignore
          dispatch({ type: SelectActionTypes.buttonClick });
        });

        const { getButtonProps, getOptionMetadata } = result.current;

        const buttonProps = getButtonProps();
        const { tabIndex: buttonTabIndex, 'aria-activedescendant': buttonActiveDescendant } =
          buttonProps;

        expect(buttonTabIndex).to.eq(0);
        expect(buttonActiveDescendant).to.eq(getOptionMetadata('a')?.id);
      });

      it('sets correct props on the listbox element', () => {
        const options = [
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' },
        ];

        const { result } = renderHook(() =>
          useSelect({ options, value: 'a', focusManagement: 'activeDescendant' }),
        );

        const { dispatch } = result.current;

        act(() => {
          // @ts-ignore
          dispatch({ type: SelectActionTypes.buttonClick });
        });

        const { getListboxProps } = result.current;

        const listboxProps = getListboxProps();
        const { tabIndex: listboxTabIndex } = listboxProps;
        // @ts-expect-error aria-activedescendant should not be included
        const { 'aria-activedescendant': listboxActiveDescendant } = listboxProps;

        expect(listboxTabIndex).to.eq(undefined);
        expect(listboxActiveDescendant).to.eq(undefined);
      });
    });

    describe('DOM', () => {
      it('sets correct props to the trigger element', () => {
        const { result } = renderHook(() => useSelect({ focusManagement: 'DOM' }));

        const { dispatch } = result.current;

        act(() => {
          // @ts-ignore
          dispatch({ type: SelectActionTypes.buttonClick });
        });

        const { getButtonProps } = result.current;

        const buttonProps = getButtonProps();
        const { tabIndex: buttonTabIndex, 'aria-activedescendant': buttonActiveDescendant } =
          buttonProps;

        expect(buttonTabIndex).to.eq(undefined);
        expect(buttonActiveDescendant).to.eq(undefined);
      });

      it('sets correct props to the listbox element', () => {
        const { result } = renderHook(() => useSelect({ focusManagement: 'DOM' }));

        const { dispatch } = result.current;

        act(() => {
          // @ts-ignore
          dispatch({ type: SelectActionTypes.buttonClick });
        });

        const { getListboxProps } = result.current;

        const listboxProps = getListboxProps();
        const { tabIndex: listboxTabIndex } = listboxProps;
        // @ts-expect-error aria-activedescendant should not be included
        const { 'aria-activedescendant': listboxActiveDescendant } = listboxProps;

        expect(listboxTabIndex).to.eq(-1);
        expect(listboxActiveDescendant).to.eq(undefined);
      });
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

    describe('onChange handler', () => {
      it('calls external onChange handler', () => {
        const externalOnChangeSpy = sinon.spy();

        const { result } = renderHook(() => useSelect({}));

        const { getHiddenInputProps } = result.current;
        const { onChange: hiddenInputOnChange } = getHiddenInputProps({
          onChange: externalOnChangeSpy,
        });

        // @ts-ignore We only need the target value for this test
        hiddenInputOnChange({ target: { value: 'foo' } });
        expect(externalOnChangeSpy.calledOnce).to.equal(true);
        expect(externalOnChangeSpy.calledWith({ target: { value: 'foo' } })).to.equal(true);
      });
    });
  });

  describe('parameter: buttonRef', () => {
    focusManagementTypes.forEach((focusManagement) => {
      it(`merges buttonRef parameter with getButtonProps ref when focus management is ${focusManagement}`, () => {
        const buttonElement = document.createElement('button');
        const buttonRefSpy = sinon.spy();
        const { result } = renderHook(() =>
          useSelect({ buttonRef: buttonRefSpy, focusManagement }),
        );

        const { getButtonProps } = result.current;
        const { ref: propGetterRefCallback } = getButtonProps();

        expect(propGetterRefCallback).not.to.eq(null);

        act(() => {
          propGetterRefCallback?.(buttonElement);
        });

        expect(buttonRefSpy.calledOnce).to.equal(true);
        expect(buttonRefSpy.calledWith(buttonElement)).to.equal(true);
      });

      it(`merges buttonRef parameter with returned buttonRef when focus management is ${focusManagement}`, () => {
        const buttonElement = document.createElement('button');
        const buttonRefSpy = sinon.spy();
        const { result } = renderHook(() =>
          useSelect({ buttonRef: buttonRefSpy, focusManagement }),
        );

        const { buttonRef: returnedButtonRef } = result.current;

        expect(returnedButtonRef).not.to.eq(null);

        act(() => {
          returnedButtonRef?.(buttonElement);
        });

        expect(buttonRefSpy.calledOnce).to.equal(true);
        expect(buttonRefSpy.calledWith(buttonElement)).to.equal(true);
      });
    });

    it('merges buttonRef parameter with listboxRootRef when focus management is activeDescendant', () => {
      const buttonElement = document.createElement('button');
      const buttonRefSpy = sinon.spy();
      const { result } = renderHook(() =>
        useSelect({ buttonRef: buttonRefSpy, focusManagement: 'activeDescendant' }),
      );

      const { listboxRootRef } = result.current;

      expect(listboxRootRef).not.to.eq(null);

      act(() => {
        listboxRootRef?.(buttonElement);
      });

      expect(buttonRefSpy.calledOnce).to.equal(true);
      expect(buttonRefSpy.calledWith(buttonElement)).to.equal(true);
    });
  });

  describe('parameter: listboxRef', () => {
    focusManagementTypes.forEach((focusManagement) => {
      it(`merges listboxRef parameter with getListboxProps ref  when focus management is ${focusManagement}`, () => {
        const listboxElement = document.createElement('ul');
        const listboxRefSpy = sinon.spy();
        const { result } = renderHook(() =>
          useSelect({ listboxRef: listboxRefSpy, focusManagement }),
        );

        const { getListboxProps } = result.current;
        const { ref: propGetterRefCallback } = getListboxProps();

        expect(propGetterRefCallback).not.to.eq(null);

        act(() => {
          propGetterRefCallback?.(listboxElement);
        });

        expect(listboxRefSpy.calledOnce).to.equal(true);
        expect(listboxRefSpy.calledWith(listboxElement)).to.equal(true);
      });

      it(`merges listboxRef parameter with returned listboxRef  when focus management is ${focusManagement}`, () => {
        const listboxElement = document.createElement('ul');
        const listboxRefSpy = sinon.spy();
        const { result } = renderHook(() =>
          useSelect({ listboxRef: listboxRefSpy, focusManagement }),
        );

        const { listboxRef: returnedListboxRef } = result.current;

        expect(returnedListboxRef).not.to.eq(null);

        act(() => {
          returnedListboxRef?.(listboxElement);
        });

        expect(listboxRefSpy.calledOnce).to.equal(true);
        expect(listboxRefSpy.calledWith(listboxElement)).to.equal(true);
      });
    });

    it('merges listboxRef parameter with listboxRootRef when focus management is DOM', () => {
      const listboxElement = document.createElement('ul');
      const listboxRefSpy = sinon.spy();
      const { result } = renderHook(() =>
        useSelect({ listboxRef: listboxRefSpy, focusManagement: 'DOM' }),
      );

      const { listboxRootRef } = result.current;

      expect(listboxRootRef).not.to.eq(null);

      act(() => {
        listboxRootRef?.(listboxElement);
      });

      expect(listboxRefSpy.calledOnce).to.equal(true);
      expect(listboxRefSpy.calledWith(listboxElement)).to.equal(true);
    });
  });
});
