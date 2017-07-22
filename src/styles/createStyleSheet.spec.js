// @flow

import { assert } from 'chai';
import createStyleSheet from './createStyleSheet';

describe('createStyleSheet', () => {
  const name = 'name';
  const styleSheet = createStyleSheet(name, {
    root: {
      color: 'black',
      '&:hover': {
        color: 'red',
        borderRadius: 0,
      },
    },
  });

  it('should be able to get the styles', () => {
    const styles = styleSheet.createStyles({});
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
      const styles = styleSheet.createStyles(theme);
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
