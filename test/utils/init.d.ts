/// <reference types="chai-dom" />

declare namespace Chai {
  interface Assertion {
    /**
     * checks if the element in question is considered aria-hidden
     * Does not replace accessibility check as that requires display/visibility/layout
     * @deprecated Use `inaccessible` + `visible` instead
     */
    toBeAriaHidden(): Assertion;
    /**
     * Check if an element is not visually hidden
     */
    toBeVisible(): Assertion;
    /**
     * checks if the element is inaccessible
     */
    toBeInaccessible(): Assertion;
    /**
     * checks if the accessible name computation (according to `accname` spec)
     * matches the expectation.
     * @see https://www.w3.org/TR/accname-1.2/
     * @param name
     */
    toHaveAccessibleName(name: string): Assertion;
    /**
     * checks if the element is focused
     */
    toHaveFocus(): Assertion;
  }
}
