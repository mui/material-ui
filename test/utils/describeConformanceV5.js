/* eslint-env mocha */
import { expect } from 'chai';
import * as React from 'react';
import {
  testClassName,
  testPropsSpread,
  describeRef,
  testRootClass,
  findRootComponent,
  testReactTestRenderer,
} from './describeConformance';

/**
 * Material-UI components have a `components` prop that allows rendering a different
 * Components from @inheritComponent
 * @param {React.ReactElement} element
 * @param {() => ConformanceOptions} getOptions
 */
function testComponentsProp(element, getOptions) {
  describe('prop: components', () => {
    it('can render another root component with the `components` prop', () => {
      const { classes, mount, testComponentsRootPropWith: component = 'em' } = getOptions();

      const wrapper = mount(React.cloneElement(element, { components: { Root: component } }));

      expect(findRootComponent(wrapper, { classes, component }).exists()).to.equal(true);
    });
  });
}

const fullSuite = {
  componentsProp: testComponentsProp,
  mergeClassName: testClassName,
  propsSpread: testPropsSpread,
  refForwarding: describeRef,
  rootClass: testRootClass,
  reactTestRenderer: testReactTestRenderer,
};

/**
 * Tests various aspects of a component that should be equal across Material-UI
 * components.
 * @param {React.ReactElement} minimalElement - the component with it's minimal required props
 * @param {() => ConformanceOptions} getOptions
 */
export default function describeConformanceV5(minimalElement, getOptions) {
  const { after: runAfterHook = () => {}, only = Object.keys(fullSuite), skip = [] } = getOptions();
  describe('Material-UI component API', () => {
    after(runAfterHook);

    Object.keys(fullSuite)
      .filter((testKey) => only.indexOf(testKey) !== -1 && skip.indexOf(testKey) === -1)
      .forEach((testKey) => {
        const test = fullSuite[testKey];
        test(minimalElement, getOptions);
      });
  });
}
