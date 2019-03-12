import React from 'react';
import { assert } from 'chai';
import {
  createShallow,
  createMount,
  describeConformance,
  getClasses,
} from '@material-ui/core/test-utils';
import Step from './Step';

describe('<Step />', () => {
  let classes;
  let shallow;
  let mount;

  before(() => {
    classes = getClasses(<Step />);
    shallow = createShallow({ dive: true });
    mount = createMount({ strict: true });
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<Step />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));

  it('merges styles and other props into the root node', () => {
    const wrapper = shallow(
      <Step
        index={1}
        style={{ paddingRight: 200, color: 'purple', border: '1px solid tomato' }}
        data-role="Menuitem"
        orientation="horizontal"
      />,
    );
    const props = wrapper.props();
    assert.strictEqual(props.style.paddingRight, 200);
    assert.strictEqual(props.style.color, 'purple');
    assert.strictEqual(props.style.border, '1px solid tomato');
    assert.strictEqual(props['data-role'], 'Menuitem');
  });

  describe('rendering children', () => {
    it('renders children', () => {
      const children = <h1 className="hello-world">Hello World</h1>;
      const wrapper = shallow(
        <Step label="Step One" index={1} orientation="horizontal">
          {children}
        </Step>,
      );
      assert.strictEqual(wrapper.find('.hello-world').length, 1);
    });

    it('renders children with all props passed through', () => {
      const children = [
        <h1 key={1} className="hello-world">
          Hello World
        </h1>,
        <p key={2} className="hay">
          How are you?
        </p>,
      ];
      const wrapper = shallow(
        <Step active={false} completed disabled index={0} orientation="horizontal">
          {children}
        </Step>,
      );
      const child1 = wrapper.find('.hello-world');
      const child2 = wrapper.find('.hay');
      [child1, child2].forEach(child => {
        assert.strictEqual(child.length, 1);
        assert.strictEqual(child.props().active, false);
        assert.strictEqual(child.props().completed, true);
        assert.strictEqual(child.props().disabled, true);
        assert.strictEqual(child.props().icon, 1);
      });
    });

    it('honours children overriding props passed through', () => {
      const children = (
        <h1 active={false} className="hello-world">
          Hello World
        </h1>
      );
      const wrapper = shallow(
        <Step active label="Step One" orientation="horizontal" index={0}>
          {children}
        </Step>,
      );
      const childWrapper = wrapper.find('.hello-world');
      assert.strictEqual(childWrapper.props().active, false);
    });

    it('should handle invalid children', () => {
      const wrapper = shallow(
        <Step label="Step One" index={1} orientation="horizontal">
          <h1 className="hello-world">Hello World</h1>
          {null}
        </Step>,
      );
      assert.strictEqual(wrapper.find('.hello-world').length, 1);
    });
  });
});
