import { expect } from 'chai';
import { getNewPalettes } from './studioUtils';

describe('themeUtils', () => {
  it('can compare first level', () => {
    expect(
      getNewPalettes({ divider: '#e5e5e5' }, { divider: '#e5e5e5', divider2: '$divider-color' }),
    ).to.deep.equal([
      {
        parentInterface: 'Palette',
        value: 'divider2:string;',
      },
    ]);
  });

  it('primary', () => {
    expect(
      getNewPalettes({ primary: { 50: '#ff525' } }, { primary: { 50: '#ff5252', 1000: '$1000' } }),
    ).to.deep.equal([
      {
        parentInterface: 'PalettePrimary',
        value: '1000:string;',
      },
    ]);
  });

  it('neutral', () => {
    expect(
      getNewPalettes({ neutral: { 50: '#ff525' } }, { neutral: { 50: '#ff5252', 1000: '$1000' } }),
    ).to.deep.equal([
      {
        parentInterface: 'PaletteNeutral',
        value: '1000:string;',
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
        parentInterface: 'PaletteBackground',
        value: 'gradient:string;',
      },
    ]);
  });

  it('new nested object', () => {
    expect(getNewPalettes({}, { secondary: { 50: '', 100: '' } })).to.deep.equal([
      {
        parentInterface: 'Palette',
        value: 'secondary:{50:string;100:string;};',
      },
    ]);
  });
});
