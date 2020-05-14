import * as React from 'react';
import { expect } from 'chai';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import { createClientRender } from 'test/utils/createClientRender';
import Checkbox from '../Checkbox';
import FormControlLabel from './FormControlLabel';
import FormControl from '../FormControl';

describe('<FormControlLabel />', () => {
  const mount = createMount();
  const render = createClientRender({ strict: false });
  let classes;

  before(() => {
    classes = getClasses(<FormControlLabel label="Pizza" control={<div />} />);
  });

  describeConformance(<FormControlLabel label="Pizza" control={<Checkbox />} />, () => ({
    classes,
    inheritComponent: 'label',
    mount,
    refInstanceof: window.HTMLLabelElement,
    skip: ['componentProp'],
  }));

  it('should render the label text inside an additional element', () => {
    const { container, getByText } = render(<FormControlLabel label="Pizza" control={<div />} />);
    const root = container.firstChild;

    expect(root).to.have.property('nodeName', 'LABEL');
    expect(root).to.have.class(classes.root);
    expect(getByText(/Pizza/)).not.to.have.class(classes.root);
    expect(getByText(/Pizza/)).to.have.class(classes.label);
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

  describe('with FormControl', () => {
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
  });

  it('should not inject extra props', () => {
    const Control = (props) => <div data-testid="control" name="Dave" {...props} />;
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
