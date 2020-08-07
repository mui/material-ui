import * as React from 'react';
import { expect } from 'chai';
import createMount from 'test/utils/createMount';
import createServerRender from 'test/utils/createServerRender';
import NoSsr from './NoSsr';

describe('<NoSsr />', () => {
  const mount = createMount();
  const serverRender = createServerRender();

  describe('server-side rendering', () => {
    it('should not render the children as the width is unknown', () => {
      const wrapper = serverRender(
        <NoSsr>
          <span>Hello</span>
        </NoSsr>,
      );
      expect(wrapper.text()).to.equal('');
    });
  });

  describe('mounted', () => {
    it('should render the children', () => {
      const wrapper = mount(
        <NoSsr>
          <span id="client-only" />
        </NoSsr>,
      );
      expect(wrapper.find('#client-only').exists()).to.equal(true);
    });
  });

  describe('prop: fallback', () => {
    it('should render the fallback', () => {
      const wrapper = serverRender(
        <div>
          <NoSsr fallback="fallback">
            <span>Hello</span>
          </NoSsr>
        </div>,
      );
      expect(wrapper.text()).to.equal('fallback');
    });
  });

  describe('prop: defer', () => {
    it('should defer the rendering', () => {
      const wrapper = mount(
        <NoSsr defer>
          <span id="client-only">Hello</span>
        </NoSsr>,
      );
      expect(wrapper.find('#client-only').exists()).to.equal(true);
    });
  });
});
