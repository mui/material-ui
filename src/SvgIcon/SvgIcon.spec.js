// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import SvgIcon from './SvgIcon';

describe('<SvgIcon />', () => {
  let shallow;
  let classes;
  let path;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<SvgIcon />);
    path = <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />;
  });

  it('renders children by default', () => {
    const wrapper = shallow(<SvgIcon>{path}</SvgIcon>);
    assert.strictEqual(wrapper.contains(path), true, 'should contain the children');
    assert.strictEqual(wrapper.props()['aria-hidden'], 'true');
  });

  it('should render an svg', () => {
    const wrapper = shallow(<SvgIcon>book</SvgIcon>);
    assert.strictEqual(wrapper.name(), 'svg');
  });

  it('should spread props on svg', () => {
    const wrapper = shallow(
      <SvgIcon data-test="hello" viewBox="0 0 32 32">
        {path}
      </SvgIcon>,
    );
    assert.strictEqual(wrapper.props()['data-test'], 'hello', 'should be spread on the svg');
    assert.strictEqual(wrapper.props().viewBox, '0 0 32 32', 'should override the viewBox');
  });

  it('should render with the user and SvgIcon classes', () => {
    const wrapper = shallow(<SvgIcon className="meow">{path}</SvgIcon>);
    assert.strictEqual(wrapper.hasClass('meow'), true, 'should have the "meow" class');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the SvgIcon class');
  });

  describe('prop: titleAccess', () => {
    it('should be able to make an icon accessible', () => {
      const wrapper = shallow(
        <SvgIcon title="Go to link" titleAccess="Network">
          {path}
        </SvgIcon>,
      );
      assert.strictEqual(wrapper.find('title').text(), 'Network');
      assert.strictEqual(wrapper.props()['aria-hidden'], 'false');
    });
  });
});
