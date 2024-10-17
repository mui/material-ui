export {};

// https://stackoverflow.com/a/46755166/3406963
declare global {
  namespace Chai {
    interface Assertion {
      /**
       * Checks `expectedStyle` is a subset of the elements inline style i.e. `element.style`.
       * @example expect(element).toHaveInlineStyle({ width: '200px' })
       */
      toHaveInlineStyle(
        expectedStyle: Partial<
          Record<
            Exclude<
              keyof CSSStyleDeclaration,
              | 'getPropertyPriority'
              | 'getPropertyValue'
              | 'item'
              | 'removeProperty'
              | 'setProperty'
              | number
            >,
            string
          >
        >,
      ): void;
      /**
       * Checks `expectedStyle` is a subset of the elements computed style i.e. `window.getComputedStyle(element)`.
       * @example expect(element).toHaveComputedStyle({ width: '200px' })
       */
      toHaveComputedStyle(
        expectedStyle: Partial<
          Record<
            Exclude<
              keyof CSSStyleDeclaration,
              | 'getPropertyPriority'
              | 'getPropertyValue'
              | 'item'
              | 'removeProperty'
              | 'setProperty'
              | number
            >,
            string
          >
        >,
      ): void;
      /**
       * Check if an element's [`visibility`](https://developer.mozilla.org/en-US/docs/Web/CSS/visibility) is not `hidden` or `collapsed`.
       */
      toBeVisible(): void;
      /**
       * Check if an element's [`visibility`](https://developer.mozilla.org/en-US/docs/Web/CSS/visibility) is `hidden` or `collapsed`.
       */
      toBeHidden(): void;
      /**
       * Checks if the element is inaccessible.
       *
       * Elements are considered inaccessible if they either:
       * - have [`visibility`](https://developer.mozilla.org/en-US/docs/Web/CSS/visibility) `hidden`
       * - have [`display`](https://developer.mozilla.org/en-US/docs/Web/CSS/display) `none`
       * - have `aria-hidden` `true` or any of their parents
       *
       * @see [Excluding Elements from the Accessibility Tree](https://www.w3.org/TR/wai-aria-1.2/#tree_exclusion)
       */
      toBeInaccessible(): void;
      toHaveAccessibleDescription(description: string): void;
      /**
       * Checks if the accessible name computation (according to `accname` spec)
       * matches the expectation.
       *
       * @see https://www.w3.org/TR/accname-1.2/
       * @param name
       */
      toHaveAccessibleName(name: string): void;
      /**
       * Checks if the element is actually focused i.e. `document.activeElement` is equal to the actual element.
       */
      toHaveFocus(): void;
      /**
       * Checks if the element is the active-descendant of the active element.
       */
      toHaveVirtualFocus(): void;
      /**
       * Matches calls to `console.warn` in the asserted callback.
       *
       * @example expect(() => render()).not.toWarnDev()
       * @example expect(() => render()).toWarnDev('single message')
       * @example expect(() => render()).toWarnDev(['first warning', 'then the second'])
       */
      toWarnDev(messages?: string | readonly (string | boolean)[]): void;
      /**
       * Matches calls to `console.error` in the asserted callback.
       *
       * @example expect(() => render()).not.toErrorDev()
       * @example expect(() => render()).toErrorDev('single message')
       * @example expect(() => render()).toErrorDev(['first warning', 'then the second'])
       */
      toErrorDev(messages?: string | readonly (string | boolean)[]): void;
      /**
       * Asserts that the given callback throws an error matching the given message in development (process.env.NODE_ENV !== 'production').
       * In production it expects a minified error.
       */
      toThrowMinified(message: string): void;
    }
  }
}
