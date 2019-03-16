import React from 'react';
import ReactDOM from 'react-dom';
import { assert } from 'chai';
import { spy } from 'sinon';
import PropTypes from 'prop-types';
import { createMount, createRender } from '@material-ui/core/test-utils';
import Portal from './Portal';
import Select from '../Select';
import MenuItem from '../MenuItem';

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

  it('should work with a high level component like the Select', () => {
    const wrapper = mount(
      <Select value={1} open>
        <MenuItem value={1}>
          <em>1</em>
        </MenuItem>
        <MenuItem value={2}>
          <em>2</em>
        </MenuItem>
      </Select>,
    );

    assert.strictEqual(wrapper.find(MenuItem).length, 2);
  });

  describe('prop: disablePortal', () => {
    it('should work as expected', () => {
      const wrapper = mount(
        <Portal disablePortal>
          <h1 className="woofPortal">Foo</h1>
        </Portal>,
      );
      assert.strictEqual(wrapper.children().length, 1, 'should have one children');
    });
  });

  describe('mount', () => {
    let cleanUp;

    beforeEach(() => {
      reactDomMock.createPortal = ReactDOM.createPortal;
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
    });

    afterEach(() => {
      ReactDOM.createPortal = reactDomMock.createPortal;

      if (cleanUp) {
        cleanUp.mountNode.removeChild(cleanUp.element);
        cleanUp = null;
      }
    });

    describe('server-side', () => {
      // Only run the test on node.
      if (!/jsdom/.test(window.navigator.userAgent)) {
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
                ref={ref => {
                  this.containerRef = ref;
                }}
              />
              <Portal container={() => this.containerRef}>
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

    it('should change container on prop change', done => {
      class ContainerTest extends React.Component {
        state = {
          container: null,
        };

        render() {
          return (
            <div>
              <div
                ref={ref => {
                  this.containerRef = ref;
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

      assert.strictEqual(document.querySelector('#test3').parentNode.nodeName, 'BODY');
      wrapper.setState({ container: wrapper.instance().containerRef });
      setTimeout(() => {
        assert.strictEqual(document.querySelector('#test3').parentNode.nodeName, 'DIV');
        done();
      });
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

  it('should call onRendered after child componentDidUpdate', done => {
    class Test extends React.Component {
      componentDidUpdate(prevProps) {
        if (prevProps.container !== this.props.container) {
          this.props.updateFunction();
        }
      }

      render() {
        return (
          <Portal onRendered={this.props.onRendered} container={this.props.container}>
            <div />
          </Portal>
        );
      }
    }
    Test.propTypes = {
      container: PropTypes.object,
      onRendered: PropTypes.func,
      updateFunction: PropTypes.func,
    };

    const callOrder = [];
    const onRendered = () => {
      callOrder.push('onRendered');
    };
    const updateFunction = () => {
      callOrder.push('cDU');
    };

    const container1 = document.createElement('div');
    const container2 = document.createElement('div');

    const wrapper = mount(
      <Test onRendered={onRendered} updateFunction={updateFunction} container={container1} />,
    );

    wrapper.setProps({ container: null });
    wrapper.setProps({ container: container2 });
    wrapper.setProps({ container: null });

    setTimeout(() => {
      assert.deepEqual(callOrder, ['onRendered', 'cDU', 'cDU', 'cDU', 'onRendered']);
      done();
    });
  });
});
