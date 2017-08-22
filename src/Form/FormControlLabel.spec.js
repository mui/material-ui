// @flow

import * as React from 'react';
import { assert } from 'chai';
import { createShallow, createMount, getClasses } from '../test-utils';
import Checkbox from '../Checkbox';
import FormControlLabel from './FormControlLabel';

describe('FormControlLabel', () => {
  let shallow;
  let mount;
  let classes;
  let wrapper;

  before(() => {
    shallow = createShallow({ dive: true });
    mount = createMount();
    classes = getClasses(<FormControlLabel label="Pizza" control={<div />} />);
    wrapper = shallow(<FormControlLabel label="Pizza" control={<div />} />);
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render the label text inside an additional element', () => {
    const label = wrapper.childAt(1);
    assert.strictEqual(FormControlLabel.displayName, 'withStyles(FormControlLabel)');
    assert.strictEqual(wrapper.name(), 'label');
    assert.strictEqual(label.childAt(0).node, 'Pizza', 'should be the label text');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the "root" class');
  });

  describe('prop: disabled', () => {
    it('should disable everything', () => {
      const wrapper2 = shallow(<FormControlLabel label="Pizza" disabled control={<div />} />);
      assert.strictEqual(
        wrapper2.hasClass(classes.disabled),
        true,
        'should have the disabled class',
      );
      assert.strictEqual(wrapper2.find('div').props().disabled, true);
    });

    it('should only disable the label', () => {
      const wrapper2 = shallow(
        <FormControlLabel label="Pizza" disabled control={<div disabled={false} />} />,
      );
      assert.strictEqual(
        wrapper2.hasClass(classes.disabled),
        true,
        'should have the disabled class',
      );
      assert.strictEqual(wrapper2.find('div').props().disabled, false);
    });
  });

  it('should mount without issue', () => {
    const wrapper2 = mount(<FormControlLabel label="Pizza" control={<Checkbox />} />);
    assert.strictEqual(wrapper2.name(), 'withStyles(FormControlLabel)');
  });
});
