import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createMount, createShallow, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '../test-utils/describeConformance';
import Link from './Link';
import Typography from '../Typography';

function focusVisible(element) {
  element.blur();
  document.dispatchEvent(new window.Event('keydown'));
  element.focus();
}

describe('<Link />', () => {
  let mount;
  let shallow;
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    shallow = createShallow({ dive: true });
    classes = getClasses(<Link href="/">Home</Link>);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<Link href="/">Home</Link>, () => ({
    classes,
    inheritComponent: Typography,
    mount,
    refInstanceof: window.HTMLAnchorElement,
  }));

  it('should render children', () => {
    const wrapper = mount(<Link href="/">Home</Link>);
    assert.strictEqual(wrapper.contains('Home'), true);
  });

  it('should pass props to the <Typography> component', () => {
    const wrapper = mount(
      <Link href="/" color="primary">
        Test
      </Link>,
    );
    const typography = wrapper.find(Typography);
    assert.strictEqual(typography.props().color, 'primary');
  });

  describe('event callbacks', () => {
    it('should fire event callbacks', () => {
      const events = ['onBlur', 'onFocus'];

      const handlers = events.reduce((result, n) => {
        result[n] = spy();
        return result;
      }, {});

      const wrapper = shallow(
        <Link href="/" {...handlers}>
          Home
        </Link>,
      );

      events.forEach(n => {
        const event = n.charAt(2).toLowerCase() + n.slice(3);
        wrapper.simulate(event, { target: { tagName: 'a' } });
        assert.strictEqual(handlers[n].callCount, 1, `should have called the ${n} handler`);
      });
    });
  });

  describe('keyboard focus', () => {
    it('should add the focusVisible class when focused', () => {
      const wrapper = mount(<Link href="/">Home</Link>);
      const anchor = wrapper.find('a').instance();

      assert.strictEqual(anchor.classList.contains(classes.focusVisible), false);
      focusVisible(anchor);
      assert.strictEqual(anchor.classList.contains(classes.focusVisible), true);
      anchor.blur();
      assert.strictEqual(anchor.classList.contains(classes.focusVisible), false);
    });
  });
});
