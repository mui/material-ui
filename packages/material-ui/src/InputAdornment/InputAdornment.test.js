import * as React from 'react';
import { expect } from 'chai';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import { createClientRender } from 'test/utils/createClientRender';
import Typography from '../Typography';
import InputAdornment from './InputAdornment';
import TextField from '../TextField';
import FormControl from '../FormControl';
import Input from '../Input';

describe('<InputAdornment />', () => {
  const mount = createMount();
  const render = createClientRender();
  let classes;

  before(() => {
    classes = getClasses(<InputAdornment position="start">foo</InputAdornment>);
  });

  describeConformance(<InputAdornment position="start">foo</InputAdornment>, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
  }));

  it('should wrap text children in a Typography', () => {
    const { container } = render(<InputAdornment position="start">foo</InputAdornment>);
    const typographyClasses = getClasses(<Typography />);
    const typography = container.querySelector(`.${typographyClasses.root}`);

    expect(typography).not.to.equal(null);
    expect(typography).to.have.text('foo');
  });

  it('should have the root and start class when position is start', () => {
    const { container } = render(<InputAdornment position="start">foo</InputAdornment>);
    const adornment = container.firstChild;

    expect(adornment).to.have.class(classes.root);
    expect(adornment).to.have.class(classes.positionStart);
  });

  it('should have the root and end class when position is end', () => {
    const { container } = render(<InputAdornment position="end">foo</InputAdornment>);
    const adornment = container.firstChild;

    expect(adornment).to.have.class(classes.root);
    expect(adornment).to.have.class(classes.positionEnd);
  });

  describe('prop: variant', () => {
    it("should inherit the TextField's variant", () => {
      const { getByTestId } = render(
        <TextField
          fullWidth
          placeholder="Search"
          label="Search"
          variant="filled"
          InputProps={{
            startAdornment: (
              <InputAdornment data-testid="InputAdornment" position="start">
                foo
              </InputAdornment>
            ),
          }}
        />,
      );
      const adornment = getByTestId('InputAdornment');

      expect(adornment).to.have.class(classes.root);
      expect(adornment).to.have.class(classes.positionStart);
      expect(adornment).to.have.class(classes.filled);
    });

    it("should inherit the FormControl's variant", () => {
      const { getByTestId } = render(
        <FormControl variant="filled">
          <InputAdornment data-testid="InputAdornment" position="start">
            foo
          </InputAdornment>
        </FormControl>,
      );
      const adornment = getByTestId('InputAdornment');

      expect(adornment).to.have.class(classes.root);
      expect(adornment).to.have.class(classes.positionStart);
      expect(adornment).to.have.class(classes.filled);
    });

    it('should override the inherited variant', () => {
      const { getByTestId } = render(
        <TextField
          fullWidth
          placeholder="Search"
          label="Search"
          variant="filled"
          InputProps={{
            startAdornment: (
              <InputAdornment data-testid="InputAdornment" variant="standard" position="start">
                foo
              </InputAdornment>
            ),
          }}
        />,
      );
      const adornment = getByTestId('InputAdornment');

      expect(adornment).to.have.class(classes.root);
      expect(adornment).to.have.class(classes.positionStart);
      expect(adornment).not.to.have.class(classes.filled);
    });

    it('should have the filled root and class when variant is filled', () => {
      const { container } = render(
        <InputAdornment variant="filled" position="start">
          foo
        </InputAdornment>,
      );
      const adornment = container.firstChild;

      expect(adornment).to.have.class(classes.root);
      expect(adornment).to.have.class(classes.positionStart);
      expect(adornment).to.have.class(classes.filled);
    });

    describe('warnings', () => {
      before(() => {
        consoleErrorMock.spy();
      });

      after(() => {
        consoleErrorMock.reset();
      });

      it('should warn if the variant supplied is equal to the variant inferred', () => {
        render(
          <FormControl variant="filled">
            <Input
              startAdornment={
                <InputAdornment variant="filled" position="start">
                  foo
                </InputAdornment>
              }
            />
          </FormControl>,
        );
        expect(consoleErrorMock.callCount()).to.equal(1);
        expect(consoleErrorMock.messages()[0]).to.equal(
          'Material-UI: The `InputAdornment` variant infers the variant ' +
            'prop you do not have to provide one.',
        );
      });
    });
  });

  it('should have the disabled pointer events class when disabledPointerEvents true', () => {
    const { container } = render(
      <InputAdornment disablePointerEvents position="start">
        foo
      </InputAdornment>,
    );
    const adornment = container.firstChild;

    expect(adornment).to.have.class(classes.disablePointerEvents);
  });

  it('should not wrap text children in a Typography when disableTypography true', () => {
    const { container } = render(
      <InputAdornment disableTypography position="start">
        foo
      </InputAdornment>,
    );
    const typographyClasses = getClasses(<Typography />);

    expect(container.querySelector(`.${typographyClasses.root}`)).to.equal(null);
  });

  it('should render children', () => {
    const { container } = render(
      <InputAdornment position="start">
        <div>foo</div>
      </InputAdornment>,
    );
    const adornment = container.firstChild;

    expect(adornment.firstChild).to.have.property('nodeName', 'DIV');
  });

  it('applies a marginDense class inside <FormControl margin="dense" />', () => {
    const { getByTestId } = render(
      <FormControl margin="dense">
        <InputAdornment data-testid="root">$</InputAdornment>
      </FormControl>,
    );

    expect(getByTestId('root')).to.have.class(classes.marginDense);
  });

  it('applies a hiddenLabel class inside <FormControl hiddenLabel />', () => {
    const { getByTestId } = render(
      <FormControl hiddenLabel>
        <InputAdornment data-testid="root">$</InputAdornment>
      </FormControl>,
    );

    expect(getByTestId('root')).to.have.class(classes.hiddenLabel);
  });
});
