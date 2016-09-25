// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import css from 'dom-helpers/style';
import { createShallowWithContext, createMountWithContext } from 'test/utils';
import Popover, { styleSheet } from './Popover';

describe('<Popover>', () => {
  let shallow;
  let mount;
  let classes;

  before(() => {
    shallow = createShallowWithContext();
    mount = createMountWithContext();
    classes = shallow.context.styleManager.render(styleSheet);
  });
  after(() => {
    mount.cleanUp();
  });

  describe('root node', () => {
    it('should render a Modal with an invisible backdrop as the root node', () => {
      const wrapper = shallow(<Popover />);
      assert.strictEqual(wrapper.is('Modal'), true, 'should be a Modal');
      assert.strictEqual(wrapper.prop('backdropVisible'), false, 'should have an invisible backdrop');
    });

    it('should pass onRequestClose prop to Modal', () => {
      const fn = () => {};
      const wrapper = shallow(<Popover onRequestClose={fn} />);
      assert.strictEqual(wrapper.prop('onRequestClose'), fn, 'should be the onRequestClose function');
    });

    it('should pass open prop to Modal as `show`', () => {
      const wrapper = shallow(<Popover />);
      assert.strictEqual(wrapper.prop('show'), false, 'should not be open');
      wrapper.setProps({ open: true });
      assert.strictEqual(wrapper.prop('show'), true, 'should be open');
      wrapper.setProps({ open: false });
      assert.strictEqual(wrapper.prop('show'), false, 'should not be open');
    });
  });

  describe('transition', () => {
    it('should have Transition as the only child of Modal', () => {
      const wrapper = shallow(<Popover />);
      assert.strictEqual(wrapper.children().length, 1, 'should have one child');
      assert.strictEqual(wrapper.childAt(0).is('Transition'), true, 'should be Transition');
      assert.strictEqual(wrapper.childAt(0).prop('transitionAppear'), true,
        'should transition on first appearance');
    });

    it('should set the transition in/out based on the open prop', () => {
      const wrapper = shallow(<Popover />);
      assert.strictEqual(wrapper.childAt(0).prop('in'), false, 'should not be in');
      wrapper.setProps({ open: true });
      assert.strictEqual(wrapper.childAt(0).prop('in'), true, 'should be in');
      wrapper.setProps({ open: false });
      assert.strictEqual(wrapper.childAt(0).prop('in'), false, 'should not be in');
    });

    it('should fire transition event callbacks', () => {
      const events = [
        // 'onEnter', this is currently async in Popover, test separately
        'onEntering',
        'onEntered',
        'onExit',
        'onExiting',
        'onExited',
      ];

      const handlers = events.reduce((result, n) => {
        result[n] = spy();
        return result;
      }, {});

      const wrapper = shallow(<Popover {...handlers} />);

      events.forEach((n) => {
        const event = n.charAt(2).toLowerCase() + n.slice(3);
        wrapper.childAt(0).simulate(event, { style: {} });
        assert.strictEqual(handlers[n].callCount, 1, `should have called the ${n} handler`);
      });
    });
  });

  describe('paper', () => {
    it('should have Paper as the only child of Transition', () => {
      const wrapper = shallow(<Popover />);
      assert.strictEqual(wrapper.childAt(0).children().length, 1, 'should have one child');
      assert.strictEqual(wrapper.childAt(0).childAt(0).is('Paper'), true, 'should be Paper');
    });

    it('should have the popover class and user classes', () => {
      const wrapper = shallow(<Popover className="test-class" />);
      const paper = wrapper.childAt(0).childAt(0);
      assert.strictEqual(paper.hasClass('test-class'), true, 'should have the user class');
      assert.strictEqual(paper.hasClass(classes.popover), true, 'should have the popover class');
    });

    it('should have a zDepth prop passed down', () => {
      const wrapper = shallow(<Popover />);
      assert.strictEqual(wrapper.childAt(0).childAt(0).prop('zDepth'), 8, 'should be 8 zDepth by default');
      wrapper.setProps({ zDepth: 16 });
      assert.strictEqual(wrapper.childAt(0).childAt(0).prop('zDepth'), 16, 'should be 16 zDepth');
    });
  });

  describe('transition lifecycle', () => {
    const element = {
      style: {
        top: 'auto',
        left: 'auto',
        opacity: 1,
        transform: undefined,
        transformOrigin: undefined,
        transition: undefined,
      },
    };

    describe('handleEnter(element)', () => {
      let wrapper;
      let handleEnter;

      before(() => {
        handleEnter = spy();
        wrapper = shallow(
          <Popover onEnter={handleEnter} />
        );
        wrapper.instance().handleEnter(element);
      });

      it('should set the inline styles for the enter phase', () => {
        assert.strictEqual(element.style.opacity, 0, 'should be transparent');
        assert.strictEqual(
          element.style.transform,
          wrapper.instance().getScale(0.75),
          'should have the starting scale'
        );
        assert.strictEqual(
          element.style.top === '16px' && element.style.left === '16px',
          true,
          'should offset the element from the top left of the screen by 16px'
        );
        assert.strictEqual(
          element.style.transition,
          'opacity 0ms cubic-bezier(0.4, 0.0, 0.2, 1) 0ms,transform 0ms cubic-bezier(0.4, 0.0, 0.2, 1) 0ms',
          'should apply a transition for transform and opacity'
        );
        assert.strictEqual(
          element.style.transformOrigin,
          wrapper.instance().getPositioningStyle(element).transformOrigin,
          'should have a transformOrigin'
        );
      });

      it('should invoke the callback', () => {
        assert.strictEqual(handleEnter.callCount, 1, 'should have been called once');
      });
    });

    describe('handleEntering(element)', () => {
      let wrapper;
      let handleEntering;

      before(() => {
        handleEntering = spy();
        wrapper = shallow(
          <Popover onEntering={handleEntering} />
        );
        wrapper.instance().handleEntering(element);
      });

      it('should set the inline styles for the entering phase', () => {
        assert.strictEqual(element.style.opacity, 1, 'should be visible');
        assert.strictEqual(
          element.style.transform,
          wrapper.instance().getScale(1),
          'should have the full scale'
        );
      });

      it('should invoke the callback', () => {
        assert.strictEqual(handleEntering.callCount, 1, 'should have been called once');
      });
    });

    describe('handleExit(element)', () => {
      let wrapper;
      let handleExit;

      before(() => {
        handleExit = spy();
        wrapper = shallow(
          <Popover onExit={handleExit} />
        );
        wrapper.instance().handleExit(element);
      });

      it('should set the inline styles for the exit phase', () => {
        assert.strictEqual(element.style.opacity, 0, 'should be transparent');
        assert.strictEqual(
          element.style.transform,
          wrapper.instance().getScale(0.75),
          'should have the exit scale'
        );
      });

      it('should invoke the callback', () => {
        assert.strictEqual(handleExit.callCount, 1, 'should have been called once');
      });
    });
  });

  describe('positioning on an anchor', () => {
    let anchorEl;
    let wrapper;
    let popoverEl;
    let openPopover;
    let expectPopover;

    before(() => {
      openPopover = (anchorOrigin) => {
        return new Promise((resolve) => {
          if (!anchorEl) {
            anchorEl = window.document.createElement('div');
          }

          css(anchorEl, {
            width: '50px',
            height: '50px',
            position: 'absolute',
            top: '100px',
            left: '100px',
          });
          window.document.body.appendChild(anchorEl);
          wrapper = mount(
            <Popover
              anchorEl={anchorEl}
              anchorOrigin={anchorOrigin}
              transitionDuration={0}
              onEntered={() => {
                popoverEl = window.document.querySelector('[data-mui-test="Popover"]');
                resolve();
              }}
            />
          );
          wrapper.setProps({ open: true });
        });
      };

      expectPopover = (top, left) => {
        assert.strictEqual(
          popoverEl.style.top,
          `${top}px`,
          'should position at the correct top offset'
        );

        assert.strictEqual(
          popoverEl.style.left,
          `${left}px`,
          'should position at the correct left offset'
        );
        wrapper.unmount();
      };
    });

    after(() => {
      window.document.body.removeChild(anchorEl);
    });

    it('should be positioned over the top left of the anchor', () => {
      return openPopover({ vertical: 'top', horizontal: 'left' })
        .then(() => {
          const anchorRect = anchorEl.getBoundingClientRect();
          const expectedTop = anchorRect.top <= 16 ? 16 : anchorRect.top;
          const expectedLeft = anchorRect.left <= 16 ? 16 : anchorRect.left;
          expectPopover(expectedTop, expectedLeft);
        });
    });

    it('should be positioned over the center left of the anchor', () => {
      return openPopover({ vertical: 'center', horizontal: 'left' })
        .then(() => {
          const anchorRect = anchorEl.getBoundingClientRect();
          const anchorTop = anchorRect.top + (anchorRect.height / 2);
          const expectedTop = anchorTop <= 16 ? 16 : anchorTop;
          const expectedLeft = anchorRect.left <= 16 ? 16 : anchorRect.left;
          expectPopover(expectedTop, expectedLeft);
        });
    });

    it('should be positioned over the bottom left of the anchor', () => {
      return openPopover({ vertical: 'bottom', horizontal: 'left' })
        .then(() => {
          const anchorRect = anchorEl.getBoundingClientRect();
          const expectedTop = anchorRect.bottom <= 16 ? 16 : anchorRect.bottom;
          const expectedLeft = anchorRect.left <= 16 ? 16 : anchorRect.left;
          expectPopover(expectedTop, expectedLeft);
        });
    });

    it('should be positioned over the center center of the anchor', () => {
      return openPopover({ vertical: 'center', horizontal: 'center' })
        .then(() => {
          const anchorRect = anchorEl.getBoundingClientRect();
          const anchorTop = anchorRect.top + (anchorRect.height / 2);
          const anchorLeft = anchorRect.left + (anchorRect.height / 2);
          const expectedTop = anchorTop <= 16 ? 16 : anchorTop;
          const expectedLeft = anchorLeft <= 16 ? 16 : anchorLeft;
          expectPopover(expectedTop, expectedLeft);
        });
    });

    it('should be positioned over the top right of the anchor', () => {
      return openPopover({ vertical: 'top', horizontal: 'right' })
        .then(() => {
          const anchorRect = anchorEl.getBoundingClientRect();
          const expectedTop = anchorRect.top <= 16 ? 16 : anchorRect.top;
          const expectedLeft = anchorRect.right <= 16 ? 16 : anchorRect.right;
          expectPopover(expectedTop, expectedLeft);
        });
    });

    it('should be positioned over the bottom right of the anchor', () => {
      return openPopover({ vertical: 'bottom', horizontal: 'right' })
        .then(() => {
          const anchorRect = anchorEl.getBoundingClientRect();
          const expectedTop = anchorRect.bottom <= 16 ? 16 : anchorRect.bottom;
          const expectedLeft = anchorRect.right <= 16 ? 16 : anchorRect.right;
          expectPopover(expectedTop, expectedLeft);
        });
    });

    // it('should be positioned over the bottom right of the anchor', () => {
    //   popoverEl = window.document.querySelector('[data-mui-test="Popover"]');

    //   const anchorRect = anchorEl.getBoundingClientRect();
    //   const expectedTop = anchorRect.bottom <= 16 ? 16 : anchorRect.bottom;
    //   const expectedLeft = anchorRect.right <= 16 ? 16 : anchorRect.right;

    //   assert.strictEqual(
    //     popoverEl.style.top,
    //     `${expectedTop}px`,
    //     'should position at the correct top offset'
    //   );

    //   assert.strictEqual(
    //     popoverEl.style.left,
    //     `${expectedLeft}px`,
    //     'should position at the correct left offset'
    //   );
    // });
  });
});
