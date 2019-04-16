import React from 'react';
import { assert } from 'chai';
import createMount from './createMount';
import findOutermostIntrinsic from './findOutermostIntrinsic';

describe('findOutermostIntrinsic', () => {
  let mount;
  const assertIntrinsic = (node, expect) => {
    const wrapper = mount(node);
    const outermostIntrinsic = findOutermostIntrinsic(wrapper);

    if (expect === null) {
      assert.strictEqual(outermostIntrinsic.exists(), false);
    } else {
      assert.strictEqual(outermostIntrinsic.type(), expect);
      assert.strictEqual(
        outermostIntrinsic.type(),
        outermostIntrinsic.getDOMNode().nodeName.toLowerCase(),
      );
    }
  };
  const Headless = ({ children }) => children;

  before(() => {
    mount = createMount({ strict: undefined });
  });

  after(() => {
    mount.cleanUp();
  });

  it('returns immediate DOM nodes', () => {
    assertIntrinsic(<div>Hello, World!</div>, 'div');
  });

  it('only returns the outermost', () => {
    assertIntrinsic(
      <span>
        <div>Hello, World!</div>
      </span>,
      'span',
    );
  });

  it('ignores components', () => {
    assertIntrinsic(
      <Headless>
        <div>Hello, World!</div>
      </Headless>,
      'div',
    );
    assertIntrinsic(
      <Headless>
        <Headless>
          <div>Hello, World!</div>
        </Headless>
      </Headless>,
      'div',
    );
    assertIntrinsic(
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
    assertIntrinsic(<Headless>{false && <Headless />}</Headless>, null);
  });
});
