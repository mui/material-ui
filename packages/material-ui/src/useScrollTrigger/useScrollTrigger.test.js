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
    return ref.pageYoffset === offset; // The Chrome Browser on Mac OS X fails to set pageYOffset, so do not test the result if pageYoffset was not set
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

  describe('scrollPositions', () => {
    it('should trigger correctly with default threshold', () => {
      mountWrapper();
      [
        { offset: 100, result: 'false' },
        { offset: 201, result: 'true' },
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
        if (dispatchScroll(test.offset))
          assert.strictEqual(text(), test.result, `Index: ${i} ${JSON.stringify(test)}`);
      });
    });

    it('should trigger correctly with custom threshold', () => {
      mountWrapper({ threshold: 30 });
      [
        { offset: 100, result: 'true' },
        { offset: 101, result: 'true' },
        { offset: 100, result: 'false' },
        { offset: 99, result: 'false' },
        { offset: 100, result: 'true' },
        { offset: 9999, result: 'true' },
        { offset: 101, result: 'false' },
        { offset: 99, result: 'false' },
        { offset: 75, result: 'false' },
        { offset: 45, result: 'false' },
        { offset: 31, result: 'false' },
        { offset: 30, result: 'false' },
        { offset: 29, result: 'false' },
        { offset: 30, result: 'false' },
        { offset: 31, result: 'true' },
        { offset: -5, result: 'false' },
        { offset: 0, result: 'false' },
        { offset: 1, result: 'false' },
        { offset: 29, result: 'false' },
        { offset: 28, result: 'false' },
        { offset: 30, result: 'false' },
        { offset: 28, result: 'false' },
        { offset: 31, result: 'true' },
      ].forEach((test, i) => {
        if (dispatchScroll(test.offset))
          assert.strictEqual(text(), test.result, `Index: ${i} ${JSON.stringify(test)}`);
      });
    });

    it('should not trigger with negative direction default threshold', () => {
      mountWrapper();
      if (dispatchScroll(300)) assert.strictEqual(text(), 'true');
      if (dispatchScroll(299)) assert.strictEqual(text(), 'false');
    });

    it('should trigger with positive direction exceeding default threshold', () => {
      mountWrapper();
      if (dispatchScroll(300)) assert.strictEqual(text(), 'true');
      if (dispatchScroll(299)) assert.strictEqual(text(), 'false');
      if (dispatchScroll(300)) assert.strictEqual(text(), 'true');
    });
  });

  describe('scrollPositionsWithRef', () => {
    it('scroll container should render', () => {
      const wrapper = mountWrapperWithRef();
      const container = wrapper.find(Container);
      assert.strictEqual(container.exists(), true);
    });
    it('should not trigger from window scroll events', () => {
      mountWrapperWithRef();
      [101, 200, 300, -10, 100, 101, 99, 200, 199, 0, 1, -1, 150].forEach((offset, i) => {
        if (dispatchScroll(offset))
          assert.strictEqual(text(), 'false', `Index: ${i} Offset: ${offset}`);
      });
    });
    it('should trigger above default threshold', () => {
      mountWrapperWithRef();
      if (dispatchScroll(300, getContainer())) assert.strictEqual(text(), 'true');
    });
    it('should have correct directional triggering threshold', () => {
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

    it('should have correct non-directional triggering with default threshold', () => {
      mountWrapperWithRef({ directional: false });
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

    it('should have correct non-directional triggering with custom threshold', () => {
      mountWrapperWithRef({ directional: false, threshold: 50 });
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
  });
});
