import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import NotchedOutline from './NotchedOutline';

describe('<NotchedOutline />', () => {
  let shallow;
  let classes;
  let theme;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<NotchedOutline notchWidth={36} notched />);
  });

  describe('shallow', () => {
    let wrapper;

    beforeEach(() => {
      theme = {
        shape: {
          borderRadius: 4,
        },
      };

      wrapper = shallow(
        <NotchedOutline
          className="notched-outline"
          classes={classes}
          theme={theme}
          notchWidth={36}
          notched
        />,
      );
    });

    describe('structure', () => {
      it('should be a fieldset', () => {
        assert.isTrue(wrapper.is('fieldset'));
        assert.isTrue(wrapper.props()['aria-hidden']);

        assert.strictEqual(wrapper.children().length, 1);
        assert.isTrue(wrapper.childAt(0).is('legend'));
        assert.strictEqual(wrapper.childAt(0).props().align, 'left');
      });

      it('should pass props', () => {
        const testRootProp = 'test root prop';
        const testNotchProp = 'test notch prop';

        const inlineRootStyle = {
          width: 17,
        };

        const inlineNotchStyle = {
          height: 4,
        };

        wrapper.setProps({
          testRootProp,
          style: inlineRootStyle,
          NotchProps: {
            testNotchProp,
            style: inlineNotchStyle,
          },
        });

        // Ensure that these overrides are properly spread
        assert.notStrictEqual(wrapper.props().style, inlineRootStyle);
        assert.strictEqual(wrapper.props().style.width, inlineRootStyle.width);
        assert.strictEqual(wrapper.props().testRootProp, testRootProp);

        assert.notStrictEqual(wrapper.childAt(0).props().style, inlineNotchStyle);
        assert.strictEqual(wrapper.childAt(0).props().style.height, inlineNotchStyle.height);
        assert.strictEqual(wrapper.childAt(0).props().testNotchProp, testNotchProp);
      });

      it('should apply classes', () => {
        assert.isTrue(wrapper.hasClass('notched-outline'));
        assert.isTrue(wrapper.hasClass(classes.root));

        assert.isFalse(wrapper.hasClass(classes.focused));
        assert.isFalse(wrapper.hasClass(classes.error));
        assert.isFalse(wrapper.hasClass(classes.disabled));

        const legend = wrapper.find('legend');
        assert.isTrue(legend.hasClass(classes.legend));
      });

      it('should apply conditional classes', () => {
        wrapper = shallow(
          <NotchedOutline
            className="notched-outline"
            classes={classes}
            theme={theme}
            notchWidth={36}
            notched
            focused
            error
            disabled
          />,
        );

        assert.isTrue(wrapper.hasClass('notched-outline'));
        assert.isTrue(wrapper.hasClass(classes.root));

        assert.isTrue(wrapper.hasClass(classes.focused));
        assert.isTrue(wrapper.hasClass(classes.error));
        assert.isTrue(wrapper.hasClass(classes.disabled));

        const legend = wrapper.find('legend');
        assert.isTrue(legend.hasClass(classes.legend));
      });

      it('should apply inline styles notched', () => {
        assert.deepEqual(wrapper.props().style, { paddingLeft: 8 });
        assert.deepEqual(wrapper.childAt(0).props().style, { width: 36 });
      });

      it('should apply inline styles closed', () => {
        wrapper = shallow(<NotchedOutline theme={theme} notchWidth={36} />);

        assert.deepEqual(wrapper.props().style, { paddingLeft: 26 });
        assert.deepEqual(wrapper.childAt(0).props().style, { width: 0.01 });
      });

      it('should set alignment rtl', () => {
        wrapper.setProps({
          theme: {
            ...theme,
            direction: 'rtl',
          },
        });

        assert.strictEqual(wrapper.childAt(0).props().align, 'right');
      });

      it('should apply inline styles notched rtl', () => {
        wrapper.setProps({
          theme: {
            ...theme,
            direction: 'rtl',
          },
        });

        assert.deepEqual(wrapper.props().style, { paddingRight: 8 });
        assert.deepEqual(wrapper.childAt(0).props().style, { width: 36 });
      });

      it('should apply inline styles closed rtl', () => {
        wrapper = shallow(<NotchedOutline theme={theme} notchWidth={36} />);

        wrapper.setProps({
          theme: {
            ...theme,
            direction: 'rtl',
          },
        });

        assert.deepEqual(wrapper.props().style, { paddingRight: 26 });
        assert.deepEqual(wrapper.childAt(0).props().style, { width: 0.01 });
      });
    });
  });
});
