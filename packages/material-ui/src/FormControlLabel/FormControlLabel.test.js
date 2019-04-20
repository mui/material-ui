import React from 'react';
import PropTypes from 'prop-types';
import { assert } from 'chai';
import {
  createMount,
  describeConformance,
  findOutermostIntrinsic,
  getClasses,
} from '@material-ui/core/test-utils';
import Checkbox from '../Checkbox';
import FormControlLabel from './FormControlLabel';
import FormControlContext from '../FormControl/FormControlContext';

describe('<FormControlLabel />', () => {
  let mount;
  let classes;

  before(() => {
    // StrictModeViolation: uses Checkbox in test
    mount = createMount({ strict: false });
    classes = getClasses(<FormControlLabel label="Pizza" control={<div />} />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<FormControlLabel label="Pizza" control={<Checkbox />} />, () => ({
    classes,
    inheritComponent: 'label',
    mount,
    refInstanceof: window.HTMLLabelElement,
    skip: ['componentProp'],
  }));

  it('should render the label text inside an additional element', () => {
    const wrapper = findOutermostIntrinsic(
      mount(<FormControlLabel label="Pizza" control={<div />} />),
    );
    assert.strictEqual(wrapper.name(), 'label');
    assert.strictEqual(wrapper.text(), 'Pizza');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  describe('prop: disabled', () => {
    it('should disable everything 1', () => {
      const wrapper = findOutermostIntrinsic(
        mount(<FormControlLabel label="Pizza" disabled control={<div />} />),
      );
      const label = wrapper.find('span').last();
      assert.strictEqual(wrapper.hasClass(classes.disabled), true);
      assert.strictEqual(wrapper.find('div').props().disabled, true);
      assert.strictEqual(label.hasClass(classes.disabled), true);
    });

    it('should disable everything 2', () => {
      const wrapper = findOutermostIntrinsic(
        mount(<FormControlLabel label="Pizza" control={<div disabled />} />),
      );
      const label = wrapper.find('span').last();
      assert.strictEqual(wrapper.hasClass(classes.disabled), true);
      assert.strictEqual(wrapper.find('div').props().disabled, true);
      assert.strictEqual(label.hasClass(classes.disabled), true);
    });
  });

  describe('prop: labelPlacement', () => {
    it('should have the `start` class', () => {
      const wrapper = findOutermostIntrinsic(
        mount(<FormControlLabel label="Pizza" labelPlacement="start" control={<div />} />),
      );
      assert.strictEqual(wrapper.hasClass(classes.labelPlacementStart), true);
    });

    it('should have the `top` class', () => {
      const wrapper = mount(
        <FormControlLabel label="Pizza" labelPlacement="top" control={<div />} />,
      );
      assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.labelPlacementTop), true);
    });

    it('should have the `bottom` class', () => {
      const wrapper = mount(
        <FormControlLabel label="Pizza" labelPlacement="bottom" control={<div />} />,
      );
      assert.strictEqual(
        findOutermostIntrinsic(wrapper).hasClass(classes.labelPlacementBottom),
        true,
      );
    });
  });

  describe('with muiFormControl context', () => {
    let wrapper;

    function setFormControlContext(muiFormControlContext) {
      wrapper.setProps({ context: muiFormControlContext });
    }

    beforeEach(() => {
      function Provider(props) {
        const { context, ...other } = props;
        return (
          <FormControlContext.Provider value={context}>
            <FormControlLabel label="Pizza" control={<div />} {...other} />
          </FormControlContext.Provider>
        );
      }
      Provider.propTypes = {
        context: PropTypes.object,
      };

      wrapper = mount(<Provider />);
    });

    describe('enabled', () => {
      beforeEach(() => {
        setFormControlContext({});
      });

      it('should not have the disabled class', () => {
        assert.strictEqual(wrapper.hasClass(classes.disabled), false);
      });

      it('should be overridden by props', () => {
        assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.disabled), false);
        wrapper.setProps({ disabled: true });
        assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.disabled), true);
      });
    });

    describe('disabled', () => {
      beforeEach(() => {
        setFormControlContext({ disabled: true });
      });

      it('should have the disabled class', () => {
        assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.disabled), true);
      });

      it('should honor props', () => {
        assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.disabled), true);
        wrapper.setProps({ disabled: false });
        assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.disabled), false);
      });
    });
  });

  it('should not inject extra properties', () => {
    const Control = props => <div name="name" {...props} />;
    const wrapper = mount(<FormControlLabel label="Pizza" control={<Control />} />);
    assert.strictEqual(wrapper.find('div').props().name, 'name');
  });

  it('should forward some properties', () => {
    const wrapper = mount(<FormControlLabel value="value" label="Pizza" control={<div />} />);
    assert.strictEqual(wrapper.find('div').props().value, 'value');
  });
});
