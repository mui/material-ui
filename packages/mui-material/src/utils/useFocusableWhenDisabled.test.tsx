import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { renderHook } from '@mui/internal-test-utils';
import useFocusableWhenDisabled from './useFocusableWhenDisabled';

describe('useFocusableWhenDisabled', () => {
  it('omits tabIndex for composite items', () => {
    const { result } = renderHook(() =>
      useFocusableWhenDisabled({
        composite: true,
        disabled: true,
        isNativeButton: false,
      }),
    );

    expect(result.current.props).not.to.have.property('tabIndex');
    expect(result.current.props['aria-disabled']).to.equal(true);
  });

  it('sets disabled for non-focusable composite native buttons', () => {
    const { result } = renderHook(() =>
      useFocusableWhenDisabled({
        composite: true,
        disabled: true,
        focusableWhenDisabled: false,
        isNativeButton: true,
      }),
    );

    expect(result.current.props).not.to.have.property('tabIndex');
    expect(result.current.props).not.to.have.property('aria-disabled');
    expect(result.current.props.disabled).to.equal(true);
  });

  it('prevents non-Tab keys for focusable disabled items', () => {
    const { result } = renderHook(() =>
      useFocusableWhenDisabled({
        disabled: true,
        focusableWhenDisabled: true,
        isNativeButton: true,
      }),
    );
    const preventDefault = spy();

    result.current.props.onKeyDown({
      key: 'Enter',
      preventDefault,
    } as unknown as React.KeyboardEvent);

    expect(preventDefault.callCount).to.equal(1);
  });

  it('does not prevent Tab for focusable disabled items', () => {
    const { result } = renderHook(() =>
      useFocusableWhenDisabled({
        disabled: true,
        focusableWhenDisabled: true,
        isNativeButton: true,
      }),
    );
    const preventDefault = spy();

    result.current.props.onKeyDown({
      key: 'Tab',
      preventDefault,
    } as unknown as React.KeyboardEvent);

    expect(preventDefault.callCount).to.equal(0);
  });
});
