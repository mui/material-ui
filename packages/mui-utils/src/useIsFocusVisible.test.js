import { expect } from 'chai';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  act,
  createRenderer,
  focusVisible,
  simulatePointerDevice,
  programmaticFocusTriggersFocusVisible,
} from 'test/utils';
import useIsFocusVisible, { teardown as teardownFocusVisible } from './useIsFocusVisible';
import useForkRef from './useForkRef';

const SimpleButton = React.forwardRef(function SimpleButton(props, ref) {
  const {
    isFocusVisibleRef,
    onBlur: handleBlurVisible,
    onFocus: handleFocusVisible,
    ref: focusVisibleRef,
  } = useIsFocusVisible();

  const handleRef = useForkRef(focusVisibleRef, ref);

  const [isFocusVisible, setIsFocusVisible] = React.useState(false);

  const handleBlur = (event) => {
    handleBlurVisible(event);
    if (isFocusVisibleRef.current === false) {
      setIsFocusVisible(false);
    }
  };

  const handleFocus = (event) => {
    handleFocusVisible(event);
    if (isFocusVisibleRef.current === true) {
      setIsFocusVisible(true);
    }
  };

  return (
    <button
      type="button"
      {...props}
      ref={handleRef}
      className={isFocusVisible ? 'focus-visible' : null}
      onBlur={handleBlur}
      onFocus={handleFocus}
    />
  );
});

describe('useIsFocusVisible', () => {
  const { render } = createRenderer();

  before(() => {
    // isolate test from previous component test that use the polyfill in the document scope
    teardownFocusVisible(document);
  });

  describe('focus inside shadowRoot', () => {
    before(function beforeHook() {
      // Only run on HeadlessChrome which has native shadowRoot support.
      // And jsdom which has limited support for shadowRoot (^12.0.0).
      if (!/HeadlessChrome|jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }
    });

    let rootElement;

    beforeEach(() => {
      rootElement = document.createElement('div');
      document.body.appendChild(rootElement);
      rootElement.attachShadow({ mode: 'open' });
    });

    afterEach(() => {
      ReactDOM.unmountComponentAtNode(rootElement.shadowRoot);
      teardownFocusVisible(rootElement.shadowRoot);
      document.body.removeChild(rootElement);
    });

    it('should set focus state for shadowRoot children', () => {
      const buttonRef = React.createRef();
      render(
        <SimpleButton id="test-button" ref={buttonRef}>
          Hello
        </SimpleButton>,
        {},
        {
          container: rootElement.shadowRoot,
        },
      );
      simulatePointerDevice();

      const { current: button } = buttonRef;
      if (button.nodeName !== 'BUTTON') {
        throw new Error('missing button');
      }

      expect(button.classList.contains('focus-visible')).to.equal(false);

      act(() => {
        button.focus();
      });

      if (programmaticFocusTriggersFocusVisible()) {
        expect(button).to.have.class('focus-visible');
      } else {
        expect(button).not.to.have.class('focus-visible');
      }

      act(() => {
        button.blur();
      });
      focusVisible(button);

      expect(button.classList.contains('focus-visible')).to.equal(true);
    });
  });
});
