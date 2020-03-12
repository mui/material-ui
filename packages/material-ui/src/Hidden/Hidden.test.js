import * as React from 'react';
import { assert } from 'chai';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import PropTypes from 'prop-types';
import Hidden from './Hidden';
import HiddenJs from './HiddenJs';
import HiddenCss from './HiddenCss';

function MyComponent({ foo }) {
  return <div>{foo}</div>;
}

MyComponent.propTypes = {
  foo: PropTypes.string,
};

describe('<Hidden />', () => {
  let shallow;
  let mount;

  before(() => {
    shallow = createShallow();
    mount = createMount();
  });

  it('should pass props when the implementation is JS', () => {
    const wrapper = mount(
      <Hidden initialWidth="lg" foo="bar">
        <MyComponent />
      </Hidden>,
    );
    assert.deepEqual(wrapper.find(MyComponent).props(), { foo: 'bar' });
  });

  it('should pass props when the implementation is CSS', () => {
    const wrapper = mount(
      <Hidden implementation="css" foo="bar">
        <MyComponent />
      </Hidden>,
    );
    assert.deepEqual(wrapper.find(MyComponent).props(), { foo: 'bar' });
  });

  describe('prop: implementation', () => {
    it('should use HiddenJs by default', () => {
      const wrapper = shallow(<Hidden>Hello</Hidden>);
      assert.strictEqual(wrapper.find(HiddenJs).length, 1);
    });

    it('should change the implementation', () => {
      const wrapper = shallow(<Hidden implementation="css">Hello</Hidden>);
      assert.strictEqual(wrapper.find(HiddenCss).length, 1);
    });
  });
});
