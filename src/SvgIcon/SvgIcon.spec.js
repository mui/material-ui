// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { createShallowWithContext } from 'test/utils';
import SvgIcon, { styleSheet } from './SvgIcon';

describe('<SvgIcon />', () => {
  let shallow;
  let classes;
  let path;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet);
    path = <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />;
  });

  it('renders children by default', () => {
    const wrapper = shallow(
      <SvgIcon>{path}</SvgIcon>,
    );
    assert.strictEqual(wrapper.contains(path), true, 'should contain the children');
  });

  it('should render an svg', () => {
    const wrapper = shallow(<SvgIcon>book</SvgIcon>);
    assert.strictEqual(wrapper.is('svg'), true, 'should be an svg');
  });

  it('should spread props on svg', () => {
    const wrapper = shallow(
      <SvgIcon data-test="hello" viewBox="0 0 32 32">{path}</SvgIcon>,
    );
    assert.strictEqual(wrapper.prop('data-test'), 'hello', 'should be spread on the svg');
    assert.strictEqual(wrapper.prop('viewBox'), '0 0 32 32', 'should override the viewBox');
  });

  it('should render with the user and SvgIcon classes', () => {
    const wrapper = shallow(<SvgIcon className="meow">{path}</SvgIcon>);
    assert.strictEqual(wrapper.hasClass('meow'), true, 'should have the "meow" class');
    assert.strictEqual(wrapper.hasClass(classes.svgIcon), true, 'should have the SvgIcon class');
  });
});
