import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import { expect } from 'chai';
import { createClientRender, screen } from 'test/utils';
import createMuiTheme from './createMuiTheme';
import styled from './customStyled';

describe('customStyled', () => {
  const render = createClientRender();
  it('should work', () => {
    const Div = styled('div')({
      width: '200px',
    });

    render(<Div data-testid="component">Test</Div>);

    const style = window.getComputedStyle(screen.getByTestId('component'));
    expect(style.getPropertyValue('width')).to.equal('200px');
  });

  it('should use defaultTheme if no theme is provided', () => {
    const Div = styled('div')((props) => ({
      backgroundColor: props.theme.palette.background.paper,
    }));

    render(<Div data-testid="component">Test</Div>);

    const style = window.getComputedStyle(screen.getByTestId('component'));
    expect(style.getPropertyValue('background-color')).to.equal('rgb(255, 255, 255)'); // white
  });

  it('should use theme from context if available', () => {
    const Div = styled('div')((props) => ({
      backgroundColor: props.theme.palette.background.paper,
    }));

    const theme = createMuiTheme({
      palette: {
        background: {
          paper: 'rgb(255, 255, 0)',
        },
      },
    });

    render(
      <ThemeProvider theme={theme}>
        <Div data-testid="component">Test</Div>
      </ThemeProvider>,
    );

    const style = window.getComputedStyle(screen.getByTestId('component'));
    expect(style.getPropertyValue('background-color')).to.equal('rgb(255, 255, 0)');
  });
});
