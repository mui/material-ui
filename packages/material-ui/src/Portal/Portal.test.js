/* eslint-disable react/prop-types */
import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createMount, createRender } from '@material-ui/core/test-utils';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import Portal from './Portal';

describe('<Portal />', () => {
  let mount;
  let render;

  before(() => {
    mount = createMount({ strict: true });
    render = createRender();
  });

  after(() => {
    mount.cleanUp();
  });

  describe('server-side', () => {
    // Only run the test on node.
    if (!/jsdom/.test(window.navigator.userAgent)) {
      return;
    }

    beforeEach(() => {
      consoleErrorMock.spy();
    });

    afterEach(() => {
      consoleErrorMock.reset();
    });

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

  describe('ref', () => {
    it('should have access to the mountNode when disabledPortal={false}', () => {
      const refSpy = spy();
      const wrapper = mount(
        <Portal ref={refSpy}>
          <h1>Foo</h1>
        </Portal>,
      );
      assert.deepEqual(refSpy.args, [[document.body]]);
      wrapper.unmount();
      assert.deepEqual(refSpy.args, [[document.body], [null]]);
    });

    it('should have access to the mountNode when disabledPortal={true}', () => {
      const refSpy = spy();
      const wrapper = mount(
        <Portal disablePortal ref={refSpy}>
          <h1 className="woofPortal">Foo</h1>
        </Portal>,
      );
      const mountNode = document.querySelector('.woofPortal');
      assert.deepEqual(refSpy.args, [[mountNode]]);
      wrapper.unmount();
      assert.deepEqual(refSpy.args, [[mountNode], [null]]);
    });

    it('should have access to the mountNode when switching disabledPortal', () => {
      const refSpy = spy();
      const wrapper = mount(
        <Portal disablePortal ref={refSpy}>
          <h1 className="woofPortal">Foo</h1>
        </Portal>,
      );
      const mountNode = document.querySelector('.woofPortal');
      assert.deepEqual(refSpy.args, [[mountNode]]);
      wrapper.setProps({
        disablePortal: false,
      });
      assert.deepEqual(refSpy.args, [[mountNode], [null], [document.body]]);
      wrapper.unmount();
      assert.deepEqual(refSpy.args, [[mountNode], [null], [document.body], [null]]);
    });
  });

  it('should render in a different node', () => {
    mount(
      <div id="test1">
        <h1 className="woofPortal1">Foo</h1>
        <Portal>
          <h1 className="woofPortal2">Foo</h1>
        </Portal>
      </div>,
    );
    const rootElement = document.querySelector('#test1');
    assert.strictEqual(rootElement.contains(document.querySelector('.woofPortal1')), true);
    assert.strictEqual(rootElement.contains(document.querySelector('.woofPortal2')), false);
  });

  it('should unmount when parent unmounts', () => {
    function Parent(props) {
      const { show = true } = props;
      return <div>{show ? <Child /> : null}</div>;
    }

    function Child() {
      const containerRef = React.useRef();
      return (
        <div>
          <div ref={containerRef} />
          <Portal container={() => containerRef.current}>
            <div id="test1" />
          </Portal>
        </div>
      );
    }

    const wrapper = mount(<Parent />);
    assert.strictEqual(document.querySelectorAll('#test1').length, 1);
    wrapper.setProps({ show: false });
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
    function ContainerTest(props) {
      const { containerElement = false, disablePortal = true } = props;
      const containerRef = React.useRef();
      const container = React.useCallback(() => (containerElement ? containerRef.current : null), [
        containerElement,
      ]);

      return (
        <span>
          <strong ref={containerRef} />
          <Portal disablePortal={disablePortal} container={container}>
            <div id="test3" />
          </Portal>
        </span>
      );
    }

    const wrapper = mount(<ContainerTest />);
    assert.strictEqual(document.querySelector('#test3').parentNode.nodeName, 'SPAN', 'c');
    wrapper.setProps({
      containerElement: true,
    });
    assert.strictEqual(document.querySelector('#test3').parentNode.nodeName, 'SPAN', 'a');
    wrapper.setProps({
      disablePortal: false,
    });
    assert.strictEqual(document.querySelector('#test3').parentNode.nodeName, 'STRONG', 'c');
    wrapper.setProps({
      containerElement: false,
    });
    assert.strictEqual(document.querySelector('#test3').parentNode.nodeName, 'BODY', 'b');
  });

  it('should call onRendered', () => {
    const ref = React.createRef();
    const handleRendered = spy();
    mount(
      <Portal
        ref={ref}
        onRendered={() => {
          handleRendered();
          assert.strictEqual(ref.current !== null, true);
        }}
      >
        <div />
      </Portal>,
    );
    assert.strictEqual(handleRendered.callCount, 1);
  });

  it('should call onRendered after child componentDidUpdate', () => {
    function Test(props) {
      const { updateFunction, container, onRendered } = props;

      React.useEffect(() => {
        updateFunction();
      }, [container, updateFunction]);

      return (
        <Portal onRendered={onRendered} container={container}>
          <div />
        </Portal>
      );
    }

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

    assert.deepEqual(callOrder, [
      'cDU',
      'onRendered',
      'cDU',
      'onRendered',
      'cDU',
      'onRendered',
      'cDU',
      'onRendered',
    ]);
  });
});
