import * as React from 'react';
import { createRenderer, screen, within } from '@mui/internal-test-utils';
import { expect } from 'chai';
import Button, { buttonClasses } from '@mui/material/Button';
import LoadingButton, { loadingButtonClasses as classes } from '@mui/lab/LoadingButton';
import ButtonGroup, { buttonGroupClasses } from '@mui/material/ButtonGroup';
import describeConformance from '../../test/describeConformance';

describe('<LoadingButton />', () => {
  const { render } = createRenderer();

  describeConformance(<LoadingButton>Conformance?</LoadingButton>, () => ({
    classes,
    inheritComponent: Button,
    render,
    muiName: 'MuiLoadingButton',
    testVariantProps: { loading: true },
    refInstanceof: window.HTMLButtonElement,
    skip: ['componentProp', 'componentsProp'],
  }));

  it('is in tab-order by default', () => {
    render(<LoadingButton />);

    expect(screen.getByRole('button')).to.have.property('tabIndex', 0);
  });

  it('prop: classes can be appended to MuiButton', () => {
    render(<LoadingButton variant="outlined" classes={{ outlined: 'loading-button-outlined' }} />);
    const button = screen.getByRole('button');

    expect(button).to.have.class('MuiButton-outlined');
    expect(button).to.have.class('loading-button-outlined');
  });

  describe('prop: loading', () => {
    it('disables the button', () => {
      render(<LoadingButton loading />);

      const button = screen.getByRole('button');
      expect(button).to.have.property('tabIndex', -1);
      expect(button).to.have.property('disabled', true);
    });

    it('cannot be enabled while `loading`', () => {
      render(<LoadingButton disabled={false} loading />);

      expect(screen.getByRole('button')).to.have.property('disabled', true);
    });

    it('renders a progressbar that is labelled by the button', () => {
      render(<LoadingButton loading>Submit</LoadingButton>);

      const button = screen.getByRole('button');
      const progressbar = within(button).getByRole('progressbar');
      expect(progressbar).toHaveAccessibleName('Submit');
    });
  });

  describe('prop: loadingIndicator', () => {
    it('is not rendered by default', () => {
      render(<LoadingButton loadingIndicator="loading">Test</LoadingButton>);

      expect(screen.getByRole('button')).to.have.text('Test');
    });

    it('is rendered before the children when `loading`', () => {
      render(
        <LoadingButton loadingIndicator="loading…" loading>
          Test
        </LoadingButton>,
      );

      expect(screen.getByRole('button')).to.have.text('loading…Test');
    });
  });

  describe('ButtonGroup works with LoadingButton', () => {
    it('correctly passes props to children', () => {
      const { getByRole } = render(
        <ButtonGroup variant="contained" size="large" color="secondary">
          <LoadingButton />
        </ButtonGroup>,
      );
      const button = getByRole('button');
      expect(button).to.have.class(buttonClasses.contained);
      expect(button).to.have.class(buttonClasses.sizeLarge);
      expect(button).to.have.class(buttonClasses.containedSecondary);
    });

    it('correctly applies position classes to loading buttons', () => {
      render(
        <ButtonGroup>
          <LoadingButton>Button 1</LoadingButton>
          <LoadingButton>Button 2</LoadingButton>
          <LoadingButton>Button 3</LoadingButton>
        </ButtonGroup>,
      );

      const firstButton = screen.getAllByRole('button')[0];
      const middleButton = screen.getAllByRole('button')[1];
      const lastButton = screen.getAllByRole('button')[2];

      expect(firstButton).to.have.class(buttonGroupClasses.firstButton);
      expect(firstButton).not.to.have.class(buttonGroupClasses.middleButton);
      expect(firstButton).not.to.have.class(buttonGroupClasses.lastButton);

      expect(middleButton).to.have.class(buttonGroupClasses.middleButton);
      expect(middleButton).not.to.have.class(buttonGroupClasses.firstButton);
      expect(middleButton).not.to.have.class(buttonGroupClasses.lastButton);

      expect(lastButton).to.have.class(buttonGroupClasses.lastButton);
      expect(lastButton).not.to.have.class(buttonGroupClasses.middleButton);
      expect(lastButton).not.to.have.class(buttonGroupClasses.firstButton);
    });
  });
});
