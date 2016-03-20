import React from 'react';
import TestUtils from 'react-addons-test-utils';

const Divider = require('Divider').default;
const ActionAccessibility = require('svg-icons').ActionAccessibility;

import ImportGetMuiTheme from 'styles/getMuiTheme';
const RequireGetMuiTheme = require('styles/getMuiTheme').default;

import ImportColorManipulator from 'utils/colorManipulator';
const RequireColorManipulator = require('utils/colorManipulator').default;

describe('require() style import of ', () => {
  it('Divider component should not fail when rendering', () => {
    expect(() => {
      TestUtils.renderIntoDocument(<Divider />);
    }).to.not.throw(Error);
  });

  it('ActionAccessibility component should not fail when rendering', () => {
    expect(() => {
      TestUtils.renderIntoDocument(<ActionAccessibility />);
    }).to.not.throw(Error);
  });

  it('getMuiTheme should have same result as ES6 style import', () => {
    expect(RequireGetMuiTheme).to.eql(ImportGetMuiTheme);
  });

  it('colorManipulator should have same result as ES6 style import', () => {
    expect(RequireColorManipulator).to.eql(ImportColorManipulator);
  });
});
