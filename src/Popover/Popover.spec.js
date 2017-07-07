/* eslint-env mocha */

import React from 'react';
import {assert} from 'chai';
import {shallow, mount} from 'enzyme';
import Popover from './Popover';
import PopoverAnimationDefault from './PopoverAnimationDefault';
import Paper from '../Paper';
import getMuiTheme from '../styles/getMuiTheme';

describe('<Popover />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});
  const mountWithContext = (node) => mount(node, {context: {muiTheme}});

  describe('state: closing', () => {
    it('should not create new timeout when popover is already closing', () => {
      const wrapper = shallowWithContext(<Popover open={true} />);

      wrapper.setProps({open: false});
      const timeout = wrapper.instance().timeout;

      wrapper.setProps({open: false});
      const nextTimeout = wrapper.instance().timeout;

      assert.strictEqual(timeout, nextTimeout);
    });
  });

  describe('unmounting', () => {
    it('should stop listening correctly', (done) => {
      const wrapper = mountWithContext(<Popover open={true} />);

      wrapper.instance().handleScroll();
      wrapper.instance().handleScroll();
      wrapper.unmount();

      setTimeout(() => {
         // Wait for the end of the throttle. Makes sure we don't crash.
        done();
      }, 100);
    });
  });

  describe('prop: animated', () => {
    it('should use a Paper when animated if false', () => {
      const wrapper = shallowWithContext(<Popover open={true} animated={false} />);
      const Layer = () => wrapper.instance().renderLayer();
      const layerWrapper = shallowWithContext(<Layer />);

      assert.strictEqual(layerWrapper.find(Paper).length, 1);
    });

    it('should use an animation when animated if true', () => {
      const wrapper = shallowWithContext(<Popover open={true} animated={true} />);
      const Layer = () => wrapper.instance().renderLayer();
      const layerWrapper = shallowWithContext(<Layer />);

      assert.strictEqual(layerWrapper.find(PopoverAnimationDefault).length, 1);
    });
  });

  describe('IOS detection', () => {
    // skip tests on PhantomJS because __defineGetter__ method seems not working
    if (/PhantomJS/.test(window.navigator.userAgent)) {
      return;
    }

    let input;

    beforeEach(() => {
      input = document.createElement('input');
      document.body.appendChild(input);
      input.focus();
    });

    afterEach(() => {
      input.remove();
    });

    const getBoundingClientRect = () => ({
      x: 10,
      y: 10,
      width: 10,
      height: 10,
      top: 10,
      right: 10,
      bottom: 10,
      left: 10,
    });

    const el = {
      offsetHeight: 10,
      offsetWidth: 10,
      offsetParent: {
        offsetTop: 10,
        offsetParent: null,
      },
      offsetTop: 10,
      getBoundingClientRect,
    };
    /* eslint-disable max-len */
    const userAgents = [
      'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53',
      'Mozilla/5.0 (iPad; CPU OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53',
      'Mozilla/5.0 (iPod; U; CPU like Mac OS X; en) AppleWebKit/420.1 (KHTML, like Gecko) Version/3.0 Mobile/3A101a Safari/419.3',
      'Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0)',
      'Mozilla/5.0 (Linux; Android 4.4.4; Nexus 7 Build/KTU84Q) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/33.0.0.0 Safari/537.36',
      'Mozilla/5.0 (BlackBerry; U; BlackBerry 9900; en) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.1.0.346 Mobile Safari/534.11+',
    ];
    /* eslint-enable max-len */

    userAgents.forEach((agent) => {
      it(`should use normal positioning for ${agent}`, () => {
        window.navigator.__defineGetter__('userAgent', () => agent); // eslint-disable-line no-underscore-dangle,max-len
        const wrapper = mountWithContext(<Popover open={true} animated={true} />);
        const result = wrapper.instance().getAnchorPosition(el);
        const expected = {bottom: 10, top: 10, center: 10, left: 10, right: 10, middle: 10, height: 10, width: 10};
        assert.deepEqual(result, expected);
      });
    });

    after(() => {
      window.navigator.__defineGetter__('userAgent', function getUserAgent() { // eslint-disable-line no-underscore-dangle,max-len
        return `${this.appCodeName}/${this.appVersion}`;
      });
    });
  });
});
