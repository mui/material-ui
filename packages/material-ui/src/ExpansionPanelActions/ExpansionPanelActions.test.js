import React from 'react';
import { assert } from 'chai';
import {
  createMount,
  createShallow,
  describeConformance,
  getClasses,
} from '@material-ui/core/test-utils';
import ExpansionPanelActions from './ExpansionPanelActions';

describe('<ExpansionPanelActions />', () => {
  let mount;
  let shallow;
  let classes;

  before(() => {
    mount = createMount();
    shallow = createShallow({ dive: true });
    classes = getClasses(<ExpansionPanelActions>foo</ExpansionPanelActions>);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<ExpansionPanelActions>Conformance</ExpansionPanelActions>, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));

  it('should render children with the button class wrapped in a div with the action class', () => {
    const wrapper = shallow(
      <ExpansionPanelActions>
        <button type="submit" className="woofExpansionPanelActions">
          Hello
        </button>
      </ExpansionPanelActions>,
    );
    const button = wrapper.childAt(0);
    assert.strictEqual(button.hasClass(classes.action), true);
    assert.strictEqual(button.type(), 'button');
    assert.strictEqual(button.hasClass('woofExpansionPanelActions'), true);
  });

  it('should render a valid children', () => {
    const wrapper = shallow(
      <ExpansionPanelActions>
        <button type="submit">Hello</button>
        {null}
      </ExpansionPanelActions>,
    );

    const button = wrapper.childAt(0);
    assert.strictEqual(button.hasClass(classes.action), true);
    assert.strictEqual(button.type(), 'button');
  });
});
