// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import ExpansionPanelDetails from './ExpansionPanelDetails';

describe('<ExpansionPanelDetails />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<ExpansionPanelDetails>foo</ExpansionPanelDetails>);
  });

  it('should render a div', () => {
    const wrapper = shallow(
      <ExpansionPanelDetails className="woofExpansionPanelDetails">foo</ExpansionPanelDetails>,
    );
    assert.strictEqual(wrapper.name(), 'div');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass('woofExpansionPanelDetails'), true);
  });

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
