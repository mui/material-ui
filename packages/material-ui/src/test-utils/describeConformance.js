import { assert } from 'chai';
import React from 'react';
import findOutermostIntrinsic from './findOutermostIntrinsic';

function randomStringValue() {
  return Math.random()
    .toString(36)
    .slice(2);
}

/**
 * Material-UI components have a `className` prop. The `className` is applied to the
 * outermost DOM node.
 *
 * @param {React.ReactElement} element
 * @param {() => ConformanceOptions} getOptions
 */
function testClassName(element, getOptions) {

  it('applies the className to the outermost DOM node', () => {
    // declared in ConformanceOptopns
    const { classes, mount } = getOptions();
    const className = randomStringValue();

    const wrapper = mount(React.cloneElement(element, { className }));
    const domWrapper = findOutermostIntrinsic(wrapper);

    assert.strictEqual(domWrapper.hasClass(classes.root), true, 'does have a `root` class');
    assert.strictEqual(domWrapper.hasClass(className), true, 'does have a custom `className`');
  });
}

/**
 * Material-UI components have a `component` prop that allows rendering a different
 * Component from @inheritComponent
 *
 * @param {React.ReactElement} element
 * @param {() => ConformanceOptions} getOptions
 */
function testComponentProp(element, getOptions) {
  it('can render another root component with the `component` prop', () => {
    // type def in ConformanceOptions
    const { testComponentPropWith: component = 'em', mount } = getOptions();
    const wrapper = mount(React.cloneElement(element, { component }));

    assert.strictEqual(findOutermostIntrinsic(wrapper).type(), component);
  });
}

/**
 * Material-UI components can spread additional props to a documented component.
 * It's set via @inheritComponent in the source.
 *
 * @param {React.ReactElement} element
 * @param {() => ConformanceOptions} getOptions
 */
function testPropsSpread(element, getOptions) {
  it(`does spread props a defined component`, () => {
    // type def in ConformanceOptions
    const { inheritComponentName, mount } = getOptions();

    const testProp = 'data-test-props-spread';
    const value = randomStringValue();
    const wrapper = mount(React.cloneElement(element, { [testProp]: value }));
    assert.strictEqual(
      wrapper
        .find(inheritComponentName)
        .first()
        .props()[testProp],
      value,
      `should've spread props to ${inheritComponentName}`,
    );
  });
}

/**
 * Tests that the `ref` of a component will return the correct instance
 *
 * This is determined by a given constructor i.e. a React.Component or HTMLElement for
 * components that forward their ref and attach it to a host component.
 *
 * @param {React.ReactElement} element
 * @param {() => ConformanceOptions} getOptions
 */
function testRef(element, getOptions) {
  describe('ref', () => {
    it(`attaches the ref`, () => {
      // type def in ConformanceOptions
      const { mount, refInstanceof } = getOptions();

      const ref = React.createRef();
      // TODO use `ref` once `WithStylesTest` is removed
      mount(React.cloneElement(element, { innerRef: ref }));

      assert.instanceOf(
        ref.current,
        refInstanceof,
        `should've attached the ref to to an instance of ${refInstanceof}`,
      );
    });
  });
}

const fullSuite = {
  class: testClassName,
  componentProp: testComponentProp,
  propsSpread: testPropsSpread,
  refForwarding: testRef,
};

/**
 * @typedef {Object} ConformanceOptions
 * @property {string} classes - `classes` of the component provided by `@material-ui/styles`
 * @property {string} inheritComponentName - The element type display name that receives spread props.
 * @property {function} mount - Should be a return value from createMount
 * @property {boolean} refInstanceof - `ref` will be an instanceof this constructor.
 * @property {string?} testComponentPropWith - The host component that should be rendered instead.
 */

/**
 * Tests various aspects of a component that should be equal across Material-UI
 * components.
 *
 * @param {React.ReactElement} minimalElement - the component with it's minimal required props
 * @param {() => ConformanceOptions} getOptions
 *
 */
export default function describeConformance(minimalElement, getOptions) {
  describe('Material-UI component API', () => {
    Object.keys(fullSuite).forEach(testKey => {
      const test = fullSuite[testKey];
      test(minimalElement, getOptions);
    });
  });
}
