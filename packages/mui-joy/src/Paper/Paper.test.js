import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, describeConformance } from 'test/utils';
import Paper, { paperClasses as classes } from '@mui/joy/Paper';

describe('<Paper />', () => {
  const { render } = createRenderer();

  describeConformance(<Paper />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    muiName: 'MuiPaper',
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'header',
    testVariantProps: { variant: 'text' },
    skip: ['themeVariants', 'classesRoot', 'componentsProp', 'themeDefaultProps'],
  }));

  describe('prop: variant', () => {
    it('undefined by default', () => {
      const { getByTestId } = render(<Paper data-testid="root">Hello World</Paper>);

      expect(getByTestId('root')).not.to.have.class(classes.variantText);
      expect(getByTestId('root')).not.to.have.class(classes.variantOutlined);
      expect(getByTestId('root')).not.to.have.class(classes.variantLight);
      expect(getByTestId('root')).not.to.have.class(classes.variantContained);
    });

    it('adds a text class', () => {
      const { getByTestId } = render(
        <Paper data-testid="root" variant="text">
          Hello World
        </Paper>,
      );

      expect(getByTestId('root')).to.have.class(classes.variantText);
    });

    it('adds a outlined class', () => {
      const { getByTestId } = render(
        <Paper data-testid="root" variant="outlined">
          Hello World
        </Paper>,
      );

      expect(getByTestId('root')).to.have.class(classes.variantOutlined);
    });

    it('adds a light class', () => {
      const { getByTestId } = render(
        <Paper data-testid="root" variant="light">
          Hello World
        </Paper>,
      );

      expect(getByTestId('root')).to.have.class(classes.variantLight);
    });

    it('adds a contained class', () => {
      const { getByTestId } = render(
        <Paper data-testid="root" variant="contained">
          Hello World
        </Paper>,
      );

      expect(getByTestId('root')).to.have.class(classes.variantContained);
    });
  });

  describe('prop: color', () => {
    it('adds a neutral class by default', () => {
      const { getByTestId } = render(<Paper data-testid="root">Hello World</Paper>);

      expect(getByTestId('root')).to.have.class(classes.colorNeutral);
    });

    it('adds a primary class', () => {
      const { getByTestId } = render(
        <Paper data-testid="root" color="primary">
          Hello World
        </Paper>,
      );

      expect(getByTestId('root')).to.have.class(classes.colorPrimary);
    });

    it('adds a neutral class', () => {
      const { getByTestId } = render(
        <Paper data-testid="root" color="neutral">
          Hello World
        </Paper>,
      );

      expect(getByTestId('root')).to.have.class(classes.colorNeutral);
    });

    it('adds a info class', () => {
      const { getByTestId } = render(
        <Paper data-testid="root" color="info">
          Hello World
        </Paper>,
      );

      expect(getByTestId('root')).to.have.class(classes.colorInfo);
    });

    it('adds a success class', () => {
      const { getByTestId } = render(
        <Paper data-testid="root" color="success">
          Hello World
        </Paper>,
      );

      expect(getByTestId('root')).to.have.class(classes.colorSuccess);
    });

    it('adds a warning class', () => {
      const { getByTestId } = render(
        <Paper data-testid="root" color="warning">
          Hello World
        </Paper>,
      );

      expect(getByTestId('root')).to.have.class(classes.colorWarning);
    });

    it('adds a danger class', () => {
      const { getByTestId } = render(
        <Paper data-testid="root" color="danger">
          Hello World
        </Paper>,
      );

      expect(getByTestId('root')).to.have.class(classes.colorDanger);
    });
  });

  describe('prop: elevation', () => {
    it('undefined by default', () => {
      const { getByTestId } = render(<Paper data-testid="root">Hello World</Paper>);

      expect(getByTestId('root')).not.to.have.class(classes.elevationXs);
      expect(getByTestId('root')).not.to.have.class(classes.elevationSm);
      expect(getByTestId('root')).not.to.have.class(classes.elevationMd);
      expect(getByTestId('root')).not.to.have.class(classes.elevationLg);
      expect(getByTestId('root')).not.to.have.class(classes.elevationXl);
    });

    it('adds a xs class', () => {
      const { getByTestId } = render(
        <Paper data-testid="root" elevation="xs">
          Hello World
        </Paper>,
      );

      expect(getByTestId('root')).to.have.class(classes.elevationXs);
    });

    it('adds a sm class', () => {
      const { getByTestId } = render(
        <Paper data-testid="root" elevation="sm">
          Hello World
        </Paper>,
      );

      expect(getByTestId('root')).to.have.class(classes.elevationSm);
    });

    it('adds a md class', () => {
      const { getByTestId } = render(
        <Paper data-testid="root" elevation="md">
          Hello World
        </Paper>,
      );

      expect(getByTestId('root')).to.have.class(classes.elevationMd);
    });

    it('adds a lg class', () => {
      const { getByTestId } = render(
        <Paper data-testid="root" elevation="lg">
          Hello World
        </Paper>,
      );

      expect(getByTestId('root')).to.have.class(classes.elevationLg);
    });

    it('adds a xl class', () => {
      const { getByTestId } = render(
        <Paper data-testid="root" elevation="xl">
          Hello World
        </Paper>,
      );

      expect(getByTestId('root')).to.have.class(classes.elevationXl);
    });
  });
});
