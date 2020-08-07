import chai from 'chai';
import chaiDom from 'chai-dom';
import { isInaccessible } from '@testing-library/dom';
import { prettyDOM } from '@testing-library/react/pure';
import { computeAccessibleName } from 'dom-accessibility-api';
import formatUtil from 'format-util';

function isInKarma() {
  return !/jsdom/.test(window.navigator.userAgent);
}

// chai#utils.elToString that looks like stringified elements in testing-library
function elementToString(element) {
  if (typeof element?.nodeType === 'number') {
    return prettyDOM(element, undefined, { highlight: !isInKarma(), maxDepth: 1 });
  }
  return String(element);
}

chai.use(chaiDom);
chai.use((chaiAPI, utils) => {
  // better diff view for expect(element).to.equal(document.activeElement)
  chai.Assertion.addMethod('toHaveFocus', function elementIsFocused() {
    const element = utils.flag(this, 'object');

    this.assert(
      element === document.activeElement,
      // karma does not show the diff like mocha does
      `expected element to have focus${isInKarma() ? '\nexpected #{exp}\nactual: #{act}' : ''}`,
      `expected element to NOT have focus \n${elementToString(element)}`,
      elementToString(element),
      elementToString(document.activeElement),
    );
  });

  chai.Assertion.addMethod('toHaveVirtualFocus', function elementIsVirtuallyFocused() {
    const element = utils.flag(this, 'object');
    const id = element.getAttribute('id');

    const virutallyFocusedElement = document.activeElement.getAttribute('aria-activedescendant');

    this.assert(
      virutallyFocusedElement === id,
      `expected element to be virtually focused${
        isInKarma() ? '\nexpected #{exp}\nactual: #{act}' : ''
      }`,
      'expected element to NOT to be virtually focused',
      elementToString(document.getElementById(id)),
      elementToString(virutallyFocusedElement),
    );
  });

  chai.Assertion.addMethod('toBeAriaHidden', function elementIsAccessible() {
    const element = utils.flag(this, 'object');

    // used for debugging failed assertions, will either point to the top most node
    // or the node that had aria-hidden="true"
    let previousNode = element;
    let currentNode = element;
    let ariaHidden = false;
    // "An element is considered hidden if it, or any of its ancestors are not
    // rendered or have their aria-hidden attribute value set to true."
    // -- https://www.w3.org/TR/wai-aria-1.1/#aria-hidden
    while (
      currentNode !== null &&
      // stoping at <html /> so that failed assertion message only prints
      // <body /> or below. use cases for aria-hidden on <html /> are unknown
      currentNode !== document.documentElement &&
      ariaHidden === false
    ) {
      ariaHidden = currentNode.getAttribute('aria-hidden') === 'true';
      previousNode = currentNode;
      currentNode = currentNode.parentElement;
    }

    this.assert(
      ariaHidden === true,
      `expected \n${elementToString(element)} to be aria-hidden`,
      `expected \n${elementToString(element)} to not be aria-hidden, but \n${elementToString(
        previousNode,
      )} had aria-hidden="true" instead`,
    );
  });

  chai.Assertion.addMethod('toBeInaccessible', function elementIsAccessible() {
    const element = utils.flag(this, 'object');

    const inaccessible = isInaccessible(element);

    this.assert(
      inaccessible === true,
      `expected \n${elementToString(element)} to be inaccessible but it was accessible`,
      `expected \n${elementToString(element)} to be accessible but it was inaccessible`,
    );
  });

  chai.Assertion.addMethod('toHaveAccessibleName', function hasAccessibleName(expectedName) {
    const root = utils.flag(this, 'object');
    // make sure it's an Element
    new chai.Assertion(root.nodeType, `Expected an Element but got '${String(root)}'`).to.equal(1);

    const blockElements = new Set(
      'html',
      'address',
      'blockquote',
      'body',
      'dd',
      'div',
      'dl',
      'dt',
      'fieldset',
      'form',
      'frame',
      'frameset',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'noframes',
      'ol',
      'p',
      'ul',
      'center',
      'dir',
      'hr',
      'menu',
      'pre',
    );
    /**
     *
     * @param {Element} element
     * @returns {CSSStyleDeclaration}
     */
    function pretendVisibleGetComputedStyle(element) {
      // `CSSStyleDeclaration` is not constructable
      // https://stackoverflow.com/a/52732909/3406963
      // this is not equivalent to the declaration from `getComputedStyle`
      // e.g `getComputedStyle` would return a readonly declaration
      // let's hope this doesn't get passed around until it's no longer clear where it comes from
      const declaration = document.createElement('span').style;

      // initial values
      declaration.content = '';
      // technically it's `inline`. We partially apply the default user agent sheet (chrome) here
      // we're only interested in elements that use block
      declaration.display = blockElements.has(element.tagName) ? 'block' : 'inline';
      declaration.visibility = 'visible';

      return declaration;
    }

    const actualName = computeAccessibleName(root, {
      // in local development we pretend to be visible. full getComputedStyle is
      // expensive and reserved for CI
      getComputedStyle: process.env.CI ? undefined : pretendVisibleGetComputedStyle,
    });

    this.assert(
      actualName === expectedName,
      `expected \n${elementToString(root)} to have accessible name #{exp} but got #{act} instead.`,
      `expected \n${elementToString(root)} not to have accessible name #{exp}.`,
      expectedName,
      actualName,
    );
  });

  /**
   * Correct name for `to.be.visible`
   */
  chai.Assertion.addMethod('toBeVisible', function toBeVisible() {
    // eslint-disable-next-line no-underscore-dangle, @typescript-eslint/no-unused-expressions
    new chai.Assertion(this._obj).to.be.visible;
  });
});

chai.use((chaiAPI, utils) => {
  function addConsoleMatcher(matcherName, methodName) {
    /**
     * @param {string[]} expectedMessages
     */
    function matcher(expectedMessages = []) {
      // documented pattern to get the actual value of the assertion
      // eslint-disable-next-line no-underscore-dangle
      const callback = this._obj;

      if (process.env.NODE_ENV !== 'production') {
        const remainingMessages =
          typeof expectedMessages === 'string' ? [expectedMessages] : expectedMessages.slice();
        const unexpectedMessages = [];
        let caughtError = null;

        this.assert(
          remainingMessages.length > 0,
          `Expected to call console.${methodName} but didn't provide messages. ` +
            `If you don't expect any messages prefer \`expect().not.${matcherName}();\`.`,
          `Expected no call to console.${methodName} while also expecting messages.` +
            'Expected no call to console.error but provided messages. ' +
            "If you want to make sure a certain message isn't logged prefer the positive. " +
            'By expecting certain messages you automatically expect that no other messages are logged',
        );

        // eslint-disable-next-line no-console
        const originalMethod = console[methodName];

        const consoleMatcher = (format, ...args) => {
          const actualMessage = formatUtil(format, ...args);
          const expectedMessage = remainingMessages.shift();

          let message = null;
          if (expectedMessage === undefined) {
            message = `Expected no more error messages but got:\n"${actualMessage}"`;
          } else if (!actualMessage.includes(expectedMessage)) {
            message = `Expected "${actualMessage}"\nto include\n"${expectedMessage}"`;
          }

          if (message !== null) {
            const error = new Error(message);

            const { stack: fullStack } = error;
            const fullStacktrace = fullStack.replace(`Error: ${message}\n`, '').split('\n');

            const usefulStacktrace = fullStacktrace
              //
              // first line points to this frame which is irrelevant for the tester
              .slice(1);
            const usefulStack = `${message}\n${usefulStacktrace.join('\n')}`;

            error.stack = usefulStack;
            unexpectedMessages.push(error);
          }
        };
        // eslint-disable-next-line no-console
        console[methodName] = consoleMatcher;

        try {
          callback();
        } catch (error) {
          caughtError = error;
        } finally {
          // eslint-disable-next-line no-console
          console[methodName] = originalMethod;

          // unexpected thrown error takes precedence over unexpected console call
          if (caughtError !== null) {
            // not the same pattern as described in the block because we don't rethrow in the catch
            // eslint-disable-next-line no-unsafe-finally
            throw caughtError;
          }

          const formatMessages = (messages) => {
            const formattedMessages = messages.map((message) => {
              if (typeof message === 'string') {
                return `"${message}"`;
              }
              // full Error
              return `${message.stack}`;
            });
            return `\n\n  - ${formattedMessages.join('\n\n-  ')}`;
          };

          const shouldHaveWarned = utils.flag(this, 'negate') !== true;

          // unreachable from expect().not.toWarnDev(messages)
          if (unexpectedMessages.length > 0) {
            const unexpectedMessageRecordedMessage = `Recorded unexpected console.${methodName} calls: ${formatMessages(
              unexpectedMessages,
            )}`;
            // chai will duplicate the stack frames from the unexpected calls in their assertion error
            // it's not ideal but the test failure is located the second to last stack frame
            // and the origin of the call is the second stackframe in the stack
            this.assert(
              // force chai to always trigger an assertion error
              !shouldHaveWarned,
              unexpectedMessageRecordedMessage,
              unexpectedMessageRecordedMessage,
            );
          }

          if (shouldHaveWarned) {
            this.assert(
              remainingMessages.length === 0,
              `Could not match the following console.${methodName} calls. ` +
                `Make sure previous actions didn't call console.${methodName} by wrapping them in expect(() => {}).not.${matcherName}(): ${formatMessages(
                  remainingMessages,
                )}`,
              `Impossible state reached in \`expect().${matcherName}()\`. ` +
                `This is a bug in the matcher.`,
            );
          }
        }
      } else {
        // nothing to do in prod
        // If there are still console calls than our test setup throws.
        callback();
      }
    }

    chai.Assertion.addMethod(matcherName, matcher);
    /* eslint-enable no-console */
  }

  /**
   * @example expect(() => render()).toWarnDev('single message')
   * @example expect(() => render()).toWarnDev(['first warning', 'then the second'])
   */
  addConsoleMatcher('toWarnDev', 'warn');
  addConsoleMatcher('toErrorDev', 'error');
});
