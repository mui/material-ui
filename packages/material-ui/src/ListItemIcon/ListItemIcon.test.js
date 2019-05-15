import React from 'react';
import { assert } from 'chai';
import {
  createMount,
  createShallow,
  describeConformance,
  getClasses,
} from '@material-ui/core/test-utils';
import ListItemIcon from './ListItemIcon';

describe('<ListItemIcon />', () => {
  let mount;
  let shallow;
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    shallow = createShallow({ dive: true });
    classes = getClasses(
      <ListItemIcon>
        <span />
      </ListItemIcon>,
    );
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(
    <ListItemIcon>
      <div />
    </ListItemIcon>,
    () => ({
      classes,
      inheritComponent: 'div',
      mount,
      refInstanceof: window.HTMLDivElement,
      skip: ['componentProp'],
    }),
  );

  it('should render a span inside a div', () => {
    const wrapper = shallow(
      <ListItemIcon>
        <span />
      </ListItemIcon>,
    );
    assert.strictEqual(wrapper.name(), 'div');
    assert.strictEqual(wrapper.children().name(), 'span');
  });
});
