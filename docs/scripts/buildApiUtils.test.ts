import { expect } from 'chai';
import sinon from 'sinon';
import {
  findComponentDemos,
  getMuiName,
  getGeneralPathInfo,
  getMaterialPathInfo,
  getBasePathInfo,
  extractPackageFilePath,
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

  describe('extractPackageFilePath', () => {
    it('return info if path is a package (material)', () => {
      const result = extractPackageFilePath(
        '/material-ui/packages/mui-material/src/Button/Button.js',
      );
      sinon.assert.match(result, {
        packagePath: 'mui-material',
        muiPackage: 'mui-material',
        name: 'Button',
      });
    });

    it('return info if path is a package (lab)', () => {
      const result = extractPackageFilePath(
        '/material-ui/packages/mui-lab/src/LoadingButton/LoadingButton.js',
      );
      sinon.assert.match(result, {
        packagePath: 'mui-lab',
        muiPackage: 'mui-lab',
        name: 'LoadingButton',
      });
    });

    it('return info if path is a package (base)', () => {
      const result = extractPackageFilePath(
        '/material-ui/packages/mui-base/src/TabUnstyled/TabUnstyled.tsx',
      );
      sinon.assert.match(result, {
        packagePath: 'mui-base',
        muiPackage: 'mui-base',
        name: 'TabUnstyled',
      });
    });

    it('return info if path is a package (data-grid)', () => {
      const result = extractPackageFilePath(
        '/material-ui/packages/grid/x-data-grid/src/DataGrid.tsx',
      );
      sinon.assert.match(result, {
        packagePath: 'x-data-grid',
        muiPackage: 'mui-data-grid',
        name: 'DataGrid',
      });
    });

    it('return info if path is a package (data-grid-pro)', () => {
      const result = extractPackageFilePath(
        '/material-ui/packages/grid/x-data-grid-pro/src/DataGridPro.tsx',
      );
      sinon.assert.match(result, {
        packagePath: 'x-data-grid-pro',
        muiPackage: 'mui-data-grid-pro',
        name: 'DataGridPro',
      });
    });

    it('return null if path is not a package', () => {
      const result = extractPackageFilePath(
        '/material-ui/docs/pages/material/getting-started/getting-started.md',
      );
      sinon.assert.match(result, {
        packagePath: null,
        name: null,
      });
    });
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
      expect(info.apiUrl).to.equal(`/material/api/mui-material/button`);
    });

    it('[mui-material] return correct demoUrl', () => {
      const info = getMaterialPathInfo(`/docs/data/material/components/buttons/buttons.md`);
      expect(info.demoUrl).to.equal(`/material/react-buttons`);
    });

    it('[mui-lab] return correct apiUrl', () => {
      const info = getMaterialPathInfo(`/packages/mui-lab/src/LoadingButton/LoadingButton.js`);
      expect(info.apiUrl).to.equal(`/material/api/mui-lab/loading-button`);
    });

    it('[mui-lab] return correct demoUrl', () => {
      const info = getMaterialPathInfo(`/docs/data/material/components/buttons/buttons.md`);
      expect(info.demoUrl).to.equal(`/material/react-buttons`);
    });

    it('[mui-base] return correct apiUrl', () => {
      const info = getMaterialPathInfo(`/packages/mui-base/src/ButtonUnstyled/ButtonUnstyled.tsx`);
      expect(info.apiUrl).to.equal(`/material/api/mui-base/button-unstyled`);
    });

    it('[mui-base] return correct demoUrl', () => {
      const info = getMaterialPathInfo(`/docs/data/material/components/buttons/buttons.md`);
      expect(info.demoUrl).to.equal(`/material/react-buttons`);
    });
  });

  describe('getBasePathInfo', () => {
    it('return correct apiUrl', () => {
      const info = getBasePathInfo(`/packages/mui-base/src/ButtonUnstyled/ButtonUnstyled.tsx`);
      expect(info.apiUrl).to.equal(`/base/api/mui-base/button-unstyled`);
    });

    it('return correct demoUrl', () => {
      const info = getBasePathInfo(`/docs/data/base/components/button-unstyled/button-unstyled.md`);
      expect(info.demoUrl).to.equal(`/base/react-button-unstyled`);
    });
  });
});
