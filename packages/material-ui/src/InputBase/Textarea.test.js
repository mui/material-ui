import React from 'react';
import { assert } from 'chai';
import { spy, stub, useFakeTimers } from 'sinon';
import { createMount, describeConformance } from '@material-ui/core/test-utils';
import Textarea from './Textarea';

function getHeight(wrapper) {
  return wrapper
    .find('textarea')
    .at(0)
    .props().style.height;
}

describe('<Textarea />', () => {
  let mount;

  before(() => {
    mount = createMount({ strict: true });
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<Textarea />, () => ({
    inheritComponent: 'textarea',
    mount,
    refInstanceof: window.HTMLTextAreaElement,
    skip: ['rootClass', 'componentProp'],
  }));

  it('should render 2 textareas', () => {
    const wrapper = mount(<Textarea />);
    assert.strictEqual(wrapper.find('textarea').length, 2);
  });

  describe('layout', () => {
    // Only run the test on node.
    if (!/jsdom/.test(window.navigator.userAgent)) {
      return;
    }

    let saved;
    const getComputedStyleStub = {};

    function setLayout(wrapper, getComputedStyle, inputScrollHeight, shadowScrollHeight) {
      const input = wrapper
        .find('textarea')
        .at(0)
        .instance();
      const shadow = wrapper
        .find('textarea')
        .at(1)
        .instance();
      getComputedStyleStub[input] = getComputedStyle;

      let getter = 0;
      stub(shadow, 'scrollHeight').get(() => {
        getter += 1;
        return getter % 2 === 1 ? inputScrollHeight : shadowScrollHeight;
      });
    }

    before(() => {
      saved = window.getComputedStyle;
      window.getComputedStyle = node => getComputedStyleStub[node] || {};
    });

    after(() => {
      window.getComputedStyle = saved;
    });

    describe('resize', () => {
      let clock;

      before(() => {
        clock = useFakeTimers();
      });

      after(() => {
        clock.restore();
      });

      it('should handle the resize event', () => {
        const wrapper = mount(<Textarea />);
        setLayout(
          wrapper,
          {
            'box-sizing': 'content-box',
          },
          30,
          15,
        );
        assert.strictEqual(getHeight(wrapper), 0);
        window.dispatchEvent(new window.Event('resize', {}));
        clock.tick(166);
        wrapper.update();
        assert.strictEqual(getHeight(wrapper), 30);
      });
    });

    it('should update when uncontrolled', () => {
      const handleChange = spy();
      const wrapper = mount(<Textarea onChange={handleChange} />);
      setLayout(
        wrapper,
        {
          'box-sizing': 'content-box',
        },
        30,
        15,
      );
      assert.strictEqual(getHeight(wrapper), 0);
      wrapper
        .find('textarea')
        .at(0)
        .simulate('change');
      wrapper.update();
      assert.strictEqual(getHeight(wrapper), 30);
      assert.strictEqual(handleChange.callCount, 1);
    });

    it('should handle border-box', () => {
      const border = 5;
      const wrapper = mount(<Textarea />);
      setLayout(
        wrapper,
        {
          'box-sizing': 'border-box',
          'border-bottom-width': `${border}px`,
        },
        30,
        15,
      );
      wrapper.setProps({});
      wrapper.update();
      assert.strictEqual(getHeight(wrapper), 30 + border);
    });

    it('should handle content-box', () => {
      const padding = 5;
      const wrapper = mount(<Textarea />);
      setLayout(
        wrapper,
        {
          'box-sizing': 'content-box',
          'padding-top': `${padding}px`,
        },
        30,
        15,
      );
      wrapper.setProps({});
      wrapper.update();
      assert.strictEqual(getHeight(wrapper), 30 - padding);
    });

    it('should handle rowsMin', () => {
      const rowsMin = 3;
      const lineHeight = 15;
      const wrapper = mount(<Textarea rowsMin={rowsMin} />);
      setLayout(
        wrapper,
        {
          'box-sizing': 'content-box',
        },
        30,
        lineHeight,
      );
      wrapper.setProps({});
      wrapper.update();
      assert.strictEqual(getHeight(wrapper), lineHeight * rowsMin);
    });

    it('should handle rowsMax', () => {
      const rowsMax = 3;
      const lineHeight = 15;
      const wrapper = mount(<Textarea rowsMax={rowsMax} />);
      setLayout(
        wrapper,
        {
          'box-sizing': 'content-box',
        },
        100,
        lineHeight,
      );
      wrapper.setProps({});
      wrapper.update();
      assert.strictEqual(getHeight(wrapper), lineHeight * rowsMax);
    });
  });
});
