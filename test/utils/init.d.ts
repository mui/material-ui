/// <reference types="chai-dom" />

declare namespace Chai {
  interface Assertion {
    /**
     * checks if the element is inaccessible
     */
    inaccessible: Assertion;
    /**
     * checks if the element is focused
     */
    focused: Assertion;
  }
}
