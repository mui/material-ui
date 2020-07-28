import { expect } from 'chai';
import React from 'react';
import { createClientRender, screen } from 'test/utils';
import { createMuiTheme } from '@material-ui/core/styles';
import ThemeProvider from '../ThemeProvider';
import useThemeVariants from './useThemeVariants';
import withStyles from '../withStyles';

describe('useThemeVariants', () => {
  const render = createClientRender();

  const ComponentInternal = (props) => {
    const { className, ...other } = props;
    const themeVariantsClasses = useThemeVariants(props, 'Test');
    return <div className={`${themeVariantsClasses} ${className}`} {...other} />;
  };

  const Component = withStyles({}, { name: 'Test' })(ComponentInternal);

  it('returns variants classes if props do match', () => {
    const theme = createMuiTheme({
      variants: {
        Test: [
          {
            props: { variant: 'test' },
            styles: { backgroundColor: 'rgb(255, 0, 0)' },
          },
        ],
      },
    });

    render(
      <ThemeProvider theme={theme}>
        <Component data-testid="component" variant="test">
          Test
        </Component>
      </ThemeProvider>,
    );

    const style = window.getComputedStyle(screen.getByTestId('component'));
    expect(style.getPropertyValue('background-color')).to.equal('rgb(255, 0, 0)');
  });

  it('does not return variants classes if props do not match', () => {
    const theme = createMuiTheme({
      variants: {
        Test: [
          {
            props: { variant: 'test' },
            styles: { backgroundColor: 'rgb(255, 0, 0)' },
          },
        ],
      },
    });

    render(
      <ThemeProvider theme={theme}>
        <Component data-testid="component">Test</Component>
      </ThemeProvider>,
    );

    const style = window.getComputedStyle(screen.getByTestId('component'));
    expect(style.getPropertyValue('background-color')).not.to.equal('rgb(255, 0, 0)');
  });

  it('matches correctly multiple props', () => {
    const theme = createMuiTheme({
      variants: {
        Test: [
          {
            props: { variant: 'test' },
            styles: { backgroundColor: 'rgb(255, 0, 0)' },
          },
          {
            props: { variant: 'test', color: 'primary' },
            styles: { backgroundColor: 'rgb(255, 255, 0)' },
          },
          {
            props: { variant: 'test', color: 'secondary' },
            styles: { backgroundColor: 'rgb(0, 0, 255)' },
          },
        ],
      },
    });

    render(
      <ThemeProvider theme={theme}>
        <Component data-testid="component" variant="test" color="primary">
          Test
        </Component>
      </ThemeProvider>,
    );

    const style = window.getComputedStyle(screen.getByTestId('component'));
    expect(style.getPropertyValue('background-color')).to.equal('rgb(255, 255, 0)');
  });
});
