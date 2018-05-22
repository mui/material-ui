import React from 'react';
import { assert } from 'chai';
import Box from './Box';
import { createShallow, getClasses } from '../test-utils';

describe('<Box />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ untilSelector: 'Box' });
    classes = getClasses(<Box>Hello World</Box>);
  });

  it('should render a <Box> element with children', () => {
    const testChildren = <div className="unique">Hello World</div>;
    const wrapper = shallow(<Box>{testChildren}</Box>);
    assert.strictEqual(wrapper.contains(testChildren), true);
  });

  it('should render the props className', () => {
    const wrapper = shallow(<Box className="testClassName" />);
    assert.strictEqual(wrapper.hasClass('testClassName'), true);
  });

  it('should set default component prop', () => {
    const wrapper = shallow(<Box />);
    assert.strictEqual(wrapper.name(), 'div', 'should set component to div');
  });

  it('should override default component prop with passed in prop', () => {
    const wrapper = shallow(<Box component={'h1'} />);
    assert.strictEqual(wrapper.name(), 'h1', 'should set component to h1');
  });

  it('should set default styles', () => {
    const wrapper = shallow(<Box />);

    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(
      wrapper.hasClass(classes.displayInline),
      false,
      'should not have the displayInline class',
    );
    assert.strictEqual(
      wrapper.hasClass(classes.cursorPointer),
      false,
      'should not have the cursorPointer class',
    );
    assert.strictEqual(
      wrapper.hasClass(classes.hAlignCenter),
      true,
      'should have the hAlignCenter class',
    );
    assert.strictEqual(
      wrapper.hasClass(classes.vAlignCenter),
      true,
      'should have the vAlignCenter class',
    );
    assert.strictEqual(wrapper.props().style.margin, '0px', 'should set margin to 0px');
    assert.strictEqual(wrapper.props().style.padding, '10px', 'should set padding to 10px');
  });

  it('should override default styles with passed in props', () => {
    const wrapper = shallow(
      <Box
        inline
        margin={20}
        padding={20}
        cursorPointer
        hAlign={'start'}
        vAlign={'end'}
        component={'h1'}
      />,
    );

    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(
      wrapper.hasClass(classes.displayInline),
      true,
      'should have the displayInline class',
    );
    assert.strictEqual(
      wrapper.hasClass(classes.cursorPointer),
      true,
      'should have the cursorPointer class',
    );
    assert.strictEqual(
      wrapper.hasClass(classes.hAlignStart),
      true,
      'should have the hAlignStart class',
    );
    assert.strictEqual(
      wrapper.hasClass(classes.vAlignEnd),
      true,
      'should have the vAlignEnd class',
    );
    assert.strictEqual(wrapper.props().style.margin, '20px', 'should set margin to 20px');
    assert.strictEqual(wrapper.props().style.padding, '20px', 'should set padding to 20px');
  });
});
