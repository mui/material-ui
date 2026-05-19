import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import useValueAsRef from './useValueAsRef';

describe('useValueAsRef', () => {
  const { render } = createRenderer();

  it('updates the current value after commit, not during render', () => {
    let renderValue: number | undefined;
    let effectValue: number | undefined;

    function Test(props: { value: number }) {
      const valueRef = useValueAsRef(props.value);
      renderValue = valueRef.current;

      React.useLayoutEffect(() => {
        effectValue = valueRef.current;
      });

      return null;
    }

    const { setProps } = render(<Test value={1} />);

    expect(renderValue).to.equal(1);
    expect(effectValue).to.equal(1);

    setProps({ value: 2 });

    expect(renderValue).to.equal(1);
    expect(effectValue).to.equal(2);
  });

  it('returns the same ref object across renders', () => {
    let firstRef: object | undefined;
    let nextRef: object | undefined;

    function Test(props: { value: number }) {
      const valueRef = useValueAsRef(props.value);

      if (firstRef === undefined) {
        firstRef = valueRef;
      } else {
        nextRef = valueRef;
      }

      return null;
    }

    const { setProps } = render(<Test value={1} />);

    setProps({ value: 2 });

    expect(nextRef).to.equal(firstRef);
  });
});
