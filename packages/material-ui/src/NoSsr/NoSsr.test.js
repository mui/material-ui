import * as React from 'react';
import { expect } from 'chai';
import { createClientRender, createServerRender } from 'test/utils';
import NoSsr from './NoSsr';

describe('<NoSsr />', () => {
  const render = createClientRender();
  const serverRender = createServerRender();

  describe('server-side rendering', () => {
    it('should not render the children as the width is unknown', () => {
      let wrapper;
      expect(() => {
        wrapper = serverRender(
          <NoSsr>
            <span>Hello</span>
          </NoSsr>,
        );
      }).toErrorDev(
        // Known issue due to using SSR APIs in a browser environment.
        ['Warning: useLayoutEffect does nothing on the server'],
      );
      expect(wrapper.text()).to.equal('');
    });
  });

  describe('mounted', () => {
    it('should render the children', () => {
      render(
        <NoSsr>
          <span id="client-only" />
        </NoSsr>,
      );
      expect(document.querySelector('#client-only')).to.not.equal(null);
    });
  });

  describe('prop: fallback', () => {
    it('should render the fallback', () => {
      let wrapper;
      expect(() => {
        wrapper = serverRender(
          <div>
            <NoSsr fallback="fallback">
              <span>Hello</span>
            </NoSsr>
          </div>,
        );
      }).toErrorDev(
        // Known issue due to using SSR APIs in a browser environment.
        ['Warning: useLayoutEffect does nothing on the server'],
      );
      expect(wrapper.text()).to.equal('fallback');
    });
  });

  describe('prop: defer', () => {
    it('should defer the rendering', () => {
      render(
        <NoSsr defer>
          <span id="client-only">Hello</span>
        </NoSsr>,
      );
      expect(document.querySelector('#client-only')).to.not.equal(null);
    });
  });
});
