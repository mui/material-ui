import { assert } from 'chai';
import React from 'react';
import testRef from './testRef';

/**
 * Glossary
 * - root component:
 *   - has the `root` class
 *   - excess props are spread to this component
 *   - has the type of `inheritComponent`
 */

function findRootComponent(wrapper, { classes, component }) {
  /**
   * We look for the component that is `inheritComponent` and `.rootClassName`
   * Using find().find().first() is not equivalent since `find` searches deep
   */
  return wrapper.find(component).filter(`.${classes.root}`);
}

function randomStringValue() {
  return Math.random()
    .toString(36)
    .slice(2);
}

/**
 * Material-UI components have a `className` prop. The `className` is applied to
 * the root component.
 *
 * @param {React.ReactElement} element
 * @param {() => ConformanceOptions} getOptions
 */
function testClassName(element, getOptions) {
  it('applies the className to the root component', () => {
    const { classes, inheritComponent, mount } = getOptions();
    const className = randomStringValue();

    const wrapper = mount(React.cloneElement(element, { className }));
    const root = findRootComponent(wrapper, { classes, component: inheritComponent });

    assert.strictEqual(root.hasClass(className), true, 'does have a custom `className`');
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
  const { testComponentPropWith } = getOptions();

  describe('prop: component', () => {
    if (testComponentPropWith !== false) {
      it('can render another root component with the `component` prop', () => {
        const { classes, mount, testComponentPropWith: component = 'em' } = getOptions();

        const wrapper = mount(React.cloneElement(element, { component }));

        assert.strictEqual(findRootComponent(wrapper, { classes, component }).exists(), true);
      });
    }
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
  it(`does spread props to the root component`, () => {
    // type def in ConformanceOptions
    const { classes, inheritComponent, mount } = getOptions();
    const testProp = 'data-test-props-spread';
    const value = randomStringValue();

    const wrapper = mount(React.cloneElement(element, { [testProp]: value }));
    const root = findRootComponent(wrapper, { classes, component: inheritComponent });

    assert.strictEqual(root.props()[testProp], value);
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
function describeRef(element, getOptions) {
  describe('ref', () => {
    it(`attaches the ref`, () => {
      // type def in ConformanceOptions
      const { mount, refInstanceof } = getOptions();

      testRef(element, mount, current => assert.instanceOf(current, refInstanceof));
    });
  });
}

const fullSuite = {
  class: testClassName,
  componentProp: testComponentProp,
  propsSpread: testPropsSpread,
  refForwarding: describeRef,
};

/**
 * @typedef {Object} ConformanceOptions
 * @property {string} classes - `classes` of the component provided by `@material-ui/styles`
 * @property {string} inheritComponent - The element type that receives spread props.
 * @property {function} mount - Should be a return value from createMount
 * @property {string[]?} only - If specified only run the tests listed
 * @property {boolean} refInstanceof - `ref` will be an instanceof this constructor.
 * @property {string[]?} skip - Skip the specified tests
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
  const { only = Object.keys(fullSuite), skip = [] } = getOptions();
  describe('Material-UI component API', () => {
    Object.keys(fullSuite)
      .filter(testKey => only.indexOf(testKey) !== -1 && skip.indexOf(testKey) === -1)
      .forEach(testKey => {
        const test = fullSuite[testKey];
        test(minimalElement, getOptions);
      });
  });
}
