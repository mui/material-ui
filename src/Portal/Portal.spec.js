/* eslint-disable react/no-multi-comp */

import React from 'react';
import ReactDOM from 'react-dom';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createMount, createRender } from '../test-utils';
import NewPortal from './Portal';
import LegacyPortal from './LegacyPortal';

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
      let Portal;
      let cleanUp;

      beforeEach(() => {
        reactDomMock.createPortal = ReactDOM.createPortal;

        if (verion === 'latest') {
          Portal = NewPortal;
          ReactDOM.createPortal = (children, mountNode) => {
            const element = document.createElement(children.type);
            element.textContent = children.props.children;
            element.setAttribute('id', children.props.id);
            element.setAttribute('class', children.props.className);
            mountNode.appendChild(element);
            if (cleanUp) {
              cleanUp.mountNode.removeChild(cleanUp.element);
            }
            cleanUp = {
              element,
              mountNode,
            };
            return null;
          };
        } else if (verion === 'old') {
          Portal = LegacyPortal;
          ReactDOM.createPortal = null;
          ReactDOM.unstable_renderSubtreeIntoContainer = (
            instance,
            children,
            mountNode,
            callback,
          ) => {
            const element = document.createElement(children.type);
            element.textContent = children.props.children;
            element.setAttribute('id', children.props.id);
            element.setAttribute('class', children.props.className);
            mountNode.appendChild(element);
            if (cleanUp) {
              cleanUp.mountNode.removeChild(cleanUp.element);
            }
            cleanUp = {
              element,
              mountNode,
            };
            callback();
            return null;
          };
        } else {
          throw new Error('unsupported');
        }
      });

      afterEach(() => {
        ReactDOM.createPortal = reactDomMock.createPortal;

        if (verion === 'next') {
          ReactDOM.unstable_renderSubtreeIntoContainer = undefined;
        }

        if (cleanUp) {
          cleanUp.mountNode.removeChild(cleanUp.element);
          cleanUp = null;
        }
      });

      describe('server side', () => {
        // Only run the test on node.
        if (!/jsdom/.test(window.navigator.userAgent) || verion === 'next') {
          return;
        }

        it('render nothing on the server', () => {
          const markup1 = render(<div>Bar</div>);
          assert.strictEqual(markup1.text(), 'Bar');

          const markup2 = render(
            <Portal>
              <div>Bar</div>
            </Portal>,
          );
          assert.strictEqual(markup2.text(), '');
        });
      });

      it('should render nothing directly', () => {
        const wrapper = mount(
          <Portal>
            <h1 className="woofPortal">Foo</h1>
          </Portal>,
        );
        assert.strictEqual(wrapper.children().length, 0, 'should have no children');
      });

      it('should have access to the mountNode', () => {
        const wrapper = mount(
          <Portal>
            <h1>Foo</h1>
          </Portal>,
        );
        const instance = wrapper.instance();
        assert.strictEqual(instance.getMountNode(), instance.mountNode);
      });

      it('should render in a different node', () => {
        const wrapper = mount(
          <Portal>
            <h1 className="woofPortal">Foo</h1>
          </Portal>,
        );
        const instance = wrapper.instance();
        assert.notStrictEqual(instance.mountNode, null, 'should have a mountNode');
        assert.strictEqual(document.querySelectorAll('.woofPortal').length, 1);
      });

      it('should unmount when parent unmounts', () => {
        class Parent extends React.Component {
          state = {
            show: true,
          };

          render() {
            return <div>{this.state.show ? <Child /> : null}</div>;
          }
        }

        class Child extends React.Component {
          render() {
            return (
              <div>
                <div
                  ref={node => {
                    this.container = node;
                  }}
                />
                <Portal container={() => this.container}>
                  <div id="test1" />
                </Portal>
              </div>
            );
          }
        }

        const wrapper = mount(<Parent />);
        assert.strictEqual(document.querySelectorAll('#test1').length, 1);
        wrapper.setState({ show: false });
        assert.strictEqual(document.querySelectorAll('#test1').length, 0);
      });

      it('should render overlay into container (document)', () => {
        mount(
          <Portal>
            <div id="test2" />
          </Portal>,
        );

        assert.strictEqual(document.querySelectorAll('#test2').length, 1);
      });

      it('should render overlay into container (DOMNode)', () => {
        const container = document.createElement('div');

        mount(
          <Portal container={container}>
            <div id="test2" />
          </Portal>,
        );

        assert.strictEqual(container.querySelectorAll('#test2').length, 1);
      });

      it('should change container on prop change', () => {
        class ContainerTest extends React.Component {
          state = {
            container: null,
          };

          render() {
            return (
              <div>
                <div
                  ref={node => {
                    this.container = node;
                  }}
                />
                <Portal container={this.state.container}>
                  <div id="test3" />
                </Portal>
              </div>
            );
          }
        }

        const wrapper = mount(<ContainerTest />);

        if (verion === 'latest') {
          assert.strictEqual(document.querySelector('#test3').parentNode.nodeName, 'BODY');
          wrapper.setState({ container: wrapper.instance().container });
          assert.strictEqual(document.querySelector('#test3').parentNode.nodeName, 'DIV');
        } else {
          assert.strictEqual(
            document.querySelector('#test3').parentNode.parentNode.nodeName,
            'BODY',
          );
          wrapper.setState({ container: wrapper.instance().container });
          assert.strictEqual(
            document.querySelector('#test3').parentNode.parentNode.nodeName,
            'DIV',
          );
        }
      });

      it('should call onRendered', () => {
        const handleRendered = spy();
        mount(
          <Portal onRendered={handleRendered}>
            <div />
          </Portal>,
        );
        assert.strictEqual(handleRendered.callCount, 1);
      });
    });

    return null;
  });
});
