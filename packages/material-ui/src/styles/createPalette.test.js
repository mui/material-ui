import { expect } from 'chai';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import { deepOrange, indigo, pink } from '../colors';
import { darken, lighten } from './colorManipulator';
import createPalette, { dark, light } from './createPalette';

describe('createPalette()', () => {
  beforeEach(() => {
    consoleErrorMock.spy();
  });

  afterEach(() => {
    consoleErrorMock.reset();
  });

  it('should create a palette with a rich color object', () => {
    const palette = createPalette({
      primary: deepOrange,
    });

    expect(palette.primary).to.deep.include({
      light: deepOrange[300],
      main: deepOrange[500],
      dark: deepOrange[700],
      contrastText: dark.text.primary,
    });
  });

  it('should create a palette with custom colors', () => {
    const palette = createPalette({
      primary: {
        light: deepOrange[300],
        main: deepOrange[500],
        dark: deepOrange[700],
        contrastText: '#ffffff',
      },
    });

    expect(palette.primary.main).to.equal(deepOrange[500]);
  });

  it('should calculate light and dark colors if not provided', () => {
    const palette = createPalette({
      primary: { main: deepOrange[500] },
    });

    expect(palette.primary).to.deep.include({
      main: deepOrange[500],
      light: lighten(deepOrange[500], 0.2),
      dark: darken(deepOrange[500], 0.3),
    });
  });

  it('should calculate light and dark colors using the provided tonalOffset', () => {
    const palette = createPalette({
      primary: { main: deepOrange[500] },
      tonalOffset: 0.1,
    });

    expect(palette.primary).to.deep.include({
      main: deepOrange[500],
      light: lighten(deepOrange[500], 0.1),
      dark: darken(deepOrange[500], 0.15),
    });
  });

  it('should calculate contrastText using the provided contrastThreshold', () => {
    const palette = createPalette({ contrastThreshold: 7 });
    expect(
      palette.primary.contrastText,
      'should use dark.text.primary as the default primary contrastText color',
    ).to.equal(light.text.primary);
    expect(
      palette.secondary.contrastText,
      'should use dark.text.primary as the default secondary contrastText color',
    ).to.equal(light.text.primary);
  });

  it('should create a dark palette', () => {
    const palette = createPalette({ type: 'dark' });
    expect(palette.primary.main, 'should use indigo as the default primary color').to.equal(
      indigo[500],
    );
    expect(palette.secondary.main, 'should use pink as the default secondary color').to.equal(
      pink.A400,
    );
    expect(palette.text, 'should use dark theme text').to.equal(dark.text);
    expect(consoleErrorMock.callCount()).to.equal(0);
  });

  it('logs an error when an invalid type is specified', () => {
    createPalette({ type: 'foo' });
    expect(consoleErrorMock.callCount()).to.equal(1);
    expect(consoleErrorMock.messages()[0]).to.match(
      /Material-UI: the palette type `foo` is not supported/,
    );
  });

  describe('augmentColor', () => {
    const palette = createPalette({});

    it('should throw when the input is invalid', () => {
      expect(() => {
        palette.augmentColor({});
      }).to.throw(/The color object needs to have a/);
    });

    it('should accept a color', () => {
      const color1 = palette.augmentColor(indigo);
      expect(color1).to.deep.include({
        dark: '#303f9f',
        light: '#7986cb',
        main: '#3f51b5',
        contrastText: '#fff',
      });
      const color2 = palette.augmentColor(indigo, 400, 200, 600);
      expect(color2).to.deep.include({
        light: '#9fa8da',
        main: '#5c6bc0',
        dark: '#3949ab',
        contrastText: '#fff',
      });
    });

    it('should accept a partial palette color', () => {
      const color = palette.augmentColor({
        main: indigo[500],
      });
      expect(color).to.deep.include({
        light: 'rgb(101, 115, 195)',
        main: '#3f51b5',
        dark: 'rgb(44, 56, 126)',
        contrastText: '#fff',
      });
    });
  });

  describe('getContrastText', () => {
    it('throws an exception with a falsy argument', () => {
      const { getContrastText } = createPalette({});

      [
        [undefined, 'missing background argument in getContrastText(undefined)'],
        [null, 'missing background argument in getContrastText(null)'],
        ['', 'missing background argument in getContrastText()'],
        [0, 'missing background argument in getContrastText(0)'],
      ].forEach(testEntry => {
        const [argument, errorMessage] = testEntry;

        expect(() => getContrastText(argument), errorMessage).to.throw();
      });
    });

    it('logs an error when the contrast ratio does not reach AA', () => {
      const { getContrastText } = createPalette({
        contrastThreshold: 0,
      });

      getContrastText('#fefefe');

      expect(consoleErrorMock.callCount()).to.equal(3);
      expect(consoleErrorMock.messages()[0]).to.include(
        'falls below the WCAG recommended absolute minimum contrast ratio of 3:1',
      );
    });
  });

  it('should create a palette with unique object references', () => {
    const redPalette = createPalette({ background: { paper: 'red' } });
    const bluePalette = createPalette({ background: { paper: 'blue' } });
    expect(redPalette).to.not.equal(bluePalette);
    expect(redPalette.background).to.not.equal(bluePalette.background);
  });
});
