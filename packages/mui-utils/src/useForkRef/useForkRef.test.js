import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, screen } from '@mui/internal-test-utils';
import useForkRef from './useForkRef';
import getReactNodeRef from '../getReactNodeRef';

describe('useForkRef', () => {
  const { render } = createRenderer();

  it('returns a single ref-setter function that forks the ref to its inputs', () => {
    function Component(props) {
      const { innerRef } = props;
      const [ownRefCurrent, ownRef] = React.useState(null);

      const handleRef = useForkRef(innerRef, ownRef);

      return <div ref={handleRef}>{ownRefCurrent ? 'has a ref' : 'has no ref'}</div>;
    }

    const outerRef = React.createRef();

    expect(() => {
      render(<Component innerRef={outerRef} />);
    }).not.toErrorDev();
    expect(outerRef.current.textContent).to.equal('has a ref');
  });

  it('forks if only one of the branches requires a ref', () => {
    const Component = React.forwardRef(function Component(props, ref) {
      const [hasRef, setHasRef] = React.useState(false);
      const handleOwnRef = React.useCallback(() => setHasRef(true), []);
      const handleRef = useForkRef(handleOwnRef, ref);

      return (
        <div ref={handleRef} data-testid="hasRef">
          {String(hasRef)}
        </div>
      );
    });

    expect(() => {
      render(<Component />);
    }).not.toErrorDev();

    expect(screen.getByTestId('hasRef')).to.have.text('true');
  });

  it('does nothing if none of the forked branches requires a ref', () => {
    const Outer = React.forwardRef(function Outer(props, ref) {
      const { children } = props;
      const handleRef = useForkRef(getReactNodeRef(children), ref);

      return React.cloneElement(children, { ref: handleRef });
    });

    function Inner() {
      return <div />;
    }

    expect(() => {
      render(
        <Outer>
          <Inner />
        </Outer>,
      );
    }).not.toErrorDev();
  });

  describe('changing refs', () => {
    function Div(props) {
      const { leftRef, rightRef, ...other } = props;
      const handleRef = useForkRef(leftRef, rightRef);

      return <div {...other} ref={handleRef} />;
    }

    it('handles changing from no ref to some ref', () => {
      let view;

      expect(() => {
        view = render(<Div id="test" />);
      }).not.toErrorDev();

      const ref = React.createRef();
      expect(() => {
        view.setProps({ leftRef: ref });
      }).not.toErrorDev();
      expect(ref.current.id).to.equal('test');
    });

    it('cleans up detached refs', () => {
      const firstLeftRef = React.createRef();
      const firstRightRef = React.createRef();
      const secondRightRef = React.createRef();
      let view;

      expect(() => {
        view = render(<Div leftRef={firstLeftRef} rightRef={firstRightRef} id="test" />);
      }).not.toErrorDev();
      expect(firstLeftRef.current.id).to.equal('test');
      expect(firstRightRef.current.id).to.equal('test');
      expect(secondRightRef.current).to.equal(null);

      view.setProps({ rightRef: secondRightRef });

      expect(firstLeftRef.current.id).to.equal('test');
      expect(firstRightRef.current).to.equal(null);
      expect(secondRightRef.current.id).to.equal('test');
    });
  });
});
