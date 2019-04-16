import React from 'react';
import PropTypes from 'prop-types';
import { assert } from 'chai';
import {
  createMount,
  describeConformance,
  findOutermostIntrinsic,
  getClasses,
} from '@material-ui/core/test-utils';
import FormControlContext from '../FormControl/FormControlContext';
import InputLabel from './InputLabel';
import FormLabel from '../FormLabel';

describe('<InputLabel />', () => {
  let mount;
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(<InputLabel />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<InputLabel>Foo</InputLabel>, () => ({
    classes,
    inheritComponent: FormLabel,
    mount,
    refInstanceof: window.HTMLLabelElement,
    skip: ['componentProp'],
  }));

  it('should render a label with text', () => {
    const wrapper = mount(<InputLabel>Foo</InputLabel>);
    assert.strictEqual(wrapper.find('label').text(), 'Foo');
  });

  it('should have the animated class by default', () => {
    const wrapper = mount(<InputLabel>Foo</InputLabel>);
    assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.animated), true);
  });

  it('should not have the animated class when disabled', () => {
    const wrapper = mount(<InputLabel disableAnimation>Foo</InputLabel>);
    assert.strictEqual(wrapper.hasClass(classes.animated), false);
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
            <InputLabel {...other} />
          </FormControlContext.Provider>
        );
      }
      Provider.propTypes = {
        context: PropTypes.object,
      };

      wrapper = mount(<Provider />);
    });

    it('should have the formControl class', () => {
      setFormControlContext({});
      assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.formControl), true);
    });

    it('should have the labelDense class when margin is dense', () => {
      setFormControlContext({ margin: 'dense' });
      assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.marginDense), true);
    });

    ['filled', 'focused'].forEach(state => {
      describe(state, () => {
        beforeEach(() => {
          setFormControlContext({ [state]: true });
        });

        it('should have the shrink class', () => {
          assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.shrink), true);
        });

        it('should be overridden by the shrink prop', () => {
          assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.shrink), true);
          wrapper.setProps({ shrink: false });
          assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.shrink), false);
          wrapper.setProps({ shrink: true });
          assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.shrink), true);
        });
      });
    });
  });
});
