// @flow

import { assert } from 'chai';
import getStylesCreator from './getStylesCreator';

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
    it('should be able to overrides some rules, deep', () => {
      const theme = {
        overrides: {
          [name]: {
            root: {
              color: 'white',
              '&:hover': {
                borderRadius: 2,
                background: 'black',
              },
            },
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
            background: 'black',
          },
        },
      });
    });
  });
});
