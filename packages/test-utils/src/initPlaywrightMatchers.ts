import chai, { AssertionError } from 'chai';
import * as DomTestingLibrary from '@testing-library/dom';
import type { ElementHandle } from 'playwright';

// https://stackoverflow.com/a/46755166/3406963
declare global {
  namespace Chai {
    interface Assertion {
      /**
       * Checks if the element handle is actually focused i.e. the element handle is pointing to `document.activeElement`.
       */
      toHaveFocus(): Promise<void>;
      /**
       * Checks if the element handle has the given attribute.
       * @example expect($element).toHaveAttribute('aria-expanded') is like `[aria-expanded]` CSS selector
       * @example expect($element).toHaveAttribute('aria-expanded', 'true') is like `[aria-expanded="true"]` CSS selector
       */
      toHaveAttribute(attributeName: string, attributeValue?: string): Promise<void>;
    }
  }

  interface Window {
    DomTestingLibrary: typeof DomTestingLibrary;
    /**
     * @example $element.evaluate(element => window.pageElementToString(element))
     */
    elementToString(element: Node | null | undefined): string | false;
  }
}

chai.use((chaiAPI, utils) => {
  chai.Assertion.addMethod('toHaveFocus', async function elementHandleIsFocused() {
    const $elementOrHandle: ElementHandle | Promise<ElementHandle> = utils.flag(this, 'object');
    if ($elementOrHandle == null) {
      throw new AssertionError(`Expected an element handle but got ${String($elementOrHandle)}.`);
    }
    const $element =
      typeof ($elementOrHandle as Promise<any>).then === 'function'
        ? await ($elementOrHandle as Promise<ElementHandle>)
        : ($elementOrHandle as ElementHandle);

    const { isFocused, stringifiedActiveElement, stringifiedElement } = await $element.evaluate(
      (element) => {
        const activeElement =
          element.ownerDocument !== null ? element.ownerDocument.activeElement : null;
        return {
          isFocused: activeElement === element,
          stringifiedElement: window.elementToString(element),
          stringifiedActiveElement: window.elementToString(activeElement),
        };
      },
    );

    this.assert(
      isFocused,
      `expected element to have focus`,
      `expected element to NOT have focus \n${stringifiedElement}`,
      stringifiedElement,
      stringifiedActiveElement,
    );
  });

  chai.Assertion.addMethod(
    'toHaveAttribute',
    async function elementHandleHasAttribute(attributeName: string, attributeValue?: string) {
      const $elementOrHandle: ElementHandle | Promise<ElementHandle> = utils.flag(this, 'object');
      if ($elementOrHandle == null) {
        throw new AssertionError(`Expected an element handle but got ${String($elementOrHandle)}.`);
      }
      const $element =
        typeof ($elementOrHandle as Promise<any>).then === 'function'
          ? await ($elementOrHandle as Promise<ElementHandle>)
          : ($elementOrHandle as ElementHandle);

      const actualAttributeValue = await $element.getAttribute(attributeName);

      if (attributeValue === undefined) {
        this.assert(
          actualAttributeValue !== null,
          `expected element to have attribute \`${attributeName}\``,
          `expected element to NOT have attribute \`${attributeName}\``,
          null,
          null,
        );
      } else {
        this.assert(
          actualAttributeValue === attributeValue,
          `expected element to have attribute \`${attributeName}="${attributeValue}"\``,
          `expected element to NOT have attribute \`${attributeName}="${attributeValue}"\``,
          attributeValue,
          actualAttributeValue,
        );
      }
    },
  );
});
