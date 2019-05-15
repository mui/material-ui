import React from 'react';
import { assert } from 'chai';
import {
  createMount,
  createShallow,
  describeConformance,
  getClasses,
} from '@material-ui/core/test-utils';
import FormGroup from './FormGroup';

describe('<FormGroup />', () => {
  let mount;
  let shallow;
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    shallow = createShallow({ dive: true });
    classes = getClasses(<FormGroup />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<FormGroup />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));

  it('should render a div with a div child', () => {
    const wrapper = shallow(
      <FormGroup>
        <div className="woofFormGroup" />
      </FormGroup>,
    );

    assert.strictEqual(wrapper.children('span').length, 0);
    assert.strictEqual(wrapper.children('div').length, 1);
    assert.strictEqual(
      wrapper
        .children('div')
        .first()
        .hasClass('woofFormGroup'),
      true,
    );
  });
});
