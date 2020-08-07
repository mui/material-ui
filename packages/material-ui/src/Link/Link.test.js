import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import Link from './Link';
import Typography from '../Typography';

function focusVisible(element) {
  element.blur();
  document.dispatchEvent(new window.Event('keydown'));
  element.focus();
}

describe('<Link />', () => {
  const mount = createMount();
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<Link href="/">Home</Link>);
  });

  describeConformance(<Link href="/">Home</Link>, () => ({
    classes,
    inheritComponent: Typography,
    mount,
    refInstanceof: window.HTMLAnchorElement,
  }));

  it('should render children', () => {
    const wrapper = mount(<Link href="/">Home</Link>);
    expect(wrapper.contains('Home')).to.equal(true);
  });

  it('should pass props to the <Typography> component', () => {
    const wrapper = mount(
      <Link href="/" color="primary">
        Test
      </Link>,
    );
    const typography = wrapper.find(Typography);
    expect(typography.props().color).to.equal('primary');
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

      events.forEach((n) => {
        const event = n.charAt(2).toLowerCase() + n.slice(3);
        wrapper.simulate(event, { target: { tagName: 'a' } });
        expect(handlers[n].callCount).to.equal(1);
      });
    });
  });

  describe('keyboard focus', () => {
    it('should add the focusVisible class when focused', () => {
      const wrapper = mount(<Link href="/">Home</Link>);
      const anchor = wrapper.find('a').instance();

      expect(anchor.classList.contains(classes.focusVisible)).to.equal(false);
      focusVisible(anchor);
      expect(anchor.classList.contains(classes.focusVisible)).to.equal(true);
      anchor.blur();
      expect(anchor.classList.contains(classes.focusVisible)).to.equal(false);
    });
  });
});
