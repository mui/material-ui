import path from 'path';
import fs from 'fs';
import { expect } from 'chai';
import sinon from 'sinon';
import { getMaterialUiComponentInfo } from './getMaterialUiComponentInfo';

describe('getMaterialUiComponentInfo', () => {
  it('return correct info for material component file', () => {
    const componentInfo = getMaterialUiComponentInfo(
      path.join(process.cwd(), `/packages/mui-material/src/Button/Button.js`),
    );
    sinon.assert.match(componentInfo, {
      name: 'Button',
      apiPathname: '/material-ui/api/button/',
      muiName: 'MuiButton',
      apiPagesDirectory: sinon.match((value) =>
        value.endsWith(path.join('docs', 'pages', 'material-ui', 'api')),
      ),
    });

    expect(componentInfo.getInheritance('ButtonBase')).to.deep.equal({
      name: 'ButtonBase',
      apiPathname: '/material-ui/api/button-base/',
    });

    let existed = false;
    try {
      fs.readdirSync(path.join(process.cwd(), 'docs/data'));
      existed = true;
      // eslint-disable-next-line no-empty
    } catch (error) {}
    if (existed) {
      expect(componentInfo.getDemos()).to.deep.equal([
        {
          demoPageTitle: 'Button Group',
          demoPathname: '/material-ui/react-button-group/',
        },
        {
          demoPageTitle: 'Button',
          demoPathname: '/material-ui/react-button/',
        },
      ]);
    }
  });
});
