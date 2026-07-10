import * as React from 'react';
import PropTypes from 'prop-types';
import { expect } from 'chai';
import { act, createRenderer, RenderCounter, screen, isJsdom } from '@mui/internal-test-utils';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

describe('useScrollTrigger', () => {
  const { render } = createRenderer();

  describe('defaultTrigger', () => {
    it('should be false by default', () => {
      const getRenderCountRef = React.createRef();
      function TestDefault() {
        const trigger = useScrollTrigger();
        return (
          <RenderCounter ref={getRenderCountRef}>
            <span data-testid="trigger">{`${trigger}`}</span>
          </RenderCounter>
        );
      }

      render(<TestDefault />);

      expect(screen.getByTestId('trigger').textContent).to.equal('false');
      expect(getRenderCountRef.current()).to.equal(1);
    });

    it('should be false by default when using ref', () => {
      const getRenderCountRef = React.createRef();
      const triggerRef = React.createRef();
      function TestDefaultWithRef() {
        const [container, setContainer] = React.useState();
        const trigger = useScrollTrigger({
          target: container,
        });
        return (
          <RenderCounter ref={getRenderCountRef}>
            <span ref={triggerRef}>{`${trigger}`}</span>
            <span ref={setContainer} />
          </RenderCounter>
        );
      }
      render(<TestDefaultWithRef />);
      expect(triggerRef.current.textContent).to.equal('false');
      expect(getRenderCountRef.current()).to.equal(2);
    });

    it('should do nothing when ref is null', () => {
      const getRenderCountRef = React.createRef();
      const triggerRef = React.createRef();
      function TestWithNullRef() {
        const [container, setContainer] = React.useState(null);
        const trigger = useScrollTrigger({
          target: container,
        });
        return (
          <RenderCounter ref={getRenderCountRef}>
            <span ref={triggerRef}>{`${trigger}`}</span>
            <span ref={setContainer} />
          </RenderCounter>
        );
      }
      render(<TestWithNullRef />);
      expect(triggerRef.current.textContent).to.equal('false');
      expect(getRenderCountRef.current()).to.equal(2);
    });
  });

  describe.skipIf(!isJsdom())('scroll', () => {
    const triggerRef = React.createRef();
    const containerRef = React.createRef(); // Get the scroll container's parent
    const getContainer = () => containerRef.current.children[0]; // Get the scroll container
    const getTriggerValue = () => triggerRef.current.textContent; // Retrieve the trigger value

    function Test(props) {
      const { customContainer, ...other } = props;
      const [container, setContainer] = React.useState();
      const trigger = useScrollTrigger({ ...other, target: container });

      return (
        <React.Fragment>
          <span ref={triggerRef}>{`${trigger}`}</span>
          <div ref={containerRef}>
            <Container ref={customContainer ? setContainer : null}>
              <Box sx={{ my: 2 }}>Custom container</Box>
            </Container>
          </div>
        </React.Fragment>
      );
    }

    Test.propTypes = {
      customContainer: PropTypes.bool,
    };

    function dispatchScroll(offset, element = window) {
      act(() => {
        element.pageYOffset = offset;
        element.dispatchEvent(new window.Event('scroll', {}));
      });
    }

    it('scroll container should render with ref', () => {
      const { container } = render(<Test customContainer />);
      expect(container.textContent).to.include('Custom container');
    });

    it('should not trigger from window scroll events with ref', () => {
      render(<Test customContainer />);
      [101, 200, 300, -10, 100, 101, 99, 200, 199, 0, 1, -1, 150].forEach((offset, i) => {
        dispatchScroll(offset);
        expect(getTriggerValue()).to.equal('false', `Index: ${i} Offset: ${offset}`);
      });
    });

    it('should trigger above default threshold with ref', () => {
      render(<Test customContainer />);
      dispatchScroll(300, getContainer());
      expect(getTriggerValue()).to.equal('true');
    });

    it('should have correct hysteresis triggering threshold with ref', () => {
      render(<Test customContainer />);
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
        expect(getTriggerValue()).to.equal(test.result, `Index: ${index} ${JSON.stringify(test)}`);
      });
    });

    it('should have correct hysteresis triggering with default threshold with ref', () => {
      render(<Test customContainer disableHysteresis />);
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
        expect(getTriggerValue()).to.equal(test.result, `Index: ${index} ${JSON.stringify(test)}`);
      });
    });

    it('should have correct hysteresis triggering with custom threshold with ref', () => {
      render(<Test customContainer disableHysteresis threshold={50} />);
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
        expect(getTriggerValue()).to.equal(test.result, `Index: ${index} ${JSON.stringify(test)}`);
      });
    });

    it('should not trigger at exact threshold value with ref', () => {
      render(<Test customContainer threshold={100} />);
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
        expect(getTriggerValue()).to.equal(test.result, `Index: ${index} ${JSON.stringify(test)}`);
      });
    });

    it('should not trigger at exact threshold value with hysteresis disabled with ref', () => {
      render(<Test customContainer disableHysteresis threshold={100} />);
      [
        { offset: 100, result: 'false' },
        { offset: 99, result: 'false' },
        { offset: 100, result: 'false' },
        { offset: 101, result: 'true' },
        { offset: 100, result: 'false' },
        { offset: 99, result: 'false' },
      ].forEach((test, index) => {
        dispatchScroll(test.offset, getContainer());
        expect(getTriggerValue()).to.equal(test.result, `Index: ${index} ${JSON.stringify(test)}`);
      });
    });

    it('should correctly evaluate sequential scroll events with identical scrollY offsets with ref', () => {
      render(<Test customContainer threshold={199} />);
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
        expect(getTriggerValue()).to.equal(test.result, `Index: ${index} ${JSON.stringify(test)}`);
      });
    });

    it('should correctly evaluate sequential scroll events with identical scrollY offsets and hysteresis disabled with ref', () => {
      render(<Test customContainer disableHysteresis threshold={199} />);
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
        expect(getTriggerValue()).to.equal(test.result, `Index: ${index} ${JSON.stringify(test)}`);
      });
    });

    it('should correctly evaluate scroll events on page first load', () => {
      [
        { offset: 101, result: 'true' },
        { offset: 100, result: 'false' },
      ].forEach((test, index) => {
        window.pageYOffset = test.offset;
        render(<Test threshold={100} />);
        expect(getTriggerValue()).to.equal(test.result, `Index: ${index} ${JSON.stringify(test)}`);
      });
    });

    // https://github.com/mui/material-ui/issues/46589
    describe('layout resize, e.g. Collapse inside a sticky AppBar', () => {
      function setScrollHeight(element, value) {
        Object.defineProperty(element, 'scrollHeight', { value, configurable: true });
      }

      // Simulates a collapsible section inside a sticky AppBar: triggering the collapse
      // shrinks the page, and scroll anchoring shifts the scroll position along with it.
      const scrollSequence = [
        // establish a baseline below the threshold
        { offset: 50, height: 1000, result: 'false' },
        // user scrolls down past the threshold => trigger, the collapse starts
        { offset: 150, height: 1000, result: 'true' },
        // the collapse shrinks the page, shifting the scroll position up without
        // any scrolling from the user
        { offset: 130, height: 980, result: 'true' },
        { offset: 110, height: 960, result: 'true' },
        { offset: 94, height: 944, result: 'true' },
        // collapse finished, user keeps scrolling down below the original threshold
        { offset: 96, height: 944, result: 'true' },
        { offset: 98, height: 944, result: 'true' },
        // user scrolls up => untrigger, the collapsed section expands again
        { offset: 95, height: 944, result: 'false' },
        // the expand grows the page, shifting the scroll position down
        { offset: 115, height: 964, result: 'false' },
        { offset: 135, height: 984, result: 'false' },
        { offset: 151, height: 1000, result: 'false' },
        // genuine scrolling keeps behaving as usual
        { offset: 150, height: 1000, result: 'false' },
        { offset: 155, height: 1000, result: 'true' },
      ];

      it('should not flip-flop when a scroll container resize shifts the scroll position', () => {
        render(<Test customContainer />);
        scrollSequence.forEach((test, index) => {
          setScrollHeight(getContainer(), test.height);
          dispatchScroll(test.offset, getContainer());
          expect(getTriggerValue()).to.equal(test.result, `Index: ${index} ${JSON.stringify(test)}`);
        });
      });

      it('should not flip-flop when a page resize shifts the window scroll position', () => {
        try {
          setScrollHeight(document.documentElement, 1000);
          render(<Test />);
          scrollSequence.forEach((test, index) => {
            setScrollHeight(document.documentElement, test.height);
            dispatchScroll(test.offset);
            expect(getTriggerValue()).to.equal(test.result, `Index: ${index} ${JSON.stringify(test)}`);
          });
        } finally {
          // restore the prototype getter
          delete document.documentElement.scrollHeight;
        }
      });
    });
  });
});
