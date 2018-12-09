import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import NotchedOutline from './NotchedOutline';

describe('<NotchedOutline />', () => {
  let shallow;
  let classes;
  const theme = {
    direction: 'ltr',
  };
  const defaultProps = {
    labelWidth: 36,
    notched: true,
  };

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<NotchedOutline {...defaultProps} />);
  });

  it('should be a fieldset', () => {
    const wrapper = shallow(<NotchedOutline {...defaultProps} />);
    assert.strictEqual(wrapper.name(), 'fieldset');
    assert.strictEqual(wrapper.props()['aria-hidden'], true);
    assert.strictEqual(wrapper.children().length, 1);
    assert.strictEqual(wrapper.childAt(0).name(), 'legend');
  });

  it('should pass props', () => {
    const wrapper = shallow(
      <NotchedOutline
        {...defaultProps}
        className="notched-outline"
        style={{
          width: 17,
        }}
      />,
    );

    // Ensure that these overrides are properly spread
    assert.notStrictEqual(wrapper.props().style, 17);
    assert.strictEqual(wrapper.hasClass('notched-outline'), true);
    const legend = wrapper.find('legend');
    assert.strictEqual(legend.hasClass(classes.legend), true);
  });

  it('should set alignment rtl', () => {
    const wrapper1 = shallow(<NotchedOutline {...defaultProps} theme={theme} />);
    assert.deepEqual(wrapper1.props().style, { paddingLeft: 8 });
    assert.deepEqual(wrapper1.childAt(0).props().style, { width: 35 });

    const wrapper2 = shallow(
      <NotchedOutline
        {...defaultProps}
        theme={{
          ...theme,
          direction: 'rtl',
        }}
      />,
    );
    assert.deepEqual(wrapper2.props().style, { paddingRight: 8 });
    assert.deepEqual(wrapper2.childAt(0).props().style, { width: 35 });
  });
});
