import React from 'react';
import PropTypes from 'prop-types';
import { expect } from 'chai';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '../test-utils/describeConformance';
import { cleanup, createClientRender } from 'test/utils/createClientRender';
import FormControlContext from '../FormControl/FormControlContext';
import InputLabel from './InputLabel';
import FormLabel from '../FormLabel';

describe('<InputLabel />', () => {
  let mount;
  const render = createClientRender({ strict: true });
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(<InputLabel />);
  });

  afterEach(() => {
    cleanup();
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
    const { container } = render(<InputLabel>Foo</InputLabel>);
    expect(container.querySelector('label')).to.have.text('Foo');
  });

  it('should have the animated class by default', () => {
    const { container } = render(<InputLabel>Foo</InputLabel>);
    expect(container.firstChild).to.have.class(classes.animated);
  });

  it('should not have the animated class when disabled', () => {
    const { container } = render(<InputLabel disableAnimation>Foo</InputLabel>);
    expect(container.firstChild).not.to.have.class(classes.animated);
  });

  describe('with muiFormControl context', () => {
    function InputLabelWithContext(props) {
      const { context, ...other } = props;
      return (
        <FormControlContext.Provider value={context}>
          <InputLabel {...other} />
        </FormControlContext.Provider>
      );
    }
    InputLabelWithContext.propTypes = {
      context: PropTypes.object,
    };

    it('should have the formControl class', () => {
      const { container } = render(<InputLabelWithContext context={{}} />);
      expect(container.firstChild).to.have.class(classes.formControl);
    });

    it('should have the labelDense class when margin is dense', () => {
      const { container } = render(<InputLabelWithContext context={{ margin: 'dense' }} />);
      expect(container.firstChild).to.have.class(classes.marginDense);
    });

    ['filled', 'focused'].forEach(state => {
      describe(state, () => {
        it('should be overridden by the shrink prop', () => {
          const { container, setProps } = render(
            <InputLabelWithContext context={{ [state]: true }} />,
          );
          expect(container.firstChild).to.have.class(classes.shrink);

          setProps({ shrink: false });
          expect(container.firstChild).not.to.have.class(classes.shrink);

          setProps({ shrink: true });
          expect(container.firstChild).to.have.class(classes.shrink);
        });
      });
    });
  });
});
