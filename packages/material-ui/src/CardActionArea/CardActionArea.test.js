import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import ButtonBase from '../ButtonBase';
import CardActionArea from './CardActionArea';

describe('<CardActionArea />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<CardActionArea />);
  });

  it('should render a ButtonBase with custom class', () => {
    const wrapper = shallow(<CardActionArea className="cardActionArea" />);
    assert.strictEqual(wrapper.type(), ButtonBase);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass('cardActionArea'), true);
  });
});
