import chai from 'chai';
import chaiDom from 'chai-dom';
import { isInaccessible } from '@testing-library/dom';
import { prettyDOM } from '@testing-library/react';

chai.use(chaiDom);
chai.use((chaiAPI, utils) => {
  // better diff view for expect(element).to.equal(document.activeElement)
  chai.Assertion.addProperty('focused', function elementIsFocused() {
    const element = utils.flag(this, 'object');

    this.assert(
      element === document.activeElement,
      'focus expected #{exp}, but #{act} was instead',
      'unexpected focus on #{exp}',
      element == null ? String(element) : prettyDOM(element),
      prettyDOM(document.activeElement),
    );
  });

  chai.Assertion.addProperty('inaccessible', function elementIsAccessible() {
    const element = utils.flag(this, 'object');

    const inaccessible = isInaccessible(element);

    this.assert(
      inaccessible === true,
      `expected ${utils.elToString(element)} to be inaccessible but it was accessible`,
      `expected ${utils.elToString(element)} to be accessible but it was inaccessible`,
    );
  });
});
