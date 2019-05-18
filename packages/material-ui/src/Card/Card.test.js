import React from 'react';
import { assert } from 'chai';
import { createMount, describeConformance, getClasses } from '@material-ui/core/test-utils';
import Card from './Card';
import Paper from '../Paper';

describe('<Card />', () => {
  let mount;
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(<Card />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<Card />, () => ({
    classes,
    inheritComponent: Paper,
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));

  it('when raised should render Paper with 8dp', () => {
    const wrapper = mount(<Card raised />);
    assert.strictEqual(wrapper.find(Paper).props().elevation, 8);
  });
});
