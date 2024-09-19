import { expect } from 'chai';
import getReactElementRef from '@mui/utils/getReactElementRef';
import * as React from 'react';

describe('getReactElementRef', () => {
  it('should throw when not used correctly', () => {
    expect(() => {
      // @ts-expect-error
      getReactElementRef(false);
      // @ts-expect-error
    }).toThrowMinified(/expects a React element/);

    expect(() => {
      // @ts-expect-error
      getReactElementRef();
      // @ts-expect-error
    }).toThrowMinified(/expects a React element/);

    expect(() => {
      // @ts-expect-error
      getReactElementRef(1);
      // @ts-expect-error
    }).toThrowMinified(/expects a React element/);
  });

  it('should return the ref of a React element', () => {
    const ref = React.createRef<HTMLDivElement>();
    const element = <div ref={ref} />;
    expect(getReactElementRef(element)).to.equal(ref);
  });

  it('should return null for a fragment', () => {
    const element = (
      <React.Fragment>
        <p>Hello</p>
        <p>Hello</p>
      </React.Fragment>
    );
    expect(getReactElementRef(element)).to.equal(null);
  });

  it('should return undefined for an array', () => {
    const element = [<div key="1" />, <div key="2" />];
    // @ts-expect-error
    expect(getReactElementRef(element)).to.equal(undefined);
  });

  it('should return null for element with no ref', () => {
    const element = <div />;
    expect(getReactElementRef(element)).to.equal(null);
  });
});
