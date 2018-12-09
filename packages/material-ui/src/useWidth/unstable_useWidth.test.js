/* eslint-disable react/prop-types */
import React from 'react';
import { assert } from 'chai';
import useWidth from './unstable_useWidth';
import { createMount } from '@material-ui/core/test-utils';

function TestWidth({ widthParam }) {
  const { width } = useWidth({ width: widthParam });
  return <div id="result">{width}</div>;
}

function TestIsWidthUp({ breakpoint, inclusive }) {
  const { isWidthUp } = useWidth();
  return <div id="result">{`${isWidthUp(breakpoint, inclusive)}`}</div>;
}

function TestIsWidthDown({ breakpoint, inclusive }) {
  const { isWidthDown } = useWidth();
  return <div id="result">{`${isWidthDown(breakpoint, inclusive)}`}</div>;
}

const TEST_WIDTH = 300;

const changeWindowWidth = width => {
  window.innerWidth = width;
};

describe('useWidth()', () => {
  let mount;
  let originalWidth;

  before(() => {
    mount = createMount();
    originalWidth = window.innerWidth;
  });

  after(() => {
    mount.cleanUp();
  });

  afterEach(() => {
    // restore original window width
    changeWindowWidth(originalWidth);
  });

  describe('width', () => {
    it('returns correct width', () => {
      // custom window dimensions
      changeWindowWidth(TEST_WIDTH);
      const wrapper = mount(<TestWidth />);

      assert.strictEqual(wrapper.find('#result').text(), 'xs');
    });
  });

  describe('isWidthUp', () => {
    it('should work as default inclusive', () => {
      changeWindowWidth(1024);
      const largeWrapper = mount(<TestIsWidthUp breakpoint="lg" />);
      const mediumWrapper = mount(<TestIsWidthUp breakpoint="md" />);
      const smallWrapper = mount(<TestIsWidthUp breakpoint="sm" />);

      assert.strictEqual(largeWrapper.find('#result').text(), 'false', 'should accept larger size');
      assert.strictEqual(mediumWrapper.find('#result').text(), 'true', 'should be inclusive');
      assert.strictEqual(smallWrapper.find('#result').text(), 'true', 'should reject smaller size');
    });
    it('should work as exclusive', () => {
      changeWindowWidth(1024);
      const largeWrapper = mount(<TestIsWidthUp breakpoint="lg" inclusive={false} />);
      const mediumWrapper = mount(<TestIsWidthUp breakpoint="md" inclusive={false} />);
      const smallWrapper = mount(<TestIsWidthUp breakpoint="sm" inclusive={false} />);

      assert.strictEqual(largeWrapper.find('#result').text(), 'false', 'should accept larger size');
      assert.strictEqual(mediumWrapper.find('#result').text(), 'false', 'should be exclusive');
      assert.strictEqual(smallWrapper.find('#result').text(), 'true', 'should reject smaller size');
    });
  });

  describe('isWidthDown', () => {
    it('should work as default inclusive', () => {
      changeWindowWidth(1024);
      const largeWrapper = mount(<TestIsWidthDown breakpoint="lg" />);
      const mediumWrapper = mount(<TestIsWidthDown breakpoint="md" />);
      const smallWrapper = mount(<TestIsWidthDown breakpoint="sm" />);

      assert.strictEqual(largeWrapper.find('#result').text(), 'true', 'should accept larger size');
      assert.strictEqual(mediumWrapper.find('#result').text(), 'true', 'should be inclusive');
      assert.strictEqual(
        smallWrapper.find('#result').text(),
        'false',
        'should reject smaller size',
      );
    });
    it('should work as exclusive', () => {
      changeWindowWidth(1024);
      const largeWrapper = mount(<TestIsWidthDown breakpoint="lg" inclusive={false} />);
      const mediumWrapper = mount(<TestIsWidthDown breakpoint="md" inclusive={false} />);
      const smallWrapper = mount(<TestIsWidthDown breakpoint="sm" inclusive={false} />);

      assert.strictEqual(largeWrapper.find('#result').text(), 'true', 'should accept larger size');
      assert.strictEqual(mediumWrapper.find('#result').text(), 'false', 'should be exclusive');
      assert.strictEqual(
        smallWrapper.find('#result').text(),
        'false',
        'should reject smaller size',
      );
    });
  });
});
