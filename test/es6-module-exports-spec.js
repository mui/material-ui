import React from 'react';
import TestUtils from 'react-addons-test-utils';

const Divider = require('divider');
const ActionAccessibility = require('svg-icons').ActionAccessibility;

describe('require() style import of a component', () => {
  it(`should not fail when rendering (Divider)`, () => {
    expect(() => {
      TestUtils.renderIntoDocument(<Divider />);
    }).to.not.throw(Error);
  });

  it(`should not fail when rendering (ActionAccessibility)`, () => {
    expect(() => {
      TestUtils.renderIntoDocument(<ActionAccessibility />);
    }).to.not.throw(Error);
  });
});
