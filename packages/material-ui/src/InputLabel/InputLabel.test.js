import * as React from 'react';
import PropTypes from 'prop-types';
import { expect } from 'chai';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import { createClientRender } from 'test/utils/createClientRender';
import FormControl from '../FormControl';
import Input from '../Input';
import InputLabel from './InputLabel';
import FormLabel from '../FormLabel';

describe('<InputLabel />', () => {
  const mount = createMount();
  const render = createClientRender();
  let classes;

  before(() => {
    classes = getClasses(<InputLabel />);
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

  describe('with FormControl', () => {
    it('should have the formControl class', () => {
      const { getByTestId } = render(
        <FormControl>
          <InputLabel data-testid="root" />
        </FormControl>,
      );
      expect(getByTestId('root')).to.have.class(classes.formControl);
    });

    it('should have the labelDense class when margin is dense', () => {
      const { getByTestId } = render(
        <FormControl margin="dense">
          <InputLabel data-testid="root" />
        </FormControl>,
      );

      expect(getByTestId('root')).to.have.class(classes.marginDense);
    });

    describe('filled', () => {
      it('applies a shrink class that can be controlled by props', () => {
        function Wrapper({ children }) {
          return (
            <FormControl>
              <Input defaultValue="Dave" />
              {children}
            </FormControl>
          );
        }
        Wrapper.propTypes = { children: PropTypes.node };
        const { getByTestId, setProps } = render(<InputLabel data-testid="root">name</InputLabel>, {
          wrapper: Wrapper,
        });

        expect(getByTestId('root')).to.have.class(classes.shrink);

        setProps({ shrink: false });
        expect(getByTestId('root')).not.to.have.class(classes.shrink);

        setProps({ shrink: true });
        expect(getByTestId('root')).to.have.class(classes.shrink);
      });
    });

    describe('focused', () => {
      it('applies a shrink class that can be controlled by props', () => {
        function Wrapper({ children }) {
          return (
            <FormControl>
              <Input />
              {children}
            </FormControl>
          );
        }
        Wrapper.propTypes = { children: PropTypes.node };

        const { container, getByTestId, setProps } = render(<InputLabel data-testid="root" />, {
          wrapper: Wrapper,
        });
        container.querySelector('input').focus();

        expect(getByTestId('root')).to.have.class(classes.shrink);

        setProps({ shrink: false });
        expect(getByTestId('root')).not.to.have.class(classes.shrink);

        setProps({ shrink: true });
        expect(getByTestId('root')).to.have.class(classes.shrink);
      });
    });
  });
});
