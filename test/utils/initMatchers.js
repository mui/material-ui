import chai from 'chai';
import chaiDom from 'chai-dom';
import { isInaccessible } from '@testing-library/dom';
import { prettyDOM } from '@testing-library/react/pure';
import { computeAccessibleName } from 'dom-accessibility-api';

// chai#utils.elToString that looks like stringified elements in testing-library
function elementToString(element) {
  if (typeof element?.nodeType === 'number') {
    return prettyDOM(element, undefined, { highlight: true, maxDepth: 1 });
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
      'expected element to have focus',
      `expected element to NOT have focus \n${elementToString(element)}`,
      elementToString(element),
      elementToString(document.activeElement),
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
    // eslint-disable-next-line no-underscore-dangle, no-unused-expressions
    new chai.Assertion(this._obj).to.be.visible;
  });
});
