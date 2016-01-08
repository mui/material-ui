import React from 'react';
import TestUtils from 'react-addons-test-utils';

const Divider = require('divider');
const ActionAccessibility = require('svg-icons').ActionAccessibility;

import ImportThemeManager from 'styles/theme-manager';
const RequireThemeManager = require('styles/theme-manager');

import ImportColorManipulator from 'utils/color-manipulator';
const RequireColorManipulator = require('utils/color-manipulator');

describe('require() style import of ', () => {
  it(`Divider component should not fail when rendering`, () => {
    expect(() => {
      TestUtils.renderIntoDocument(<Divider />);
    }).to.not.throw(Error);
  });

  it(`ActionAccessibility component should not fail when rendering`, () => {
    expect(() => {
      TestUtils.renderIntoDocument(<ActionAccessibility />);
    }).to.not.throw(Error);
  });

  it(`ThemeManager should have same result as ES6 style import`, () => {
    expect(RequireThemeManager).to.eql(ImportThemeManager);
  });

  it(`ColorManipulator should have same result as ES6 style import`, () => {
    expect(RequireColorManipulator).to.eql(ImportColorManipulator);
  });
});
