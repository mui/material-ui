import React from 'react';
import { assert } from 'chai';
import {
  createMount,
  createShallow,
  describeConformance,
  getClasses,
} from '@material-ui/core/test-utils';
import ExpansionPanelDetails from './ExpansionPanelDetails';

describe('<ExpansionPanelDetails />', () => {
  let mount;
  let shallow;
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    shallow = createShallow({ dive: true });
    classes = getClasses(<ExpansionPanelDetails>foo</ExpansionPanelDetails>);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<ExpansionPanelDetails>Conformance</ExpansionPanelDetails>, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));

  it('should render a children element', () => {
    const wrapper = shallow(
      <ExpansionPanelDetails>
        <div>Hello</div>
      </ExpansionPanelDetails>,
    );
    const container = wrapper.childAt(0);
    assert.strictEqual(container.type(), 'div');
  });
});
