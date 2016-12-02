// @flow weak
/* eslint-env mocha */
/* eslint react/prop-types: off */

import React from 'react';
import { assert } from 'chai';
import { createMountWithContext } from 'test/utils';
import withLayout, { styleSheet } from './with-layout';

describe('withLayout HOC', () => {
  const WrapThis = ({ className }) => <span className={className}>Hello</span>;
  let mount;
  let classes;
  let Wrapped;
  before(() => {
    mount = createMountWithContext();
    classes = mount.context.styleManager.render(styleSheet);
    Wrapped = withLayout(WrapThis);
  });

  it('should render the wrapped component with className', () => {
    const wrapper = mount(<Wrapped layout="row" flex />);
    const className = wrapper.find('span').prop('className');
    assert.isOk(className, 'should have className prop');
    const classNames = className.split(' ');
    const expected = [
      classes.layoutRow,
      classes.flex,
      classes.justifyStart,
      classes.alignStretch,
    ];
    assert.sameMembers(
      classNames,
      expected,
      `wrapped component should have className prop be ${expected.join(' ')}`,
    );
  });
});
