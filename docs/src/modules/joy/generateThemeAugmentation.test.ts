import { expect } from 'chai';
import generateThemeAugmentation from './generateThemeAugmentation';

describe('generateThemeAugmentation', () => {
  it('should not augment default tokens', () => {
    expect(
      generateThemeAugmentation({
        colorSchemes: {
          light: {
            palette: {
              primary: {
                50: '#fff',
              },
            },
          },
        },
      }),
    ).to.equal(`
declare module '@mui/joy/styles' {
  // No custom tokens found, you can skip the theme augmentation.
}
`);
  });

  [
    'PalettePrimaryOverrides',
    'PaletteNeutralOverrides',
    'PaletteDangerOverrides',
    'PaletteSuccessOverrides',
    'PaletteWarningOverrides',
    'PaletteBackgroundOverrides',
    'PaletteCommonOverrides',
    'PaletteTextOverrides',
  ].forEach((type) => {
    it(`augment ${type}`, () => {
      const paletteName = type.replace(/^Palette([a-zA-Z]+)Overrides$/, '$1').toLowerCase();
      expect(
        generateThemeAugmentation({
          colorSchemes: {
            light: {
              palette: {
                [paletteName]: {
                  custom: '#000',
                },
              },
            },
          },
        }),
      ).to.equal(`
declare module '@mui/joy/styles' {
  interface ${type} {
    custom: true;
  }
}
`);
    });
  });

  it('should augment new tokens', () => {
    expect(
      generateThemeAugmentation({
        colorSchemes: {
          light: {
            palette: {
              primary: {
                gradient: 'any',
              },
              neutral: {
                gradient2: 'any',
              },
              danger: {
                gradient3: 'any',
              },
              success: {
                gradient5: 'any',
              },
              warning: {
                gradient6: 'any',
              },
              background: {
                gradient7: 'any',
              },
              common: {
                gradient8: 'any',
              },
              text: {
                gradient9: 'any',
              },
            },
          },
        },
      }),
    ).to.equal(`
declare module '@mui/joy/styles' {
  interface PalettePrimaryOverrides {
    gradient: true;
  }
  interface PaletteNeutralOverrides {
    gradient2: true;
  }
  interface PaletteDangerOverrides {
    gradient3: true;
  }
  interface PaletteSuccessOverrides {
    gradient5: true;
  }
  interface PaletteWarningOverrides {
    gradient6: true;
  }
  interface PaletteBackgroundOverrides {
    gradient7: true;
  }
  interface PaletteCommonOverrides {
    gradient8: true;
  }
  interface PaletteTextOverrides {
    gradient9: true;
  }
}
`);
  });
});
