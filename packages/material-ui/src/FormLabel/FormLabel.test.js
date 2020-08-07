import * as React from 'react';
import PropTypes from 'prop-types';
import { expect } from 'chai';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import { createClientRender } from 'test/utils/createClientRender';
import FormLabel from './FormLabel';
import FormControl, { useFormControl } from '../FormControl';

describe('<FormLabel />', () => {
  const mount = createMount();
  const render = createClientRender();
  let classes;

  before(() => {
    classes = getClasses(<FormLabel />);
  });

  describeConformance(<FormLabel />, () => ({
    classes,
    inheritComponent: 'label',
    mount,
    refInstanceof: window.HTMLLabelElement,
    testComponentPropWith: 'div',
  }));

  describe('prop: required', () => {
    it('should visually show an asterisk but not include it in the a11y tree', () => {
      const { container } = render(<FormLabel required>name</FormLabel>);

      expect(container.querySelector('label')).to.have.text('name\u2009*');
      expect(container.querySelectorAll(`.${classes.asterisk}`)).to.have.lengthOf(1);
      expect(container.querySelectorAll(`.${classes.asterisk}`)[0]).toBeAriaHidden();
    });

    it('should not show an asterisk by default', () => {
      const { container } = render(<FormLabel>name</FormLabel>);

      expect(container.querySelector('label')).to.have.text('name');
      expect(container.querySelectorAll(`.${classes.asterisk}`)).to.have.lengthOf(0);
    });
  });

  describe('prop: error', () => {
    it('should have an error class', () => {
      const { container } = render(<FormLabel required error />);

      expect(container.querySelectorAll(`.${classes.asterisk}`)).to.have.lengthOf(1);
      expect(container.querySelector(`.${classes.asterisk}`)).to.have.class(classes.error);
      expect(container.querySelectorAll(`.${classes.asterisk}`)[0]).toBeAriaHidden();
      expect(container.firstChild).to.have.class(classes.error);
    });
  });

  describe('with FormControl', () => {
    describe('error', () => {
      function Wrapper(props) {
        return <FormControl error {...props} />;
      }

      it(`should have the error class`, () => {
        const { container } = render(<FormLabel />, {
          wrapper: Wrapper,
        });

        expect(container.querySelector('label')).to.have.class(classes.error);
      });

      it('should be overridden by props', () => {
        const { container, setProps } = render(
          <FormLabel data-testid="FormLabel" error={false} />,
          {
            wrapper: Wrapper,
          },
        );

        expect(container.querySelector('label')).not.to.have.class(classes.error);

        setProps({ error: true });
        expect(container.querySelector('label')).to.have.class(classes.error);
      });
    });

    describe('focused', () => {
      const FormController = React.forwardRef((_, ref) => {
        const formControl = useFormControl();
        React.useImperativeHandle(ref, () => formControl, [formControl]);
        return null;
      });

      it(`should have the focused class`, () => {
        const formControlRef = React.createRef();
        const { container } = render(
          <FormControl error>
            <FormLabel data-testid="FormLabel" />
            <FormController ref={formControlRef} />
          </FormControl>,
        );

        expect(container.querySelector('label')).not.to.have.class(classes.focused);

        formControlRef.current.onFocus();
        expect(container.querySelector('label')).to.have.class(classes.focused);
      });

      it('should be overridden by props', () => {
        const formControlRef = React.createRef();
        function Wrapper({ children }) {
          return (
            <FormControl error>
              {children}
              <FormController ref={formControlRef} />
            </FormControl>
          );
        }
        Wrapper.propTypes = { children: PropTypes.node };
        const { container, setProps } = render(<FormLabel data-testid="FormLabel" />, {
          wrapper: Wrapper,
        });
        formControlRef.current.onFocus();

        expect(container.querySelector('label')).to.have.class(classes.focused);

        setProps({ focused: false });
        expect(container.querySelector('label')).not.to.have.class(classes.focused);

        setProps({ focused: true });
        expect(container.querySelector('label')).to.have.class(classes.focused);
      });
    });

    describe('required', () => {
      it('should show an asterisk', () => {
        const { container } = render(
          <FormControl required>
            <FormLabel>name</FormLabel>
          </FormControl>,
        );

        expect(container).to.have.text('name\u2009*');
      });

      it('should be overridden by props', () => {
        const { container, setProps } = render(<FormLabel required={false}>name</FormLabel>, {
          wrapper: (props) => <FormControl required {...props} />,
        });

        expect(container).to.have.text('name');

        setProps({ required: true });
        expect(container).to.have.text('name\u2009*');
      });
    });
  });
});
