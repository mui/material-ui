import React from 'react';
import { expect } from 'chai';
import { getClasses, createMount } from '@material-ui/core/test-utils';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import { cleanup, createClientRender } from 'test/utils/createClientRender';
import MenuItem from '../MenuItem';
import Input from '../Input';
import Select from './Select';
import { spy } from 'sinon';
import OutlinedInput from '../OutlinedInput';
import FilledInput from '../FilledInput';

describe('<Select />', () => {
  let classes;
  let mount;
  const render = createClientRender({ strict: false });

  before(() => {
    classes = getClasses(<Select />);
    // StrictModeViolation: test uses MenuItem
    mount = createMount({ strict: false });
  });

  afterEach(() => {
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

  describe('prop: variant', () => {
    it('Should render a OutlinedInput', () => {
      const wrapper = mount(
        <Select
          value=""
          variant="outlined"
          inputProps={{ name: 'age', id: 'outlined-age-simple' }}
        />,
      );
      expect(wrapper.find(OutlinedInput)).to.exist;
      expect(wrapper.find(OutlinedInput).props()).to.have.property('labelWidth', 0);
    });

    it('Should render a FilledInput', () => {
      const wrapper = mount(
        <Select
          value=""
          variant="filled"
          inputProps={{ name: 'age', id: 'outlined-age-simple' }}
        />,
      );
      expect(wrapper.find(FilledInput)).to.exist;
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

  describe('SVG icon', () => {
    it('should not present an SVG icon when native and multiple are specified', () => {
      const { container } = render(
        <Select native multiple value={[0, 1]}>
          <option value={0}>Zero</option>
          <option value={1}>One</option>
          <option value={2}>Two</option>
        </Select>,
      );
      expect(container.querySelector('svg')).to.be.null;
    });

    it('should present an SVG icon', () => {
      const { container } = render(
        <Select native value={1}>
          <option value={0}>Zero</option>
          <option value={1}>One</option>
          <option value={2}>Two</option>
        </Select>,
      );
      expect(container.querySelector('svg')).to.be.visible;
    });
  });

  describe('accessibility', () => {
    it('sets aria-expanded="true" when the listbox is displayed', () => {
      const { getByRole } = render(<Select open value="none" />);

      expect(getByRole('button')).to.have.attribute('aria-expanded', 'true');
    });

    specify('aria-expanded is not present if the listbox isnt displayed', () => {
      const { getByRole } = render(<Select value="none" />);

      expect(getByRole('button')).not.to.have.attribute('aria-expanded');
    });

    it('indicates that activating the button displays a listbox', () => {
      const { getByRole } = render(<Select value="none" />);

      expect(getByRole('button')).to.have.attribute('aria-haspopup', 'listbox');
    });

    it('renders an element with listbox behavior', () => {
      const { getByRole } = render(<Select open value="none" />);

      expect(getByRole('listbox')).to.be.visible;
    });

    specify('the listbox is focusable', () => {
      const { getByRole } = render(<Select open value="none" />);

      getByRole('listbox').focus();
      expect(getByRole('listbox')).to.be.focused;
    });

    it('identifies each selectable element containing an option', () => {
      const { getAllByRole } = render(
        <Select open value="none">
          <MenuItem value="1">First</MenuItem>
          <MenuItem value="2">Second</MenuItem>
        </Select>,
      );

      const options = getAllByRole('option');
      expect(options[0]).to.have.text('First');
      expect(options[1]).to.have.text('Second');
    });

    it('indicates the selected option', () => {
      const { getAllByRole } = render(
        <Select open value="2">
          <MenuItem value="1">First</MenuItem>
          <MenuItem value="2">Second</MenuItem>
        </Select>,
      );

      expect(getAllByRole('option')[1]).to.have.attribute('aria-selected', 'true');
    });
  });
});
