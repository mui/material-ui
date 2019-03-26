import React from 'react';
import { assert } from 'chai';
import {
  createMount,
  createShallow,
  describeConformance,
  getClasses,
} from '@material-ui/core/test-utils';
import CardActions from './CardActions';

describe('<CardActions />', () => {
  let mount;
  let shallow;
  let classes;

  before(() => {
    mount = createMount();
    shallow = createShallow({ dive: true });
    classes = getClasses(<CardActions />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<CardActions />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: false,
  }));

  it('should pass the action class to children', () => {
    const child3 = false;
    const wrapper = shallow(
      <CardActions>
        <div id="child1" />
        <div id="child2" />
        {child3 && <div id="child3" />}
      </CardActions>,
    );

    assert.strictEqual(wrapper.find('#child1').hasClass(classes.action), true);
    assert.strictEqual(wrapper.find('#child2').hasClass(classes.action), true);
  });

  describe('prop: disableActionSpacing', () => {
    it('does not pass the action class to the children', () => {
      const wrapper = shallow(
        <CardActions disableActionSpacing>
          <div id="child1" />
          <div id="child2" />
        </CardActions>,
      );

      assert.strictEqual(wrapper.find('#child1').hasClass(classes.action), false);
      assert.strictEqual(wrapper.find('#child2').hasClass(classes.action), false);
    });
  });
});
