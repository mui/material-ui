import { assert } from 'chai';
import React from 'react';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import findOutermostIntrinsic from './findOutermostIntrinsic';

function randomStringValue() {
  return Math.random()
    .toString(36)
    .slice(2);
}

/**
 * Material-UI components have a className prop. The className is applied to the
 * outermost DOM node.
 *
 * @param {React.ReactElement} element
 * @param {Object} options
 * @param {string} options.defaultRootClassNames - the className that should be
 *                                                applied to the outermost DOM node
 */
function testClassName(element, options) {
  const { defaultRootClassNames = [], mount } = options;

  it('applies the className to the outermost DOM node', () => {
    const className = randomStringValue();

    const wrapper = mount(React.cloneElement(element, { className }));
    const domWrapper = findOutermostIntrinsic(wrapper);

    assert.strictEqual(domWrapper.hasClass(className), true);
    defaultRootClassNames.forEach(defaultClassName => {
      assert.strictEqual(
        domWrapper.hasClass(defaultRootClassNames),
        true,
        `Does not have the '${defaultClassName}' class`,
      );
    });
  });
}

function testComponentProp(element, options) {
  const { componentProp = 'em', mount } = options;

  it('can render another root component with the `component` prop', () => {
    const wrapper = mount(React.cloneElement(element, { component: componentProp }));

    assert.strictEqual(wrapper.getDOMNode().nodeName.toLowerCase(), componentProp);
  });
}

/**
 * Material-UI components can spread additional props to a documented component.
 * It's set via @inheritComponent in the source.
 *
 * @param {React.ReactElement} element
 * @param {Object} options
 * @param {string} options.inheritComponent - The element type that receives spread props
 */
function testPropsSpread(element, options) {
  const { inheritComponent, mount } = options;

  it('should spread props', () => {
    const testProp = 'data-test-props-spread';
    const value = randomStringValue();
    const wrapper = mount(React.cloneElement(element, { [testProp]: value }));
    assert.strictEqual(wrapper.find(inheritComponent).props()[testProp], value);
  });
}

/**
 * Some Material-UI components can forward their refs via innerRef
 *
 * @param {React.ReactElement} element
 * @param {Object} options
 * @param {boolean} options.noForwardRef - If `true` then this component can't forward its refs
 */
function testRefForwarding(element, options) {
  const { noForwardRef, mount } = options;

  describe('prop: innerRef', () => {
    before(() => {
      // just to swallow possible error messages from attaching refs to function components
      consoleErrorMock.spy();
    });

    after(() => {
      consoleErrorMock.reset();
    });

    it(`does ${noForwardRef ? 'not' : ''} forward ref`, () => {
      const ref = React.createRef();
      mount(React.cloneElement(element, { innerRef: ref }));

      if (noForwardRef) {
        assert.strictEqual(ref.current, null);
      } else {
        assert.ok(ref.current);
      }
    });
  });
}

const fullSuite = {
  class: testClassName,
  componentProp: testComponentProp,
  propsSpread: testPropsSpread,
  refForwarding: testRefForwarding,
};

/**
 * Tests various aspects of a component that should be equal across material-ui
 * components.
 *
 * @param {React.ReactElement} minimalElement - the component with it's minimal required props
 * @param {Object} options
 * @param {string} options.defaultRootClassNames - see testClassName
 * @param {string} options.inheritComponentName - see testPropsSpread
 * @param {function} options.mount - Should be a return value from createMount
 * @param {boolean} options.noForwardRef - see test testRefForwarding
 * @param {string[]} options.tests - list of tests that the component conforms to. see fullSuite
 */
export default function describeConformance(minimalElement, options) {
  const { tests = Object.keys(fullSuite) } = options;

  describe('Material-UI component API', () => {
    tests.forEach(testKey => {
      const test = fullSuite[testKey];
      test(minimalElement, options);
    });
  });
}
