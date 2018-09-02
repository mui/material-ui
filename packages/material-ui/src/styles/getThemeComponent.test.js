import * as React from 'react';
import { assert } from 'chai';
import getThemeComponent from './getThemeComponent';

describe('getThemeComponent', () => {
  it('should ignore empty theme', () => {
    const component = getThemeComponent({
      theme: {},
      name: 'MuiFoo',
    });
    assert.deepEqual(component, null);
  });

  it('should ignore different component', () => {
    const component = getThemeComponent({
      theme: {
        components: {
          MuiBar: () => <div />,
        },
      },
      name: 'MuiFoo',
    });
    assert.deepEqual(component, null);
  });

  it('should return the component', () => {
    const MuiFoo = () => <div />;
    const component = getThemeComponent({
      theme: {
        components: {
          MuiFoo,
        },
      },
      name: 'MuiFoo',
    });
    assert.deepEqual(component, MuiFoo);
  });
});
