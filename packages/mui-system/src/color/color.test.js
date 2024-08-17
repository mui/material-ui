import { expect } from 'chai';
import * as Color from '@mui/system/color';

const c = Color.from;

describe.only('utils/color', () => {
  it('can encode/decode the representation', () => {
    const color = Color.from(0x599eff80)
    expect(Color.getRed(color)).to.equal(0x59)
    expect(Color.getGreen(color)).to.equal(0x9e)
    expect(Color.getBlue(color)).to.equal(0xff)
    expect(Color.getAlpha(color)).to.equal(0x80)
  });

  it('can set channels', () => {
    const color = Color.parse('#ffffff')
    expect(Color.setRed(color, 0)).to.equal(c(0x00ffffff))
    expect(Color.setGreen(color, 0)).to.equal(c(0xff00ffff))
    expect(Color.setBlue(color, 0)).to.equal(c(0xffff00ff))
    expect(Color.setAlpha(color, 0)).to.equal(c(0xffffff00))
  });

  describe('parse', () => {
    it('parses CSS hexadecimal', () => {
      expect(Color.parse('#59f')).to.equal(c(0x5599ffff));
      expect(Color.parse('#5599ff')).to.equal(c(0x5599ffff));
      expect(Color.parse('#5599ffff')).to.equal(c(0x5599ffff));
    });

    it('parses CSS color spaces', () => {
      ['rgb', 'rgba'].forEach(type => {
        expect(Color.parse(`${type}(255 153 85)`)).to.equal(c(0xff9955ff));
        expect(Color.parse(`${type}(255, 153, 85)`)).to.equal(c(0xff9955ff));
        expect(Color.parse(`${type}(255 153 85 / 50%)`)).to.equal(c(0xff995580));
        expect(Color.parse(`${type}(255 153 85 /  .5)`)).to.equal(c(0xff995580));
        expect(Color.parse(`${type}(255 153 85 / 0.5)`)).to.equal(c(0xff995580));
      });

      ['hsl', 'hsla'].forEach(type => {
        expect(Color.parse(`${type}(50deg 80% 40% / 50%)`)).to.equal(c(c(c(0xb89c1480))));
        expect(Color.parse(`${type}(50deg 80% 40% / 0.5)`)).to.equal(c(0xb89c1480));
        expect(Color.parse(`${type}(0 80% 40% / 0.5)`)).to.equal(c(0xb8141480));
        expect(Color.parse(`${type}(none 80% 40% / 0.5)`)).to.equal(c(0xb8141480));
        expect(Color.parse(`${type}(1turn 80% 40% / 0.5)`)).to.equal(c(0xb8141480));
        expect(Color.parse(`${type}(400grad 80% 40% / 0.5)`)).to.equal(c(0xb8141480));
        expect(Color.parse(`${type}(0rad 80% 40% / 0.5)`)).to.equal(c(0xb8141480));
      });

      expect(Color.parse('hwb(12 50% 0%)')).to.equal(c(c(0xff9980ff)));
      expect(Color.parse('hwb(50deg 30% 40%)')).to.equal(c(0x998c4dff));
      expect(Color.parse('hwb(0.5turn 10% 0% / .5)')).to.equal(c(0x1affff80));

      // FIXME:
      // expect(Color.parse('lab(50% 40 59.5 / 0.5)')).to.equal(c(0xbf570080))
      // expect(Color.parse('lch(52.2% 72.2 50 / 0.5)')).to.equal(c(0xcd561a80))

      expect(Color.parse('color(srgb         1 0.5 0 / 0.5)')).to.equal(c(0xff800080))
      expect(Color.parse('color(srgb-linear  1 0.5 0 / 0.5)')).to.equal(c(0xffbc0080))
      expect(Color.parse('color(display-p3   1 0.5 0 / 0.5)')).to.equal(c(0xff760080))
      expect(Color.parse('color(a98-rgb      1 0.5 0 / 0.5)')).to.equal(c(0xff810080))
      expect(Color.parse('color(prophoto-rgb 1 0.5 0 / 0.5)')).to.equal(c(0xff630080))
      expect(Color.parse('color(rec2020      1 0.5 0 / 0.5)')).to.equal(c(0xff720080))
    });

  });
});
