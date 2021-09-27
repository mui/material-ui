import { expect } from 'chai';
import { toCssVar, CssVarsBuilder } from './cssVarsUtils';

describe('CSS Variables', () => {
  describe('toCssVar', () => {
    it('turn string with dot notation to css var format', () => {
      expect(toCssVar('primary.main')).to.deep.equal('--primary-main');
    });
    it('turn array to css var', () => {
      expect(toCssVar(['primary', 'main'])).to.deep.equal('--primary-main');
    });
  });
  describe('CssVarsBuilder', () => {
    it('turn object into css vars format', () => {
      expect(
        CssVarsBuilder({
          color: '#000',
          fontFamily: 'Roboto',
        }),
      ).to.deep.equal({
        css: {
          '--color': '#000',
          '--fontFamily': 'Roboto',
        },
        vars: {
          color: 'var(--color)',
          fontFamily: 'var(--fontFamily)',
        },
      });
    });

    it('turn array into css vars format', () => {
      expect(CssVarsBuilder(['#000', '#fff'])).to.deep.equal({
        css: {
          '--0': '#000',
          '--1': '#fff',
        },
        vars: ['var(--0)', 'var(--1)'],
      });
    });

    it('skip values that are not string or number', () => {
      expect(
        CssVarsBuilder({
          shadows: ['0px 0px 2px 1px rgba(0,0,0,0.12)'],
          helper: () => 0,
          nested: {},
        }),
      ).to.deep.equal({
        css: {},
        vars: {},
      });
    });

    it('accept custom cssVar prefix', () => {
      expect(
        CssVarsBuilder(
          {
            color: '#000',
            fontFamily: 'Roboto',
          },
          {
            prefix: 'mui',
          },
        ),
      ).to.deep.equal({
        css: {
          '--mui-color': '#000',
          '--mui-fontFamily': 'Roboto',
        },
        vars: {
          color: 'var(--mui-color)',
          fontFamily: 'var(--mui-fontFamily)',
        },
      });
    });

    it('accept shouldSkipKey', () => {
      expect(
        CssVarsBuilder(
          {
            fontFamily: 'Roboto',
            color: '#000',
          },
          {
            shouldSkipKey: (key) => key === 'fontFamily',
          },
        ),
      ).to.deep.equal({
        css: {
          '--color': '#000',
        },
        vars: {
          color: 'var(--color)',
        },
      });
    });
  });
});
