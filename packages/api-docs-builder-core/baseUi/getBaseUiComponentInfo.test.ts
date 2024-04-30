import path from 'path';
import fs from 'fs';
import { expect } from 'chai';
import sinon from 'sinon';
import { getBaseUiComponentInfo } from './getBaseUiComponentInfo';

describe('getBaseUiComponentInfo', () => {
  it('return correct info for base component file', () => {
    const componentInfo = getBaseUiComponentInfo(
      path.join(process.cwd(), `/packages/mui-base/src/Button/Button.tsx`),
    );
    sinon.assert.match(componentInfo, {
      name: 'Button',
      apiPathname: '/base-ui/react-button/components-api/#button',
      muiName: 'Button',
      apiPagesDirectory: sinon.match((value) =>
        value.endsWith(path.join('docs', 'pages', 'base-ui', 'api')),
      ),
    });

    componentInfo.readFile();

    expect(componentInfo.getInheritance()).to.deep.equal(null);

    let existed = false;
    try {
      fs.readdirSync(path.join(process.cwd(), 'docs/data'));
      existed = true;
      // eslint-disable-next-line no-empty
    } catch (error) {}
    if (existed) {
      expect(componentInfo.getDemos()).to.deep.equal([
        {
          demoPageTitle: 'Button',
          demoPathname: '/base-ui/react-button/',
        },
      ]);
    }
  });
});
