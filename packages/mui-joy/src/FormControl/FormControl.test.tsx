import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, screen } from '@mui/internal-test-utils';
import capitalize from '@mui/utils/capitalize';
import { ThemeProvider } from '@mui/joy/styles';
import FormControl, { formControlClasses as classes } from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Checkbox, { checkboxClasses } from '@mui/joy/Checkbox';
import Input, { inputClasses } from '@mui/joy/Input';
import Select, { selectClasses } from '@mui/joy/Select';
import Textarea, { textareaClasses } from '@mui/joy/Textarea';
import RadioGroup from '@mui/joy/RadioGroup';
import Radio, { radioClasses } from '@mui/joy/Radio';
import Switch, { switchClasses } from '@mui/joy/Switch';
import Autocomplete, { autocompleteClasses } from '@mui/joy/Autocomplete';
import describeConformance from '../../test/describeConformance';

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
    slots: {
      root: {
        expectedClassName: classes.root,
      },
    },
  }));

  describe('prop: color', () => {
    it('does not have color by default', () => {
      render(<FormControl data-testid="root">Hello World</FormControl>);

      expect(screen.getByTestId('root')).not.to.have.class(classes.colorNeutral);
      expect(screen.getByTestId('root')).not.to.have.class(classes.colorPrimary);
      expect(screen.getByTestId('root')).not.to.have.class(classes.colorDanger);
      expect(screen.getByTestId('root')).not.to.have.class(classes.colorSuccess);
      expect(screen.getByTestId('root')).not.to.have.class(classes.colorWarning);
    });

    (['primary', 'success', 'danger', 'neutral', 'warning'] as const).forEach((color) => {
      it(`should render ${color}`, () => {
        render(<FormControl data-testid="root" color={color} />);

        expect(screen.getByTestId('root')).to.have.class(
          classes[`color${capitalize(color)}` as keyof typeof classes],
        );
      });
    });
  });

  describe('Input', () => {
    it('should linked the label', () => {
      render(
        <FormControl>
          <FormLabel>label</FormLabel>
          <Input />
        </FormControl>,
      );

      expect(screen.getByLabelText('label')).toBeVisible();
    });

    it('should inherit color prop from FormControl', () => {
      render(
        <FormControl color="success">
          <Input data-testid="input" />
        </FormControl>,
      );

      expect(screen.getByTestId('input')).to.have.class(inputClasses.colorSuccess);
    });

    it('should inherit error prop from FormControl', () => {
      render(
        <FormControl error>
          <Input data-testid="input" />
        </FormControl>,
      );

      expect(screen.getByTestId('input')).to.have.class(inputClasses.colorDanger);
    });

    it('should inherit disabled from FormControl', () => {
      render(
        <FormControl disabled>
          <FormLabel>label</FormLabel>
          <Input />
        </FormControl>,
      );

      expect(screen.getByRole('textbox')).to.have.attribute('disabled');
    });

    it('should inherit required from FormControl', () => {
      render(
        <FormControl required>
          <FormLabel>label</FormLabel>
          <Input />
        </FormControl>,
      );

      expect(screen.getByRole('textbox')).to.have.attribute('required');
    });
  });

  describe('Textarea', () => {
    it('should linked the label', () => {
      render(
        <FormControl>
          <FormLabel>label</FormLabel>
          <Textarea />
        </FormControl>,
      );

      expect(screen.getByLabelText('label')).toBeVisible();
    });

    it('should inherit color prop from FormControl', () => {
      render(
        <FormControl color="success">
          <Textarea data-testid="textarea" />
        </FormControl>,
      );

      expect(screen.getByTestId('textarea')).to.have.class(textareaClasses.colorSuccess);
    });

    it('should inherit error prop from FormControl', () => {
      render(
        <FormControl error>
          <Textarea data-testid="textarea" />
        </FormControl>,
      );

      expect(screen.getByTestId('textarea')).to.have.class(textareaClasses.colorDanger);
    });

    it('should inherit disabled from FormControl', () => {
      render(
        <FormControl disabled>
          <FormLabel>label</FormLabel>
          <Textarea />
        </FormControl>,
      );

      expect(screen.getByLabelText('label')).to.have.attribute('disabled');
    });

    it('should inherit required from FormControl', () => {
      render(
        <FormControl required>
          <FormLabel>label</FormLabel>
          <Textarea minRows={2} />
        </FormControl>,
      );

      expect(screen.getByRole('textbox', { name: 'label' })).to.have.attribute('required');
    });
  });

  describe('Select', () => {
    it('should linked the label', () => {
      render(
        <FormControl>
          <FormLabel>label</FormLabel>
          <Select />
        </FormControl>,
      );

      expect(screen.getByLabelText('label')).toBeVisible();
    });

    it('should labeledby form label', () => {
      const { container } = render(
        <FormControl>
          <FormLabel>label</FormLabel>
          <Select />
        </FormControl>,
      );

      const label = container.querySelector('label');
      expect(screen.getByRole('combobox')).to.have.attribute('aria-labelledby', label?.id);
    });

    it('should inherit color prop from FormControl', () => {
      render(
        <FormControl color="success">
          <Select data-testid="select" />
        </FormControl>,
      );

      expect(screen.getByTestId('select')).to.have.class(selectClasses.colorSuccess);
    });

    it('should inherit error prop from FormControl', () => {
      render(
        <FormControl error>
          <Select data-testid="select" />
        </FormControl>,
      );

      expect(screen.getByTestId('select')).to.have.class(selectClasses.colorDanger);
    });

    it('should inherit disabled from FormControl', () => {
      render(
        <FormControl disabled>
          <FormLabel>label</FormLabel>
          <Select />
        </FormControl>,
      );

      expect(screen.getByLabelText('label')).to.have.attribute('disabled');
    });
  });

  describe('Checkbox', () => {
    it('should linked the label and helper text', () => {
      render(
        <FormControl>
          <FormLabel>label</FormLabel>
          <Checkbox />
          <FormHelperText>helper text</FormHelperText>
        </FormControl>,
      );

      const helperText = screen.getByText('helper text');

      expect(screen.getByLabelText('label')).to.have.attribute('aria-describedby', helperText.id);
    });

    it('should inherit color prop from FormControl', () => {
      render(
        <FormControl color="success">
          <Checkbox data-testid="checkbox" />
        </FormControl>,
      );

      expect(screen.getByTestId('checkbox')).to.have.class(checkboxClasses.colorSuccess);
    });

    it('should inherit error prop from FormControl', () => {
      render(
        <FormControl error>
          <Checkbox data-testid="checkbox" />
        </FormControl>,
      );

      expect(screen.getByTestId('checkbox')).to.have.class(checkboxClasses.colorDanger);
    });

    it('should inherit disabled from FormControl', () => {
      render(
        <FormControl disabled>
          <Checkbox label="label" data-testid="checkbox" />
        </FormControl>,
      );

      expect(screen.getByTestId('checkbox')).to.have.class(checkboxClasses.disabled);
      expect(screen.getByLabelText('label')).to.have.attribute('disabled');
    });

    it('should inherit required from FormControl', () => {
      render(
        <FormControl required>
          <Checkbox label="label" data-testid="checkbox" />
        </FormControl>,
      );

      expect(screen.getByLabelText('label')).to.have.attribute('required');
    });
  });

  describe('RadioGroup', () => {
    it('should linked the label and helper text', () => {
      render(
        <FormControl>
          <FormLabel>label</FormLabel>
          <RadioGroup />
          <FormHelperText>helper text</FormHelperText>
        </FormControl>,
      );

      const label = screen.getByText('label');
      const helperText = screen.getByText('helper text');

      expect(screen.getByLabelText('label')).to.have.attribute('role', 'radiogroup');
      expect(screen.getByRole('radiogroup')).to.have.attribute('aria-labelledby', label.id);
      expect(screen.getByRole('radiogroup')).to.have.attribute('aria-describedby', helperText.id);
    });

    it('works with radio buttons', () => {
      render(
        <FormControl>
          <FormLabel>label</FormLabel>
          <RadioGroup>
            <Radio value="1" />
            <Radio value="2" />
          </RadioGroup>
          <FormHelperText>helper text</FormHelperText>
        </FormControl>,
      );

      const label = screen.getByText('label');
      const helperText = screen.getByText('helper text');

      expect(screen.getAllByRole('radio')).to.have.length(2);
      expect(screen.getByLabelText('label')).to.have.attribute('role', 'radiogroup');
      expect(screen.getByRole('radiogroup')).to.have.attribute('aria-labelledby', label.id);
      expect(screen.getByRole('radiogroup')).to.have.attribute('aria-describedby', helperText.id);
    });

    it('radio buttons should inherit size from the FormControl', () => {
      render(
        <FormControl size="sm">
          <FormLabel>label</FormLabel>
          <RadioGroup>
            <Radio value="1" data-testid="radio1" />
          </RadioGroup>
          <FormHelperText>helper text</FormHelperText>
        </FormControl>,
      );

      expect(screen.getByTestId('radio1')).to.have.class(radioClasses.sizeSm);
    });

    it('radio buttons should inherit size from the RadioGroup', () => {
      render(
        <FormControl size="sm">
          <FormLabel>label</FormLabel>
          <RadioGroup size="md">
            <Radio value="1" data-testid="radio1" />
          </RadioGroup>
          <FormHelperText>helper text</FormHelperText>
        </FormControl>,
      );

      expect(screen.getByTestId('radio1')).to.have.class(radioClasses.sizeMd);
    });
  });

  describe('Radio', () => {
    it('should linked the label and helper text', () => {
      render(
        <FormControl>
          <FormLabel>label</FormLabel>
          <Radio />
          <FormHelperText>helper text</FormHelperText>
        </FormControl>,
      );

      const helperText = screen.getByText('helper text');

      expect(screen.getByLabelText('label')).to.have.attribute('aria-describedby', helperText.id);
    });

    it('should inherit color prop from FormControl', () => {
      render(
        <FormControl color="success">
          <Radio data-testid="radio" />
        </FormControl>,
      );

      expect(screen.getByTestId('radio')).to.have.class(radioClasses.colorSuccess);
    });

    it('should inherit error prop from FormControl', () => {
      render(
        <FormControl error>
          <Radio data-testid="radio" />
        </FormControl>,
      );

      expect(screen.getByTestId('radio')).to.have.class(radioClasses.colorDanger);
    });

    it('should inherit disabled from FormControl', () => {
      render(
        <FormControl disabled>
          <Radio label="label" data-testid="radio" />
        </FormControl>,
      );

      expect(screen.getByTestId('radio')).to.have.class(radioClasses.disabled);
      expect(screen.getByLabelText('label')).to.have.attribute('disabled');
    });

    it('should inherit required from FormControl', () => {
      render(
        <FormControl required>
          <Radio label="label" data-testid="radio" />
        </FormControl>,
      );

      expect(screen.getByLabelText('label')).to.have.attribute('required');
    });
  });

  describe('Switch', () => {
    it('should linked the helper text', () => {
      render(
        <FormControl>
          <FormLabel>label</FormLabel>
          <Switch />
          <FormHelperText>helper text</FormHelperText>
        </FormControl>,
      );

      const helperText = screen.getByText('helper text');

      expect(screen.getByLabelText('label')).to.have.attribute('aria-describedby', helperText.id);
    });

    it('should inherit color prop from FormControl', () => {
      render(
        <FormControl color="success">
          <Switch data-testid="switch" />
        </FormControl>,
      );

      expect(screen.getByTestId('switch')).to.have.class(switchClasses.colorSuccess);
    });

    it('should inherit error prop from FormControl', () => {
      render(
        <FormControl error>
          <Switch data-testid="switch" />
        </FormControl>,
      );

      expect(screen.getByTestId('switch')).to.have.class(switchClasses.colorDanger);
    });

    it('should inherit disabled from FormControl', () => {
      render(
        <FormControl disabled>
          <FormLabel>label</FormLabel>
          <Switch data-testid="switch" />
        </FormControl>,
      );

      expect(screen.getByTestId('switch')).to.have.class(switchClasses.disabled);
      expect(screen.getByLabelText('label')).to.have.attribute('disabled');
    });
  });

  describe('Autocomplete', () => {
    it('should linked the label', () => {
      render(
        <FormControl>
          <FormLabel>label</FormLabel>
          <Autocomplete options={[]} />
        </FormControl>,
      );

      expect(screen.getByLabelText('label')).toBeVisible();
    });

    it('should inherit color prop from FormControl', () => {
      render(
        <FormControl color="success">
          <Autocomplete options={[]} data-testid="input" />
        </FormControl>,
      );

      expect(screen.getByTestId('input')).to.have.class(autocompleteClasses.colorSuccess);
    });

    it('should inherit error prop from FormControl', () => {
      render(
        <FormControl error>
          <Autocomplete options={[]} data-testid="input" />
        </FormControl>,
      );

      expect(screen.getByTestId('input')).to.have.class(autocompleteClasses.colorDanger);
    });

    it('should inherit disabled from FormControl', () => {
      render(
        <FormControl disabled>
          <FormLabel>label</FormLabel>
          <Autocomplete options={[]} />
        </FormControl>,
      );

      expect(screen.getByRole('combobox')).to.have.attribute('disabled');
    });

    it('should inherit required from FormControl', () => {
      render(
        <FormControl disabled>
          <FormLabel>label</FormLabel>
          <Autocomplete options={[]} />
        </FormControl>,
      );

      expect(screen.getByRole('combobox')).to.have.attribute('disabled');
    });
  });

  it('should inherit htmlFor from FormControl if htmlFor is undefined', () => {
    render(
      <FormControl>
        <FormLabel htmlFor={undefined}>label</FormLabel>
      </FormControl>,
    );

    expect(screen.getByText('label')).to.have.attribute('for');
  });

  it('should inherit id from FormControl if id is undefined', () => {
    render(
      <FormControl>
        <FormLabel id={undefined}>label</FormLabel>
      </FormControl>,
    );

    expect(screen.getByText('label')).to.have.attribute('id');
  });
});
