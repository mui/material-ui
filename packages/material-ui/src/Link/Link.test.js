import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import Link from './Link';
import Typography from '../Typography';

describe('<Link />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<Link href="/">Home</Link>);
  });

  it('should render a <Typography> element', () => {
    const wrapper = shallow(<Link href="/">Home</Link>);
    assert.strictEqual(wrapper.type(), Typography);
  });

  it('should render children', () => {
    const wrapper = shallow(<Link href="/">Home</Link>);
    assert.strictEqual(wrapper.contains('Home'), true);
  });

  it('should render with the root class', () => {
    const wrapper = shallow(<Link href="/">Home</Link>);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should render the custom className and the root class', () => {
    const wrapper = shallow(
      <Link href="/" className="test-class-name">
        Test
      </Link>,
    );
    assert.strictEqual(wrapper.is('.test-class-name'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should pass props to the <Typography> component', () => {
    const wrapper = shallow(
      <Link href="/" color="primary">
        Test
      </Link>,
    );
    const typography = wrapper.find(Typography);
    assert.strictEqual(typography.props().color, 'primary');
  });
});
