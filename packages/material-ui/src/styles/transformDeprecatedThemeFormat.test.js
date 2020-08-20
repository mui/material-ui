import { expect } from 'chai';
import transformDeprecatedThemeFormat from './transformDeprecatedThemeFormat';

describe('transformDeprecatedThemeFormat', () => {
  describe('props', () => {
    it('moves props to components props', () => {
      const theme = {
        props: {
          MuiButton: {
            disabled: true
          },
        },
        overrides: { 
          MuiTable: {
            root: {
              background: 'red',
            },
          },
        },
        variants: {
          MuiFab: [
            {
              props: { variant: 'dashed' },
              styles: {
                border: '1px dashed grey'
              },
            },
          ],
        },
      };
  
      expect(transformDeprecatedThemeFormat(theme).components.MuiButton).to.deep.equal({ props: { disabled: true }})
    })
  });
  // TODO: add tests
  describe('overrides', () => {
  });
  describe('variants', () => {
  });
});
