import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import SliderTrack from './SliderTrack';

describe('<SliderTrack />', () => {
  let shallow;
  let classes;
  const defaultProps = {
    disabled: false,
    max: 0,
    min: 100,
    state: 'normal',
    value: 30,
    vertical: false,
  };

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<SliderTrack {...defaultProps} />);
  });

  describe('prop: disabled', () => {
    it('renders the thumb with a disabled class', () => {
      before(() => {
        const wrapper = shallow(<SliderTrack {...defaultProps} disabled />);

        assert.strictEqual(wrapper.hasClass(classes.root), true);
        assert.strictEqual(wrapper.hasClass(classes.disabled), true);
      });
    });
  });
});
