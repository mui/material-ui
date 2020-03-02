import * as React from 'react';
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

  describeConformance(<Checkbox checked />, () => ({
    classes,
    inheritComponent: IconButton,
    mount,
    refInstanceof: window.HTMLSpanElement,
    skip: ['componentProp'],
    after: () => mount.cleanUp(),
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
        const { getByRole } = render(
          <FormControl>
            <Checkbox />
          </FormControl>,
        );

        expect(getByRole('checkbox')).not.to.have.attribute('disabled');
      });

      it('should be overridden by props', () => {
        const { getByRole } = render(
          <FormControl>
            <Checkbox disabled />
          </FormControl>,
        );

        expect(getByRole('checkbox')).to.have.attribute('disabled');
      });
    });

    describe('disabled', () => {
      it('should have the disabled class', () => {
        const { getByRole } = render(
          <FormControl disabled>
            <Checkbox />
          </FormControl>,
        );

        expect(getByRole('checkbox')).to.have.attribute('disabled');
      });

      it('should be overridden by props', () => {
        const { getByRole } = render(
          <FormControl disabled>
            <Checkbox disabled={false} />
          </FormControl>,
        );

        expect(getByRole('checkbox')).not.to.have.attribute('disabled');
      });
    });
  });
});
