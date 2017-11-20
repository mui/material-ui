// @flow

import React from 'react';
import type { Element } from 'react';
import ReactDOM from 'react-dom';
import { assert } from 'chai';
import { createMount, createRender } from '../test-utils';
import Portal from './Portal';

const versions = ['old', 'latest'];

describe('<Portal />', () => {
  let mount;
  let render;
  const reactDomMock = {};

  before(() => {
    mount = createMount();
    render = createRender();
  });

  after(() => {
    mount.cleanUp();
  });

  versions.map(verion => {
    describe(verion, () => {
      before(() => {
        reactDomMock.createPortal = ReactDOM.createPortal;

        if (verion === 'latest') {
          // $FlowExpectedError
          ReactDOM.createPortal = (children, layer) => {
            // $FlowExpectedError
            const element = document.createElement(children.type);
            // $FlowExpectedError
            element.textContent = children.props.children;
            // $FlowExpectedError
            element.setAttribute('id', children.props.id);
            layer.appendChild(element);
            return null;
          };
        } else if (verion === 'old') {
          // $FlowExpectedError
          ReactDOM.createPortal = null;
          // $FlowExpectedError
          ReactDOM.unstable_renderSubtreeIntoContainer = (
            instance,
            children: Element<*>,
            layer,
          ) => {
            // $FlowFixMe
            const element = document.createElement(children.type);
            // $FlowFixMe
            element.textContent = children.props.children;
            element.setAttribute('id', children.props.id);
            layer.appendChild(element);
            return null;
          };
        } else {
          throw new Error('unsupported');
        }
      });

      after(() => {
        ReactDOM.createPortal = reactDomMock.createPortal;

        if (verion === 'next') {
          // $FlowExpectedError
          ReactDOM.unstable_renderSubtreeIntoContainer = undefined;
        }
      });

      describe('server side', () => {
        // Only run the test on node.
        if (!/jsdom/.test(window.navigator.userAgent) || verion === 'next') {
          return;
        }

        it('render nothing on the server', () => {
          const markup1 = render(<div>Hello World</div>);
          assert.strictEqual(markup1.text(), 'Hello World');

          const markup2 = render(<Portal>Hello World</Portal>);
          assert.strictEqual(markup2.text(), '');
        });
      });

      it('should render nothing directly', () => {
        const wrapper = mount(
          <Portal>
            <h1 className="woofPortal">Hello</h1>
          </Portal>,
        );
        assert.strictEqual(wrapper.children().length, 0, 'should have no children');
      });

      it('should not open by default', () => {
        const wrapper = mount(
          <Portal>
            <h1 className="woofPortal">Hello</h1>
          </Portal>,
        );
        const instance = wrapper.instance();
        assert.strictEqual(wrapper.props().open, false, 'should be false by default');
        assert.strictEqual(instance.layer, null, 'should not have a layer');
      });

      describe('rendering and unrendering', () => {
        let wrapper;
        let instance;
        let portal;

        before(() => {
          wrapper = mount(
            <Portal open>
              <h1 id="woofPortal">Hello</h1>
            </Portal>,
          );
          instance = wrapper.instance();
          portal = instance.layer;
        });

        it('should render the contents through a portal layer div', () => {
          assert.strictEqual(
            portal.tagName.toLowerCase(),
            'div',
            'should render a div element as the portal',
          );
          assert.strictEqual(
            portal.firstChild.tagName.toLowerCase(),
            'h1',
            'should be a heading tag',
          );
          assert.strictEqual(
            portal.firstChild.getAttribute('id'),
            'woofPortal',
            'should have the woofPortal id',
          );
          assert.strictEqual(portal.firstChild.innerHTML, 'Hello', 'have the contents');
          portal.setAttribute('id', 'meow');
          assert.strictEqual(
            document.getElementById('meow'),
            portal,
            'should have the portal in the DOM',
          );
          assert.strictEqual(
            document.getElementById('woofPortal'),
            portal.firstChild,
            'should have the heading in the DOM',
          );
        });

        it('should unrender the contents and remove the layer', () => {
          wrapper.setProps({ open: false });
          assert.strictEqual(
            document.getElementById('meow'),
            null,
            'should not have the portal in the DOM',
          );
          assert.strictEqual(
            document.getElementById('woofPortal'),
            null,
            'should not have the heading in the DOM',
          );
        });
      });
    });

    return null;
  });
});
