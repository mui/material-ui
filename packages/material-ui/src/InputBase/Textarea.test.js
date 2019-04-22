import React from 'react';
import { assert } from 'chai';
import sinon, { spy, stub, useFakeTimers } from 'sinon';
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

  describe('layout', () => {
    // Only run the test on node.
    if (!/jsdom/.test(window.navigator.userAgent)) {
      return;
    }

    const getComputedStyleStub = {};

    function setLayout(wrapper, { getComputedStyle, scrollHeight, lineHeight }) {
      const input = wrapper
        .find('textarea')
        .at(0)
        .instance();
      const shadow = wrapper
        .find('textarea')
        .at(1)
        .instance();

      getComputedStyleStub[input] = getComputedStyle;

      let index = 0;
      stub(shadow, 'scrollHeight').get(() => {
        index += 1;
        return index % 2 === 1 ? scrollHeight : lineHeight;
      });
    }

    before(() => {
      stub(window, 'getComputedStyle').value(node => getComputedStyleStub[node] || {});
    });

    after(() => {
      sinon.restore();
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
        assert.strictEqual(getHeight(wrapper), undefined);
        setLayout(wrapper, {
          getComputedStyle: {
            'box-sizing': 'content-box',
          },
          scrollHeight: 30,
          lineHeight: 15,
        });
        window.dispatchEvent(new window.Event('resize', {}));
        clock.tick(166);
        wrapper.update();
        assert.strictEqual(getHeight(wrapper), 30);
      });
    });

    it('should update when uncontrolled', () => {
      const handleChange = spy();
      const wrapper = mount(<Textarea onChange={handleChange} />);
      assert.strictEqual(getHeight(wrapper), undefined);
      setLayout(wrapper, {
        getComputedStyle: {
          'box-sizing': 'content-box',
        },
        scrollHeight: 30,
        lineHeight: 15,
      });
      wrapper
        .find('textarea')
        .at(0)
        .simulate('change');
      wrapper.update();
      assert.strictEqual(getHeight(wrapper), 30);
      assert.strictEqual(handleChange.callCount, 1);
    });

    it('should take the border into account with border-box', () => {
      const border = 5;
      const wrapper = mount(<Textarea />);
      assert.strictEqual(getHeight(wrapper), undefined);
      setLayout(wrapper, {
        getComputedStyle: {
          'box-sizing': 'border-box',
          'border-bottom-width': `${border}px`,
        },
        scrollHeight: 30,
        lineHeight: 15,
      });
      wrapper.setProps();
      wrapper.update();
      assert.strictEqual(getHeight(wrapper), 30 + border);
    });

    it('should take the padding into account with content-box', () => {
      const padding = 5;
      const wrapper = mount(<Textarea />);
      setLayout(wrapper, {
        getComputedStyle: {
          'box-sizing': 'content-box',
          'padding-top': `${padding}px`,
        },
        scrollHeight: 30,
        lineHeight: 15,
      });
      wrapper.setProps();
      wrapper.update();
      assert.strictEqual(getHeight(wrapper), 30 - padding);
    });

    it('should have at least height of "rows"', () => {
      const rows = 3;
      const lineHeight = 15;
      const wrapper = mount(<Textarea rows={rows} />);
      setLayout(wrapper, {
        getComputedStyle: {
          'box-sizing': 'content-box',
        },
        scrollHeight: 30,
        lineHeight,
      });
      wrapper.setProps();
      wrapper.update();
      assert.strictEqual(getHeight(wrapper), lineHeight * rows);
    });

    it('should have at max "rowsMax" rows', () => {
      const rowsMax = 3;
      const lineHeight = 15;
      const wrapper = mount(<Textarea rowsMax={rowsMax} />);
      setLayout(wrapper, {
        getComputedStyle: {
          'box-sizing': 'content-box',
        },
        scrollHeight: 100,
        lineHeight,
      });
      wrapper.setProps();
      wrapper.update();
      assert.strictEqual(getHeight(wrapper), lineHeight * rowsMax);
    });
  });
});
