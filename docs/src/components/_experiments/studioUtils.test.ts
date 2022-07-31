import { expect } from 'chai';
import { getNewPalettes } from './studioUtils';

describe('themeUtils', () => {
  it('can compare first level', () => {
    expect(
      getNewPalettes({ divider: '#e5e5e5' }, { divider: '#e5e5e5', divider2: '$divider-color' }),
    ).to.deep.equal([
      {
        key: 'divider2',
        parentInterface: 'Palette',
      },
    ]);
  });

  it('primary', () => {
    expect(
      getNewPalettes({ primary: { 50: '#ff525' } }, { primary: { 50: '#ff5252', 1000: '$1000' } }),
    ).to.deep.equal([
      {
        key: '1000',
        parentInterface: 'PalettePrimary',
      },
    ]);
  });

  it('neutral', () => {
    expect(
      getNewPalettes({ neutral: { 50: '#ff525' } }, { neutral: { 50: '#ff5252', 1000: '$1000' } }),
    ).to.deep.equal([
      {
        key: '1000',
        parentInterface: 'PaletteNeutral',
      },
    ]);
  });

  it('background', () => {
    expect(
      getNewPalettes(
        { background: { body: '#ff525' } },
        { background: { body: '#ff5252', gradient: '$1000' } },
      ),
    ).to.deep.equal([
      {
        key: 'gradient',
        parentInterface: 'PaletteBackground',
      },
    ]);
  });

  it('new nested object', () => {
    expect(getNewPalettes({}, { secondary: { 50: '', 100: '' } })).to.deep.equal([
      {
        key: 'secondary',
        nestedKey: '50',
        parentInterface: 'Palette',
      },
      {
        key: 'secondary',
        nestedKey: '100',
        parentInterface: 'Palette',
      },
    ]);
  });
});
