import { assert } from 'chai';
import getThemeProps from './getThemeProps';

describe('getThemeProps', () => {
  it('should ignore empty theme', () => {
    const props = getThemeProps({
      theme: {},
      name: 'MuiFoo',
    });
    assert.deepEqual(props, {});
  });

  it('should ignore different component', () => {
    const props = getThemeProps({
      theme: {
        props: {
          MuiBar: {
            disableRipple: true,
          },
        },
      },
      name: 'MuiFoo',
    });
    assert.deepEqual(props, {});
  });

  it('should return the properties', () => {
    const props = getThemeProps({
      theme: {
        props: {
          MuiFoo: {
            disableRipple: true,
          },
        },
      },
      name: 'MuiFoo',
    });
    assert.deepEqual(props, {
      disableRipple: true,
    });
  });
});
