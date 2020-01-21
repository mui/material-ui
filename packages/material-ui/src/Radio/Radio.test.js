import React from 'react';
import { assert, expect } from 'chai';
import { getClasses, createMount } from '@material-ui/core/test-utils';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import { createClientRender } from 'test/utils/createClientRender';
import FormControl from '../FormControl';
import Radio from './Radio';
import IconButton from '../IconButton';

describe('<Radio />', () => {
  const render = createClientRender();
  let classes;
  let mount;

  before(() => {
    classes = getClasses(<Radio />);
    mount = createMount({ strict: true });
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<Radio />, () => ({
    classes,
    inheritComponent: IconButton,
    mount,
    refInstanceof: window.HTMLSpanElement,
    skip: ['componentProp'],
  }));

  describe('styleSheet', () => {
    it('should have the classes required for SwitchBase', () => {
      assert.strictEqual(typeof classes.root, 'string');
      assert.strictEqual(typeof classes.checked, 'string');
      assert.strictEqual(typeof classes.disabled, 'string');
    });
  });

  describe('prop: unchecked', () => {
    it('should render an unchecked icon', () => {
      const wrapper = mount(<Radio />);
      assert.strictEqual(wrapper.find('svg[data-mui-test="RadioButtonUncheckedIcon"]').length, 1);
    });
  });

  describe('prop: checked', () => {
    it('should render a checked icon', () => {
      const wrapper = mount(<Radio checked />);
      assert.strictEqual(wrapper.find('svg[data-mui-test="RadioButtonCheckedIcon"]').length, 1);
    });
  });

  describe('with FormControl', () => {
    describe('enabled', () => {
      it('should not have the disabled class', () => {
        const { getByTestId } = render(
          <FormControl>
            <Radio data-testid="root" />
          </FormControl>,
        );

        expect(getByTestId('root')).not.to.have.class(classes.disabled);
      });

      it('should be overridden by props', () => {
        const { getByTestId } = render(
          <FormControl>
            <Radio data-testid="root" disabled />
          </FormControl>,
        );

        expect(getByTestId('root')).to.have.class(classes.disabled);
      });
    });

    describe('disabled', () => {
      it('should have the disabled class', () => {
        const { getByTestId } = render(
          <FormControl disabled>
            <Radio data-testid="root" />
          </FormControl>,
        );

        expect(getByTestId('root')).to.have.class(classes.disabled);
      });

      it('should be overridden by props', () => {
        const { getByTestId } = render(
          <FormControl disabled>
            <Radio data-testid="root" disabled={false} />
          </FormControl>,
        );

        expect(getByTestId('root')).not.to.have.class(classes.disabled);
      });
    });
  });
});
