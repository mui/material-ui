import path from 'path';
import generateData from 'inline-style-prefixer/generator';

const browserList = {
  chrome: 30,
  android: 4,
  firefox: 25,
  ios_saf: 6,
  safari: 6,
  ie: 9,
  ie_mob: 9,
  edge: 12,
  opera: 13,
  op_mini: 5,
  and_uc: 9,
  and_chr: 30,
};

generateData(browserList, {
  staticPath: path.join(__dirname, '/../src/utils/autoprefixerStatic.js'),
  dynamicPath: path.joint(__dirname, '/../src/utils/autoprefixerDynamic.js'),
  compatibility: false,
  prefixMap: true,
  plugins: true,
});
