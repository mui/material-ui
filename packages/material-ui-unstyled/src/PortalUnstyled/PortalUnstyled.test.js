import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createServerRender, createClientRender } from 'test/utils';
import PortalUnstyled from './PortalUnstyled';

describe('<PortalUnstyled />', () => {
  const serverRender = createServerRender();
  const render = createClientRender();

  describe('server-side', () => {
    before(function beforeHook() {
      // Only run the test on node.
      if (!/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }
    });

    it('render nothing on the server', () => {
      const markup1 = serverRender(<div>Bar</div>);
      expect(markup1.text()).to.equal('Bar');

      let markup2;
      expect(() => {
        markup2 = serverRender(
          <PortalUnstyled>
            <div>Bar</div>
          </PortalUnstyled>,
        );
      }).toErrorDev(
        // Known issue due to using SSR APIs in a browser environment.
        // We use 2x useLayoutEffect in the component.
        [
          'Warning: useLayoutEffect does nothing on the server',
          'Warning: useLayoutEffect does nothing on the server',
        ],
      );
      expect(markup2.text()).to.equal('');
    });
  });

  describe('ref', () => {
    it('should have access to the mountNode when disabledPortal={false}', () => {
      const refSpy = spy();
      const { unmount } = render(
        <PortalUnstyled ref={refSpy}>
          <h1>Foo</h1>
        </PortalUnstyled>,
      );
      expect(refSpy.args).to.deep.equal([[document.body]]);
      unmount();
      expect(refSpy.args).to.deep.equal([[document.body], [null]]);
    });

    it('should have access to the mountNode when disabledPortal={true}', () => {
      const refSpy = spy();
      const { unmount } = render(
        <PortalUnstyled disablePortal ref={refSpy}>
          <h1 className="woofPortal">Foo</h1>
        </PortalUnstyled>,
      );
      const mountNode = document.querySelector('.woofPortal');
      expect(refSpy.args).to.deep.equal([[mountNode]]);
      unmount();
      expect(refSpy.args).to.deep.equal([[mountNode], [null]]);
    });

    it('should have access to the mountNode when switching disabledPortal', () => {
      const refSpy = spy();
      const { setProps, unmount } = render(
        <PortalUnstyled disablePortal ref={refSpy}>
          <h1 className="woofPortal">Foo</h1>
        </PortalUnstyled>,
      );
      const mountNode = document.querySelector('.woofPortal');
      expect(refSpy.args).to.deep.equal([[mountNode]]);
      setProps({
        disablePortal: false,
        ref: refSpy,
      });
      expect(refSpy.args).to.deep.equal([[mountNode], [null], [document.body]]);
      unmount();
      expect(refSpy.args).to.deep.equal([[mountNode], [null], [document.body], [null]]);
    });
  });

  it('should render in a different node', () => {
    render(
      <div id="test1">
        <h1 className="woofPortal1">Foo</h1>
        <PortalUnstyled>
          <h1 className="woofPortal2">Foo</h1>
        </PortalUnstyled>
      </div>,
    );
    const rootElement = document.querySelector('#test1');
    expect(rootElement.contains(document.querySelector('.woofPortal1'))).to.equal(true);
    expect(rootElement.contains(document.querySelector('.woofPortal2'))).to.equal(false);
  });

  it('should unmount when parent unmounts', () => {
    function Child() {
      const containerRef = React.useRef();
      return (
        <div>
          <div ref={containerRef} />
          <PortalUnstyled container={() => containerRef.current}>
            <div id="test1" />
          </PortalUnstyled>
        </div>
      );
    }

    function Parent(props) {
      const { show = true } = props;
      return <div>{show ? <Child /> : null}</div>;
    }

    const { setProps } = render(<Parent />);
    expect(document.querySelectorAll('#test1').length).to.equal(1);
    setProps({ show: false });
    expect(document.querySelectorAll('#test1').length).to.equal(0);
  });

  it('should render overlay into container (document)', () => {
    render(
      <PortalUnstyled>
        <div className="test2" />
        <div className="test2" />
      </PortalUnstyled>,
    );
    expect(document.querySelectorAll('.test2').length).to.equal(2);
  });

  it('should render overlay into container (DOMNode)', () => {
    const container = document.createElement('div');
    render(
      <PortalUnstyled container={container}>
        <div id="test2" />
      </PortalUnstyled>,
    );
    expect(container.querySelectorAll('#test2').length).to.equal(1);
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
          <PortalUnstyled disablePortal={disablePortal} container={container}>
            <div id="test3" />
          </PortalUnstyled>
        </span>
      );
    }

    const { setProps } = render(<ContainerTest />);
    expect(document.querySelector('#test3').parentElement.nodeName).to.equal('SPAN');
    setProps({
      containerElement: true,
      disablePortal: true,
    });
    expect(document.querySelector('#test3').parentElement.nodeName).to.equal('SPAN');
    setProps({
      containerElement: true,
      disablePortal: false,
    });
    expect(document.querySelector('#test3').parentElement.nodeName).to.equal('STRONG');
    setProps({
      containerElement: false,
      disablePortal: false,
    });
    expect(document.querySelector('#test3').parentElement.nodeName).to.equal('BODY');
  });

  it('should call ref after child effect', () => {
    const callOrder = [];
    const handleRef = (node) => {
      if (node) {
        callOrder.push('ref');
      }
    };
    const updateFunction = () => {
      callOrder.push('effect');
    };

    function Test(props) {
      const { container } = props;

      React.useEffect(() => {
        updateFunction();
      }, [container]);

      return (
        <PortalUnstyled ref={handleRef} container={container}>
          <div />
        </PortalUnstyled>
      );
    }

    const { setProps } = render(<Test container={document.createElement('div')} />);

    setProps({ container: null });
    setProps({ container: document.createElement('div') });
    setProps({ container: null });

    expect(callOrder).to.deep.equal([
      'effect',
      'ref',
      'effect',
      'ref',
      'effect',
      'ref',
      'effect',
      'ref',
    ]);
  });
});
