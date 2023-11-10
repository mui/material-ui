import * as React from 'react';
import { expect } from 'chai';
import {
  createRenderer,
  screen,
  describeConformance,
  strictModeDoubleLoggingSuppressed,
  MuiRenderResult,
} from '@mui-internal/test-utils';
import LinearProgress, {
  linearProgressClasses as classes,
} from '@mui/material-next/LinearProgress';
import { CssVarsProvider, extendTheme } from '../styles';

describe('<LinearProgress />', () => {
  const { render } = createRenderer();

  describeConformance(<LinearProgress />, () => ({
    classes,
    inheritComponent: 'span',
    render,
    muiName: 'MuiLinearProgress',
    testDeepOverrides: { slotName: 'bar', slotClassName: classes.bar },
    testVariantProps: { variant: 'determinate', value: 25 },
    refInstanceof: window.HTMLSpanElement,
    ThemeProvider: CssVarsProvider,
    createTheme: extendTheme,
    skip: ['componentProp', 'componentsProp'],
  }));

  it('should render indeterminate variant by default', () => {
    render(<LinearProgress />);
    const progressbar = screen.getByRole('progressbar');

    expect(progressbar).to.have.class(classes.root);
    expect(progressbar).to.have.class(classes.indeterminate);
    expect(progressbar.children[0]).to.have.class(classes.bar1Indeterminate);
    expect(progressbar.children[1]).to.have.class(classes.bar2Indeterminate);
  });

  it('should render for the primary color by default', () => {
    render(<LinearProgress />);
    const progressbar = screen.getByRole('progressbar');

    expect(progressbar.children[0]).to.have.class(classes.barColorPrimary);
    expect(progressbar.children[1]).to.have.class(classes.barColorPrimary);
  });

  it('should render for the secondary color', () => {
    render(<LinearProgress color="secondary" />);
    const progressbar = screen.getByRole('progressbar');

    expect(progressbar.children[0]).to.have.class(classes.barColorSecondary);
    expect(progressbar.children[1]).to.have.class(classes.barColorSecondary);
  });

  it('should render for the tertiary color', () => {
    render(<LinearProgress color="tertiary" />);
    const progressbar = screen.getByRole('progressbar');

    expect(progressbar.children[0]).to.have.class(classes.barColorTertiary);
    expect(progressbar.children[1]).to.have.class(classes.barColorTertiary);
  });

  it('should render with determinate classes for the primary color by default', () => {
    render(<LinearProgress value={1} variant="determinate" />);
    const progressbar = screen.getByRole('progressbar');

    expect(progressbar).to.have.class(classes.determinate);
    expect(progressbar.children[0]).to.have.class(classes.barColorPrimary);
    expect(progressbar.children[0]).to.have.class(classes.bar1Determinate);
  });

  it('should render with determinate classes for the primary color', () => {
    render(<LinearProgress color="primary" value={1} variant="determinate" />);
    const progressbar = screen.getByRole('progressbar');

    expect(progressbar).to.have.class(classes.determinate);
    expect(progressbar.children[0]).to.have.class(classes.barColorPrimary);
    expect(progressbar.children[0]).to.have.class(classes.bar1Determinate);
  });

  it('should render with determinate classes for the secondary color', () => {
    render(<LinearProgress color="secondary" value={1} variant="determinate" />);
    const progressbar = screen.getByRole('progressbar');

    expect(progressbar).to.have.class(classes.determinate);
    expect(progressbar.children[0]).to.have.class(classes.barColorSecondary);
    expect(progressbar.children[0]).to.have.class(classes.bar1Determinate);
  });

  it('should render with determinate classes for the tertiary color', () => {
    render(<LinearProgress color="tertiary" value={1} variant="determinate" />);
    const progressbar = screen.getByRole('progressbar');

    expect(progressbar).to.have.class(classes.determinate);
    expect(progressbar.children[0]).to.have.class(classes.barColorTertiary);
    expect(progressbar.children[0]).to.have.class(classes.bar1Determinate);
  });

  it('should set width of bar1 on determinate variant', () => {
    render(<LinearProgress variant="determinate" value={77} />);
    const progressbar = screen.getByRole('progressbar');

    expect(progressbar.children[0]).to.have.nested.property('style.transform', 'translateX(-23%)');
  });

  it('should render with buffer classes for the primary color by default', () => {
    render(<LinearProgress value={1} valueBuffer={1} variant="buffer" />);
    const progressbar = screen.getByRole('progressbar');

    expect(progressbar.children[0]).to.have.class(classes.dashedColorPrimary);
    expect(progressbar.children[1]).to.have.class(classes.barColorPrimary);
    expect(progressbar.children[1]).to.have.class(classes.bar1Buffer);
    expect(progressbar.children[2]).to.have.class(classes.colorPrimary);
    expect(progressbar.children[2]).to.have.class(classes.bar2Buffer);
  });

  it('should render with buffer classes for the primary color', () => {
    render(<LinearProgress value={1} valueBuffer={1} color="primary" variant="buffer" />);
    const progressbar = screen.getByRole('progressbar');

    expect(progressbar.children[0]).to.have.class(classes.dashedColorPrimary);
    expect(progressbar.children[1]).to.have.class(classes.barColorPrimary);
    expect(progressbar.children[1]).to.have.class(classes.bar1Buffer);
    expect(progressbar.children[2]).to.have.class(classes.colorPrimary);
    expect(progressbar.children[2]).to.have.class(classes.bar2Buffer);
  });

  it('should render with buffer classes for the secondary color', () => {
    render(<LinearProgress value={1} valueBuffer={1} color="secondary" variant="buffer" />);
    const progressbar = screen.getByRole('progressbar');

    expect(progressbar.children[0]).to.have.class(classes.dashedColorSecondary);
    expect(progressbar.children[1]).to.have.class(classes.barColorSecondary);
    expect(progressbar.children[1]).to.have.class(classes.bar1Buffer);
    expect(progressbar.children[2]).to.have.class(classes.colorSecondary);
    expect(progressbar.children[2]).to.have.class(classes.bar2Buffer);
  });

  it('should render with buffer classes for the tertiary color', () => {
    render(<LinearProgress value={1} valueBuffer={1} color="tertiary" variant="buffer" />);
    const progressbar = screen.getByRole('progressbar');

    expect(progressbar.children[0]).to.have.class(classes.dashedColorTertiary);
    expect(progressbar.children[1]).to.have.class(classes.barColorTertiary);
    expect(progressbar.children[1]).to.have.class(classes.bar1Buffer);
    expect(progressbar.children[2]).to.have.class(classes.colorTertiary);
    expect(progressbar.children[2]).to.have.class(classes.bar2Buffer);
  });

  it('should set width of bar1 and bar2 on buffer variant', () => {
    render(<LinearProgress variant="buffer" value={77} valueBuffer={85} />);

    expect(document.querySelector(`.${classes.bar1Buffer}`)).to.have.nested.property(
      'style.transform',
      'translateX(-23%)',
    );
    expect(document.querySelector(`.${classes.bar2Buffer}`)).to.have.nested.property(
      'style.transform',
      'translateX(-15%)',
    );
  });

  it('should render with query classes', () => {
    render(<LinearProgress variant="query" />);
    const progressbar = screen.getByRole('progressbar');

    expect(progressbar).to.have.class(classes.query);
    expect(progressbar.children[0]).to.have.class(classes.barColorPrimary);
    expect(progressbar.children[0]).to.have.class(classes.barColorPrimary);
    expect(progressbar.children[1]).to.have.class(classes.barColorPrimary);
    expect(progressbar.children[1]).to.have.class(classes.bar2Indeterminate);
  });

  it('exposes the current, min and max value to screen readers when determinate', () => {
    render(<LinearProgress variant="determinate" value={77} />);
    const progressbar = screen.getByRole('progressbar');

    expect(progressbar).to.have.attribute('aria-valuenow', '77');
    expect(progressbar).to.have.attribute('aria-valuemin', '0');
    expect(progressbar).to.have.attribute('aria-valuemax', '100');
  });

  describe('prop: value', () => {
    it('should warn when not used as expected', () => {
      let rerender: MuiRenderResult['rerender'];

      expect(() => {
        ({ rerender } = render(<LinearProgress variant="determinate" value={undefined} />));
      }).toErrorDev([
        'MUI: You need to provide a value prop',
        !strictModeDoubleLoggingSuppressed && 'MUI: You need to provide a value prop',
      ]);

      expect(() => {
        rerender(<LinearProgress variant="buffer" value={undefined} />);
      }).toErrorDev([
        'MUI: You need to provide a value prop',
        'MUI: You need to provide a valueBuffer prop',
        !strictModeDoubleLoggingSuppressed && 'MUI: You need to provide a value prop',
        !strictModeDoubleLoggingSuppressed && 'MUI: You need to provide a valueBuffer prop',
      ]);
    });
  });

  describe('prop: fourColor ', () => {
    it('should default to false', () => {
      render(<LinearProgress variant="indeterminate" />);
      const progressbar = screen.getByRole('progressbar');

      expect(progressbar).to.have.class(classes.root);
      expect(progressbar).not.to.have.class(classes.fourColor);
      expect(progressbar.children[0]).not.to.have.class(classes.bar1FourColor);
      expect(progressbar.children[1]).not.to.have.class(classes.bar2FourColor);
    });

    it('should render without fourColor class when set to false', () => {
      render(<LinearProgress variant="indeterminate" fourColor={false} />);
      const progressbar = screen.getByRole('progressbar');

      expect(progressbar).to.have.class(classes.root);
      expect(progressbar).not.to.have.class(classes.fourColor);
      expect(progressbar.children[0]).not.to.have.class(classes.bar1FourColor);
      expect(progressbar.children[1]).not.to.have.class(classes.bar2FourColor);
    });

    it('should render with fourColor class when set to true', () => {
      render(<LinearProgress variant="indeterminate" fourColor />);
      const progressbar = screen.getByRole('progressbar');

      expect(progressbar).to.have.class(classes.root);
      expect(progressbar).to.have.class(classes.fourColor);
      expect(progressbar.children[0]).to.have.class(classes.bar1FourColor);
      expect(progressbar.children[1]).to.have.class(classes.bar2FourColor);
    });
  });
});
