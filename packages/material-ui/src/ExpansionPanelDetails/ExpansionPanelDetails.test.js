import * as React from 'react';
import { expect } from 'chai';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import ExpansionPanelDetails from './ExpansionPanelDetails';

describe('<ExpansionPanelDetails />', () => {
  const mount = createMount();
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<ExpansionPanelDetails>foo</ExpansionPanelDetails>);
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
    expect(container.type()).to.equal('div');
  });
});
