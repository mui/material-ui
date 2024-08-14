import { expect } from 'chai';
import { parse } from '@mui/system/color';

describe('utils/color', () => {
  describe.only('parse', () => {
    it('parses CSS hexadecimal', () => {
      expect(parse('#59f')).to.equal(0x5599ffff);
      expect(parse('#5599ff')).to.equal(0x5599ffff);
      expect(parse('#5599ffff')).to.equal(0x5599ffff);
    });

    it.only('parses CSS color spaces', () => {
      ['rgb', 'rgba'].forEach(type => {
        expect(parse(`${type}(85 153 255)`)).to.equal(0x5599ffff);
        expect(parse(`${type}(85, 153, 255)`)).to.equal(0x5599ffff);
        expect(parse(`${type}(85 153 255 / 50%)`)).to.equal(0x5599ff80);
        expect(parse(`${type}(85 153 255 /  .5)`)).to.equal(0x5599ff80);
        expect(parse(`${type}(85 153 255 / 0.5)`)).to.equal(0x5599ff80);
      });

      ['hsl', 'hsla'].forEach(type => {
        expect(parse(`${type}(50deg 80% 40% / 50%)`)).to.equal(0xb89c1480);
        expect(parse(`${type}(50deg 80% 40% / 0.5)`)).to.equal(0xb89c1480);
        expect(parse(`${type}(0 80% 40% / 0.5)`)).to.equal(0xb8141480);
        expect(parse(`${type}(none 80% 40% / 0.5)`)).to.equal(0xb8141480);
        expect(parse(`${type}(1turn 80% 40% / 0.5)`)).to.equal(0xb8141480);
        expect(parse(`${type}(400grad 80% 40% / 0.5)`)).to.equal(0xb8141480);
        expect(parse(`${type}(0rad 80% 40% / 0.5)`)).to.equal(0xb8141480);
      });

      // XXX: Not working
      // console.log(h(0xff9980ff))
      // console.log(h(parse('hwb(12 50% 0%)')))
      // expect(parse('hwb(12 50% 0%)')).to.equal(0xff9980ff);
      // expect(parse('hwb(50deg 30% 40%)')).to.equal(0x998c4dff);
      // expect(parse('hwb(0.5turn 10% 0% / .5)')).to.equal(0x1affff80);

    });
  });
});
