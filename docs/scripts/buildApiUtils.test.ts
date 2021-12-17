import { expect } from 'chai';
import {
  findComponentDemos,
  getMuiName,
  getGeneralPathInfo,
  getMaterialPathInfo,
  getBasePathInfo,
} from './buildApiUtils';

describe('buildApiUtils', () => {
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

  describe('getGeneralPathInfo', () => {
    it('return correct apiUrl', () => {
      const info = getGeneralPathInfo(`/packages/mui-material/src/Button/Button.js`);
      expect(info.apiUrl).to.equal(`/api/button`);
    });

    it('return correct demoUrl', () => {
      const info = getGeneralPathInfo(`/docs/src/pages/components/buttons/buttons.md`);
      expect(info.demoUrl).to.equal(`/components/buttons`);
    });
  });

  describe('getMaterialPathInfo', () => {
    it('[mui-material] return correct apiUrl', () => {
      const info = getMaterialPathInfo(`/packages/mui-material/src/Button/Button.js`);
      expect(info.apiUrl).to.equal(`/material/api/button`);
    });

    it('[mui-material] return correct demoUrl', () => {
      const info = getMaterialPathInfo(`/docs/data/material/components/buttons/buttons.md`);
      expect(info.demoUrl).to.equal(`/material/components/buttons`);
    });

    it('[mui-lab] return correct apiUrl', () => {
      const info = getMaterialPathInfo(`/packages/mui-lab/src/LoadingButton/LoadingButton.js`);
      expect(info.apiUrl).to.equal(`/material/api/loading-button`);
    });

    it('[mui-lab] return correct demoUrl', () => {
      const info = getMaterialPathInfo(`/docs/data/material/components/buttons/buttons.md`);
      expect(info.demoUrl).to.equal(`/material/components/buttons`);
    });

    it('[mui-base] return correct apiUrl', () => {
      const info = getMaterialPathInfo(`/packages/mui-base/src/ButtonUnstyled/ButtonUnstyled.tsx`);
      expect(info.apiUrl).to.equal(`/material/api/button-unstyled`);
    });

    it('[mui-base] return correct demoUrl', () => {
      const info = getMaterialPathInfo(`/docs/data/material/components/buttons/buttons.md`);
      expect(info.demoUrl).to.equal(`/material/components/buttons`);
    });
  });

  describe('getBasePathInfo', () => {
    it('return correct apiUrl', () => {
      const info = getBasePathInfo(`/packages/mui-base/src/ButtonUnstyled/ButtonUnstyled.tsx`);
      expect(info.apiUrl).to.equal(`/base/api/button-unstyled`);
    });

    it('return correct demoUrl', () => {
      const info = getBasePathInfo(`/docs/data/base/components/button-unstyled/button-unstyled.md`);
      expect(info.demoUrl).to.equal(`/base/components/button-unstyled`);
    });
  });
});
