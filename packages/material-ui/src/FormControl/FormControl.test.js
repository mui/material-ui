import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import { act, createClientRender } from 'test/utils/createClientRender';
import Input from '../Input';
import Select from '../Select';
import FormControl from './FormControl';
import useFormControl from './useFormControl';

describe('<FormControl />', () => {
  const mount = createMount();
  const render = createClientRender();
  let classes;

  function TestComponent(props) {
    const context = useFormControl();
    React.useEffect(() => {
      props.contextCallback(context);
    });
    return null;
  }

  before(() => {
    classes = getClasses(<FormControl />);
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

  describe('prop: focused', () => {
    it('should display input in focused state', () => {
      const readContext = spy();
      const { container } = render(
        <FormControl focused>
          <Input />
          <TestComponent contextCallback={readContext} />
        </FormControl>,
      );

      expect(readContext.args[0][0]).to.have.property('focused', true);
      container.querySelector('input').blur();
      expect(readContext.args[0][0]).to.have.property('focused', true);
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

  describe('useFormControl', () => {
    const FormController = React.forwardRef((_, ref) => {
      const formControl = useFormControl();
      React.useImperativeHandle(ref, () => formControl, [formControl]);
      return null;
    });

    const FormControlled = React.forwardRef(function FormControlled(props, ref) {
      return (
        <FormControl {...props}>
          <FormController ref={ref} />
        </FormControl>
      );
    });

    describe('from props', () => {
      it('should have the required prop from the instance', () => {
        const formControlRef = React.createRef();
        const { setProps } = render(<FormControlled ref={formControlRef} />);

        expect(formControlRef.current).to.have.property('required', false);

        setProps({ required: true });
        expect(formControlRef.current).to.have.property('required', true);
      });

      it('should have the error prop from the instance', () => {
        const formControlRef = React.createRef();
        const { setProps } = render(<FormControlled ref={formControlRef} />);

        expect(formControlRef.current).to.have.property('error', false);

        setProps({ error: true });
        expect(formControlRef.current).to.have.property('error', true);
      });

      it('should have the margin prop from the instance', () => {
        const formControlRef = React.createRef();
        const { setProps } = render(<FormControlled ref={formControlRef} />);

        expect(formControlRef.current).to.have.property('margin', 'none');

        setProps({ margin: 'dense' });
        expect(formControlRef.current).to.have.property('margin', 'dense');
      });

      it('should have the fullWidth prop from the instance', () => {
        const formControlRef = React.createRef();
        const { setProps } = render(<FormControlled ref={formControlRef} />);

        expect(formControlRef.current).to.have.property('fullWidth', false);

        setProps({ fullWidth: true });
        expect(formControlRef.current).to.have.property('fullWidth', true);
      });
    });

    describe('callbacks', () => {
      describe('onFilled', () => {
        it('should set the filled state', () => {
          const formControlRef = React.createRef();
          render(<FormControlled ref={formControlRef} />);

          expect(formControlRef.current).to.have.property('filled', false);

          formControlRef.current.onFilled();
          expect(formControlRef.current).to.have.property('filled', true);

          formControlRef.current.onFilled();
          expect(formControlRef.current).to.have.property('filled', true);
        });
      });

      describe('onEmpty', () => {
        it('should clean the filled state', () => {
          const formControlRef = React.createRef();
          render(<FormControlled ref={formControlRef} />);

          formControlRef.current.onFilled();
          expect(formControlRef.current).to.have.property('filled', true);

          formControlRef.current.onEmpty();
          expect(formControlRef.current).to.have.property('filled', false);

          formControlRef.current.onEmpty();
          expect(formControlRef.current).to.have.property('filled', false);
        });
      });

      describe('handleFocus', () => {
        it('should set the focused state', () => {
          const formControlRef = React.createRef();
          render(<FormControlled ref={formControlRef} />);
          expect(formControlRef.current).to.have.property('focused', false);

          formControlRef.current.onFocus();
          expect(formControlRef.current).to.have.property('focused', true);

          formControlRef.current.onFocus();
          expect(formControlRef.current).to.have.property('focused', true);
        });
      });

      describe('handleBlur', () => {
        it('should clear the focused state', () => {
          const formControlRef = React.createRef();
          render(<FormControlled ref={formControlRef} />);
          expect(formControlRef.current).to.have.property('focused', false);

          formControlRef.current.onFocus();
          expect(formControlRef.current).to.have.property('focused', true);

          formControlRef.current.onBlur();
          expect(formControlRef.current).to.have.property('focused', false);

          formControlRef.current.onBlur();
          expect(formControlRef.current).to.have.property('focused', false);
        });
      });
    });
  });
});
