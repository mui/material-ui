import React from 'react';
import PropTypes from 'prop-types';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createMount } from '@material-ui/core/test-utils';
import Container from '../Container';
import Box from '../Box';
import useScrollTrigger from './useScrollTrigger';

describe('useScrollTrigger', () => {
  let mount;
  let values;

  before(() => {
    mount = createMount({ strict: true });
  });

  beforeEach(() => {
    values = spy();
  });

  after(() => {
    mount.cleanUp();
  });

  const triggerRef = React.createRef();
  const containerRef = React.createRef(); // Get the scroll container's parent
  const getContainer = () => containerRef.current.children[0]; // Get the scroll container
  const text = () => triggerRef.current.textContent; // Retrieve the trigger value

  function Test(props) {
    const { useContainerRef, ...other } = props;
    const [container, setContainer] = React.useState();
    const trigger = useScrollTrigger({ ...other, target: container });

    React.useEffect(() => {
      values(trigger);
    });

    return (
      <React.Fragment>
        <span ref={triggerRef}>{`${trigger}`}</span>
        <div ref={containerRef}>
          <Container ref={useContainerRef ? setContainer : null}>
            <Box my={2}>some text here</Box>
          </Container>
        </div>
      </React.Fragment>
    );
  }

  Test.propTypes = {
    useContainerRef: PropTypes.bool,
  };

  describe('defaultTrigger', () => {
    it('should be false by default', () => {
      const TestDefault = () => {
        const trigger = useScrollTrigger();
        React.useEffect(() => {
          values(trigger);
        });
        return <span ref={triggerRef}>{`${trigger}`}</span>;
      };

      mount(<TestDefault />);
      assert.strictEqual(text(), 'false');
      assert.strictEqual(values.callCount, 1);
    });

    it('should be false by default when using setRef', () => {
      const TestDefaultWithRef = () => {
        const [container, setContainer] = React.useState();
        const trigger = useScrollTrigger({
          target: container,
        });
        React.useEffect(() => {
          values(trigger);
        });
        return (
          <React.Fragment>
            <span ref={triggerRef}>{`${trigger}`}</span>
            <span ref={setContainer} />
          </React.Fragment>
        );
      };
      mount(<TestDefaultWithRef />);
      assert.strictEqual(text(), 'false');
      assert.strictEqual(values.callCount, 2);
    });
  });

  describe('scroll', () => {
    // Only run the test on node.
    if (!/jsdom/.test(window.navigator.userAgent)) {
      return;
    }

    function dispatchScroll(offset, element = window) {
      element.pageYOffset = offset;
      element.dispatchEvent(new window.Event('scroll', {}));
    }

    it('scroll container should render with ref', () => {
      const wrapper = mount(<Test useContainerRef />);
      const container = wrapper.find(Container);
      assert.strictEqual(container.exists(), true);
    });

    it('should not trigger from window scroll events with ref', () => {
      mount(<Test useContainerRef />);
      [101, 200, 300, -10, 100, 101, 99, 200, 199, 0, 1, -1, 150].forEach((offset, i) => {
        dispatchScroll(offset);
        assert.strictEqual(text(), 'false', `Index: ${i} Offset: ${offset}`);
      });
    });

    it('should trigger above default threshold with ref', () => {
      mount(<Test useContainerRef />);
      dispatchScroll(300, getContainer());
      assert.strictEqual(text(), 'true');
    });

    it('should have correct hysteresis triggering threshold with ref', () => {
      mount(<Test useContainerRef />);
      [
        { offset: 100, result: 'false' },
        { offset: 101, result: 'true' },
        { offset: 100, result: 'false' },
        { offset: 99, result: 'false' },
        { offset: 100, result: 'false' },
        { offset: 101, result: 'true' },
        { offset: 102, result: 'true' },
        { offset: 101, result: 'false' },
        { offset: 99, result: 'false' },
        { offset: 100, result: 'false' },
        { offset: 101, result: 'true' },
        { offset: 100, result: 'false' },
        { offset: 102, result: 'true' },
        { offset: -3, result: 'false' },
        { offset: 3, result: 'false' },
        { offset: 103, result: 'true' },
        { offset: 102, result: 'false' },
      ].forEach((test, index) => {
        dispatchScroll(test.offset, getContainer());
        assert.strictEqual(text(), test.result, `Index: ${index} ${JSON.stringify(test)}`);
      });
    });

    it('should have correct hysteresis triggering with default threshold with ref', () => {
      mount(<Test useContainerRef disableHysteresis />);
      [
        { offset: 100, result: 'false' },
        { offset: 101, result: 'true' },
        { offset: 200, result: 'true' },
        { offset: 101, result: 'true' },
        { offset: 100, result: 'false' },
        { offset: 101, result: 'true' },
        { offset: 9999, result: 'true' },
        { offset: 0, result: 'false' },
        { offset: 99, result: 'false' },
        { offset: 100, result: 'false' },
        { offset: 101, result: 'true' },
        { offset: 100, result: 'false' },
        { offset: 102, result: 'true' },
        { offset: -3, result: 'false' },
        { offset: 3, result: 'false' },
        { offset: 103, result: 'true' },
      ].forEach((test, index) => {
        dispatchScroll(test.offset, getContainer());
        assert.strictEqual(text(), test.result, `Index: ${index} ${JSON.stringify(test)}`);
      });
    });

    it('should have correct hysteresis triggering with custom threshold with ref', () => {
      mount(<Test useContainerRef disableHysteresis threshold={50} />);
      [
        { offset: 100, result: 'true' },
        { offset: 101, result: 'true' },
        { offset: 101, result: 'true' },
        { offset: 9999, result: 'true' },
        { offset: 51, result: 'true' },
        { offset: 50, result: 'false' },
        { offset: 49, result: 'false' },
        { offset: 50, result: 'false' },
        { offset: 51, result: 'true' },
        { offset: 49, result: 'false' },
        { offset: 150, result: 'true' },
        { offset: -50, result: 'false' },
        { offset: 50, result: 'false' },
        { offset: 51, result: 'true' },
      ].forEach((test, index) => {
        dispatchScroll(test.offset, getContainer());
        assert.strictEqual(text(), test.result, `Index: ${index} ${JSON.stringify(test)}`);
      });
    });

    it('should not trigger at exact threshold value with ref', () => {
      mount(<Test useContainerRef threshold={100} />);
      [
        { offset: 100, result: 'false' },
        { offset: 99, result: 'false' },
        { offset: 100, result: 'false' },
        { offset: 101, result: 'true' },
        { offset: 100, result: 'false' },
        { offset: 99, result: 'false' },
        { offset: 100, result: 'false' },
      ].forEach((test, index) => {
        dispatchScroll(test.offset, getContainer());
        assert.strictEqual(text(), test.result, `Index: ${index} ${JSON.stringify(test)}`);
      });
    });

    it('should not trigger at exact threshold value with hysteresis disabled with ref', () => {
      mount(<Test useContainerRef disableHysteresis threshold={100} />);
      [
        { offset: 100, result: 'false' },
        { offset: 99, result: 'false' },
        { offset: 100, result: 'false' },
        { offset: 101, result: 'true' },
        { offset: 100, result: 'false' },
        { offset: 99, result: 'false' },
      ].forEach((test, index) => {
        dispatchScroll(test.offset, getContainer());
        assert.strictEqual(text(), test.result, `Index: ${index} ${JSON.stringify(test)}`);
      });
    });

    it('should correctly evaluate sequential scroll events with identical scrollY offsets with ref', () => {
      mount(<Test useContainerRef threshold={199} />);
      [
        { offset: 200, result: 'true' },
        { offset: 200, result: 'true' },
        { offset: 200, result: 'true' },
        { offset: 199, result: 'false' },
        { offset: 199, result: 'false' },
        { offset: 199, result: 'false' },
        { offset: 200, result: 'true' },
        { offset: 200, result: 'true' },
      ].forEach((test, index) => {
        dispatchScroll(test.offset, getContainer());
        assert.strictEqual(text(), test.result, `Index: ${index} ${JSON.stringify(test)}`);
      });
    });

    it('should correctly evaluate sequential scroll events with identical scrollY offsets and hysteresis disabled with ref', () => {
      mount(<Test useContainerRef disableHysteresis threshold={199} />);
      [
        { offset: 200, result: 'true' },
        { offset: 200, result: 'true' },
        { offset: 200, result: 'true' },
        { offset: 199, result: 'false' },
        { offset: 199, result: 'false' },
        { offset: 199, result: 'false' },
        { offset: 200, result: 'true' },
        { offset: 200, result: 'true' },
      ].forEach((test, index) => {
        dispatchScroll(test.offset, getContainer());
        assert.strictEqual(text(), test.result, `Index: ${index} ${JSON.stringify(test)}`);
      });
    });
  });
});
