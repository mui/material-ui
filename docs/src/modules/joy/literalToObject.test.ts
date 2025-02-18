import { expect } from 'chai';
import literalToObject from './literalToObject';

describe('literalToObject', () => {
  it('should work with theme file', () => {
    expect(
      literalToObject(`
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          900: '#000',
        }
      }
    }
  },
  fontFamily: {
    display: '"Inter"',
    body: '"Inter"',
  }
})`),
    ).to.deep.equal({
      colorSchemes: {
        light: {
          palette: {
            primary: {
              900: '#000',
            },
          },
        },
      },
      fontFamily: {
        display: '"Inter"',
        body: '"Inter"',
      },
    });
  });
});
