/// <reference types="chai-dom" />

declare namespace Chai {
  interface Assertion {
    /**
     * checks if the element in question is considered aria-hidden
     * Does not replace accessibility check as that requires display/visibility/layout
     */
    ariaHidden: Assertion;
    /**
     * checks if the element is focused
     */
    focused: Assertion;
  }
}
