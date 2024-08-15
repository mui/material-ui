import { expect } from 'chai';
import * as Color from '@mui/system/color';

describe.only('utils/color', () => {
  describe('parse', () => {
    it('parses CSS hexadecimal', () => {
      expect(Color.parse('#59f')).to.equal(0x5599ffff);
      expect(Color.parse('#5599ff')).to.equal(0x5599ffff);
      expect(Color.parse('#5599ffff')).to.equal(0x5599ffff);
    });

    it.only('parses CSS color spaces', () => {
      ['rgb', 'rgba'].forEach(type => {
        expect(Color.parse(`${type}(255 153 85)`)).to.equal(0xff9955ff);
        expect(Color.parse(`${type}(255, 153, 85)`)).to.equal(0xff9955ff);
        expect(Color.parse(`${type}(255 153 85 / 50%)`)).to.equal(0xff995580);
        expect(Color.parse(`${type}(255 153 85 /  .5)`)).to.equal(0xff995580);
        expect(Color.parse(`${type}(255 153 85 / 0.5)`)).to.equal(0xff995580);
      });

      ['hsl', 'hsla'].forEach(type => {
        expect(Color.parse(`${type}(50deg 80% 40% / 50%)`)).to.equal(0xb89c1480);
        expect(Color.parse(`${type}(50deg 80% 40% / 0.5)`)).to.equal(0xb89c1480);
        expect(Color.parse(`${type}(0 80% 40% / 0.5)`)).to.equal(0xb8141480);
        expect(Color.parse(`${type}(none 80% 40% / 0.5)`)).to.equal(0xb8141480);
        expect(Color.parse(`${type}(1turn 80% 40% / 0.5)`)).to.equal(0xb8141480);
        expect(Color.parse(`${type}(400grad 80% 40% / 0.5)`)).to.equal(0xb8141480);
        expect(Color.parse(`${type}(0rad 80% 40% / 0.5)`)).to.equal(0xb8141480);
      });

      expect(Color.parse('hwb(12 50% 0%)')).to.equal(0xff9980ff);
      expect(Color.parse('hwb(50deg 30% 40%)')).to.equal(0x998c4dff);
      expect(Color.parse('hwb(0.5turn 10% 0% / .5)')).to.equal(0x1affff80);
    });

  });

  it('can set channels', () => {
    const color = Color.parse('#ffffff')
    expect(Color.setRed(color, 0)).to.equal(0x00ffffff)
    expect(Color.setGreen(color, 0)).to.equal(0xff00ffff)
    expect(Color.setBlue(color, 0)).to.equal(0xffff00ff)
    expect(Color.setAlpha(color, 0)).to.equal(0xffffff00)
  });
});
