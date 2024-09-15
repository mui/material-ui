import { expect } from 'chai';
import getReactElementRef from '@mui/utils/getReactElementRef';
import * as React from 'react';

describe('getReactElementRef', () => {
  it('should throw when not used correctly', () => {
    expect(() => {
      // @ts-expect-error
      getReactElementRef(false);
    }).to.throw();

    expect(() => {
      // @ts-expect-error
      getReactElementRef();
    }).to.throw();

    expect(() => {
      // @ts-expect-error
      getReactElementRef(1);
    }).to.throw();

    const children = [<div key="1" />, <div key="2" />];
    // @ts-expect-error
    expect(() => getReactElementRef(children)).to.throw();
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

  it('should return null for element with no ref', () => {
    const element = <div />;
    expect(getReactElementRef(element)).to.equal(null);
  });
});
