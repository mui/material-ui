import { expect } from 'chai';
import { createCssVars } from './cssVars';

describe('CSS Variables', () => {
  describe('createCssVars', () => {
    it('create css and vars from theme object', () => {
      expect(
        createCssVars({
          palette: {
            primary: {
              main: '#ff5252',
              contrastText: '#fff',
            },
          },
          typography: {
            body1: {
              fontSize: 16,
            },
          },
        }),
      ).to.deep.equal({
        css: {
          '--palette-primary-main': '#ff5252',
          '--palette-primary-contrastText': '#fff',
          '--typography-body1-fontSize': 16,
        },
        vars: {
          'palette-primary-main': 'var(--palette-primary-main)',
          'palette-primary-contrastText': 'var(--palette-primary-contrastText)',
          'typography-body1-fontSize': 'var(--typography-body1-fontSize)',
        },
      });
    });
  });
});
