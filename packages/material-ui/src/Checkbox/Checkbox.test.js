import React from 'react';
import { assert, expect } from 'chai';
import { getClasses, createMount } from '@material-ui/core/test-utils';
import describeConformance from '../test-utils/describeConformance';
import { createClientRender } from 'test/utils/createClientRender';
import Checkbox from './Checkbox';
import FormControl from '../FormControl';
import IconButton from '../IconButton';


describe('<Checkbox />', () => {
  const render = createClientRender();
  let classes;
  let mount;

  before(() => {
    classes = getClasses(<Checkbox />);
    mount = createMount({ strict: true });
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<Checkbox checked />, () => ({
    classes,
    inheritComponent: IconButton,
    mount,
    refInstanceof: window.HTMLSpanElement,
    skip: ['componentProp'],
  }));

  it('should have the classes required for Checkbox', () => {
    assert.strictEqual(typeof classes.root, 'string');
    assert.strictEqual(typeof classes.checked, 'string');
    assert.strictEqual(typeof classes.disabled, 'string');
  });

  describe('prop: indeterminate', () => {
    it('should render an indeterminate icon', () => {
      const wrapper = mount(<Checkbox indeterminate />);
      assert.strictEqual(wrapper.find('svg[data-mui-test="IndeterminateCheckBoxIcon"]').length, 1);
    });
  });

  describe('with FormControl', () => {
    describe('enabled', () => {
      it('should not have the disabled class', () => {
        const { getByTestId } = render(
          <FormControl>
            <Checkbox data-testid="root" />
          </FormControl>,
        );

        expect(getByTestId('root')).not.to.have.class(classes.disabled);
      });

      it('should be overridden by props', () => {
        const { getByTestId } = render(
          <FormControl>
            <Checkbox data-testid="root" disabled />
          </FormControl>,
        );

        expect(getByTestId('root')).to.have.class(classes.disabled);
      });
    });

    describe('disabled', () => {
      it('should have the disabled class', () => {
        const { getByTestId } = render(
          <FormControl disabled>
            <Checkbox data-testid="root" />
          </FormControl>,
        );

        expect(getByTestId('root')).to.have.class(classes.disabled);
      });

      it('should be overridden by props', () => {
        const { getByTestId } = render(
          <FormControl disabled>
            <Checkbox data-testid="root" disabled={false} />
          </FormControl>,
        );

        expect(getByTestId('root')).not.to.have.class(classes.disabled);
      });
    });
  });
});
