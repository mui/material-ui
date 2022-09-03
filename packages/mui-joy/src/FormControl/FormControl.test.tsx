import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, describeConformance } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import FormControl, { formControlClasses as classes } from '@mui/joy/FormControl';
import { unstable_capitalize as capitalize } from '@mui/utils';
import FormLabel from '@mui/joy/FormLabel';
import Input, { inputClasses } from '@mui/joy/Input';
import Select, { selectClasses } from '@mui/joy/Select';
import Textarea, { textareaClasses } from '@mui/joy/Textarea';

describe('<FormControl />', () => {
  const { render } = createRenderer();

  describeConformance(<FormControl />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    ThemeProvider,
    muiName: 'JoyFormControl',
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'fieldset',
    testVariantProps: { color: 'success' },
    skip: ['classesRoot', 'componentsProp'],
  }));

  describe('prop: color', () => {
    it('adds a neutral class by default', () => {
      const { getByTestId } = render(<FormControl data-testid="root">Hello World</FormControl>);

      expect(getByTestId('root')).to.have.class(classes.colorNeutral);
    });

    (['primary', 'success', 'info', 'danger', 'neutral', 'warning'] as const).forEach((color) => {
      it(`should render ${color}`, () => {
        const { getByTestId } = render(<FormControl data-testid="root" color={color} />);

        expect(getByTestId('root')).to.have.class(
          classes[`color${capitalize(color)}` as keyof typeof classes],
        );
      });
    });
  });

  describe('Input', () => {
    it('should linked the label', () => {
      const { getByLabelText } = render(
        <FormControl>
          <FormLabel>label</FormLabel>
          <Input />
        </FormControl>,
      );

      expect(getByLabelText('label')).toBeVisible();
    });

    it('should inherit color prop from FormControl', () => {
      const { getByTestId } = render(
        <FormControl color="success">
          <Input data-testid="input" />
        </FormControl>,
      );

      expect(getByTestId('input')).to.have.class(inputClasses.colorSuccess);
    });

    it('should inherit error prop from FormControl', () => {
      const { getByTestId } = render(
        <FormControl error>
          <Input data-testid="input" />
        </FormControl>,
      );

      expect(getByTestId('input')).to.have.class(inputClasses.colorDanger);
    });

    it('should inherit disabled from FormControl', () => {
      const { getByRole } = render(
        <FormControl disabled>
          <FormLabel>label</FormLabel>
          <Input />
        </FormControl>,
      );

      expect(getByRole('textbox')).to.have.attribute('disabled');
    });
  });

  describe('Textarea', () => {
    it('should linked the label', () => {
      const { getByLabelText } = render(
        <FormControl>
          <FormLabel>label</FormLabel>
          <Textarea />
        </FormControl>,
      );

      expect(getByLabelText('label')).toBeVisible();
    });

    it('should inherit color prop from FormControl', () => {
      const { getByTestId } = render(
        <FormControl color="success">
          <Textarea data-testid="textarea" />
        </FormControl>,
      );

      expect(getByTestId('textarea')).to.have.class(textareaClasses.colorSuccess);
    });

    it('should inherit error prop from FormControl', () => {
      const { getByTestId } = render(
        <FormControl error>
          <Textarea data-testid="textarea" />
        </FormControl>,
      );

      expect(getByTestId('textarea')).to.have.class(textareaClasses.colorDanger);
    });

    it('should inherit disabled from FormControl', () => {
      const { getByLabelText } = render(
        <FormControl disabled>
          <FormLabel>label</FormLabel>
          <Textarea />
        </FormControl>,
      );

      expect(getByLabelText('label')).to.have.attribute('disabled');
    });
  });

  describe('Select', () => {
    it('should linked the label', () => {
      const { getByLabelText } = render(
        <FormControl>
          <FormLabel>label</FormLabel>
          <Select />
        </FormControl>,
      );

      expect(getByLabelText('label')).toBeVisible();
    });

    it('should inherit color prop from FormControl', () => {
      const { getByTestId } = render(
        <FormControl color="success">
          <Select data-testid="select" />
        </FormControl>,
      );

      expect(getByTestId('select')).to.have.class(selectClasses.colorSuccess);
    });

    it('should inherit error prop from FormControl', () => {
      const { getByTestId } = render(
        <FormControl error>
          <Select data-testid="select" />
        </FormControl>,
      );

      expect(getByTestId('select')).to.have.class(selectClasses.colorDanger);
    });

    it('should inherit disabled from FormControl', () => {
      const { getByLabelText } = render(
        <FormControl disabled>
          <FormLabel>label</FormLabel>
          <Select />
        </FormControl>,
      );

      expect(getByLabelText('label')).to.have.attribute('disabled');
    });
  });
});
