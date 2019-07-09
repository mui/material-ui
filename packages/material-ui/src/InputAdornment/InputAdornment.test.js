import React from 'react';
import { expect } from 'chai';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '../test-utils/describeConformance';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import { cleanup, createClientRender } from 'test/utils/createClientRender';
import Typography from '../Typography';
import InputAdornment from './InputAdornment';
import TextField from '../TextField';
import FormControl from '../FormControl';
import Input from '../Input';

describe('<InputAdornment />', () => {
  let mount;
  const render = createClientRender({ strict: true });
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(<InputAdornment position="start">foo</InputAdornment>);
  });

  afterEach(() => {
    cleanup();
  });

  describeConformance(<InputAdornment position="start">foo</InputAdornment>, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
    after: () => mount.cleanUp(),
  }));

  it('should wrap text children in a Typography', () => {
    const { container } = render(<InputAdornment position="start">foo</InputAdornment>);
    const typographyClasses = getClasses(<Typography />);
    const typography = container.querySelector(`.${typographyClasses.root}`);

    expect(typography).to.be.ok;
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
        expect(consoleErrorMock.args()[0][0]).to.equal(
          'Warning: Material-UI: The `InputAdornment` variant infers the variant ' +
            'property you do not have to provide one.',
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

    expect(container.querySelector(`.${typographyClasses.root}`)).to.be.null;
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
});
