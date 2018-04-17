// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import Typography from '../Typography';
import InputAdornment from './InputAdornment';

describe('<InputAdornment />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<InputAdornment position="start">foo</InputAdornment>);
  });

  it('should render a div', () => {
    const wrapper = shallow(<InputAdornment position="start">foo</InputAdornment>);
    assert.strictEqual(wrapper.name(), 'div');
  });

  it('should render given component', () => {
    const wrapper = shallow(
      <InputAdornment component="span" position="start">
        foo
      </InputAdornment>,
    );
    assert.strictEqual(wrapper.name(), 'span');
  });

  it('should wrap text children in a Typography', () => {
    const wrapper = shallow(<InputAdornment position="start">foo</InputAdornment>);
    assert.strictEqual(wrapper.childAt(0).type(), Typography);
  });

  it('should have the root and start class when position is start', () => {
    const wrapper = shallow(<InputAdornment position="start">foo</InputAdornment>);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.positionStart), true);
  });

  it('should have the root and end class when position is end', () => {
    const wrapper = shallow(<InputAdornment position="end">foo</InputAdornment>);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.positionEnd), true);
  });

  it('should not wrap text children in a Typography when disableTypography true', () => {
    const wrapper = shallow(
      <InputAdornment disableTypography position="start">
        foo
      </InputAdornment>,
    );
    assert.strictEqual(wrapper.childAt(0).text(), 'foo');
  });

  it('should render children', () => {
    const wrapper = shallow(
      <InputAdornment position="start">
        <div>foo</div>
      </InputAdornment>,
    );
    assert.strictEqual(wrapper.childAt(0).name(), 'div');
  });
});
