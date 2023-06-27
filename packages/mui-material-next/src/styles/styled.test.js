import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, screen } from 'test/utils';
import { styled } from '@mui/material-next/styles';

describe('styled', () => {
  const { render } = createRenderer();

  it('should work', () => {
    const Div = styled('div')`
      width: 200px;
    `;

    const { container } = render(<Div>Test</Div>);

    expect(container.firstChild).toHaveComputedStyle({
      width: '200px',
    });
  });

  it('should use defaultTheme if no theme is provided', () => {
    const Div = styled('div')`
      width: ${(props) => props.theme.spacing(1)};
    `;

    const { container } = render(<Div>Test</Div>);

    expect(container.firstChild).toHaveComputedStyle({
      width: '8px',
    });
  });

  describe('dynamic styles', () => {
    it('can adapt styles to props', () => {
      const Div = styled('div')`
        font-size: ${(props) => props.scale * 8}px;
        padding-left: ${(props) => props.scale * 2}px;
      `;
      render(<Div scale={4} data-testid="target" />);

      expect(screen.getByTestId('target')).toHaveComputedStyle({
        fontSize: '32px',
        paddingLeft: '8px',
      });
    });
  });

  describe('sx prop', () => {
    it('should apply color prop to theme.sys.color if available', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }
      const Div = styled('div')``;

      render(<Div sx={{ color: 'error' }} data-testid="target" />);

      expect(screen.getByTestId('target')).toHaveComputedStyle({
        color: 'rgb(179, 38, 30)',
      });
    });
    it('should apply color prop to theme.ref.palette if available', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }
      const Div = styled('div')``;

      render(<Div sx={{ color: 'error.80' }} data-testid="target" />);

      expect(screen.getByTestId('target')).toHaveComputedStyle({
        color: 'rgb(242, 184, 181)',
      });
    });
    it('should apply bgcolor prop to theme.sys.color if available', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }
      const Div = styled('div')``;

      render(<Div sx={{ bgcolor: 'error' }} data-testid="target" />);

      expect(screen.getByTestId('target')).toHaveComputedStyle({
        backgroundColor: 'rgb(179, 38, 30)',
      });
    });
    it('should apply bgcolor prop to theme.ref.palette if available', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }
      const Div = styled('div')``;

      render(<Div sx={{ bgcolor: 'error.80' }} data-testid="target" />);

      expect(screen.getByTestId('target')).toHaveComputedStyle({
        backgroundColor: 'rgb(242, 184, 181)',
      });
    });
    it('should apply backgroundColor prop to theme.sys.color if available', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }
      const Div = styled('div')``;

      render(<Div sx={{ backgroundColor: 'error' }} data-testid="target" />);

      expect(screen.getByTestId('target')).toHaveComputedStyle({
        backgroundColor: 'rgb(179, 38, 30)',
      });
    });
    it('should apply backgroundColor prop to theme.ref.palette if available', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }
      const Div = styled('div')``;

      render(<Div sx={{ backgroundColor: 'error.80' }} data-testid="target" />);

      expect(screen.getByTestId('target')).toHaveComputedStyle({
        backgroundColor: 'rgb(242, 184, 181)',
      });
    });
    it('should apply border*Color props to theme.sys.color if available', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }
      const Div = styled('div')``;

      render(
        <Div
          sx={{
            borderTopColor: 'error',
            borderBottomColor: 'error',
            borderLeftColor: 'error',
            borderRightColor: 'error',
          }}
          data-testid="target"
        />,
      );

      expect(screen.getByTestId('target')).toHaveComputedStyle({
        borderTopColor: 'rgb(179, 38, 30)',
        borderBottomColor: 'rgb(179, 38, 30)',
        borderLeftColor: 'rgb(179, 38, 30)',
        borderRightColor: 'rgb(179, 38, 30)',
      });
    });
    it('should apply border*Color props to theme.ref.palette if available', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }
      const Div = styled('div')``;

      render(
        <Div
          sx={{
            borderTopColor: 'error.80',
            borderBottomColor: 'error.80',
            borderLeftColor: 'error.80',
            borderRightColor: 'error.80',
          }}
          data-testid="target"
        />,
      );

      expect(screen.getByTestId('target')).toHaveComputedStyle({
        borderTopColor: 'rgb(242, 184, 181)',
        borderBottomColor: 'rgb(242, 184, 181)',
        borderLeftColor: 'rgb(242, 184, 181)',
        borderRightColor: 'rgb(242, 184, 181)',
      });
    });
    it('should apply borderColor props to theme.sys.color if available', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }
      const Div = styled('div')``;

      render(<Div sx={{ borderColor: 'error' }} data-testid="target" />);

      expect(screen.getByTestId('target')).toHaveComputedStyle({
        borderTopColor: 'rgb(179, 38, 30)',
        borderBottomColor: 'rgb(179, 38, 30)',
        borderLeftColor: 'rgb(179, 38, 30)',
        borderRightColor: 'rgb(179, 38, 30)',
      });
    });
    it('should apply borderColor props to theme.ref.palette if available', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }
      const Div = styled('div')``;

      render(<Div sx={{ borderColor: 'error.80' }} data-testid="target" />);

      expect(screen.getByTestId('target')).toHaveComputedStyle({
        borderTopColor: 'rgb(242, 184, 181)',
        borderBottomColor: 'rgb(242, 184, 181)',
        borderLeftColor: 'rgb(242, 184, 181)',
        borderRightColor: 'rgb(242, 184, 181)',
      });
    });

    it('should apply borderRadius from sys.shape.corner', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }
      const Div = styled('div')``;

      render(<Div sx={{ borderRadius: 'small' }} data-testid="target" />);

      expect(screen.getByTestId('target')).toHaveComputedStyle({
        borderTopLeftRadius: '8px',
      });
    });

    it('should multiple borderRadius with theme.shape.borderRadius if provided as number', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }
      const Div = styled('div')``;

      render(<Div sx={{ borderRadius: 4 }} data-testid="target" />);

      expect(screen.getByTestId('target')).toHaveComputedStyle({
        borderTopLeftRadius: '16px',
      });
    });
  });
});
