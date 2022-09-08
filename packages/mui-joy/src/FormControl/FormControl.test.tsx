import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, describeConformance } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import FormControl, { formControlClasses as classes } from '@mui/joy/FormControl';
import { unstable_capitalize as capitalize } from '@mui/utils';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Checkbox, { checkboxClasses } from '@mui/joy/Checkbox';
import Input, { inputClasses } from '@mui/joy/Input';
import Select, { selectClasses } from '@mui/joy/Select';
import Textarea, { textareaClasses } from '@mui/joy/Textarea';
import RadioGroup from '@mui/joy/RadioGroup';
import Switch, { switchClasses } from '@mui/joy/Switch';

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
    it('does not have color by default', () => {
      const { getByTestId } = render(<FormControl data-testid="root">Hello World</FormControl>);

      expect(getByTestId('root')).not.to.have.class(classes.colorNeutral);
      expect(getByTestId('root')).not.to.have.class(classes.colorPrimary);
      expect(getByTestId('root')).not.to.have.class(classes.colorDanger);
      expect(getByTestId('root')).not.to.have.class(classes.colorInfo);
      expect(getByTestId('root')).not.to.have.class(classes.colorSuccess);
      expect(getByTestId('root')).not.to.have.class(classes.colorWarning);
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

  describe('Checkbox', () => {
    it('should linked the helper text', () => {
      const { getByLabelText, getByText } = render(
        <FormControl>
          <Checkbox label="label" />
          <FormHelperText>helper text</FormHelperText>
        </FormControl>,
      );

      const helperText = getByText('helper text');

      expect(getByLabelText('label')).to.have.attribute('aria-describedby', helperText.id);
    });

    it('should inherit color prop from FormControl', () => {
      const { getByTestId } = render(
        <FormControl color="success">
          <Checkbox data-testid="checkbox" />
        </FormControl>,
      );

      expect(getByTestId('checkbox')).to.have.class(checkboxClasses.colorSuccess);
    });

    it('should inherit error prop from FormControl', () => {
      const { getByTestId } = render(
        <FormControl error>
          <Checkbox data-testid="checkbox" />
        </FormControl>,
      );

      expect(getByTestId('checkbox')).to.have.class(checkboxClasses.colorDanger);
    });

    it('should inherit disabled from FormControl', () => {
      const { getByLabelText, getByTestId } = render(
        <FormControl disabled>
          <Checkbox label="label" data-testid="checkbox" />
        </FormControl>,
      );

      expect(getByTestId('checkbox')).to.have.class(checkboxClasses.disabled);
      expect(getByLabelText('label')).to.have.attribute('disabled');
    });
  });

  describe('RadioGroup', () => {
    it('should linked the label and helper text', () => {
      const { getByLabelText, getByRole, getByText } = render(
        <FormControl>
          <FormLabel>label</FormLabel>
          <RadioGroup />
          <FormHelperText>helper text</FormHelperText>
        </FormControl>,
      );

      const label = getByText('label');
      const helperText = getByText('helper text');

      expect(getByLabelText('label')).to.have.attribute('role', 'radiogroup');
      expect(getByRole('radiogroup')).to.have.attribute('aria-labelledby', label.id);
      expect(getByRole('radiogroup')).to.have.attribute('aria-describedby', helperText.id);
    });
  });

  describe('Switch', () => {
    it('should linked the helper text', () => {
      const { getByLabelText, getByText } = render(
        <FormControl>
          <FormLabel>label</FormLabel>
          <Switch />
          <FormHelperText>helper text</FormHelperText>
        </FormControl>,
      );

      const helperText = getByText('helper text');

      expect(getByLabelText('label')).to.have.attribute('aria-describedby', helperText.id);
    });

    it('should inherit color prop from FormControl', () => {
      const { getByTestId } = render(
        <FormControl color="success">
          <Switch data-testid="switch" />
        </FormControl>,
      );

      expect(getByTestId('switch')).to.have.class(switchClasses.colorSuccess);
    });

    it('should inherit error prop from FormControl', () => {
      const { getByTestId } = render(
        <FormControl error>
          <Switch data-testid="switch" />
        </FormControl>,
      );

      expect(getByTestId('switch')).to.have.class(switchClasses.colorDanger);
    });

    it('should inherit disabled from FormControl', () => {
      const { getByLabelText, getByTestId } = render(
        <FormControl disabled>
          <FormLabel>label</FormLabel>
          <Switch data-testid="switch" />
        </FormControl>,
      );

      expect(getByTestId('switch')).to.have.class(switchClasses.disabled);
      expect(getByLabelText('label')).to.have.attribute('disabled');
    });
  });
});
