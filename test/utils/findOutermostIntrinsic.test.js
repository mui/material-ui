import * as React from 'react';
import { expect } from 'chai';
import createMount from 'test/utils/createMount';
import findOutermostIntrinsic from './findOutermostIntrinsic';

describe('findOutermostIntrinsic', () => {
  const mount = createMount({ strict: null });
  const expectIntrinsic = (node, expected) => {
    const wrapper = mount(node);
    const outermostIntrinsic = findOutermostIntrinsic(wrapper);

    if (expected === null) {
      expect(outermostIntrinsic.exists()).to.equal(false);
    } else {
      expect(outermostIntrinsic.type()).to.equal(expected);
      expect(outermostIntrinsic.type()).to.equal(
        outermostIntrinsic.getDOMNode().nodeName.toLowerCase(),
      );
    }
  };
  const Headless = ({ children }) => children;

  it('returns immediate DOM nodes', () => {
    expectIntrinsic(<div>Hello, World!</div>, 'div');
  });

  it('only returns the outermost', () => {
    expectIntrinsic(
      <span>
        <div>Hello, World!</div>
      </span>,
      'span',
    );
  });

  it('ignores components', () => {
    expectIntrinsic(
      <Headless>
        <div>Hello, World!</div>
      </Headless>,
      'div',
    );
    expectIntrinsic(
      <Headless>
        <Headless>
          <div>Hello, World!</div>
        </Headless>
      </Headless>,
      'div',
    );
    expectIntrinsic(
      <Headless>
        <Headless>
          <div>
            <Headless>
              <span>Hello, World!</span>
            </Headless>
          </div>
        </Headless>
      </Headless>,
      'div',
    );
  });

  it('can handle that no DOM node is rendered', () => {
    expectIntrinsic(<Headless>{false && <Headless />}</Headless>, null);
  });
});
