import path from 'path';
import fs from 'fs';
import { expect } from 'chai';
import sinon from 'sinon';
import { getBaseUiHookInfo } from './getBaseUiHookInfo';

describe('getBaseUiHookInfo', () => {
  it('return correct info for base hook file', () => {
    const info = getBaseUiHookInfo(
      path.join(process.cwd(), `/packages/mui-base/src/useButton/useButton.ts`),
    );
    sinon.assert.match(info, {
      name: 'useButton',
      apiPathname: '/base-ui/react-button/hooks-api/#use-button',
    });

    info.readFile();

    let existed = false;
    try {
      fs.readdirSync(path.join(process.cwd(), 'docs/data'));
      existed = true;
      // eslint-disable-next-line no-empty
    } catch (error) {}
    if (existed) {
      expect(info.getDemos()).to.deep.equal([
        {
          demoPageTitle: 'Button',
          demoPathname: '/base-ui/react-button/#hook',
        },
      ]);
    }
  });
});
