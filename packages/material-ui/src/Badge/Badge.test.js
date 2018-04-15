import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import Badge from './Badge';

describe('<Badge />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<Badge badgeContent={1}>Hello World</Badge>);
  });

  const testChildren = <div className="unique">Hello World</div>;

  it('renders children and badgeContent', () => {
    const wrapper = shallow(<Badge badgeContent={10}>{testChildren}</Badge>);

    assert.strictEqual(wrapper.contains(testChildren), true, 'should contain the children');
    assert.ok(wrapper.find('span').length, 'should contain the badgeContent');
  });

  it('renders children and overwrite badge class', () => {
    const badgeClassName = 'testBadgeClassName';

    const wrapper = shallow(
      <Badge badgeContent={10} classes={{ badge: badgeClassName }}>
        {testChildren}
      </Badge>,
    );

    assert.strictEqual(wrapper.contains(testChildren), true, 'should contain the children');
    assert.strictEqual(
      wrapper
        .find('span')
        .at(1)
        .hasClass('testBadgeClassName'),
      true,
    );
  });

  it('renders children by default', () => {
    const wrapper = shallow(<Badge badgeContent={10}>{testChildren}</Badge>);

    assert.strictEqual(wrapper.contains(testChildren), true, 'should contain the children');
  });

  it('renders children and className', () => {
    const wrapper = shallow(
      <Badge badgeContent={10} className="testClassName">
        {testChildren}
      </Badge>,
    );

    assert.strictEqual(wrapper.contains(testChildren), true, 'should contain the children');
    assert.strictEqual(wrapper.is('.testClassName'), true, 'should contain the className');
  });

  it('renders children and have primary styles', () => {
    const wrapper = shallow(
      <Badge badgeContent={10} color="primary">
        {testChildren}
      </Badge>,
    );

    assert.strictEqual(wrapper.contains(testChildren), true, 'should contain the children');
    assert.strictEqual(
      wrapper
        .find('span')
        .at(1)
        .hasClass(classes.colorPrimary),
      true,
      'should have primary class',
    );
  });

  it('renders children and have secondary styles', () => {
    const wrapper = shallow(
      <Badge badgeContent={10} color="secondary">
        {testChildren}
      </Badge>,
    );

    assert.strictEqual(wrapper.contains(testChildren), true, 'should contain the children');
    assert.strictEqual(
      wrapper
        .find('span')
        .at(1)
        .hasClass(classes.colorSecondary),
      true,
    );
  });

  it('have error class', () => {
    const wrapper = shallow(
      <Badge badgeContent={10} color="error">
        <span />
      </Badge>,
    );

    assert.strictEqual(
      wrapper
        .find('span')
        .at(2)
        .hasClass(classes.colorError),
      true,
    );
  });

  it('renders children and overwrite root styles', () => {
    const style = { backgroundColor: 'red' };
    const wrapper = shallow(
      <Badge badgeContent={10} style={style}>
        {testChildren}
      </Badge>,
    );

    assert.strictEqual(wrapper.contains(testChildren), true, 'should contain the children');
    assert.strictEqual(
      wrapper.props().style.backgroundColor,
      style.backgroundColor,
      'should overwrite badge backgroundColor',
    );
  });
});
