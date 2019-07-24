import React from 'react';
import { expect } from 'chai';
import { getClasses, createMount } from '@material-ui/core/test-utils';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import { cleanup, createClientRender } from 'test/utils/createClientRender';
import MenuItem from '../MenuItem';
import Input from '../Input';
import Select from './Select';
import { spy } from 'sinon';

describe('<Select />', () => {
  let classes;
  let mount;
  const render = createClientRender({ strict: false });

  before(() => {
    classes = getClasses(<Select />);
    // StrictModeViolation: test uses MenuItem
    mount = createMount({ strict: false });
  });

  after(() => {
    cleanup();
  });

  describeConformance(<Select value="none" />, () => ({
    classes,
    inheritComponent: Input,
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp', 'rootClass'],
    after: () => mount.cleanUp(),
  }));

  describe('prop: inputProps', () => {
    it('should be able to provide a custom classes property', () => {
      const { container } = render(
        <Select
          inputProps={{
            classes: { root: 'root' },
          }}
          value="none"
        />,
      );

      expect(container.querySelector(`.${classes.root}`)).to.have.class('root');
    });
  });

  it('should be able to mount the component', () => {
    const { container } = render(
      <Select value={10}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>,
    );

    expect(container.querySelector('input')).to.have.property('value', '10');
  });

  describe('prop: onChange', () => {
    it('should get selected element from arguments', () => {
      const onChangeHandler = spy();
      const { getAllByRole, getByRole } = render(
        <Select onChange={onChangeHandler} value="1">
          <MenuItem value="0" />
          <MenuItem value="1" />
          <MenuItem value="2" />
        </Select>,
      );
      getByRole('button').click();
      getAllByRole('option')[1].click();

      const selected = onChangeHandler.args[0][1];
      expect(React.isValidElement(selected)).to.equal(true);
    });
  });

  describe('prop: value', () => {
    it('should be able to use an object', () => {
      const value = {};
      const { getByRole } = render(
        <Select value={value}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={value}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>,
      );

      expect(getByRole('button')).to.have.text('Twenty');
    });
  });
});
