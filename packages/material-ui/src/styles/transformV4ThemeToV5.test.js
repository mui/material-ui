import { expect } from 'chai';
import transformV4ThemeToV5 from './transformV4ThemeToV5';

describe('transformV4ThemeToV5', () => {
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
  
      expect(transformV4ThemeToV5(theme).components.MuiButton).to.deep.equal({ props: { disabled: true }})
    })
  });
  describe('overrides', () => {
  });
  describe('variants', () => {
  });
});
