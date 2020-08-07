/// <reference types="chai-dom" />

declare namespace Chai {
  interface Assertion {
    /**
     * checks if the element in question is considered aria-hidden
     * Does not replace accessibility check as that requires display/visibility/layout
     * @deprecated Use `inaccessible` + `visible` instead
     */
    toBeAriaHidden(): void;
    /**
     * Check if an element is not visually hidden
     */
    toBeVisible(): void;
    /**
     * checks if the element is inaccessible
     */
    toBeInaccessible(): void;
    /**
     * checks if the accessible name computation (according to `accname` spec)
     * matches the expectation.
     * @see https://www.w3.org/TR/accname-1.2/
     * @param name
     */
    toHaveAccessibleName(name: string): void;
    /**
     * checks if the element is focused
     */
    toHaveFocus(): void;
  }
}
