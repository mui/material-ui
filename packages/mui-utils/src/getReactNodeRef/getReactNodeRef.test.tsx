import { expect } from 'chai';
import getReactNodeRef from '@mui/utils/getReactNodeRef';
import * as React from 'react';

describe('getReactNodeRef', () => {
  it('should throw when not used correctly', () => {
    expect(() => {
      // @ts-expect-error
      getReactNodeRef(false);
      // @ts-expect-error
    }).toThrowMinified(/expects a React element/);

    expect(() => {
      // @ts-expect-error
      getReactNodeRef();
      // @ts-expect-error
    }).toThrowMinified(/expects a React element/);

    expect(() => {
      // @ts-expect-error
      getReactNodeRef(1);
      // @ts-expect-error
    }).toThrowMinified(/expects a React element/);
  });

  it('should return the ref of a React element', () => {
    const ref = React.createRef<HTMLDivElement>();
    const element = <div ref={ref} />;
    expect(getReactNodeRef(element)).to.equal(ref);
  });

  it('should return null for a fragment', () => {
    const element = (
      <React.Fragment>
        <p>Hello</p>
        <p>Hello</p>
      </React.Fragment>
    );
    expect(getReactNodeRef(element)).to.equal(null);
  });

  it('should return undefined for an array', () => {
    const element = [<div key="1" />, <div key="2" />];
    // @ts-expect-error
    expect(getReactNodeRef(element)).to.equal(undefined);
  });

  it('should return null for element with no ref', () => {
    const element = <div />;
    expect(getReactNodeRef(element)).to.equal(null);
  });
});
