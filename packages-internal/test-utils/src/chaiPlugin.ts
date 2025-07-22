import { isInaccessible } from '@testing-library/dom';
import { prettyDOM } from '@testing-library/react/pure';
import type chaiType from 'chai';
import { AssertionError } from 'chai';
import { computeAccessibleDescription, computeAccessibleName } from 'dom-accessibility-api';
import formatUtil from 'format-util';
import _ from 'lodash';
import './chai.types';

const isKarma = Boolean(process.env.KARMA);

function isInJSDOM() {
  return /jsdom/.test(window.navigator.userAgent);
}

// chai#utils.elToString that looks like stringified elements in testing-library
function elementToString(element: Element | null | undefined) {
  if (typeof element?.nodeType === 'number') {
    return prettyDOM(element, undefined, { highlight: !isKarma, maxDepth: 1 });
  }
  return String(element);
}

const chaiPlugin: Parameters<(typeof chaiType)['use']>[0] = (chaiAPI, utils) => {
  const blockElements = new Set([
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
  ]);

  function pretendVisibleGetComputedStyle(element: Element): CSSStyleDeclaration {
    // `CSSStyleDeclaration` is not constructable
    // https://stackoverflow.com/a/52732909/3406963
    // this is not equivalent to the declaration from `getComputedStyle`
    // for example `getComputedStyle` would return a readonly declaration
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

  // better diff view for expect(element).to.equal(document.activeElement)
  chaiAPI.Assertion.addMethod('toHaveFocus', function elementIsFocused() {
    const element = utils.flag(this, 'object');

    this.assert(
      element === document.activeElement,
      // karma does not show the diff like mocha does
      `expected element to have focus${isKarma ? '\nexpected #{exp}\nactual: #{act}' : ''}`,
      `expected element to NOT have focus \n${elementToString(element)}`,
      elementToString(element),
      elementToString(document.activeElement),
    );
  });

  chaiAPI.Assertion.addMethod('toHaveVirtualFocus', function elementIsVirtuallyFocused() {
    const element = utils.flag(this, 'object');
    const id = element.getAttribute('id');

    const virtuallyFocusedElementId = document.activeElement!.getAttribute('aria-activedescendant');

    this.assert(
      virtuallyFocusedElementId === id,
      `expected element to be virtually focused\nexpected id #{exp}\n${
        virtuallyFocusedElementId === null
          ? `activeElement: ${elementToString(document.activeElement)}`
          : 'actual id: #{act}'
      }`,
      'expected element to NOT to be virtually focused',
      id,
      virtuallyFocusedElementId,
      virtuallyFocusedElementId !== null,
    );
  });

  chaiAPI.Assertion.addMethod('toBeInaccessible', function elementIsAccessible() {
    const element = utils.flag(this, 'object');

    const inaccessible = isInaccessible(element);

    this.assert(
      inaccessible === true,
      `expected \n${elementToString(element)} to be inaccessible but it was accessible`,
      `expected \n${elementToString(element)} to be accessible but it was inaccessible`,
      // Not interested in a diff but the typings require the 4th parameter.
      undefined,
    );
  });

  chaiAPI.Assertion.addMethod('toHaveAccessibleName', function hasAccessibleName(expectedName) {
    const root = utils.flag(this, 'object');
    // make sure it's an Element
    new chaiAPI.Assertion(root.nodeType, `Expected an Element but got '${String(root)}'`).to.equal(
      1,
    );

    const actualName = computeAccessibleName(root, {
      computedStyleSupportsPseudoElements: !isInJSDOM(),
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

  chaiAPI.Assertion.addMethod(
    'toHaveAccessibleDescription',
    function hasAccessibleDescription(expectedDescription) {
      const root = utils.flag(this, 'object');
      // make sure it's an Element
      new chaiAPI.Assertion(
        root.nodeType,
        `Expected an Element but got '${String(root)}'`,
      ).to.equal(1);

      const actualDescription = computeAccessibleDescription(root, {
        // in local development we pretend to be visible. full getComputedStyle is
        // expensive and reserved for CI
        getComputedStyle: process.env.CI ? undefined : pretendVisibleGetComputedStyle,
      });

      const possibleDescriptionComputationMessage = root.hasAttribute('title')
        ? ' computeAccessibleDescription can be misleading when a `title` attribute is used. This might be a bug in `dom-accessibility-api`.'
        : '';
      this.assert(
        actualDescription === expectedDescription,
        `expected \n${elementToString(
          root,
        )} to have accessible description #{exp} but got #{act} instead.${possibleDescriptionComputationMessage}`,
        `expected \n${elementToString(
          root,
        )} not to have accessible description #{exp}.${possibleDescriptionComputationMessage}`,
        expectedDescription,
        actualDescription,
      );
    },
  );

  /**
   * Correct name for `to.be.visible`
   */
  chaiAPI.Assertion.addMethod('toBeVisible', function toBeVisible() {
    // eslint-disable-next-line no-underscore-dangle, @typescript-eslint/no-unused-expressions
    new chaiAPI.Assertion(this._obj).to.be.visible;
  });

  /**
   * Correct name for `not.to.be.visible`
   */
  chaiAPI.Assertion.addMethod('toBeHidden', function toBeHidden() {
    // eslint-disable-next-line no-underscore-dangle, @typescript-eslint/no-unused-expressions
    new chaiAPI.Assertion(this._obj).not.to.be.visible;
  });

  function assertMatchingStyles(
    this: Chai.AssertionStatic,
    actualStyleDeclaration: CSSStyleDeclaration,
    expectedStyleUnnormalized: Record<string, string>,
    options: { styleTypeHint: string },
  ): void {
    const { styleTypeHint } = options;

    // Compare objects using hyphen case.
    // This is closer to actual CSS and required for getPropertyValue anyway.
    const expectedStyle: Record<string, string> = {};
    Object.keys(expectedStyleUnnormalized).forEach((cssProperty) => {
      const hyphenCasedPropertyName = _.kebabCase(cssProperty);
      const isVendorPrefixed = /^(moz|ms|o|webkit)-/.test(hyphenCasedPropertyName);
      const propertyName = isVendorPrefixed
        ? `-${hyphenCasedPropertyName}`
        : hyphenCasedPropertyName;
      expectedStyle[propertyName] = expectedStyleUnnormalized[cssProperty];
    });

    const shorthandProperties = new Set([
      'all',
      'animation',
      'background',
      'border',
      'border-block-end',
      'border-block-start',
      'border-bottom',
      'border-color',
      'border-image',
      'border-inline-end',
      'border-inline-start',
      'border-left',
      'border-radius',
      'border-right',
      'border-style',
      'border-top',
      'border-width',
      'column-rule',
      'columns',
      'flex',
      'flex-flow',
      'font',
      'gap',
      'grid',
      'grid-area',
      'grid-column',
      'grid-row',
      'grid-template',
      'list-style',
      'margin',
      'mask',
      'offset',
      'outline',
      'overflow',
      'padding',
      'place-content',
      'place-items',
      'place-self',
      'scroll-margin',
      'scroll-padding',
      'text-decoration',
      'text-emphasis',
      'transition',
    ]);
    const usedShorthandProperties = Object.keys(expectedStyle).filter((cssProperty) => {
      return shorthandProperties.has(cssProperty);
    });
    if (usedShorthandProperties.length > 0) {
      throw new Error(
        [
          `Shorthand properties are not supported in ${styleTypeHint} styles matchers since browsers can compute them differently. `,
          'Use longhand properties instead for the follow shorthand properties:\n',
          usedShorthandProperties
            .map((cssProperty) => {
              return `- https://developer.mozilla.org/en-US/docs/Web/CSS/${cssProperty}#constituent_properties`;
            })
            .join('\n'),
        ].join(''),
      );
    }

    const actualStyle: Record<string, string> = {};
    Object.keys(expectedStyle).forEach((cssProperty) => {
      actualStyle[cssProperty] = actualStyleDeclaration.getPropertyValue(cssProperty);
    });

    const jsdomHint =
      'Styles in JSDOM e.g. from `test:unit` are often misleading since JSDOM does not implement the Cascade nor actual CSS property value computation. ' +
      'If results differ between real browsers and JSDOM, skip the test in JSDOM e.g. `if (/jsdom/.test(window.navigator.userAgent)) this.skip();`';
    const shorthandHint =
      'Browsers can compute shorthand properties differently. Prefer longhand properties e.g. `borderTopColor`, `borderRightColor` etc. instead of `border` or `border-color`.';
    const messageHint = `${jsdomHint}\n${shorthandHint}`;

    if (isKarma) {
      // `#{exp}` and `#{act}` placeholders escape the newlines
      const expected = JSON.stringify(expectedStyle, null, 2);
      const actual = JSON.stringify(actualStyle, null, 2);
      // karma's `dots` reporter does not support diffs
      this.assert(
        // TODO Fix upstream docs/types
        (utils as any).eql(actualStyle, expectedStyle),
        `expected ${styleTypeHint} style of #{this} did not match\nExpected:\n${expected}\nActual:\n${actual}\n\n\n${messageHint}`,
        `expected #{this} to not have ${styleTypeHint} style\n${expected}\n\n\n${messageHint}`,
        expectedStyle,
        actualStyle,
      );
    } else {
      this.assert(
        // TODO Fix upstream docs/types
        (utils as any).eql(actualStyle, expectedStyle),
        `expected #{this} to have ${styleTypeHint} style #{exp} \n\n${messageHint}`,
        `expected #{this} not to have ${styleTypeHint} style #{exp}${messageHint}`,
        expectedStyle,
        actualStyle,
        true,
      );
    }
  }

  chaiAPI.Assertion.addMethod(
    'toHaveInlineStyle',
    function toHaveInlineStyle(expectedStyleUnnormalized: Record<string, string>) {
      const element = utils.flag(this, 'object') as HTMLElement;
      if (element?.nodeType !== 1) {
        // Same pre-condition for negated and unnegated assertion
        throw new AssertionError(`Expected an Element but got ${String(element)}`);
      }

      assertMatchingStyles.call(this, element.style, expectedStyleUnnormalized, {
        styleTypeHint: 'inline',
      });
    },
  );

  chaiAPI.Assertion.addMethod(
    'toHaveComputedStyle',
    function toHaveComputedStyle(expectedStyleUnnormalized: Record<string, string>) {
      const element = utils.flag(this, 'object') as HTMLElement;
      if (element?.nodeType !== 1) {
        // Same pre-condition for negated and unnegated  assertion
        throw new AssertionError(`Expected an Element but got ${String(element)}`);
      }
      const computedStyle = element.ownerDocument.defaultView!.getComputedStyle(element);

      assertMatchingStyles.call(this, computedStyle, expectedStyleUnnormalized, {
        styleTypeHint: 'computed',
      });
    },
  );

  chaiAPI.Assertion.addMethod('toThrowMinified', function toThrowMinified(expectedDevMessage) {
    // TODO: Investigate if `as any` can be removed after https://github.com/DefinitelyTyped/DefinitelyTyped/issues/48634 is resolved.
    if (process.env.NODE_ENV !== 'production') {
      (this as any).to.throw(expectedDevMessage);
    } else {
      utils.flag(
        this,
        'message',
        "Looks like the error was not minified. This can happen if the error code hasn't been generated yet. Run `pnpm extract-error-codes` and try again.",
      );
      // TODO: Investigate if `as any` can be removed after https://github.com/DefinitelyTyped/DefinitelyTyped/issues/48634 is resolved.
      (this as any).to.throw('Minified MUI error', 'helper');
    }
  });

  function addConsoleMatcher(matcherName: string, methodName: 'error' | 'warn') {
    /**
     * @param {string[]} expectedMessages
     */
    function matcher(this: Chai.AssertionStatic, expectedMessagesInput = []) {
      // documented pattern to get the actual value of the assertion
      // eslint-disable-next-line no-underscore-dangle
      const callback = this._obj;

      if (process.env.NODE_ENV !== 'production') {
        const expectedMessages =
          typeof expectedMessagesInput === 'string'
            ? [expectedMessagesInput]
            : expectedMessagesInput.slice();
        const unexpectedMessages: Error[] = [];
        // TODO Remove type once MUI X enables noImplicitAny
        let caughtError: unknown | null = null;

        this.assert(
          expectedMessages.length > 0,
          `Expected to call console.${methodName} but didn't provide messages. ` +
            `If you don't expect any messages prefer \`expect().not.${matcherName}();\`.`,
          `Expected no call to console.${methodName} while also expecting messages.` +
            'Expected no call to console.error but provided messages. ' +
            "If you want to make sure a certain message isn't logged prefer the positive. " +
            'By expecting certain messages you automatically expect that no other messages are logged',
          // Not interested in a diff but the typings require the 4th parameter.
          undefined,
        );

        // Ignore skipped messages in e.g. `[condition && 'foo']`
        const remainingMessages = expectedMessages.filter((messageOrFalse) => {
          return messageOrFalse !== false;
        });

        // eslint-disable-next-line no-console
        const originalMethod = console[methodName];

        let messagesMatched = 0;
        const consoleMatcher = (format: string, ...args: readonly unknown[]) => {
          // Ignore legacy root deprecation warnings
          // TODO: Remove once we no longer use legacy roots.
          if (
            format.includes('Use createRoot instead.') ||
            format.includes('Use hydrateRoot instead.')
          ) {
            return;
          }
          const actualMessage = formatUtil(format, ...args);
          const expectedMessage = remainingMessages.shift();
          messagesMatched += 1;

          // TODO Remove type once MUI X enables noImplicitAny
          let message: string | null = null;
          if (expectedMessage === undefined) {
            message = `Expected no more error messages but got:\n"${actualMessage}"`;
          } else if (!actualMessage.includes(expectedMessage)) {
            message = `Expected #${messagesMatched} "${expectedMessage}" to be included in \n"${actualMessage}"`;
          }

          if (message !== null) {
            const error = new Error(message);

            const { stack: fullStack } = error;
            const fullStacktrace = fullStack!.replace(`Error: ${message}\n`, '').split('\n');

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

          const formatMessages = (messages: ReadonlyArray<Error | string>) => {
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
              // Not interested in a diff but the typings require the 4th parameter.
              undefined,
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
              // Not interested in a diff but the typings require the 4th parameter.
              undefined,
            );
          }
        }
      } else {
        // nothing to do in prod
        // If there are still console calls than our test setup throws.
        callback();
      }
    }

    chaiAPI.Assertion.addMethod(matcherName, matcher);
  }

  /**
   * @example expect(() => render()).toWarnDev('single message')
   * @example expect(() => render()).toWarnDev(['first warning', 'then the second'])
   */
  addConsoleMatcher('toWarnDev', 'warn');
  addConsoleMatcher('toErrorDev', 'error');
};

export default chaiPlugin;
