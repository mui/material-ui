import React from 'react';
import { assert } from 'chai';
import {
  createMount,
  createShallow,
  describeConformance,
  getClasses,
} from '@material-ui/core/test-utils';
import Link from './Link';
import Typography from '../Typography';

describe('<Link />', () => {
  let mount;
  let shallow;
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    shallow = createShallow({ dive: true });
    classes = getClasses(<Link href="/">Home</Link>);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<Link href="/">Home</Link>, () => ({
    classes,
    inheritComponent: Typography,
    mount,
    refInstanceof: window.HTMLAnchorElement,
    skip: ['componentProp'],
  }));

  it('should render children', () => {
    const wrapper = shallow(<Link href="/">Home</Link>);
    assert.strictEqual(wrapper.contains('Home'), true);
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
