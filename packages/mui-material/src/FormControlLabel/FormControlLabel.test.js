import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import FormControlLabel, {
  formControlLabelClasses as classes,
} from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import describeConformance from '../../test/describeConformance';

describe('<FormControlLabel />', () => {
  const { render } = createRenderer();

  describeConformance(<FormControlLabel label="Pizza" control={<Checkbox />} />, () => ({
    classes,
    inheritComponent: 'label',
    render,
    muiName: 'MuiFormControlLabel',
    testVariantProps: { disabled: true },
    refInstanceof: window.HTMLLabelElement,
    slots: {
      typography: { expectedClassName: classes.label },
    },
    skip: ['componentProp', 'componentsProp'],
  }));

  describe('prop: label', () => {
    it('should render the label text inside an additional element', () => {
      const { container, getByText } = render(<FormControlLabel label="Pizza" control={<div />} />);
      const root = container.firstChild;

      expect(root).to.have.property('nodeName', 'LABEL');
      expect(root).to.have.class(classes.root);
      expect(getByText(/Pizza/)).not.to.have.class(classes.root);
      expect(getByText(/Pizza/)).to.have.class(classes.label);
    });

    it('should render numeric labels', () => {
      const { getByText } = render(<FormControlLabel label={5} control={<div />} />);

      expect(getByText(/5/)).not.to.equal(null);
    });

    it('should render node labels', () => {
      const { getByText } = render(<FormControlLabel label={<p>Pizza</p>} control={<div />} />);

      expect(getByText(/Pizza/)).not.to.equal(null);
      expect(getByText(/Pizza/).tagName).to.equal('P');
    });

    it('should render fragment labels', () => {
      const { getByText } = render(
        <FormControlLabel
          label={
            <React.Fragment>
              <strong>Delicious</strong>
              <p>Pizza</p>
            </React.Fragment>
          }
          control={<div />}
        />,
      );

      expect(getByText(/Pizza/)).not.to.equal(null);
      expect(getByText(/Pizza/).tagName).to.equal('P');
    });

    it('should render with nullish labels', () => {
      const { getByTestId } = render(
        <React.Fragment>
          <FormControlLabel
            data-testid="undefined-form-label"
            control={<div data-testid="undefined-control" />}
          />
          <FormControlLabel
            data-testid="null-form-label"
            label={null}
            control={<div data-testid="null-control" />}
          />
        </React.Fragment>,
      );

      expect(getByTestId('undefined-form-label')).not.to.equal(null);
      expect(getByTestId('undefined-control')).not.to.equal(null);

      expect(getByTestId('null-form-label')).not.to.equal(null);
      expect(getByTestId('null-control')).not.to.equal(null);
    });
  });

  describe('prop: disabled', () => {
    it('should disable everything 1', () => {
      const { container, getByTestId, getByText } = render(
        <FormControlLabel label="Pizza" disabled control={<div data-testid="control" />} />,
      );
      const root = container.firstChild;
      const control = getByTestId('control');
      const label = getByText(/Pizza/);

      expect(root).to.have.class(classes.disabled);
      expect(control).to.have.attribute('disabled');
      expect(label).to.have.class(classes.disabled);
    });

    it('should disable everything 2', () => {
      const { container, getByTestId, getByText } = render(
        <FormControlLabel
          label="Pizza"
          disabled
          control={<div data-testid="control" disabled />}
        />,
      );
      const root = container.firstChild;
      const control = getByTestId('control');
      const label = getByText(/Pizza/);

      expect(root).to.have.class(classes.disabled);
      expect(control).to.have.attribute('disabled');
      expect(label).to.have.class(classes.disabled);
    });
  });

  describe('prop: labelPlacement', () => {
    it('should have the `start` class', () => {
      const { container } = render(
        <FormControlLabel label="Pizza" labelPlacement="start" control={<div />} />,
      );

      expect(container.firstChild).to.have.class(classes.labelPlacementStart);
    });

    it('should have the `top` class', () => {
      const { container } = render(
        <FormControlLabel label="Pizza" labelPlacement="top" control={<div />} />,
      );

      expect(container.firstChild).to.have.class(classes.labelPlacementTop);
    });

    it('should have the `bottom` class', () => {
      const { container } = render(
        <FormControlLabel label="Pizza" labelPlacement="bottom" control={<div />} />,
      );

      expect(container.firstChild).to.have.class(classes.labelPlacementBottom);
    });
  });

  describe('prop: disableTypography', () => {
    it('should not add a typography component', () => {
      const { getByTestId } = render(
        <FormControlLabel
          label={<div name="test">Pizza</div>}
          disableTypography
          data-testid="FormControlLabel"
          control={<div />}
        />,
      );

      expect(getByTestId('FormControlLabel').children[1]).to.have.attribute('name', 'test');
    });

    it('should auto disable when passed a Typography component', () => {
      const { getByTestId } = render(
        <FormControlLabel
          label={<Typography name="test">Pizza</Typography>}
          data-testid="FormControlLabel"
          control={<div />}
        />,
      );

      expect(getByTestId('FormControlLabel').children[1]).to.have.attribute('name', 'test');
    });
  });

  describe('prop: required', () => {
    it('should visually show an asterisk but not include it in the a11y tree', () => {
      const { container } = render(<FormControlLabel required label="Pizza" control={<div />} />);

      expect(container.querySelector('label')).to.have.text('Pizza\u2009*');
      expect(container.querySelectorAll(`.${classes.asterisk}`)).to.have.lengthOf(1);
      expect(container.querySelector(`.${classes.asterisk}`)).toBeInaccessible();
    });

    it('should not show an asterisk by default', () => {
      const { container } = render(<FormControlLabel label="Pizza" control={<div />} />);

      expect(container.querySelector('label')).to.have.text('Pizza');
      expect(container.querySelectorAll(`.${classes.asterisk}`)).to.have.lengthOf(0);
    });
  });

  describe('componentsProps: typography', () => {
    it('should spread its contents to the typography element', () => {
      const { getByTestId } = render(
        <FormControlLabel
          label="Pizza"
          componentsProps={{
            typography: {
              'data-testid': 'labelTypography',
              name: 'test',
            },
          }}
          control={<div />}
        />,
      );

      expect(getByTestId('labelTypography')).to.have.attribute('name', 'test');
    });
  });

  describe('with FormControl', () => {
    describe('error', () => {
      it('should have the error class', () => {
        const { getByTestId } = render(
          <FormControl error>
            <FormControlLabel data-testid="FormControlLabel" control={<div />} label="Pizza" />
          </FormControl>,
        );

        expect(getByTestId('FormControlLabel')).to.have.class(classes.error);
      });
    });

    describe('enabled', () => {
      it('should not have the disabled class', () => {
        const { getByTestId } = render(
          <FormControl>
            <FormControlLabel data-testid="FormControlLabel" control={<div />} label="Pizza" />
          </FormControl>,
        );

        expect(getByTestId('FormControlLabel')).not.to.have.class(classes.disabled);
      });

      it('should be overridden by props', () => {
        const { getByTestId } = render(
          <FormControl>
            <FormControlLabel
              data-testid="FormControlLabel"
              control={<div />}
              disabled
              label="Pizza"
            />
          </FormControl>,
        );

        expect(getByTestId('FormControlLabel')).to.have.class(classes.disabled);
      });
    });

    describe('disabled', () => {
      it('should have the disabled class', () => {
        const { getByTestId } = render(
          <FormControl disabled>
            <FormControlLabel data-testid="FormControlLabel" control={<div />} label="Pizza" />
          </FormControl>,
        );

        expect(getByTestId('FormControlLabel')).to.have.class(classes.disabled);
      });

      it('should be overridden by props', () => {
        const { getByTestId } = render(
          <FormControl disabled>
            <FormControlLabel
              data-testid="FormControlLabel"
              control={<div />}
              disabled={false}
              label="Pizza"
            />
          </FormControl>,
        );

        expect(getByTestId('FormControlLabel')).not.to.have.class(classes.disabled);
      });
    });

    describe('required', () => {
      it('should not have the required class', () => {
        const { getByTestId } = render(
          <FormControl required>
            <FormControlLabel data-testid="FormControlLabel" control={<div />} label="Pizza" />
          </FormControl>,
        );

        expect(getByTestId('FormControlLabel')).not.to.have.class(classes.required);
      });

      it('should be overridden by props', () => {
        const { getByTestId } = render(
          <FormControl required>
            <FormControlLabel
              data-testid="FormControlLabel"
              control={<div />}
              required
              label="Pizza"
            />
          </FormControl>,
        );

        expect(getByTestId('FormControlLabel')).to.have.class(classes.required);
      });

      it('should not have the required attribute', () => {
        const { container } = render(
          <FormControl required>
            <FormControlLabel data-testid="FormControlLabel" control={<input />} label="Pizza" />
          </FormControl>,
        );
        const input = container.querySelector('input');
        expect(input).to.have.property('required', false);
      });
    });
  });

  it('should not inject extra props', () => {
    function Control(props) {
      return <div data-testid="control" name="Dave" {...props} />;
    }
    const { getByTestId } = render(<FormControlLabel label="Pizza" control={<Control />} />);

    expect(getByTestId('control')).to.have.attribute('name', 'Dave');
  });

  it('should forward some props', () => {
    const { getByTestId } = render(
      <FormControlLabel value="test" label="Pizza" control={<div data-testid="control" />} />,
    );

    expect(getByTestId('control')).to.have.attribute('value', 'test');
  });
});
