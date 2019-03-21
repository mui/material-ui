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
 * @param {Object} options
 * @param {string} options.classes - `classes` of the component provided by `@material-ui/styles`
 */
function testClassName(element, options) {
  const { classes, mount } = options;

  it('applies the className to the outermost DOM node', () => {
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
 * @param {Object} options
 * @param {string} options.testComponentPropWith - The host component that should
 *                                                 be rendered instead.
 */
function testComponentProp(element, options) {
  const { testComponentPropWith: component = 'em', mount } = options;

  it('can render another root component with the `component` prop', () => {
    const wrapper = mount(React.cloneElement(element, { component }));

    assert.strictEqual(findOutermostIntrinsic(wrapper).type(), component);
  });
}

/**
 * Material-UI components can spread additional props to a documented component.
 * It's set via @inheritComponent in the source.
 *
 * @param {React.ReactElement} element
 * @param {Object} options
 * @param {string} options.inheritComponentName - The element type display name
 *                                                that receives spread props.
 */
function testPropsSpread(element, options) {
  const { inheritComponentName, mount } = options;

  it(`does spread props to the first ${inheritComponentName}`, () => {
    const testProp = 'data-test-props-spread';
    const value = randomStringValue();
    const wrapper = mount(React.cloneElement(element, { [testProp]: value }));
    assert.strictEqual(
      wrapper
        .find(inheritComponentName)
        .first()
        .props()[testProp],
      value,
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
 * @param {Object} options
 * @param {FunctionConstructor} options.refInstanceof - `ref` will be an instanceof this constructor.
 */
function testRef(element, options) {
  const { refInstanceof, mount } = options;

  describe('ref', () => {
    it(`attaches the ref to an instance of ${refInstanceof}`, () => {
      const ref = React.createRef();
      // TODO use `ref` once `WithStylesTest` is removed
      mount(React.cloneElement(element, { innerRef: ref }));

      assert.instanceOf(ref.current, refInstanceof);
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
 * Tests various aspects of a component that should be equal across Material-UI
 * components.
 *
 * @param {React.ReactElement} minimalElement - the component with it's minimal required props
 * @param {Object} options
 * @param {string} options.classes - see testClassName
 * @param {string} options.inheritComponentName - see testPropsSpread
 * @param {function} options.mount - Should be a return value from createMount
 * @param {boolean} options.refInstanceof - see test testRef
 * @param {string?} options.testComponentPropWith - see test testComponentProp
 */
export default function describeConformance(minimalElement, options) {
  describe('Material-UI component API', () => {
    Object.keys(fullSuite).forEach(testKey => {
      const test = fullSuite[testKey];
      test(minimalElement, options);
    });
  });
}
