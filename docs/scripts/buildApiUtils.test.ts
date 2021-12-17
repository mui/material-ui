import { expect } from 'chai';
import { getPathInfo, getPathInfoNew, findComponentDemos, getMuiName } from './buildApiUtils';

describe('buildApiUtils', () => {
  describe('getPathInfo', () => {
    it('return correct demo url', () => {
      const info = getPathInfo(
        `/Users/siriwatknp/Personal-Repos/material-ui/docs/src/pages/components/menus/menus.md`,
      );
      expect(info.demoUrl).to.equal(`/components/menus`);
    });

    it('return correct api url', () => {
      const info = getPathInfo(
        `/Users/siriwatknp/Personal-Repos/material-ui/packages/mui-material/src/Switch/Switch.js`,
      );
      expect(info.apiUrl).to.equal(`/api/switch`);
    });
  });

  describe('getPathInfo [product scope structure]', () => {
    it('return correct demo url', () => {
      const info = getPathInfoNew(
        `/Users/siriwatknp/Personal-Repos/material-ui/docs/products/material/components/menus/menus.md`,
      );
      expect(info.demoUrl).to.equal(`/material/components/menus`);
    });

    it('return correct api url', () => {
      const info = getPathInfoNew(
        `/Users/siriwatknp/Personal-Repos/material-ui/packages/mui-base/src/ButtonUnstyled/ButtonUnstyled.tsx`,
      );
      expect(info.apiUrl).to.equal(`/base/api/button-unstyled`);
    });
  });

  it('findComponentDemos return matched component', () => {
    expect(
      findComponentDemos('Accordion', [
        {
          pathname: '/material/components/accordion',
          components: ['Accordion', 'AccordionDetails'],
        },
        {
          pathname: '/material/components/accordion-details',
          components: ['Accordion', 'AccordionDetails'],
        },
      ]),
    ).to.deep.equal(['/material/components/accordion', '/material/components/accordion-details']);
  });

  it('getMuiName return name without Unstyled', () => {
    expect(getMuiName('ButtonUnstyled')).to.equal('MuiButton');
  });

  it('getMuiName return name without Styled', () => {
    expect(getMuiName('StyledInputBase')).to.equal('MuiInputBase');
  });
});
