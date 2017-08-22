// @flow

import * as React from 'react';
import ReactDOM from 'react-dom';
import { assert } from 'chai';
import { createMount, createRender } from '../test-utils';
import Portal from './Portal';

const versions = ['latets', 'next'];

describe('<Portal />', () => {
  let mount;
  let render;

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
        if (verion === 'next') {
          // $FlowFixMe
          ReactDOM.unstable_createPortal = (children, layer) => {
            const element = document.createElement(children.type);
            element.textContent = children.props.children;
            element.setAttribute('id', children.props.id);
            layer.appendChild(element);
            return null;
          };
        }
      });

      after(() => {
        if (verion === 'next') {
          // $FlowFixMe
          ReactDOM.unstable_createPortal = undefined;
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
