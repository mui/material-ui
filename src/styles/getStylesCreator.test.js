// @flow

import { assert } from 'chai';
import getStylesCreator from './getStylesCreator';
import consoleErrorMock from '../../test/utils/consoleErrorMock';

describe('getStylesCreator', () => {
  const name = 'name';
  const stylesCreator = getStylesCreator({
    root: {
      color: 'black',
      '&:hover': {
        color: 'red',
        borderRadius: 0,
      },
    },
  });

  it('should be able to get the styles', () => {
    const styles = stylesCreator.create({});
    assert.deepEqual(styles, {
      root: {
        color: 'black',
        '&:hover': {
          color: 'red',
          borderRadius: 0,
        },
      },
    });
  });

  describe('overrides', () => {
    before(() => {
      consoleErrorMock.spy();
    });

    after(() => {
      consoleErrorMock.reset();
    });

    it('should be able to overrides some rules, deep', () => {
      const theme = {
        overrides: {
          [name]: {
            root: { color: 'white', '&:hover': { borderRadius: 2, backgroundColor: 'black' } },
          },
        },
      };
      const styles = stylesCreator.create(theme, name);
      assert.deepEqual(styles, {
        root: {
          color: 'white',
          '&:hover': {
            color: 'red',
            borderRadius: 2,
            backgroundColor: 'black',
          },
        },
      });
    });

    it('should warn on wrong usage', () => {
      const theme = {
        overrides: {
          [name]: {
            bubu: {
              color: 'white',
            },
          },
        },
      };
      stylesCreator.create(theme, name);
      assert.strictEqual(consoleErrorMock.callCount(), 1);
      assert.match(consoleErrorMock.args()[0][0], /Fix the `bubu` key of `theme\.overrides\.name`/);
    });

    it('should support jss-expand', () => {
      const stylesCreator2 = getStylesCreator({
        root: {
          padding: [8, 16],
        },
      });

      const theme = {
        overrides: {
          [name]: {
            root: {
              padding: [20, 10],
            },
          },
        },
      };
      const styles = stylesCreator2.create(theme, name);
      assert.deepEqual(styles, {
        root: {
          padding: [20, 10],
        },
      });
    });
  });
});
