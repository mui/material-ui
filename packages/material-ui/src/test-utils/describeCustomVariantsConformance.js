import { expect } from 'chai';
import * as React from 'react';
import { createClientRender, screen } from 'test/utils/createClientRender';
import {
  createMuiTheme,
  ThemeProvider,
} from '../styles';

/**
 * Tests whether the custom variants defined in the theme work as expected.
 *
 * @param {Component} - the component with it's minimal required props
 * @param {string} name
 *
 */
export default function describeCustomVariantsConformance(Component, name) {
  describe('Material-UI custom variants', () => {
    const render = createClientRender();

    const WrappedComponent = ({ theme, ...props }) => {
      return <ThemeProvider theme={theme}><Component data-testid="component" {...props}>Content</Component></ThemeProvider>
    }

    it('should map the variant classkey to the component', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        // see https://github.com/jsdom/jsdom/issues/2953
        this.skip();
      }

      const theme = createMuiTheme({
        variants: {
          [name]: [
            {
              props: { variant: 'test' },
              styles: { backgroundColor: 'rgb(255, 0, 0)' },
            }
          ]
        },
      });

      render(<WrappedComponent theme={theme} variant="test" />);

      const style = window.getComputedStyle(screen.getByTestId('component'));
      expect(style.getPropertyValue('background-color')).to.equal('rgb(255, 0, 0)');
    });

    it('should map the latest props combination classkey to the component', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        // see https://github.com/jsdom/jsdom/issues/2953
        this.skip();
      }
      
      const theme = createMuiTheme({
        variants: {
          [name]: [
            {
              props: { variant: 'test' },
              styles: { backgroundColor: 'rgb(255, 0, 0)' },
            },
            {
              props: { variant: 'test', size: 'large' },
              styles: { backgroundColor: 'rgb(0, 255, 0)' },
            }
          ]
        },
      });

      render(<WrappedComponent theme={theme} variant="test" size="large" />);

      const style = window.getComputedStyle(screen.getByTestId('component'));
      expect(style.getPropertyValue('background-color')).to.equal('rgb(0, 255, 0)');
    });

    it('should not add classKey if all props are not a match', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        // see https://github.com/jsdom/jsdom/issues/2953
        this.skip();
      }
      
      const theme = createMuiTheme({
        variants: {
          [name]: [
            {
              props: { variant: 'test' },
              styles: { backgroundColor: 'rgb(255, 0, 0)' },
            },
            {
              props: { variant: 'test', size: 'large' },
              styles: { backgroundColor: 'rgb(0, 255, 0)' },
            }
          ]
        },
      });

      render(<WrappedComponent theme={theme} size="large" />);

      const style = window.getComputedStyle(screen.getByTestId('component'));
      expect(style.getPropertyValue('background-color')).not.to.equal('rgb(0, 255, 0)');
    });
  });
}
