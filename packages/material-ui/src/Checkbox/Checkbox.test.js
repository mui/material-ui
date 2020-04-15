import * as React from 'react';
import { expect } from 'chai';
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
    expect(typeof classes.root).to.equal('string');
    expect(typeof classes.checked).to.equal('string');
    expect(typeof classes.disabled).to.equal('string');
  });

  it('renders an unchecked `checkbox` by default', () => {
    const { getByRole } = render(<Checkbox />);

    expect(getByRole('checkbox')).to.have.property('checked', false);
  });

  it('renders an checked `checkbox` when `checked={true}`', () => {
    const { getByRole } = render(<Checkbox checked />);

    expect(getByRole('checkbox')).to.have.property('checked', true);
  });

  describe('prop: indeterminate', () => {
    it('should render an indeterminate icon', () => {
      const { container } = render(<Checkbox indeterminate />);
      expect(
        container.querySelector('svg[data-mui-test="IndeterminateCheckBoxIcon"]'),
      ).not.to.equal(null);
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
