import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '../test-utils/describeConformance';
import { act, cleanup, createClientRender } from 'test/utils/createClientRender';
import Input from '../Input';
import Select from '../Select';
import FormControl from './FormControl';
import FormControlContext, { useFormControl } from './FormControlContext';

describe('<FormControl />', () => {
  let mount;
  const render = createClientRender({ strict: true });
  let classes;

  function TestComponent(props) {
    const context = useFormControl();
    props.contextCallback(context);
    return null;
  }

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(<FormControl />);
  });

  afterEach(() => {
    cleanup();
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<FormControl />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'fieldset',
  }));

  describe('initial state', () => {
    it('should have no margin', () => {
      const { container } = render(<FormControl />);
      const root = container.firstChild;

      expect(root).not.to.have.class(classes.marginNormal);
      expect(root).not.to.have.class(classes.marginDense);
    });

    it('can have the margin normal class', () => {
      const { container } = render(<FormControl margin="normal" />);
      const root = container.firstChild;

      expect(root).to.have.class(classes.marginNormal);
      expect(root).not.to.have.class(classes.marginDense);
    });

    it('can have the margin dense class', () => {
      const { container } = render(<FormControl margin="dense" />);
      const root = container.firstChild;

      expect(root).to.have.class(classes.marginDense);
      expect(root).not.to.have.class(classes.marginNormal);
    });

    it('should not be filled initially', () => {
      const readContext = spy();
      render(
        <FormControl>
          <TestComponent contextCallback={readContext} />
        </FormControl>,
      );
      expect(readContext.args[0][0]).to.have.property('filled', false);
    });

    it('should not be focused initially', () => {
      const readContext = spy();
      render(
        <FormControl>
          <TestComponent contextCallback={readContext} />
        </FormControl>,
      );
      expect(readContext.args[0][0]).to.have.property('focused', false);
    });
  });

  describe('prop: required', () => {
    it('should not apply it to the DOM', () => {
      const { container } = render(<FormControl required />);
      expect(container.firstChild).not.to.have.attribute('required');
    });
  });

  describe('prop: disabled', () => {
    it('will be unfocused if it gets disabled', () => {
      const readContext = spy();
      const { container, setProps } = render(
        <FormControl>
          <Input />
          <TestComponent contextCallback={readContext} />
        </FormControl>,
      );
      expect(readContext.args[0][0]).to.have.property('focused', false);

      act(() => {
        container.querySelector('input').focus();
      });
      expect(readContext.args[1][0]).to.have.property('focused', true);

      setProps({ disabled: true });
      expect(readContext.args[2][0]).to.have.property('focused', false);
    });
  });

  describe('input', () => {
    it('should be filled when a value is set', () => {
      const readContext = spy();
      render(
        <FormControl>
          <Input value="bar" />
          <TestComponent contextCallback={readContext} />
        </FormControl>,
      );
      expect(readContext.args[0][0]).to.have.property('filled', true);
    });

    it('should be filled when a defaultValue is set', () => {
      const readContext = spy();
      render(
        <FormControl>
          <Input defaultValue="bar" />
          <TestComponent contextCallback={readContext} />
        </FormControl>,
      );
      expect(readContext.args[0][0]).to.have.property('filled', true);
    });

    it('should not be adornedStart with an endAdornment', () => {
      const readContext = spy();
      render(
        <FormControl>
          <Input endAdornment={<div />} />
          <TestComponent contextCallback={readContext} />
        </FormControl>,
      );
      expect(readContext.args[0][0]).to.have.property('adornedStart', false);
    });

    it('should be adornedStar with a startAdornment', () => {
      const readContext = spy();
      render(
        <FormControl>
          <Input startAdornment={<div />} />
          <TestComponent contextCallback={readContext} />
        </FormControl>,
      );
      expect(readContext.args[0][0]).to.have.property('adornedStart', true);
    });
  });

  describe('select', () => {
    it('should not be adorned without a startAdornment', () => {
      const readContext = spy();
      render(
        <FormControl>
          <Select value="" />
          <TestComponent contextCallback={readContext} />
        </FormControl>,
      );
      expect(readContext.args[0][0]).to.have.property('adornedStart', false);
    });

    it('should be adorned with a startAdornment', () => {
      const readContext = spy();
      render(
        <FormControl>
          <Select value="" input={<Input startAdornment={<div />} />} />
          <TestComponent contextCallback={readContext} />
        </FormControl>,
      );
      expect(readContext.args[0][0].adornedStart, true);
    });
  });

  describe('muiFormControl child context', () => {
    let wrapper;
    let muiFormControlContext;

    beforeEach(() => {
      wrapper = render(
        <FormControl>
          <FormControlContext.Consumer>
            {context => {
              muiFormControlContext = context;
            }}
          </FormControlContext.Consumer>
        </FormControl>,
      );
    });

    describe('from props', () => {
      it('should have the required prop from the instance', () => {
        expect(muiFormControlContext).to.have.property('required', false);
        wrapper.setProps({ required: true });
        expect(muiFormControlContext).to.have.property('required', true);
      });

      it('should have the error prop from the instance', () => {
        expect(muiFormControlContext).to.have.property('error', false);
        wrapper.setProps({ error: true });
        expect(muiFormControlContext).to.have.property('error', true);
      });

      it('should have the margin prop from the instance', () => {
        expect(muiFormControlContext).to.have.property('margin', 'none');
        wrapper.setProps({ margin: 'dense' });
        expect(muiFormControlContext).to.have.property('margin', 'dense');
      });
    });

    describe('callbacks', () => {
      describe('onFilled', () => {
        it('should set the filled state', () => {
          expect(muiFormControlContext).to.have.property('filled', false);
          muiFormControlContext.onFilled();
          expect(muiFormControlContext).to.have.property('filled', true);
          muiFormControlContext.onFilled();
          expect(muiFormControlContext).to.have.property('filled', true);
        });
      });

      describe('onEmpty', () => {
        it('should clean the filled state', () => {
          muiFormControlContext.onFilled();
          expect(muiFormControlContext).to.have.property('filled', true);
          muiFormControlContext.onEmpty();
          expect(muiFormControlContext).to.have.property('filled', false);
          muiFormControlContext.onEmpty();
          expect(muiFormControlContext).to.have.property('filled', false);
        });
      });

      describe('handleFocus', () => {
        it('should set the focused state', () => {
          expect(muiFormControlContext).to.have.property('focused', false);
          muiFormControlContext.onFocus();
          expect(muiFormControlContext).to.have.property('focused', true);
          muiFormControlContext.onFocus();
          expect(muiFormControlContext).to.have.property('focused', true);
        });
      });

      describe('handleBlur', () => {
        it('should clear the focused state', () => {
          expect(muiFormControlContext).to.have.property('focused', false);
          muiFormControlContext.onFocus();
          expect(muiFormControlContext).to.have.property('focused', true);
          muiFormControlContext.onBlur();
          expect(muiFormControlContext).to.have.property('focused', false);
          muiFormControlContext.onBlur();
          expect(muiFormControlContext).to.have.property('focused', false);
        });
      });
    });
  });
});
