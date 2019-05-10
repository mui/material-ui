import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { assert } from 'chai';
import { spy } from 'sinon';
import useScrollTrigger from './useScrollTrigger';
import PropTypes from 'prop-types';

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

  const dispatchScroll = (offset, ref = window) => {
    ref.pageYOffset = offset;
    ref.dispatchEvent(new window.Event('scroll', {}));
    return ref.pageYOffset === offset; // The Chrome Browser on Mac OS X fails to set pageYOffset, so do not test the result if pageYoffset was not set
  };

  const dispatchScrollTest = (pageYOffset, scrollTop, ref = window) => {
    ref.pageYOffset = pageYOffset;
    ref.scrollTop = scrollTop;
    ref.dispatchEvent(new window.Event('scroll', {}));

    const isMacOSXChrome = /\bMac OS X\b.*\bChrome\b/g.test(window.navigator.userAgent);
    // The Chrome Browser on Mac OS X fails to set pageYOffset, so do not test the result
    return !isMacOSXChrome && ref.scrollTop === scrollTop && ref.pageYOffset === pageYOffset;
  };

  const ref = React.createRef();
  const containerParent = React.createRef(); // Get the scroll container's parent
  const getContainer = () => containerParent.current.children[0]; // Get the scroll container
  const mountWrapper = props => mount(<Test {...props} />); // Mount using window as the scroll target
  const mountWrapperWithRef = props => mount(<Test useContainerRef {...props} />); // Mount using a container ref instead of the default window
  const text = () => ref.current.textContent; // Retrieve the trigger value

  const Test = props => {
    const { useContainerRef, ...other } = props;
    const [container, setContainer] = React.useState();
    const trigger = useScrollTrigger({ ...other, target: container });
    React.useEffect(() => {
      values(trigger);
    });
    return (
      <React.Fragment>
        <span ref={ref}>{`${trigger}`}</span>
        <div ref={containerParent}>
          <Container ref={useContainerRef && setContainer}>
            <Box my={2}>some text here</Box>
          </Container>
        </div>
      </React.Fragment>
    );
  };
  Test.propTypes = {
    useContainerRef: PropTypes.bool,
  };

  describe('defaultTrigger', () => {
    it('should be false by default', () => {
      const TestDefault = () => {
        const trigger = useScrollTrigger();
        React.useEffect(() => values(trigger));
        return <span ref={ref}>{`${trigger}`}</span>;
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
            <span ref={ref}>{`${trigger}`}</span>
            <span ref={setContainer} />
          </React.Fragment>
        );
      };
      mount(<TestDefaultWithRef />);
      assert.strictEqual(text(), 'false');
    });
  });

  describe('scrollPositionsWithRef', () => {
    it('scroll container should render with ref', () => {
      const wrapper = mountWrapperWithRef();
      const container = wrapper.find(Container);
      assert.strictEqual(container.exists(), true);
    });
    it('should not trigger from window scroll events with ref', () => {
      mountWrapperWithRef();
      [101, 200, 300, -10, 100, 101, 99, 200, 199, 0, 1, -1, 150].forEach((offset, i) => {
        if (dispatchScroll(offset))
          assert.strictEqual(text(), 'false', `Index: ${i} Offset: ${offset}`);
      });
    });
    it('should trigger above default threshold with ref', () => {
      mountWrapperWithRef();
      if (dispatchScroll(300, getContainer())) assert.strictEqual(text(), 'true');
    });
    it('should have correct hysteresis triggering threshold with ref', () => {
      mountWrapperWithRef();
      [
        { offset: 100, result: 'false' },
        { offset: 101, result: 'true' },
        { offset: 100, result: 'false' },
        { offset: 99, result: 'false' },
        { offset: 100, result: 'false' },
        { offset: 101, result: 'true' },
        { offset: 9999, result: 'true' },
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
      ].forEach((test, i) => {
        if (dispatchScroll(test.offset, getContainer()))
          assert.strictEqual(text(), test.result, `Index: ${i} ${JSON.stringify(test)}`);
      });
    });

    it('should have correct hysteresis triggering with default threshold with ref', () => {
      mountWrapperWithRef({ disableHysteresis: true });
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
      ].forEach((test, i) => {
        if (dispatchScroll(test.offset, getContainer()))
          assert.strictEqual(text(), test.result, `Index: ${i} ${JSON.stringify(test)}`);
      });
    });

    it('should have correct hysteresis triggering with custom threshold with ref', () => {
      mountWrapperWithRef({ disableHysteresis: true, threshold: 50 });
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
      ].forEach((test, i) => {
        if (dispatchScroll(test.offset, getContainer()))
          assert.strictEqual(text(), test.result, `Index: ${i} ${JSON.stringify(test)}`);
      });
    });

    it('should not trigger at exact threshold value with ref', () => {
      mountWrapperWithRef({ threshold: 100 });
      [
        { offset: 100, result: 'false' },
        { offset: 99, result: 'false' },
        { offset: 100, result: 'false' },
        { offset: 101, result: 'true' },
        { offset: 100, result: 'false' },
        { offset: 99, result: 'false' },
        { offset: 100, result: 'false' },
      ].forEach((test, i) => {
        if (dispatchScroll(test.offset, getContainer()))
          assert.strictEqual(text(), test.result, `Index: ${i} ${JSON.stringify(test)}`);
      });
    });

    it('should not trigger at exact threshold value with hysteresis disabled with ref', () => {
      mountWrapperWithRef({ disableHysteresis: true, threshold: 100 });
      [
        { offset: 100, result: 'false' },
        { offset: 99, result: 'false' },
        { offset: 100, result: 'false' },
        { offset: 101, result: 'true' },
        { offset: 100, result: 'false' },
        { offset: 99, result: 'false' },
      ].forEach((test, i) => {
        if (dispatchScroll(test.offset, getContainer()))
          assert.strictEqual(text(), test.result, `Index: ${i} ${JSON.stringify(test)}`);
      });
    });

    it('should correctly evaluate sequential scroll events with identical scrollY offsets with ref', () => {
      mountWrapperWithRef({ threshold: 199 });
      [
        { offset: 200, result: 'true' },
        { offset: 200, result: 'true' },
        { offset: 200, result: 'true' },
        { offset: 199, result: 'false' },
        { offset: 199, result: 'false' },
        { offset: 199, result: 'false' },
        { offset: 200, result: 'true' },
        { offset: 200, result: 'true' },
      ].forEach((test, i) => {
        if (dispatchScroll(test.offset, getContainer()))
          assert.strictEqual(text(), test.result, `Index: ${i} ${JSON.stringify(test)}`);
      });
    });

    it('should correctly evaluate sequential scroll events with identical scrollY offsets and hysteresis disabled with ref', () => {
      mountWrapperWithRef({ disableHysteresis: true, threshold: 199 });
      [
        { offset: 200, result: 'true' },
        { offset: 200, result: 'true' },
        { offset: 200, result: 'true' },
        { offset: 199, result: 'false' },
        { offset: 199, result: 'false' },
        { offset: 199, result: 'false' },
        { offset: 200, result: 'true' },
        { offset: 200, result: 'true' },
      ].forEach((test, i) => {
        if (dispatchScroll(test.offset, getContainer()))
          assert.strictEqual(text(), test.result, `Index: ${i} ${JSON.stringify(test)}`);
      });
    });
  });

  describe('Current and Previous Scroll Positions', () => {
    function getExpectedResult(previous, current, disableHysteresis, threshold, initialState) {
      if (current === undefined) {
        return initialState.toString();
      }
      if (!disableHysteresis) {
        // Using hysteresis logic
        if (previous !== undefined) {
          // A previous scroll exists
          if (previous <= current) {
            // Positive or neutral scolling direction
            if (current > threshold) {
              // Positive or neutral scrolling direction and threshold exceeded
              return 'true';
            }
            return 'false'; // Positive scrolling direction and threshold is not exceeded
          }
          return 'false'; // Negative scrolling direction
        }
        // No previous scroll, unknown scrolling direction, use non hysteresis logic
        if (current > threshold) {
          return 'true'; // No previous scroll, unknown scrolling direction, threshold exceeded
        }
        return 'false'; // No previous scroll, unknown scrolling direction, threshold is not exceeded
      }

      // Default non hysteresis logic
      if (current > threshold) {
        return 'true';
      }
      return 'false';
    }

    const testAllCombinations = (props, testValues, testScrollTop) =>
      testValues.forEach(current => {
        testValues.forEach(previous => {
          [
            { offset: undefined, scrollTop: undefined, result: 'false' }, // Baseline
            {
              offset: testScrollTop ? undefined : previous,
              scrollTop: testScrollTop ? previous : undefined,
              result: 'false',
            }, // Set previous value
            {
              offset: testScrollTop ? undefined : current,
              scrollTop: testScrollTop ? current : undefined,
              result: 'false',
            }, // Test current with previous value
          ].forEach((test, i) => {
            if (dispatchScrollTest(test.offset, test.scrollTop))
              if (i === 2) {
                // Validate the test
                assert.strictEqual(
                  text(),
                  getExpectedResult(
                    previous,
                    current,
                    props.disableHysteresis,
                    props.threshold,
                    props.initialState,
                  ),
                  `Current: ${current} Previous: ${previous} ${JSON.stringify(test)}`,
                );
              }
          });
        });
      });

    const scrollOffsets = [undefined, null, 0, 100, 101, -1, -100];
    const thresholds = [null, -100, -1, 0, 1, 100, 300];
    const initialStates = [true, false];
    const DisableHysteresis = [true, false];

    thresholds.forEach(threshold => {
      initialStates.forEach(initialState => {
        DisableHysteresis.forEach(disableHysteresis => {
          const props = {
            disableHysteresis,
            threshold,
            initialState,
          };
          it(`should validate combinations with props using pageYOffset: ${JSON.stringify(
            props,
          )}`, () => {
            mountWrapper(props);
            testAllCombinations(props, scrollOffsets, false);
          });
          it(`should validate combinations with props using scrollTop: ${JSON.stringify(
            props,
          )}`, () => {
            mountWrapper(props);
            testAllCombinations(props, scrollOffsets, true);
          });
        });
      });
    });
  });
});
